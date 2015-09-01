package com.aura.smartschool.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.security.Key;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;

import com.aura.smartschool.domain.ManagerVO;
import com.aura.smartschool.domain.TokenVO;

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
	
	public static boolean doFindMobileDevice(String target, HttpServletRequest request) {
		Pattern p = Pattern.compile(target.toLowerCase());
		Matcher m = p.matcher(request.getHeader("User-Agent").toLowerCase());

		return m.find();
	}
	
	public static String createJWT(String id, String issuer, String subject, long ttlMillis) {
		//The JWT signature algorithm we will be using to sign the token
		SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

		long nowMillis = System.currentTimeMillis();
		Date now = new Date(nowMillis);

		//We will sign our JWT with our ApiKey secret
		byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary("superKey");
		Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

		  //Let's set the JWT Claims
		JwtBuilder builder = Jwts.builder().setId(id)
		                                .setIssuedAt(now)
		                                .setSubject(subject)
		                                .setIssuer(issuer)
		                                .signWith(signatureAlgorithm, signingKey);

		 //if it has been specified, let's add the expiration
		if (ttlMillis >= 0) {
		    long expMillis = nowMillis + ttlMillis;
		    Date exp = new Date(expMillis);
		    builder.setExpiration(exp);
		}

		 //Builds the JWT and serializes it to a compact, URL-safe string
		return builder.compact();
	}
	
	public static TokenVO parseJWT(String jwt) {
		//This line will throw an exception if it is not a signed JWS (as expected)
		Claims claims = Jwts.parser()         
		   .setSigningKey(DatatypeConverter.parseBase64Binary("superKey"))
		   .parseClaimsJws(jwt).getBody();
		
		//System.out.println("ID: " + claims.getId());
		//System.out.println("Subject: " + claims.getSubject());
		//System.out.println("Issuer: " + claims.getIssuer());
		//System.out.println("Expiration: " + claims.getExpiration());
		
		boolean isExpired = System.currentTimeMillis() > claims.getExpiration().getTime() ? true : false;
		System.out.println("expired:" + isExpired);
		
		TokenVO tokenVO = new TokenVO();
		tokenVO.setId(claims.getId());
		tokenVO.setIssuer(claims.getIssuer());
		tokenVO.setSubject(claims.getSubject());
		tokenVO.setIssuedAt(claims.getIssuedAt());
		tokenVO.setExpired(isExpired);
		
		return tokenVO;

	}
}
