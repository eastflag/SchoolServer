package com.aura.smartschool.domain;

public class VideoTimeVO {
	private int video_time_id;
	private int member_id;
	private String access_time;
	public int getVideo_time_id() {
		return video_time_id;
	}
	public void setVideo_time_id(int video_time_id) {
		this.video_time_id = video_time_id;
	}
	public int getMember_id() {
		return member_id;
	}
	public void setMember_id(int member_id) {
		this.member_id = member_id;
	}
	public String getAccess_time() {
		return access_time;
	}
	public void setAccess_time(String access_time) {
		this.access_time = access_time;
	}
	
	
}
