package com.project0.resources.core;

import java.lang.reflect.ParameterizedType;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;

import com.project0.core.exception.BusinessException;
import com.project0.resources.core.Base;

/**
 * Base class for enum configuration.
 *
 * @param <E> the element type
 * @param <V> the value type
 */
public abstract class BaseConfiguration<E extends Base> implements InitializingBean {

  private static final String MSG_KEY_PATTERN = "%s.%s";
  protected Logger logger = LoggerFactory.getLogger(this.getClass());
  
  /** The country code. */
//  @Value(value="${country_code}")
//  String countryCode;
  
  @Autowired
  @Qualifier(value="resourcesMessageSource")
  MessageSource messageSource;
  
  /** The locale. */
  Locale locale;
  
  Class<E> clazz;
  
  @Override
  public void afterPropertiesSet() throws Exception {
//    locale = new Locale(countryCode);
    clazz = getEnumClass();
    this.build(clazz);
  }

  @SuppressWarnings("unchecked")
  protected Class<E> getEnumClass() {
    return (Class<E>) ((ParameterizedType)this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
  }
  protected void build(Class<E> clazz) {
    Base.load(clazz,verify(this.getLoadingData()));
  }
  
  protected abstract List<E> getLoadingData();
  
  protected abstract String resourcePrefix();
  
  public void refresh() {
    this.build(clazz);
  }
  
  /**
   * Get default locale based on country_code
   *
   * @return the locale
   */
  public Locale getLocale() {
    return this.locale;
  }
  
  /**
   * This function provide factory method to get derived key. Override this method to enable derived key verification, otherwise
   *
   * @return the function
   */
  protected Function<E, String> combinationKeyFactory() {
    return null;
  }
  
  /**
   * Verify default key value.
   *
   * @param enumDatas the enum datas
   * @return the list
   */
  protected List<E> verifyKey(List<E> enumDatas) {
    String duplicatedKeys = enumDatas.stream()
                                    .collect(Collectors.groupingBy(E::getKey, Collectors.counting()))
                                    .entrySet()
                                    .stream()
                                    .filter(e -> e.getValue() > 1)
                                    .map(Entry::getKey)
                                    .collect(Collectors.joining(StringUtils.EMPTY));
    if(StringUtils.isNotBlank(duplicatedKeys)) {
      throw new BusinessException("Failed to initialize enum : " + this.getClass().getName() + ". Duplicated key found: " + duplicatedKeys );
    }
    return enumDatas;
  }
  
  /**
   * Verify derived key based on factory method.
   *
   * @param enumDatas the enum datas
   * @return the list
   */
  protected List<E> verifyCombinationKey(List<E> enumDatas) {
    Function<E, String> derivedKeyFactory = this.combinationKeyFactory();
    String duplicatedKeys =  null;
    if(derivedKeyFactory!=null) {
      duplicatedKeys = enumDatas.stream()
                                   .collect(Collectors.groupingBy(derivedKeyFactory::apply, Collectors.counting()))
                                   .entrySet()
                                   .stream()
                                   .filter(e -> e.getValue() > 1)
                                   .map(Entry::getKey)
                                   .collect(Collectors.joining(StringUtils.EMPTY));
    }
    if(StringUtils.isNotBlank(duplicatedKeys)) {
      throw new BusinessException("Failed to initialize enum : " + this.getClass().getName() + ". Duplicated combination keys found." + duplicatedKeys);
    }
    return enumDatas;
  }
  
  /**
   * This method used to verify enum data before do enum loading.
   *
   * @param products the products
   * @return the list
   */
  protected List<E> verify(List<E> products) {
    return Optional.ofNullable(products)
                   .map(this::verifyKey)
                   .map(this::verifyCombinationKey)
                   .map(this::buildI18n)
                   .orElse(Collections.emptyList());
  }
  
  
  /**
   * A method to load I18n display for fields. Override this method for a particular list of fields.
   *
   * @param enumDatas the enum datas
   * @return the list
   */
  protected List<E> buildI18n(List<E> enumDatas) {
    if(enumDatas!=null && messageSource() !=null) {
      enumDatas.forEach(p -> p.setDescription(messageSource().getMessage(String.format(MSG_KEY_PATTERN, this.resourcePrefix(),p.getKey()), null,p.getDescription(), this.getLocale())));
    }
    return enumDatas;
  }
  
  protected MessageSource messageSource() {
    return this.messageSource;
  }
  
}
