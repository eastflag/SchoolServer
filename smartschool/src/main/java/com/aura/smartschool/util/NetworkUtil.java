package com.aura.smartschool.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Properties;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class NetworkUtil {
	
	private static final Executor threadPool = Executors.newFixedThreadPool(5);
	
	public static void requestGCM(final JsonArray reg_IDs, final JsonObject sendData) {
		threadPool.execute(new Runnable() {
			@Override
			public void run() {
				sendGCM(reg_IDs, sendData);
			}
		});
	}
	
	private static void sendGCM(JsonArray reg_IDs, JsonObject sendData) {
		
		JsonObject json = new JsonObject();
		Resource resource = new ClassPathResource("/app.properties");
		
		int RESPONSE_CODE = 0;
		HttpURLConnection http = null;
		PrintWriter writer = null;
		OutputStreamWriter out = null;
		BufferedReader reader = null;
		StringBuffer buffer = new StringBuffer("");
		String res = "";
		try {
			json.addProperty("time_to_live", 108);
			json.addProperty("delay_while_idle", false);
			json.addProperty("collapse_key", Long.toString(System.nanoTime()));
			json.add("registration_ids", reg_IDs);
			json.add("data", sendData);
			
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			URL url = new URL(props.getProperty("gcm.url"));
			http = (HttpURLConnection) url.openConnection();
			http.setDoInput(true);
			http.setDoOutput(true);
			http.setRequestMethod("POST");
			http.setUseCaches(false);
			http.setConnectTimeout(3000);
			http.setReadTimeout(3000);
			http.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
			http.setRequestProperty("Authorization", "key=" + props.getProperty("api.key"));
			out = new OutputStreamWriter(http.getOutputStream(), "UTF-8");
			writer = new PrintWriter(out);
			System.out.println("json:" + json.toString());
			writer.write(json.toString()); // 보내기
			writer.flush(); // 비우기
			writer.close(); // 닫기

			RESPONSE_CODE = http.getResponseCode();
			if (RESPONSE_CODE != 200) {
				res = "network error";
			}
			if (RESPONSE_CODE == HttpURLConnection.HTTP_OK) {
				reader = new BufferedReader(new InputStreamReader(http.getInputStream(), "utf-8"));
				String line = null;
				while ((line = reader.readLine()) != null) {
					buffer.append(line + "\n");
				}
				res = buffer.toString();
			}
			System.out.println(res);
		} catch (IOException e) {
			e.getMessage();
		} catch (Exception e) {
			e.getMessage();
		} finally {
			if (reader != null)
			{
				try {
					reader.close();
				} catch (Exception e) {
				}
			}
			if (out != null) {
				try {
					out.close();
				} catch (Exception e) {
				}
			}
			if (writer != null) {
				try {
					writer.close();
				} catch (Exception e) {
				}
			}
		}
	}

}
