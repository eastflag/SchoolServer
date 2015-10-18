package com.aura.smartschool.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.AbstractView;

import com.aura.smartschool.domain.AttachVO;

public class FileUtil {

	/**
	 * 단건 파일 업로드
	 * @param file
	 * @param path
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	public static String fileUpload(MultipartFile file, String path) throws IllegalStateException, IOException{
		String uploadFileName = null;
		File dir = new File(path);
		
		//디렉토리 생성
		if(!dir.isDirectory()){
			dir.mkdirs();
		}
		if(!file.isEmpty()){
			String originalFileName = file.getOriginalFilename();
			String extention = originalFileName.substring(originalFileName.lastIndexOf(".")+1).toLowerCase();
			uploadFileName = doMakeUniqueFileName(path,extention);
			
			File saveFile = new File(path, uploadFileName);
			file.transferTo(saveFile);
		}
		return uploadFileName;
	}
	
	/**
	 * 멀티 파일 업로드
	 * @param files
	 * @param path
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	public static List<AttachVO> fileUpload(List<MultipartFile> files, String path) throws IllegalStateException, IOException{
		List<AttachVO> list = new ArrayList<AttachVO>();
		File dir = new File(path);
		
		//디렉토리 생성
		if(!dir.isDirectory()){
			dir.mkdirs();
		}
		
		//첨부파일 등록
		for(int i=0;i<files.size();i++){
			if(!files.get(i).isEmpty()){
				String originalFileName = files.get(i).getOriginalFilename();
				String extention = originalFileName.substring(originalFileName.lastIndexOf(".")+1).toLowerCase();
				String uploadFileName = doMakeUniqueFileName(path,extention);
				
				File saveFile = new File(path, uploadFileName);
				files.get(i).transferTo(saveFile);

				AttachVO attach = new AttachVO();
				attach.setOrg_name(originalFileName);
				attach.setUpd_name(uploadFileName);
				
				list.add(attach);
			}
		}
		return list;
	}
	
	/**
	 * 멀티 파일 업로드[원본 이름으로 저장]
	 * @param files
	 * @param path
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	public static void fileUploadOriginalName(List<MultipartFile> files, String path) throws IllegalStateException, IOException{
		File dir = new File(path);
		
		//디렉토리 생성
		if(!dir.isDirectory()){
			dir.mkdirs();
		}
		
		//첨부파일 등록
		for(int i=0;i<files.size();i++){
			if(!files.get(i).isEmpty()){
				String originalFileName = files.get(i).getOriginalFilename();
				File saveFile = new File(path, originalFileName);
				files.get(i).transferTo(saveFile);
			}
		}
	}

	public static boolean deleteFile(AttachVO attach) {
		String path = attach.getPath();
		String name = attach.getUpd_name();
		
		File f = new File(path, name);
		return f.delete();
	}
	
	public static String doMakeUniqueFileName(String path, String extension) {
		String uniqueFileName = null;
		boolean flag = true;
		while (flag) {
			uniqueFileName = getUniqueFileName();
			flag = doCheckFileExists(path,uniqueFileName+"."+extension);
		}
		return uniqueFileName+"."+extension;
	}
	
	private static boolean doCheckFileExists(String path, String filename) {
		return new File(path,filename).exists();
	}
	
	private static String getUniqueFileName() {
		return  UUID.randomUUID().toString();
	}

	public static View download(final AttachVO attach) {
		View view = new AbstractView(){
			@Override
			protected void renderMergedOutputModel(Map<String, Object> arg0,HttpServletRequest req, HttpServletResponse res) throws Exception {
				String orgName = attach.getOrg_name();
				String encodedFilename = "";

				String userAgent = req.getHeader("User-Agent");
				if(userAgent.indexOf("MSIE 5.5") > -1){
					encodedFilename = URLEncoder.encode(orgName, "UTF-8");
				} else if(userAgent.indexOf("MSIE") > -1) {
					encodedFilename = URLEncoder.encode(orgName, "UTF-8");
				} else if(userAgent.indexOf("rv:11.0") > -1){
					encodedFilename = URLEncoder.encode(orgName, "UTF-8").replaceAll("\\+", "%20");
				} else if(userAgent.indexOf("Chrome") > -1) {
					StringBuilder sb = new StringBuilder();
					for(int i = 0; i < orgName.length(); i++) {
						char c = orgName.charAt(i);
						if(c > '~') {
							sb.append(URLEncoder.encode("" + c, "UTF-8"));
						} else {
							sb.append(c);
						}
					}
					encodedFilename = sb.toString();
				} else if(userAgent.indexOf("Opera") > -1) {
					encodedFilename = "\"" + new String(orgName.getBytes("UTF-8"), "8859_1") + "\"";
				} else { // firefox
					encodedFilename = orgName;
				}
				
				File f = new File(attach.getPath(),attach.getUpd_name());

				res.setContentType("application/octet-stream");
				res.setContentLength((int)f.length());
				res.setHeader("Content-Transfer-Encoding", "binary");
				res.setHeader("Pragma", "no-cache;");
				res.setHeader("Expires", "-1;");
				res.setHeader("Content-Disposition", "attachment; filename=\"" + encodedFilename + "\"");

				OutputStream out = res.getOutputStream();
				FileInputStream fis = null;

				try{
					fis = new FileInputStream(f);
					FileCopyUtils.copy(fis,out);
				}
				catch(IOException ioe){
					ioe.printStackTrace();
				}
				finally{
					if(fis != null) fis.close();
				}
			}
		};
		return view;
	}
}
