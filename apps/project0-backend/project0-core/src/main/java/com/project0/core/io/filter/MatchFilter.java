package com.project0.core.io.filter;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MatchFilter extends BaseFilter {
  MatchType type;
  String value;
  List<String> values;
}
