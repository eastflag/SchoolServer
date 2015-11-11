package com.aura.smartschool.domain;

public class AdminAccessVO {
	private int admin_access_id;
	private String login_id;
	private String access_ip;
	private String created;
	
	public int getAdmin_access_id() {
		return admin_access_id;
	}
	public void setAdmin_access_id(int admin_access_id) {
		this.admin_access_id = admin_access_id;
	}
	public String getLogin_id() {
		return login_id;
	}
	public void setLogin_id(String login_id) {
		this.login_id = login_id;
	}
	public String getAccess_ip() {
		return access_ip;
	}
	public void setAccess_ip(String access_ip) {
		this.access_ip = access_ip;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
}
