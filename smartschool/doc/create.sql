CREATE TABLE `home` (
  `home_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`home_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8;

CREATE TABLE `mobile` (
  `mobile_id` int(11) NOT NULL AUTO_INCREMENT,
  `mdn` varchar(45) DEFAULT NULL,
  `android_id` varchar(45) DEFAULT NULL,
  `home_id` int(11) NOT NULL,
  `gcm_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`mobile_id`),
  KEY `FK_Mobile_Home` (`home_id`),
  CONSTRAINT `FK_Mobile_Home` FOREIGN KEY (`home_id`) REFERENCES `home` (`home_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;