package com.project0.presentation;

import com.project0.core.context.Context;
import com.project0.core.io.ContextHeader;
import com.project0.core.io.Page;
import com.project0.core.io.PageRequest;
import com.project0.core.io.ResponseWrapper;
import com.project0.fw.ResponseEntityBuilder;
import com.project0.presentation.dto.metadata.*;
import com.project0.service.MetadataService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MetadataControllerTest {

    @Mock
    private MetadataService metadataService;

    @Mock
    private Context contextHelper;

    private ResponseEntityBuilder responseBuilder;
    private MetadataController metadataController;

    @BeforeEach
    void setUp() {
        responseBuilder = new ResponseEntityBuilder();
        ReflectionTestUtils.setField(responseBuilder, "contextHelper", contextHelper);
        metadataController = new MetadataController(metadataService, responseBuilder);
    }

    @Test
    void testGetEntityTypes_PopulatesDefaultPageRequest() {
        Page<EntityTypeResponse> mockPage = new Page<>();
        when(metadataService.getEntityTypes(any(PageRequest.class))).thenReturn(mockPage);

        ResponseEntity<ResponseWrapper<ContextHeader, Page<EntityTypeResponse>>> response = metadataController.getEntityTypes(null);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(mockPage, response.getBody().getBody());

        ArgumentCaptor<PageRequest> captor = ArgumentCaptor.forClass(PageRequest.class);
        verify(metadataService).getEntityTypes(captor.capture());

        PageRequest captured = captor.getValue();
        assertNotNull(captured);
        assertEquals(1, captured.getNumber());
        assertEquals(10, captured.getSize());
    }

    @Test
    void testGetAttributeDefinitions() {
        Long typeId = 1L;
        PageRequest request = new PageRequest();
        request.setNumber(2);
        request.setSize(20);

        Page<AttributeDefinitionResponse> mockPage = new Page<>();
        when(metadataService.getAttributeDefinitions(eq(typeId), any(PageRequest.class))).thenReturn(mockPage);

        ResponseEntity<ResponseWrapper<ContextHeader, Page<AttributeDefinitionResponse>>> response = metadataController.getAttributeDefinitions(typeId, request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(mockPage, response.getBody().getBody());

        ArgumentCaptor<PageRequest> captor = ArgumentCaptor.forClass(PageRequest.class);
        verify(metadataService).getAttributeDefinitions(eq(typeId), captor.capture());

        PageRequest captured = captor.getValue();
        assertEquals(2, captured.getNumber());
        assertEquals(20, captured.getSize());
    }

    @Test
    void testCreateEntityRecord() {
        Long typeId = 1L;
        CreateRecordRequest inputRecord = new CreateRecordRequest(Map.of("name", "John"), "tenant-1");
        EntityRecordResponse returnedRecord = new EntityRecordResponse(100L, "uid-100", 1L, "tenant-1", Map.of("name", "John"), 1L, LocalDateTime.now(), LocalDateTime.now());

        when(metadataService.createEntityRecord(typeId, inputRecord)).thenReturn(returnedRecord);

        ResponseEntity<ResponseWrapper<ContextHeader, EntityRecordResponse>> response = metadataController.createEntityRecord(typeId, inputRecord);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(returnedRecord, response.getBody().getBody());
        verify(metadataService).createEntityRecord(typeId, inputRecord);
    }
}
