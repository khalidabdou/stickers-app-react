--  create table admin--
CREATE TABLE if not exists `tbl_admin` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  password text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  email varchar(100),
  full_name varchar(255) CHARACTER SET utf8 COLLATE utf8_bin,
  package varchar(255)
);
INSERT INTO
  `tbl_admin` (
    `username`,
    `password`,
    `email`,
    `full_name`,
    `package`
  )
VALUES
  (
    'abdellahkhalid',
    '$2a$08$O4cWFMyY5Dfnmwu4u4WQhOswNzkkFf34yEzdMYuww7TACjkw0KiCC',
    'specialOnes@gmail.com',
    'abdou khalid',
    'com.example.com'
  );
ALTER TABLE
  tbl_admin
ADD
  COLUMN dynamic_link text DEFAULT 'firebase dynamic link';




  -- create tabel language--
CREATE TABLE if not exists `tbl_language` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `language_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `filename` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `dispo` boolean not null default 0
);

INSERT INTO
  `tbl_language` (
    `id`,
    `name`,
    `label`,
    `language_code`,
    `filename`,
    `dispo`
  )
VALUES
  (2, 'العربية', 'arabic', 'ar', 'arabia.png', 0),
  (3, 'English', 'english', 'en', 'english.png', 0),
  (4, 'Italiana', 'Italian', 'it', 'italy.png', 1),
  (5, 'ไทย', 'thialand', 'th', 'thailand.png', 0),
  (6, '한국인', 'korea', 'kn', 'korea.png', 0),
  (7, '中国人', 'Chinese', 'zh', 'china.png', 0),
  (
    8,
    'português',
    'portugal',
    'pt',
    'portugal.png',
    1
  ),
  (9, 'española', 'spanish', 'es', 'spain.png', 0),
  (10, 'française', 'french', 'fr', 'france.png', 0);


-- craete  table category images--
CREATE TABLE if not exists `tbl_cat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar (255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `image` varchar (255) NOT NULL,
  `color` varchar(255) default '#ff8c00',
  `language_app` int(11),
  FOREIGN KEY (`language_app`) REFERENCES `tbl_language`(`id`) on delete cascade,
  PRIMARY KEY (`id`)
);



-- create tabel pack stickers table--
CREATE TABLE if not exists pack_stickers (
  `identifier` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `name` TEXT CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `animated_sticker_pack` boolean default false,
  `android_play_store_link` TEXT CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `stickers` TEXT CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `count_set_to_whatsapp` int(11) DEFAULT 0,
  `count_views` int(11) DEFAULT 10,
  `language_app` int(11) default -1,
  `folder` TEXT CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  FOREIGN KEY(`cid`) REFERENCES `tbl_cat`(`id`) on delete cascade
);

ALTER TABLE
  pack_stickers
ADD
  FOREIGN KEY (`cid`) REFERENCES `tbl_cat`(`id`);


