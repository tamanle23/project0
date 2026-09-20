package com.project0.export.helper;

import java.io.OutputStream;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.project0.core.exception.BusinessException;
import com.project0.export.constant.OutputType;

import net.sf.jasperreports.engine.DefaultJasperReportsContext;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRParameter;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.JasperReportsContext;
import net.sf.jasperreports.engine.export.HtmlExporter;
import net.sf.jasperreports.engine.export.JRCsvExporter;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.JRXmlExporter;
import net.sf.jasperreports.engine.query.JRXPathQueryExecuterFactory;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.export.Exporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;

@Component
public class ReportHelper {

  public static final String CONTEXT_DIR = "CONTEXT_PATH";
  public static final String DATA_SOURCE_PARAM_XML = JRXPathQueryExecuterFactory.PARAMETER_XML_DATA_DOCUMENT;
  public static final String DATA_SOURCE_PARAM_COLLECTION = JRParameter.REPORT_DATA_SOURCE;

  private final Logger logger = LoggerFactory.getLogger(ReportHelper.class);

  public JasperReport getCompiledReport(final String jasperPath) throws JRException {
      return (JasperReport) JRLoader.loadObject(JRLoader.getLocationInputStream(jasperPath));
  }
  
  public JasperReport getReport(final String jrxmlPath) throws JRException {
    return JasperCompileManager.compileReport(jrxmlPath);
  }
  
  public JasperPrint render(JasperReport jasperReport, Map<String, Object> parameters, JRDataSource dataSource) throws JRException {
    return JasperFillManager.fillReport(jasperReport, parameters, dataSource);
  }
  
  @SuppressWarnings({ "rawtypes", "unchecked" })
  public void export(OutputType outputType, JasperPrint jasperPrint, OutputStream outputStream) throws JRException {
    Exporter exporter = null;
    JasperReportsContext reportContext = DefaultJasperReportsContext.getInstance();
    switch(outputType) {
    case PDF:
      exporter = new JRPdfExporter(reportContext);
      break;
    case HTML:
      exporter = new HtmlExporter();
      break;
    default:
      throw new BusinessException("Output type is not supported.");
    }
    
    exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
    exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));
    exporter.exportReport();
  }
}
