package com.project0.presentation;

import com.project0.core.io.Page;
import com.project0.core.io.PageRequest;
import com.project0.domain.metadata.AttributeDefinition;
import com.project0.domain.metadata.EntityRecord;
import com.project0.domain.metadata.EntityType;
import com.project0.service.MetadataService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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

    @InjectMocks
    private MetadataController metadataController;

    @Test
    void testGetEntityTypes_PopulatesDefaultPageRequest() {
        Page<EntityType> mockPage = new Page<>();
        when(metadataService.getEntityTypes(any(PageRequest.class))).thenReturn(mockPage);

        // Pass null simulating missing query params
        ResponseEntity<Page<EntityType>> response = metadataController.getEntityTypes(null);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockPage, response.getBody());

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

        Page<AttributeDefinition> mockPage = new Page<>();
        when(metadataService.getAttributeDefinitions(eq(typeId), any(PageRequest.class))).thenReturn(mockPage);

        ResponseEntity<Page<AttributeDefinition>> response = metadataController.getAttributeDefinitions(typeId, request);

        assertEquals(HttpStatus.OK, response.getStatusCode());

        ArgumentCaptor<PageRequest> captor = ArgumentCaptor.forClass(PageRequest.class);
        verify(metadataService).getAttributeDefinitions(eq(typeId), captor.capture());

        PageRequest captured = captor.getValue();
        assertEquals(2, captured.getNumber());
        assertEquals(20, captured.getSize());
    }

    @Test
    void testCreateEntityRecord() {
        Long typeId = 1L;
        EntityRecord inputRecord = new EntityRecord();
        EntityRecord returnedRecord = new EntityRecord();
        returnedRecord.setId(100L);

        when(metadataService.createEntityRecord(typeId, inputRecord)).thenReturn(returnedRecord);

        ResponseEntity<EntityRecord> response = metadataController.createEntityRecord(typeId, inputRecord);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(returnedRecord, response.getBody());
        verify(metadataService).createEntityRecord(typeId, inputRecord);
    }
}
