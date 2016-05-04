package com.aura.smartschool.domain;

public class PaymentReturnVO {

	private String code;
	private String message;
	private String fdtid;
	private String mxid;
	private String mxissueno;
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getFdtid() {
		return fdtid;
	}
	public void setFdtid(String fdtid) {
		this.fdtid = fdtid;
	}
	public String getMxid() {
		return mxid;
	}
	public void setMxid(String mxid) {
		this.mxid = mxid;
	}
	public String getMxissueno() {
		return mxissueno;
	}
	public void setMxissueno(String mxissueno) {
		this.mxissueno = mxissueno;
	}
}
