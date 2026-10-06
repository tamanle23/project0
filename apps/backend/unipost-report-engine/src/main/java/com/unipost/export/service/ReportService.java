package com.unipost.export.service;

import java.io.OutputStream;

import com.unipost.export.model.ReportData;

public interface ReportService {
  
  <T>void render(ReportData<T> reportData, OutputStream outputStream);
}
