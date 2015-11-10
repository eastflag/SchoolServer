package com.aura.smartschool.domain;

public class LocationAccessVO {
	private int location_access_id;
	private int child_id;
	private int parent_id;
	private String created;
	
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
	
	
}
