package com.aura.smartschool.domain;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class MagazineVO {

	private int magazine_id;
	private String year;
	private String month;
	private String title;
	private String subTitle;
	private String subject;
	private String content;
	private String img_1;
	private String img_2;
	private String img_3;
	private String img_4;
	private String img_5;
	private String img_6;
	private String img_7;
	private String img_8;
	private String img_9;
	private String img_10;
	private String created;
	private String updated;
	
	private List<MultipartFile> files;
	
	public int getMagazine_id() {
		return magazine_id;
	}
	public void setMagazine_id(int magazine_id) {
		this.magazine_id = magazine_id;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSubTitle() {
		return subTitle;
	}
	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getImg_1() {
		return img_1;
	}
	public void setImg_1(String img_1) {
		this.img_1 = img_1;
	}
	public String getImg_2() {
		return img_2;
	}
	public void setImg_2(String img_2) {
		this.img_2 = img_2;
	}
	public String getImg_3() {
		return img_3;
	}
	public void setImg_3(String img_3) {
		this.img_3 = img_3;
	}
	public String getImg_4() {
		return img_4;
	}
	public void setImg_4(String img_4) {
		this.img_4 = img_4;
	}
	public String getImg_5() {
		return img_5;
	}
	public void setImg_5(String img_5) {
		this.img_5 = img_5;
	}
	public String getImg_6() {
		return img_6;
	}
	public void setImg_6(String img_6) {
		this.img_6 = img_6;
	}
	public String getImg_7() {
		return img_7;
	}
	public void setImg_7(String img_7) {
		this.img_7 = img_7;
	}
	public String getImg_8() {
		return img_8;
	}
	public void setImg_8(String img_8) {
		this.img_8 = img_8;
	}
	public String getImg_9() {
		return img_9;
	}
	public void setImg_9(String img_9) {
		this.img_9 = img_9;
	}
	public String getImg_10() {
		return img_10;
	}
	public void setImg_10(String img_10) {
		this.img_10 = img_10;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	public String getUpdated() {
		return updated;
	}
	public void setUpdated(String updated) {
		this.updated = updated;
	}
	public List<MultipartFile> getFiles() {
		return files;
	}
	public void setFiles(List<MultipartFile> files) {
		this.files = files;
	}
}
