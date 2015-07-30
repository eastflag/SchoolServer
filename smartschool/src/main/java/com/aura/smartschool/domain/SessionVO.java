package com.aura.smartschool.domain;

public class SessionVO {
	private int session_id;
	private int member_id;
	private int category;
	private int rate;
	private String created;
	private String ended;
	
	private String content;
	private int who;
	
	public int getSession_id() {
		return session_id;
	}
	public void setSession_id(int session_id) {
		this.session_id = session_id;
	}
	public int getMember_id() {
		return member_id;
	}
	public void setMember_id(int member_id) {
		this.member_id = member_id;
	}
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}
	public int getRate() {
		return rate;
	}
	public void setRate(int rate) {
		this.rate = rate;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	public String getEnded() {
		return ended;
	}
	public void setEnded(String ended) {
		this.ended = ended;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getWho() {
		return who;
	}
	public void setWho(int who) {
		this.who = who;
	}
}
