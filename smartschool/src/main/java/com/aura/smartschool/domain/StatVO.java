package com.aura.smartschool.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class StatVO {
	private String sido;
	private String gugun;
	private String gubun2; //초등학교, 중학교, 고등학교
	private String school_id;
	private String school_address;
	private String school_name;
	private String school_grade;	
	private String school_class;
	private String sex;
	
	private String output;
	private String section;
	private String measure_date;
	
	private String val;
	private String height;
	private String weight;
	private String ppm;
	private String smoke;
	private String bmi;
	private String bmi_desc;
	private String output_date;
	private String count;
	private String percent;

	private String name;
	
	@JsonProperty
	private boolean group_school;
	@JsonProperty
	private boolean group_sex;
}
