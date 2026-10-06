package com.acc.aibackend.domain;

import java.util.List;
import java.util.Map;

public class LayoutSpec {

    private String layoutId;
    private String theme;
    private String title;
    private List<Map<String, Object>> components;
    private Map<String, Object> metadata;

    public LayoutSpec() {
    }

    public LayoutSpec(String layoutId, String theme, String title, List<Map<String, Object>> components, Map<String, Object> metadata) {
        this.layoutId = layoutId;
        this.theme = theme;
        this.title = title;
        this.components = components;
        this.metadata = metadata;
    }

    public String getLayoutId() {
        return layoutId;
    }

    public void setLayoutId(String layoutId) {
        this.layoutId = layoutId;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Map<String, Object>> getComponents() {
        return components;
    }

    public void setComponents(List<Map<String, Object>> components) {
        this.components = components;
    }

    public Map<String, Object> getMetadata() {
        return metadata;
    }

    public void setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
    }
}
