package com.aura.smartschool.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

	public static String getFormatTime(String timeFormat ) {
		SimpleDateFormat formatter = new SimpleDateFormat (timeFormat);
		
		return formatter.format(new Date());
	}
	
	public static String getFormatTime(Date date, String timeFormat ) {
		SimpleDateFormat formatter = new SimpleDateFormat (timeFormat);
		
		return formatter.format(date);
	}
	
	public static Date getStringToDate(String date,String timeFormat){
		try {
		SimpleDateFormat formatter = new SimpleDateFormat (timeFormat);
			return formatter.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}
}
