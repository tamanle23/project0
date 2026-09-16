package com.project0.repository.jpa;

import com.project0.domain.NamedModel;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface NamedModelBaseRepository<T extends NamedModel>
        extends BaseRepository<T> {
  @Modifying
  @Query("UPDATE #{#entityName} A SET A.deletedDate = ?#{T(com.project0.core.helper.DateTimeHelper).getCurrentDateTime()} WHERE A.code = ?1")
  Integer deleteByCode(String code);

  @Query("SELECT A FROM #{#entityName} A WHERE A.code=?1 AND A.deletedDate IS NULL AND (A.mode IS NULL OR A.mode = FINAL)")
  T findOneByCode(String code);

}
