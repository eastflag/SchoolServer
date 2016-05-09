package com.aura.smartschool.domain;

import lombok.Data;

@Data
public class PayVO {
	private int pay_id;
	private int member_id;
	private String pay_date;
	private String mxIssueNo;
	private int goods_id;
}
