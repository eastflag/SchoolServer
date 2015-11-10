package com.aura.smartschool.domain;

public class LocationAccessVO {
	private int location_access_id;
	private int child_id;
	private int parent_id;
	private String created;
	
	private String viewee_name; //정보 제공자 이름
	private String viewee_mdn;  //정보 제공자 전화번호
	private String viewer_name; //제공 받는자 이름
	
	public int getLocation_access_id() {
		return location_access_id;
	}
	public void setLocation_access_id(int location_access_id) {
		this.location_access_id = location_access_id;
	}
	public int getChild_id() {
		return child_id;
	}
	public void setChild_id(int child_id) {
		this.child_id = child_id;
	}
	public int getParent_id() {
		return parent_id;
	}
	public void setParent_id(int parent_id) {
		this.parent_id = parent_id;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	public String getViewee_name() {
		return viewee_name;
	}
	public void setViewee_name(String viewee_name) {
		this.viewee_name = viewee_name;
	}
	public String getViewee_mdn() {
		return viewee_mdn;
	}
	public void setViewee_mdn(String viewee_mdn) {
		this.viewee_mdn = viewee_mdn;
	}
	public String getViewer_name() {
		return viewer_name;
	}
	public void setViewer_name(String viewer_name) {
		this.viewer_name = viewer_name;
	}
	
	
}
