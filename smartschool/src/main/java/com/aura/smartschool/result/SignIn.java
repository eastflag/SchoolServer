package com.aura.smartschool.result;

import java.util.List;

import com.aura.smartschool.domain.MemberVO;

public class SignIn {
	private MemberVO myInfo;
	private List<MemberVO> memberList;
	public MemberVO getMyInfo() {
		return myInfo;
	}
	public void setMyInfo(MemberVO myInfo) {
		this.myInfo = myInfo;
	}
	public List<MemberVO> getMemberList() {
		return memberList;
	}
	public void setMemberList(List<MemberVO> memberList) {
		this.memberList = memberList;
	}
}
