package com.aura.smartschool.domain;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class PressVO {
	private int press_id;
	private String title;
	private String content;
	private String created;
	
	private List<AttachVO> list;
	
	private List<MultipartFile> files;
	
	public int getPress_id() {
		return press_id;
	}
	public void setPress_id(int press_id) {
		this.press_id = press_id;
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
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	public List<AttachVO> getList() {
		return list;
	}
	public void setList(List<AttachVO> list) {
		this.list = list;
	}
	public List<MultipartFile> getFiles() {
		return files;
	}
	public void setFiles(List<MultipartFile> files) {
		this.files = files;
	}

}
