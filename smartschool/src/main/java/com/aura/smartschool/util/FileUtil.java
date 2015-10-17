package com.aura.smartschool.util;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

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
			uploadFileName = String.valueOf(System.currentTimeMillis())+"."+extention;
			
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
				String uploadFileName = String.valueOf(System.currentTimeMillis())+"."+extention;
				
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
}
