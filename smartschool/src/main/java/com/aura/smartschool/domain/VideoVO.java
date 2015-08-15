package com.aura.smartschool.domain;

import java.io.Serializable;

public class VideoVO implements Serializable {
	
	private static final long serialVersionUID = 2028192438262741373L;
	
	String thumbnailUrl = "";
	String videoUrl = "";
	String title = "";
	String duration = "0";
	
	public String getThumbnailUrl() {
		return thumbnailUrl;
	}
	public void setThumbnailUrl(String thumbnailUrl) {
		this.thumbnailUrl = thumbnailUrl;
	}
	public String getVideoUrl() {
		return videoUrl;
	}
	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	
}
