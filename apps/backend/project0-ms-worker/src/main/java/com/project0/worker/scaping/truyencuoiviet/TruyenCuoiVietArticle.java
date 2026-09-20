package com.project0.worker.scaping.truyencuoiviet;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TruyenCuoiVietArticle {
  String href;
  String category;
  String header;
  String summary;
  String content;
}
