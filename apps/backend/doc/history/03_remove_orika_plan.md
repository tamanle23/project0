# Implementation Plan: Remove Orika Mapping Library

Remove the legacy Orika mapping library (`ma.glasnost.orika`) completely from `unipost` in favor of MapStruct, which is already the standard mapper in the project.

## User Review Required
> [!NOTE]
> Detailed inspection revealed that Orika is only referenced in 2 source files in `unipost-fw` (`BeanMapperContextAware.java` and `CommonController.java`) and 1 dependency declaration in `unipost-fw/pom.xml`. No controllers or services in any microservice actually use `mapper.map(...)`; MapStruct is already used where mapping is needed.

## Proposed Changes

### `unipost-fw`

#### [DELETE] [BeanMapperContextAware.java](file:///c:/Users/Admin/workspace/git/prjz/unipost-fw/src/main/java/com/unipost/fw/mapper/BeanMapperContextAware.java)
- Delete the entire Orika `FactoryBean<MapperFacade>` and Spring configuration class.

#### [MODIFY] [CommonController.java](file:///c:/Users/Admin/workspace/git/prjz/unipost-fw/src/main/java/com/unipost/fw/CommonController.java)
- Remove unused `import ma.glasnost.orika.MapperFacade;`
- Remove unused field `@Inject protected MapperFacade mapper;`

#### [MODIFY] [pom.xml](file:///c:/Users/Admin/workspace/git/prjz/unipost-fw/pom.xml)
- Remove dependency `ma.glasnost.orika:orika-core:1.5.1`.

## Verification Plan
### Automated Compilation & Tests
- Compile `unipost-fw` and dependent modules:
  ```powershell
  .\mvnw.cmd test-compile
  ```
- Verify zero references to `orika` remain across the entire codebase.
