<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
		<footer id="footer_wrap">
			<section class="footer_top">
				<ul class="footer_menu">
					<li><a href="javascript:;" onclick="company_info('layer1')">이용약관</a></li>
					<li class="privacy_policy"><a href="javascript:;" onclick="company_info('layer2')">개인정보취급방침</a></li>
					<li><a href="javascript:;" onclick="company_info('layer3')">개인정보 활용동의</a></li>
					<li><a href="/aura/introduce">고객센터</a></li>
				</ul>
				<ul class="link_site">
					<li class="link01"><a href="/aura/index" target="_self"><img src="<c:url value="/home/images/common/img_footer_family03.png" />" alt="AURA" /></a></li>
					<li class="link02"><a href="http://www.msip.go.kr/" target="_blank"><img src="<c:url value="/home/images/common/img_footer_family01.png" />" alt="미래창조과학부" /></a></li>
					<li class="link03"><a href="http://www.nipa.kr/" target="_blank"><img src="<c:url value="/home/images/common/img_footer_family02.png" />" alt="정보통신산업진흥원" /></a></li>
				</ul>
			</section>
			<section class="company_info">
				<p class="info">대표이사 성제혁&nbsp;&nbsp;&nbsp;사업자 등록번호 : 140-81-73625&nbsp;&nbsp;&nbsp;대표번호: 1544-1284&nbsp;&nbsp;&nbsp;팩스: 02)2688-8052
				&nbsp;&nbsp;&nbsp;개인정보/웹사이트/제품 서비스 문의: 070)4699-3679</p>
				<p class="copy_right">copyright ⓒ <span>aurasystem</span> all rights reserved.</p>
			</section>
		</footer>
		
		<%@ include file="/WEB-INF/home/inc_policy.jsp" %>
		
		<!-- JQueriy JS -->
		<script src="<c:url value="/home/js/jquery-1.10.1.min.js" />"></script>
		<script src="<c:url value="/home/js/jquery-ui-1.10.3.custom.min.js" />"></script>
		<!-- Angular JS -->
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-route.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-cookies.js"></script>
		<script src='/js/ui-bootstrap-tpls-0.13.2.min.js'></script>
		<!--Custom JavaScript -->
		<script src="<c:url value="/home/js/common.js" />"></script>
		<script src="<c:url value="/home/js/app.js" />"></script>
		<script src="<c:url value="/js/util.js" />"></script>