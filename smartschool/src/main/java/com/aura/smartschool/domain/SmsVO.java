package com.aura.smartschool.domain;

public class SmsVO {

	private final String userId = "aurasystem ";
	private final String source = "32c8990212758a346a50acbe6a106ee0 ";
	
	private final static String sphone1 = "070";
	private final static String sphone2 = "4699";
	private final static String sphone3 = "3679";
	
	private String msg;
	private String rphone;
	private String smsType;			//메시지 타입: 단문:S, 장문:L
	private String testflag;		// 테스트시: Y, 기본값:1
	private String rdate;			//예약 날짜
	private String rtime;			//예약 시간
	private String subject;
	private String destination;
	private String repeatFlag;		//반복 설정,반복 설정을 원하는 경우 : Y, 반복하지 않을경우 입력 안함.
	private String repeatNum;		//반복 횟수,1~10회 가능.
	private String repeatTime;		//반복 시간,15분 이상부터 가능.
	private String returnurl;		//메시지 전송 후 이동할 페이지
	private String nointeractive;
	
	public String getUserId() {
		return userId;
	}
	public String getSource() {
		return source;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getRphone() {
		return rphone;
	}
	public void setRphone(String rphone) {
		this.rphone = rphone;
	}
	public String getSphone1() {
		return sphone1;
	}
	public String getSphone2() {
		return sphone2;
	}
	public String getSphone3() {
		return sphone3;
	}
	public String getSmsType() {
		return smsType;
	}
	public void setSmsType(String smsType) {
		this.smsType = smsType;
	}
	public String getTestflag() {
		return testflag;
	}
	public void setTestflag(String testflag) {
		this.testflag = testflag;
	}
	public String getRdate() {
		return rdate;
	}
	public void setRdate(String rdate) {
		this.rdate = rdate;
	}
	public String getRtime() {
		return rtime;
	}
	public void setRtime(String rtime) {
		this.rtime = rtime;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getDestination() {
		return destination;
	}
	public void setDestination(String destination) {
		this.destination = destination;
	}
	public String getRepeatFlag() {
		return repeatFlag;
	}
	public void setRepeatFlag(String repeatFlag) {
		this.repeatFlag = repeatFlag;
	}
	public String getRepeatNum() {
		return repeatNum;
	}
	public void setRepeatNum(String repeatNum) {
		this.repeatNum = repeatNum;
	}
	public String getRepeatTime() {
		return repeatTime;
	}
	public void setRepeatTime(String repeatTime) {
		this.repeatTime = repeatTime;
	}
	public String getReturnurl() {
		return returnurl;
	}
	public void setReturnurl(String returnurl) {
		this.returnurl = returnurl;
	}
	public String getNointeractive() {
		return nointeractive;
	}
	public void setNointeractive(String nointeractive) {
		this.nointeractive = nointeractive;
	}
}
