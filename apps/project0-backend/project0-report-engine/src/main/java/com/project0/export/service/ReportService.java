package com.project0.export.service;

import java.io.OutputStream;

import com.project0.export.model.ReportData;

public interface ReportService {
  
  <T>void render(ReportData<T> reportData, OutputStream outputStream);
}
