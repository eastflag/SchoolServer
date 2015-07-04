package com.aura.smartschool.util;

public class CommonUtil {
	//get School grade id : 1 ~ 12
	public static String getGradeId(String grade, String gubun2) {
		try {
			int gradeId = Integer.parseInt(grade);
			if(gubun2.startsWith("중학")) {
				gradeId += 6;
			} else if (gubun2.startsWith("고등")) {
				gradeId += 9;
			}
			
			if(gradeId > 12) {
				gradeId = 12;
			}
			if(gradeId <=0) {
				gradeId = 1;
			}
			
			return  String.valueOf(gradeId);
		} catch (NumberFormatException e) {
			return grade;
		} 
	}
}
