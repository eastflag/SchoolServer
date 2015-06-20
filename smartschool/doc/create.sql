CREATE TABLE `home` (
  `home_id` varchar(45) NOT NULL,
  PRIMARY KEY (`home_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `inbody_info` (
  `Inbody_seq` bigint(18) NOT NULL,
  `DATETIMES` datetime NOT NULL,
  `Weight` decimal(15,12) NOT NULL,
  `Protein_Mass` decimal(15,12) NOT NULL,
  `Mineral_Mass` decimal(15,12) NOT NULL,
  `Body_Fat_Mass` int(4) NOT NULL,
  `Total_Body_Water` decimal(15,12) NOT NULL,
  `Soft_Lean_Mass` decimal(15,12) NOT NULL,
  `Fat_Free_Mass` decimal(15,12) NOT NULL,
  `OSSEOUS` decimal(15,12) NOT NULL,
  `Skeletal_Muscle_Mass` decimal(15,12) NOT NULL,
  `BMI` decimal(15,12) NOT NULL,
  `Percent_Body_Fat` int(4) NOT NULL,
  `Waist_Hip_Ratio` decimal(15,12) NOT NULL,
  `Target_Weight` decimal(15,12) NOT NULL,
  `Weight_Control` decimal(15,12) NOT NULL,
  `Fat_Control` decimal(15,12) NOT NULL,
  `Muscle_Control` decimal(15,12) NOT NULL,
  `Fitness_Score` decimal(15,12) NOT NULL,
  `BMR` int(4) NOT NULL,
  `Neck` decimal(15,12) NOT NULL,
  `Chest` decimal(15,12) NOT NULL,
  `ABD` decimal(15,12) NOT NULL,
  `THIGHL` int(4) NOT NULL,
  `ACL` decimal(15,12) NOT NULL,
  `HIP` int(4) NOT NULL,
  `THIGHR` decimal(15,12) NOT NULL,
  `ACR` decimal(15,12) NOT NULL,
  `Protein_Max` int(4) NOT NULL,
  `Protein_Min` int(4) NOT NULL,
  `Mineral_Max` int(4) NOT NULL,
  `Mineral_Min` decimal(3,1) NOT NULL,
  `Body_Fat_Mass_Max` decimal(15,12) NOT NULL,
  `Body_Fat_Mass_Min` decimal(15,12) NOT NULL,
  `Weight_Max` int(4) NOT NULL,
  `Weight_Min` decimal(15,12) NOT NULL,
  `Skeletal_Muscle_Mass_Max` decimal(15,12) NOT NULL,
  `Skeletal_Muscle_Mass_Min` decimal(15,12) NOT NULL,
  `BMI_Max` decimal(15,12) NOT NULL,
  `BMI_Min` decimal(15,12) NOT NULL,
  `Percent_Body_Fat_Max` decimal(15,12) NOT NULL,
  `Percent_Body_Fat_Min` decimal(15,12) NOT NULL,
  `Waist_Hip_Ratio_Max` decimal(15,12) NOT NULL,
  `Waist_Hip_Ratio_Min` decimal(15,12) NOT NULL,
  `BMR_MAX` int(4) NOT NULL,
  `BMR_MIN` int(4) NOT NULL,
  `FCHEST` int(4) NOT NULL,
  `FABD` int(4) NOT NULL,
  `FACR` decimal(15,12) NOT NULL,
  `FACL` int(4) NOT NULL,
  `FTHIGHR` int(4) NOT NULL,
  `FTHIGHL` int(4) NOT NULL,
  `HEIGHT` decimal(15,12) NOT NULL,
  PRIMARY KEY (`Inbody_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `location` (
  `location_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) NOT NULL,
  `lat` varchar(100) COLLATE utf8_bin NOT NULL,
  `lng` varchar(100) COLLATE utf8_bin NOT NULL,
  `address` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`location_id`),
  KEY `FK_LOCATION_MEMBER` (`member_id`),
  CONSTRAINT `FK_LOCATION_MEMBER` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `measure_info` (
  `measure_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) NOT NULL,
  `school_name` varchar(45) DEFAULT NULL,
  `school_grade` varchar(2) DEFAULT NULL,
  `school_ban` varchar(2) DEFAULT NULL,
  `Smoke_seq` bigint(18) DEFAULT NULL,
  `Inbody_seq` bigint(18) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`measure_id`),
  KEY `FK_measure_member` (`member_id`),
  KEY `FK_measure_inbody` (`Inbody_seq`),
  KEY `FK_measure_smoke` (`Smoke_seq`),
  CONSTRAINT `FK_measure_inbody` FOREIGN KEY (`Inbody_seq`) REFERENCES `inbody_info` (`Inbody_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_measure_member` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_measure_smoke` FOREIGN KEY (`Smoke_seq`) REFERENCES `smoke_info` (`Smoke_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `member` (
  `member_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `home_id` varchar(45) NOT NULL,
  `mdn` varchar(30) DEFAULT NULL,
  `gcm_id` varchar(256) DEFAULT NULL,
  `is_parent` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(45) NOT NULL,
  `relation` varchar(45) NOT NULL,
  `photo` blob,
  `school_id` int(11) DEFAULT '0',
  `school_grade` varchar(2) DEFAULT NULL,
  `school_class` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  KEY `FK_Member_Home` (`home_id`),
  KEY `FK_MEMBER_SCHOOL` (`school_id`),
  CONSTRAINT `FK_MEMBER_SCHOOL` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Member_Home` FOREIGN KEY (`home_id`) REFERENCES `home` (`home_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

CREATE TABLE `school` (
  `school_id` int(11) NOT NULL AUTO_INCREMENT,
  `school_name` varchar(100) DEFAULT NULL,
  `gubun1` varchar(20) DEFAULT NULL,
  `gubun2` varchar(50) DEFAULT NULL,
  `zipcode` varchar(15) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `new_address` varchar(500) DEFAULT NULL,
  `lat` varchar(100) DEFAULT NULL,
  `lng` varchar(100) DEFAULT NULL,
  `homepage` varchar(400) DEFAULT NULL,
  `fax` varchar(100) DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`school_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1850 DEFAULT CHARSET=utf8;

CREATE TABLE `smoke_info` (
  `Smoke_seq` bigint(18) NOT NULL,
  `PPM` varchar(4) NOT NULL,
  `COHD` varchar(4) NOT NULL,
  `DATETIMES` date NOT NULL,
  PRIMARY KEY (`Smoke_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



//----------------------------------------------------
INSERT INTO `healthcare`.`school`
(`_id`,
`name`,
`gubun1`,
`gubun2`,
`zipcode`,
`address`,
`new_address`,
`lat`,
`lng`,
`homepage`,
`fax`,
`contact`)
VALUES
(1,
'광명초등학교',
'사립',
'초등',
'123-123',
'경기도 광명시',
'경기도 광명시 아나지로',
AES_ENCRYPT('36.123123', 'aura'),
AES_ENCRYPT('127.123123', 'aura'),
'http://www.aaa.bbb',
'02-1234-1234',
'010-1234-1234');
select  CAST(AES_DECRYPT(lat, 'aura') AS CHAR(20)) as 'lat' from school

INSERT INTO `healthcare`.`member`
(
`home_id`,
`mdn`,
`is_parent`,
`name`,
school_id,
`relation`)
VALUES
(
'happy',
'01012341234',
1,
'홍길동',
null,
'아빠');

