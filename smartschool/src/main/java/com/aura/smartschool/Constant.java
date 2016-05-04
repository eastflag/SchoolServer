package com.aura.smartschool;

public final class Constant {
	public final static int SESSION_TIMEOUT = 1000 * 60 * 60; //60minutes
	public final static String Weight = "Weight"; 
	public final static String Height = "Height";
	public final static String BMI = "BMI";
	public final static String Muscle = "Muscle";
	public final static String Fat = "Fat";
	
	//아이폰 key store
	public final static String IOS_PASSWORD = "aura!@";
	public final static String IOS_KEY_STORE_REAL = "C:/web/git/SchoolServer/smartschool/APNS/apns_real.p12";
	public final static String IOS_KEY_STORE_DEVL = "C:/web/git/SchoolServer/smartschool/APNS/apns_dev.p12";
	
	//결제 변수
	public final static String KEY_DATA = "6aMoJujE34XnL9gvUqdKGMqs9GzYaNo6";			//가맹점 배포 PASSKEY 입력
	public final static String FDK_SEND_URL = "https://testps.firstpay.co.kr/jsp/common/req.jsp";		//FDK 요청 URL
}
