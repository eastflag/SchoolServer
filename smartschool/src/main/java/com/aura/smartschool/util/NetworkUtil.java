package com.aura.smartschool.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.util.StringUtils;

import com.aura.smartschool.Constant;
import com.aura.smartschool.controller.ApiController;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import javapns.Push;
import javapns.communication.exceptions.CommunicationException;
import javapns.communication.exceptions.KeystoreException;
import javapns.devices.Device;
import javapns.devices.Devices;
import javapns.notification.PayloadPerDevice;
import javapns.notification.PushNotificationPayload;

public class NetworkUtil {
	
	private static Logger logger = LoggerFactory.getLogger(ApiController.class);
	
	private static final Executor threadPool = Executors.newFixedThreadPool(5);
	
	public static void requestGCM(final JsonArray reg_IDs, final JsonObject sendData) {
		if (reg_IDs.size() == 0) {
			return;
		}
		
		threadPool.execute(new Runnable() {
			@Override
			public void run() {
				sendGCM(reg_IDs, sendData);
			}
		});
	}
	
	private static void sendGCM(JsonArray reg_IDs, JsonObject sendData) {
		logger.debug("send GCM: " + sendData.toString());
		
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
	
	public static void requestAPNS(final List<String> tokens, final String message, final Map<String, String> extra) {
		if (tokens.size() == 0) {
			return;
		}
		
		threadPool.execute(new Runnable() {
			@Override
			public void run() {
				sendAPNS(tokens, message, extra);
			}
		});
	}
	
	private static void sendAPNS(List<String> tokens, String message, Map<String, String> extra) {
		List<Device> devices = Devices.asDevices(tokens);
		//String keystore = Constant.IOS_KEY_STORE_REAL;
		String keystore = Constant.IOS_KEY_STORE_DEVL;
		String password = Constant.IOS_PASSWORD;
		
		Integer badge = 1;
		String sound = null;
		boolean production = true;
		
		try {
			List<PayloadPerDevice> payloadDevicePairs = new ArrayList<PayloadPerDevice>();
			for (Device each : devices) {
				PayloadPerDevice payloadPerDevice = new PayloadPerDevice(customPayload(message, badge, sound, extra), each);
				payloadDevicePairs.add(payloadPerDevice);
			}
			Push.payloads(keystore, password, production, payloadDevicePairs);
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (CommunicationException e) {
			e.printStackTrace();
		} catch (KeystoreException e) {
			e.printStackTrace();
		}
	}

	
	private static PushNotificationPayload customPayload(String message
			, Integer badge, String sound, Map<String, String> extra) throws JSONException {
		PushNotificationPayload payload = PushNotificationPayload.complex();
		if (!StringUtils.isEmpty(message)) {
			payload.addAlert(message);
		}
		if (badge != null) {
			payload.addBadge(badge);
		}
		if (StringUtils.isEmpty(sound)) sound = "default";
		payload.addSound(sound);
		if (extra != null && !extra.isEmpty()) {
			Object[] keys = extra.keySet().toArray();
			Object[] vals = extra.values().toArray();
			if (keys != null && vals != null && keys.length == vals.length) {
				for (int i = 0; i < extra.size(); i++) {
					payload.addCustomDictionary(String.valueOf(keys[i]), String.valueOf(vals[i]));
				}
			}
		}
		return payload;
	}
}
