<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
			<header id="header_wrap">
				<h1><a href="<c:url value="/index" />"><img src="/home/images/common/img_header_logo.png" alt="AURA | Smart Health Protector System" /></a></h1>
				<ul class="gnb">
					<li ng-show="loggedIn()"><a href="javascript:;" ng-click="logout()"><img src="/home/images/common/txt_gnb_logout.gif " alt="로그아웃" /></a></li>
					<li ng-show="!loggedIn()"><a href="/HealthCare/login"><img ng-show="1!=getMenu()"src="/home/images/common/txt_gnb_login.gif" alt="로그인" /><img ng-show="1==getMenu()" src="/home/images/common/txt_gnb_login_on.gif" alt="로그인" /></a></li>
					<li ng-show="2==getMenu()"><a href="/HealthCare/notice"><img src="/home/images/common/txt_gnb_news_on.gif" alt="공지사항" /></a></li>
					<li ng-show="2!=getMenu()"><a href="/HealthCare/notice"><img src="/home/images/common/txt_gnb_news.gif" alt="공지사항" /></a></li>
					<li ng-show="3==getMenu()"><a href="/HealthCare/request"><img src="/home/images/common/txt_gnb_service_on.gif" alt="서비스신청" /></a></li>
					<li ng-show="3!=getMenu()"><a href="/HealthCare/request"><img src="/home/images/common/txt_gnb_service.gif" alt="서비스신청" /></a></li>
					<li ng-show="4==getMenu()"><a href="/HealthCare/introduce"><img src="/home/images/common/txt_gnb_customer_on.gif" alt="고객센터" /></a></li>
					<li ng-show="4!=getMenu()"><a href="/HealthCare/introduce"><img src="/home/images/common/txt_gnb_customer.gif" alt="고객센터" /></a></li>
				</ul>
			</header>
