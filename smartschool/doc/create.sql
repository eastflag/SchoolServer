CREATE TABLE `home` (
  `home_id`  bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`home_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8;

CREATE TABLE `mobile` (
  `mobile_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `mdn` varchar(30) DEFAULT NULL,
  `android_id` varchar(256) DEFAULT NULL,
  `home_id` bigint(20) NOT NULL,
  `gcm_id` varchar(256) DEFAULT NULL,
  `is_parent` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`mobile_id`),
  KEY `FK_Mobile_Home` (`home_id`),
  CONSTRAINT `FK_Mobile_Home` FOREIGN KEY (`home_id`) REFERENCES `home` (`home_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;