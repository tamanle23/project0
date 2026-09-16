package com.project0.resources.core;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class Base<V> {

  /** The constant fields to hold all loading enum values */
  @SuppressWarnings("rawtypes")
  private static final Map<Class,Map<String, ?>> ELEMENTS = new LinkedHashMap<>();
  
  private String key;
  private String description;
  
  public Function<V,String> getCombiKeyFactory() {
    return null;
  };

  /**
   * Find all utility method
   *
   * @param <V> the value type
   * @param clazz the clazz
   * @param predicate the predicate
   * @return the list
   */
  public static<V> List<V> findAll(Class<V> clazz, Predicate<V> predicate) {
    return Optional.ofNullable(ELEMENTS.get(clazz))
                    .map(Map::values)
                    .map(Collection::stream)
                    .orElse(Stream.empty())
                    .map(clazz::cast)
                    .filter(predicate)
                    .collect(Collectors.toList());
  }
  
  /**
   * Find first utility method.
   *
   * @param <V> the value type
   * @param clazz the clazz
   * @param predicate the predicate
   * @return the optional
   */
  public static<V> Optional<V> findFirst(Class<V> clazz, Predicate<V> predicate) {
    return Optional.ofNullable(ELEMENTS.get(clazz))
                    .map(Map::values)
                    .map(Collection::stream)
                    .orElse(Stream.empty())
                    .map(clazz::cast)
                    .filter(predicate)
                    .findFirst();
  }
  
  /**
   * Method to load enum data
   *
   * @param <V> the value type
   * @param clazz the clazz
   * @param transactionStatuses the transaction statuses
   */
  public static synchronized <V extends Base>void load(Class<V> clazz, List<V> transactionStatuses) {
    Base.ELEMENTS.remove(clazz);
    Map<String, V> enums = new LinkedHashMap<>();
    Base.ELEMENTS.put(clazz, enums);
    if(CollectionUtils.isNotEmpty(transactionStatuses)) {
      transactionStatuses.forEach(d -> enums.put(d.getKey(), d));
    }
  }
  
  /**
   * Default valueOf method to get enum based on class type and key
   *
   * @param <V> the value type
   * @param clazz the clazz
   * @param key the key
   * @return the optional
   */
  public static <V>Optional<V> valueOf(Class<V> clazz, String key) {
    return Optional.ofNullable(clazz)
                   .map(ELEMENTS::get)
                   .map(m -> m.get(key))
                   .map(clazz::cast);
  }
  
  /**
   * Utility method to fast get enum description based on class and enum key
   *
   * @param <V> the value type
   * @param clazz the clazz
   * @param key the key
   * @return the description
   */
  public static <V extends Base>String getDescription(Class<V> clazz, String key) {
    return Optional.ofNullable(ELEMENTS.get(clazz))
                   .map(m -> m.get(StringUtils.upperCase(key)))
                   .map(clazz::cast)
                   .map(Base::getDescription)
                   .orElse(key);
  }

  /**
   * Use this method to get all enum values
   *
   * @param <V> the value type
   * @param clazz the clazz
   * @return the list
   */
  public static <V extends Base>List<V> values(Class<V> clazz) {
    return Optional.ofNullable(clazz)
                   .map(ELEMENTS::get)
                   .map(Map::values)
                   .map(Collection::stream)
                   .orElse(Stream.empty())
                   .map(clazz::cast)
                   .collect(Collectors.toList());
  }
}
