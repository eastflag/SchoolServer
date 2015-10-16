package com.aura.smartschool.util;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class FileUtil {

	public static void fileUpload(MultipartFile file, String path) throws IllegalStateException, IOException{
		File dir = new File(path);
		
		//디렉토리 생성
		if(!dir.isDirectory()){
			dir.mkdirs();
		}
		if(!file.isEmpty()){
			String originalFileName = file.getOriginalFilename();
			
			File saveFile = new File(path, originalFileName);
			file.transferTo(saveFile);
		}
	}
	
	public static void fileUpload(List<MultipartFile> files, String path) throws IllegalStateException, IOException{
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
}
