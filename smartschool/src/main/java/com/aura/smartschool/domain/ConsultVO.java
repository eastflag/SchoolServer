package com.aura.smartschool.domain;

public class ConsultVO {
	private int consult_id;
	private int session_id;
	private int who;
	private String content;
	private String created;
	public int getConsult_id() {
		return consult_id;
	}
	public void setConsult_id(int consult_id) {
		this.consult_id = consult_id;
	}
	public int getSession_id() {
		return session_id;
	}
	public void setSession_id(int session_id) {
		this.session_id = session_id;
	}
	public int getWho() {
		return who;
	}
	public void setWho(int who) {
		this.who = who;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	
	
}
