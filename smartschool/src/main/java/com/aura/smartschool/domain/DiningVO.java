package com.aura.smartschool.domain;

public class DiningVO {
	private int dining_id;
	private int school_id;
	private String dining_date;
	private int category; //1:아침, 2: 점심, 3:저녁
	private String image;
	public int getDining_id() {
		return dining_id;
	}
	public void setDining_id(int dining_id) {
		this.dining_id = dining_id;
	}
	public int getSchool_id() {
		return school_id;
	}
	public void setSchool_id(int school_id) {
		this.school_id = school_id;
	}
	public String getDining_date() {
		return dining_date;
	}
	public void setDining_date(String dining_date) {
		this.dining_date = dining_date;
	}
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	
	
}
