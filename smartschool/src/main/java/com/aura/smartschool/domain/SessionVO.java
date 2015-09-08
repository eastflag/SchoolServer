package com.aura.smartschool.domain;

public class SessionVO extends SearchVO{
	private int session_id;
	private int member_id;
	private int category;
	private int rate;
	private String created;
	private String ended;
	
	private String school_name;
	private String name;
	private String school_class;
	private String school_grade;
	
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
	public String getSchool_name() {
		return school_name;
	}
	public void setSchool_name(String school_name) {
		this.school_name = school_name;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSchool_class() {
		return school_class;
	}
	public void setSchool_class(String school_class) {
		this.school_class = school_class;
	}
	public String getSchool_grade() {
		return school_grade;
	}
	public void setSchool_grade(String school_grade) {
		this.school_grade = school_grade;
	}
	
	
}
