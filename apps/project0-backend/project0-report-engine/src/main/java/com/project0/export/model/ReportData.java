package com.project0.export.model;

import java.util.List;

import com.project0.export.constant.OutputType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReportData<T> {
  
  OutputType outputType;
  String templateName;
  String locale;
  List<T> items;
}
