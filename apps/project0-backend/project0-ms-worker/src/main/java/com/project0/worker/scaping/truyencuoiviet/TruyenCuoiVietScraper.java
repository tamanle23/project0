package com.project0.worker.scaping.truyencuoiviet;

import com.project0.core.logging.LoggerFactory;
import com.project0.worker.scaping.NavigationLink;
import com.project0.worker.scaping.StaticSiteScraper;
import io.reactivex.rxjava3.core.BackpressureStrategy;
import io.reactivex.rxjava3.core.Flowable;
import lombok.Setter;
import lombok.SneakyThrows;
import org.apache.commons.lang.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Entities;
import org.jsoup.safety.Whitelist;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Scope;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.SocketTimeoutException;
import java.util.*;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
@ConfigurationProperties(prefix = "truyen-cuoi-viet")
@Scope(value="prototype")
public class TruyenCuoiVietScraper implements StaticSiteScraper<TruyenCuoiVietArticle> {

  private Logger logger = LoggerFactory.getLogger(TruyenCuoiVietScraper.class);

  @Setter
  String index = "https://www.truyencuoiviet.com/";

  public Flowable<TruyenCuoiVietArticle> start() {
    logger.debug("Start loading truyencuoiviet...");
      return Flowable.create(emitter -> {
        Queue<NavigationLink> mainNavLinks = this.getMainNavLinks();
        for(NavigationLink link : mainNavLinks) {
          for(NavigationLink l: this.getListingLinks(link)) {
            logger.info("Scan articles page {}", l.getHref());
            Queue<Element> listingElements = getListingElements(l);
            for(Element e: listingElements) {
              emitter.onNext(
                this.getArticle(e, link.getName())
              );
              if(emitter.isCancelled()) {
                return;
              }
            }
          }
        }
        emitter.onComplete();
      }, BackpressureStrategy.MISSING);
  }


  private TruyenCuoiVietArticle getArticle(Element e, String category) {
    Element titleEl = e.selectFirst(".entry-title a");
    Element summaryEl = e.selectFirst(".entry-content");
    summaryEl.select(".more-link").remove();
    String href = titleEl.attr("href");
    return TruyenCuoiVietArticle.builder()
                  .href(href)
                  .category(category)
                  .header(titleEl.text())
                  .summary(summaryEl.text())
                  .content(this.getContent(href))
                  .build();
  }

  @Retryable(value = RuntimeException.class)
  @SneakyThrows
  private Queue<Element> getListingElements(NavigationLink listingLink) {
    logger.debug("Fetch listing elements: {}", listingLink.getHref());
    Document document = Jsoup.connect(listingLink.getHref()).get();
    return new ConcurrentLinkedQueue<>(document.select("#main article"));
  }

  @Retryable(value = RuntimeException.class)
  @SneakyThrows
  private Queue<NavigationLink> getListingLinks(NavigationLink initLink) {
    logger.debug("Fetch listing: {}", initLink.getHref());
    Document document = Jsoup.connect(initLink.getHref()).get();
      Element lastPageEl = document.selectFirst("#main > .pagination > .page-numbers:nth-last-child(2)");
      if(lastPageEl != null) {
        Integer lastPage = Integer.parseInt(lastPageEl.text());
        return new LinkedList<>(
                      IntStream.rangeClosed(1, lastPage)
                        .mapToObj(i -> NavigationLink.builder().name(String.valueOf(i)).href(String.format("%spage/%s", initLink.getHref(), i)).build())
                        .collect(Collectors.toList())
        );
      }
      return new LinkedList<>(Arrays.asList(NavigationLink.builder().href(initLink.getHref()).build()));

  }

  @SneakyThrows
  private String getContent(String href) {
    logger.debug("Fetch article content: {}", href);
    Document document = Jsoup.connect(href).get();
    Document.OutputSettings outputSettings = new Document.OutputSettings();
    outputSettings.prettyPrint(false);
    outputSettings.escapeMode(Entities.EscapeMode.xhtml);
    document.outputSettings(outputSettings);
    Element contentEl = document.selectFirst("#main .entry-content");
    Elements contentElements = contentEl.select("> *:not(:last-child)");
    return contentElements.stream()
      .map(e -> {
        e.select(" > div").before("\\r\\n");
        e.select(" p").before("\\r\\n");
        e.select(" br").before("\\r\\n");
        return Jsoup.clean(e.html().replaceAll("\\\\r\\\\n", "\r\n"), "", Whitelist.none(), outputSettings).trim();
      })
      .filter(StringUtils::isNotBlank)
      .collect(Collectors.joining("\r\n"));
  }

  @Retryable(value = RuntimeException.class)
  @SneakyThrows
  private Queue<NavigationLink> getMainNavLinks() {
    Document document = Jsoup.connect(this.index).get();
    return new LinkedList<>(document.select("#secondary-nav a")
                   .stream()
                   .map(
                     e -> NavigationLink.builder()
                                        .href(e.absUrl("href"))
                                        .name(e.text())
                                        .build()
                   )
                   .collect(Collectors.toList()));
  }

  Queue<NavigationLink> mainNavs;
  NavigationLink currentMainNav;
  Queue<NavigationLink> listingNavs;
  Queue<Element> listingElements;
  private Iterator<TruyenCuoiVietArticle> iterator;

  private void prepare() {
    if(listingElements.peek() == null && listingNavs.peek() == null && mainNavs.peek() == null) {
      mainNavs = getMainNavLinks();
    }
    if(listingElements.peek() == null && listingNavs.peek() == null && mainNavs.peek() != null) {
      currentMainNav = mainNavs.poll();
      listingNavs = getListingLinks(currentMainNav);
    }
    if(listingElements.peek() == null && listingNavs.peek() != null) {
      listingElements = getListingElements(listingNavs.poll());
    }
  }

  @Override
  public Iterator<TruyenCuoiVietArticle> iterator() {
    if(this.iterator == null) {
      this.mainNavs = new LinkedList<>(Collections.emptyList());
      this.listingNavs = new LinkedList<>(Collections.emptyList());
      this.listingElements = new LinkedList<>(Collections.emptyList());
      prepare();
      iterator = new Iterator<TruyenCuoiVietArticle>() {
        ReentrantLock lock = new ReentrantLock();
        @Override
        public boolean hasNext() {
          return listingElements.peek() != null || listingNavs.peek() != null || mainNavs.peek() != null;
        }

        @Override
        public TruyenCuoiVietArticle next() {
          logger.debug("Read next article");
          TruyenCuoiVietArticle article = null;
          lock.lock();
          try {
            if(listingElements.peek() == null) {
              prepare();
            }
            Element el = listingElements.poll();
            String category = currentMainNav.getName();
            lock.unlock();
            if(el==null) {
              return null;
            }
            article = getArticle(el, category);
          } finally {
            if(lock.isHeldByCurrentThread()) {
              lock.unlock();
            }
          }
          return article;
        }
      };
    }
    return this.iterator;
  }
}
