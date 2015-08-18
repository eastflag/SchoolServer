package com.aura.smartschool.domain;

public class SchoolNotiVO {
	private int noti_seq;
	private int school_id;
	private int category; //1:가정통신문 2:공지사항 3:일정
	private String title;
	private String content;
	private String noti_date;
	
	private int start_index;
	private int page_size;
	
	private int member_id;
	
	public int getNoti_seq() {
		return noti_seq;
	}
	public void setNoti_seq(int noti_seq) {
		this.noti_seq = noti_seq;
	}
	public int getSchool_id() {
		return school_id;
	}
	public void setSchool_id(int school_id) {
		this.school_id = school_id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getNoti_date() {
		return noti_date;
	}
	public void setNoti_date(String noti_date) {
		this.noti_date = noti_date;
	}
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
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
	public int getMember_id() {
		return member_id;
	}
	public void setMember_id(int member_id) {
		this.member_id = member_id;
	}

	
}
