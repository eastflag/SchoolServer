package com.aura.smartschool.domain;

public class SearchVO {
	private String search_value;
	private int start_index;
	private int page_size;
	private int total_count;
	
	public String getSearch_value() {
		return search_value;
	}
	public void setSearch_value(String search_value) {
		this.search_value = search_value;
	}
	public int getStart_index() {
		return start_index;
	}
	public void setStart_index(int start_index) {
		this.start_index = start_index;
	}
	public int getPage_size() {
		return page_size;
	}
	public void setPage_size(int page_size) {
		this.page_size = page_size;
	}
	public int getTotal_count() {
		return total_count;
	}
	public void setTotal_count(int total_count) {
		this.total_count = total_count;
	}
}
