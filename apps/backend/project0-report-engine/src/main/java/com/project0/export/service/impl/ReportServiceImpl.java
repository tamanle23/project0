package com.project0.export.service.impl;

import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.project0.export.helper.ReportHelper;
import com.project0.export.model.ReportData;
import com.project0.export.service.ReportService;

import org.springframework.util.StringUtils;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRParameter;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class ReportServiceImpl implements ReportService {

  @Value("${project0-export.context-path}")
  public String contextPath;
  
  @Autowired
  ReportHelper reportHelper;
  
  @Override
  public <T> void render(ReportData<T> reportData,final OutputStream outputStream) {
    Map<String, Object> parameters = new HashMap<>();
    parameters.put(ReportHelper.CONTEXT_DIR, contextPath);
    parameters.put(JRParameter.REPORT_LOCALE, reportData.getLocale() != null ? StringUtils.parseLocaleString(reportData.getLocale()) : null);
    try {
      JasperPrint jasperPrint = reportHelper.render(reportHelper.getCompiledReport(reportData.getTemplateName()), parameters, new JRBeanCollectionDataSource(reportData.getItems()));
      
    } catch (JRException e) {
      e.printStackTrace();
    }
    
  }

}
