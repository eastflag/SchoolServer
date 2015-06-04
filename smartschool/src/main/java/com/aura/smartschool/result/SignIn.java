package com.aura.smartschool.result;

import java.util.List;

import com.aura.smartschool.domain.Member;

public class SignIn {
	private Member myInfo;
	private List<Member> memberList;
	public Member getMyInfo() {
		return myInfo;
	}
	public void setMyInfo(Member myInfo) {
		this.myInfo = myInfo;
	}
	public List<Member> getMemberList() {
		return memberList;
	}
	public void setMemberList(List<Member> memberList) {
		this.memberList = memberList;
	}
}
