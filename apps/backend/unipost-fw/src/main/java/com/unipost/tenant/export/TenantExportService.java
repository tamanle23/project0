package com.unipost.tenant.export;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unipost.domain.metadata.AttributeDefinition;
import com.unipost.domain.metadata.EntityRecord;
import com.unipost.domain.metadata.EntityRelationship;
import com.unipost.domain.metadata.EntityType;
import com.unipost.domain.metadata.RelationshipType;
import com.unipost.fw.tenancy.TenantContextHolder;
import com.unipost.repository.jpa.AttributeDefinitionRepository;
import com.unipost.repository.jpa.EntityRecordRepository;
import com.unipost.repository.jpa.EntityRelationshipRepository;
import com.unipost.repository.jpa.EntityTypeRepository;
import com.unipost.repository.jpa.RelationshipTypeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * Service for GDPR Article 20 data portability: chunked, non-blocking streaming export
 * of tenant metadata and data records directly into a ZIP archive.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TenantExportService {

    private final EntityTypeRepository entityTypeRepository;
    private final AttributeDefinitionRepository attributeDefinitionRepository;
    private final RelationshipTypeRepository relationshipTypeRepository;
    private final EntityRecordRepository entityRecordRepository;
    private final EntityRelationshipRepository entityRelationshipRepository;
    private final ObjectMapper objectMapper;

    private static final int CHUNK_SIZE = 1000;

    /**
     * Streams the complete tenant data archive directly to the provided OutputStream.
     */
    @Transactional(readOnly = true)
    public void streamTenantArchive(String tenantId, OutputStream targetOutputStream) throws IOException {
        String effectiveTenant = (tenantId != null && !tenantId.isBlank()) 
                ? tenantId.trim().toLowerCase() 
                : TenantContextHolder.getTenantId();

        log.info("Starting chunked streaming export for tenant '{}'", effectiveTenant);

        try (ZipOutputStream zipOut = new ZipOutputStream(targetOutputStream)) {
            // 1. Gather counts and schema definitions
            List<EntityType> entityTypes = entityTypeRepository.findByTenantIdAndDeletedDateIsNull(effectiveTenant);
            List<AttributeDefinition> attributes = attributeDefinitionRepository.findByTenantIdAndDeletedDateIsNull(effectiveTenant);
            List<RelationshipType> relTypes = relationshipTypeRepository.findByTenantIdAndDeletedDateIsNull(effectiveTenant);

            long totalRecords = entityRecordRepository.countByTenantIdAndDeletedDateIsNull(effectiveTenant);
            long totalRelationships = entityRelationshipRepository.countByTenantIdAndDeletedDateIsNull(effectiveTenant);

            // 2. Write manifest.json
            TenantExportManifest.ExportSummary summary = new TenantExportManifest.ExportSummary(
                    entityTypes.size(),
                    attributes.size(),
                    relTypes.size(),
                    totalRecords,
                    totalRelationships
            );
            TenantExportManifest manifest = TenantExportManifest.of(effectiveTenant, summary);
            writeZipEntry(zipOut, "manifest.json", objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(manifest));

            // 3. Write schemas
            writeZipEntry(zipOut, "schemas/entity_types.json", objectMapper.writeValueAsString(entityTypes));
            writeZipEntry(zipOut, "schemas/attribute_definitions.json", objectMapper.writeValueAsString(attributes));
            writeZipEntry(zipOut, "schemas/relationship_types.json", objectMapper.writeValueAsString(relTypes));

            // 4. Stream data/records.ndjson in chunks of 1,000 to maintain flat heap memory
            zipOut.putNextEntry(new ZipEntry("data/records.ndjson"));
            int pageNumber = 0;
            Page<EntityRecord> recordPage;
            do {
                recordPage = entityRecordRepository.findByTenantIdAndDeletedDateIsNull(
                        effectiveTenant, PageRequest.of(pageNumber, CHUNK_SIZE));
                for (EntityRecord record : recordPage.getContent()) {
                    String line = objectMapper.writeValueAsString(record) + "\n";
                    zipOut.write(line.getBytes(StandardCharsets.UTF_8));
                }
                zipOut.flush();
                pageNumber++;
            } while (recordPage.hasNext());
            zipOut.closeEntry();

            // 5. Stream data/entity_relationships.ndjson in chunks of 1,000
            zipOut.putNextEntry(new ZipEntry("data/entity_relationships.ndjson"));
            pageNumber = 0;
            Page<EntityRelationship> relPage;
            do {
                relPage = entityRelationshipRepository.findByTenantIdAndDeletedDateIsNull(
                        effectiveTenant, PageRequest.of(pageNumber, CHUNK_SIZE));
                for (EntityRelationship rel : relPage.getContent()) {
                    String line = objectMapper.writeValueAsString(rel) + "\n";
                    zipOut.write(line.getBytes(StandardCharsets.UTF_8));
                }
                zipOut.flush();
                pageNumber++;
            } while (relPage.hasNext());
            zipOut.closeEntry();

            zipOut.finish();
            log.info("Finished streaming export archive for tenant '{}' (records: {}, relationships: {})", 
                    effectiveTenant, totalRecords, totalRelationships);
        }
    }

    private void writeZipEntry(ZipOutputStream zipOut, String entryPath, String content) throws IOException {
        zipOut.putNextEntry(new ZipEntry(entryPath));
        zipOut.write(content.getBytes(StandardCharsets.UTF_8));
        zipOut.closeEntry();
    }
}
