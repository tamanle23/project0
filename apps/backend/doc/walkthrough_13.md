# Walkthrough 13: Implement Liquibase Context Profiling for Mock Data

## Fix Details
Removed `context` attribute from the `<include>` tag in `changelog-master.xml` as Liquibase 3.4 XML Schema (XSD) restricts `<include>` attributes to `file` and `relativeToChangelogFile`.

Context filtering is correctly defined directly on the `<changeSet>` element in `changelog-mock_data.xml` and enforced via `spring.liquibase.contexts` in `application.yml`.

## Changes Made
1. **[changelog-master.xml](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-db/src/main/resources/db/identity/changelog-master.xml)**:
   - Cleaned `<include file="db/identity/changelog-mock_data.xml" />` (valid XSD element).

2. **[changelog-mock_data.xml](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-db/src/main/resources/db/identity/changelog-mock_data.xml)**:
   - Configured `context="dev, test, local, mock"` on `<changeSet id="changelog-${schema}-mock_data" ...>`.

3. **[application.yml](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-db/src/main/resources/application.yml)**:
   - Added `spring.liquibase.contexts: ${LIQUIBASE_CONTEXTS:dev,test,local}` so Spring Boot passes dev/test/local contexts locally.
