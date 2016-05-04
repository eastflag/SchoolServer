package com.aura.smartschool.domain;

public class PayInfoVO {
	private int pay_id;
	private int member_id;
	private String pay_date;
	private String mxIssueNo;		//가맹점 자체주문번호
	private int goods_id;			//결제상품 고유번호
	private String goods_name;		//상품명
	private String goods_price;		//가격
	private int goods_days;			//이용기간
	private int remain_days;		//남은기간
	private String payMethod;		//결제방법

	public int getPay_id() {
		return pay_id;
	}
	public void setPay_id(int pay_id) {
		this.pay_id = pay_id;
	}
	public int getMember_id() {
		return member_id;
	}
	public void setMember_id(int member_id) {
		this.member_id = member_id;
	}
	public String getPay_date() {
		return pay_date;
	}
	public void setPay_date(String pay_date) {
		this.pay_date = pay_date;
	}
	public String getMxIssueNo() {
		return mxIssueNo;
	}
	public void setMxIssueNo(String mxIssueNo) {
		this.mxIssueNo = mxIssueNo;
	}
	public int getGoods_id() {
		return goods_id;
	}
	public void setGoods_id(int goods_id) {
		this.goods_id = goods_id;
	}
	public String getGoods_name() {
		return goods_name;
	}
	public void setGoods_name(String goods_name) {
		this.goods_name = goods_name;
	}
	public String getGoods_price() {
		return goods_price;
	}
	public void setGoods_price(String goods_price) {
		this.goods_price = goods_price;
	}
	public int getGoods_days() {
		return goods_days;
	}
	public void setGoods_days(int goods_days) {
		this.goods_days = goods_days;
	}
	public int getRemain_days() {
		return remain_days;
	}
	public void setRemain_days(int remain_days) {
		this.remain_days = remain_days;
	}
	public String getPayMethod() {
		return payMethod;
	}
	public void setPayMethod(String payMethod) {
		this.payMethod = payMethod;
	}
}
