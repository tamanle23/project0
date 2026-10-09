package com.unipost.tenant.export;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unipost.domain.metadata.AttributeDefinition;
import com.unipost.domain.metadata.EntityRecord;
import com.unipost.domain.metadata.EntityRelationship;
import com.unipost.domain.metadata.EntityType;
import com.unipost.domain.metadata.RelationshipType;
import com.unipost.repository.jpa.AttributeDefinitionRepository;
import com.unipost.repository.jpa.EntityRecordRepository;
import com.unipost.repository.jpa.EntityRelationshipRepository;
import com.unipost.repository.jpa.EntityTypeRepository;
import com.unipost.repository.jpa.RelationshipTypeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TenantExportServiceTest {

    @Mock
    private EntityTypeRepository entityTypeRepository;
    @Mock
    private AttributeDefinitionRepository attributeDefinitionRepository;
    @Mock
    private RelationshipTypeRepository relationshipTypeRepository;
    @Mock
    private EntityRecordRepository entityRecordRepository;
    @Mock
    private EntityRelationshipRepository entityRelationshipRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private TenantExportService exportService;

    @BeforeEach
    void setUp() {
        exportService = new TenantExportService(
                entityTypeRepository,
                attributeDefinitionRepository,
                relationshipTypeRepository,
                entityRecordRepository,
                entityRelationshipRepository,
                objectMapper
        );
    }

    @Test
    @DisplayName("Streaming export writes valid ZIP archive with manifest, schemas, and NDJSON records")
    void testStreamingExportCreatesValidZip() throws IOException {
        String tenantId = "test-export-tenant";

        EntityType entityType = new EntityType();
        entityType.setId(1L);
        entityType.setSystemName("article");
        entityType.setName("Article");
        entityType.setTenantId(tenantId);

        AttributeDefinition attr = new AttributeDefinition();
        attr.setId(10L);
        attr.setSystemName("title");
        attr.setName("Title");
        attr.setDataType("string");
        attr.setTenantId(tenantId);

        EntityRecord record = new EntityRecord();
        record.setId(100L);
        record.setTenantId(tenantId);
        record.setEntityType(entityType);
        record.setAttributes(Map.of("title", "Hello World"));

        when(entityTypeRepository.findByTenantIdAndDeletedDateIsNull(tenantId))
                .thenReturn(List.of(entityType));
        when(attributeDefinitionRepository.findByTenantIdAndDeletedDateIsNull(tenantId))
                .thenReturn(List.of(attr));
        when(relationshipTypeRepository.findByTenantIdAndDeletedDateIsNull(tenantId))
                .thenReturn(List.of());

        when(entityRecordRepository.countByTenantIdAndDeletedDateIsNull(tenantId))
                .thenReturn(1L);
        when(entityRelationshipRepository.countByTenantIdAndDeletedDateIsNull(tenantId))
                .thenReturn(0L);

        when(entityRecordRepository.findByTenantIdAndDeletedDateIsNull(eq(tenantId), any(PageRequest.class)))
                .thenReturn(new PageImpl<>(List.of(record)));
        when(entityRelationshipRepository.findByTenantIdAndDeletedDateIsNull(eq(tenantId), any(PageRequest.class)))
                .thenReturn(new PageImpl<>(List.of()));

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        exportService.streamTenantArchive(tenantId, baos);

        byte[] zipBytes = baos.toByteArray();
        assertTrue(zipBytes.length > 0, "ZIP bytes must not be empty");

        // Inspect ZIP contents
        Map<String, String> entries = new HashMap<>();
        try (ZipInputStream zis = new ZipInputStream(new ByteArrayInputStream(zipBytes))) {
            ZipEntry entry;
            while ((entry = zis.getNextEntry()) != null) {
                ByteArrayOutputStream entryContent = new ByteArrayOutputStream();
                byte[] buffer = new byte[1024];
                int len;
                while ((len = zis.read(buffer)) > 0) {
                    entryContent.write(buffer, 0, len);
                }
                entries.put(entry.getName(), entryContent.toString(StandardCharsets.UTF_8));
                zis.closeEntry();
            }
        }

        // Validate presence of required bundle files
        assertTrue(entries.containsKey("manifest.json"));
        assertTrue(entries.containsKey("schemas/entity_types.json"));
        assertTrue(entries.containsKey("schemas/attribute_definitions.json"));
        assertTrue(entries.containsKey("schemas/relationship_types.json"));
        assertTrue(entries.containsKey("data/records.ndjson"));
        assertTrue(entries.containsKey("data/entity_relationships.ndjson"));

        // Validate manifest content
        String manifestJson = entries.get("manifest.json");
        assertTrue(manifestJson.contains("\"tenantId\" : \"test-export-tenant\""));
        assertTrue(manifestJson.contains("\"entityTypesCount\" : 1"));
        assertTrue(manifestJson.contains("\"recordsCount\" : 1"));

        // Validate NDJSON record content
        String recordsNdjson = entries.get("data/records.ndjson");
        assertTrue(recordsNdjson.contains("Hello World"));
    }
}
