CREATE TABLE `home` (
  `home_id` varchar(45) NOT NULL,
  PRIMARY KEY (`home_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `member` (
  `member_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `home_id` varchar(45) NOT NULL,
  `mdn` varchar(30) DEFAULT NULL,
  `gcm_id` varchar(256) DEFAULT NULL,
  `is_parent` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(45) NOT NULL,
  `relation` varchar(45) DEFAULT NULL,
  `photo` blob DEFAULT NULL,
  `school_name` varchar(45) DEFAULT NULL,
  `school_grade` varchar(2) DEFAULT NULL,
  `school_ban` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  KEY `FK_Member_Home` (`home_id`),
  CONSTRAINT `FK_Member_Home` FOREIGN KEY (`home_id`) REFERENCES `home` (`home_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `location` (
  `location_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `address` varchar(450) COLLATE utf8_bin DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`location_id`),
  KEY `FK_LOCATION_MEMBER` (`member_id`),
  CONSTRAINT `FK_LOCATION_MEMBER` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

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

CREATE TABLE `smoke_info` (
  `Smoke_seq` bigint(18) NOT NULL,
  `PPM` varchar(4) NOT NULL,
  `COHD` varchar(4) NOT NULL,
  `DATETIMES` date NOT NULL,
  PRIMARY KEY (`Smoke_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `measure_info` (
  `measure_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) NOT NULL,
  `school_name` varchar(45) DEFAULT NULL,
  `school_grade` varchar(2) DEFAULT NULL,
  `school_ban` varchar(2) DEFAULT NULL,
  `Smoke_seq` bigint(18) DEFAULT NULL,
  `Inbody_seq` bigint(18) DEFAULT NULL,
  PRIMARY KEY (`measure_id`),
  KEY `FK_measure_member` (`member_id`),
  KEY `FK_measure_inbody` (`Inbody_seq`),
  KEY `FK_measure_smoke` (`Smoke_seq`),
  CONSTRAINT `FK_measure_member` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_measure_inbody` FOREIGN KEY (`Inbody_seq`) REFERENCES `inbody_info` (`Inbody_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_measure_smoke` FOREIGN KEY (`Smoke_seq`) REFERENCES `smoke_info` (`Smoke_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;