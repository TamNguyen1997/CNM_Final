-- Valentina Studio --
-- MySQL dump --
-- ---------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- ---------------------------------------------------------


-- CREATE DATABASE "bank" ----------------------------------
CREATE DATABASE IF NOT EXISTS `bank` CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `bank`;
-- ---------------------------------------------------------


-- CREATE TABLE "balance" ----------------------------------
-- DROP TABLE "balance" ----------------------------------------
DROP TABLE IF EXISTS `balance` CASCADE;
-- -------------------------------------------------------------


-- CREATE TABLE "balance" --------------------------------------
CREATE TABLE `balance` ( 
	`id_user` Int( 11 ) NOT NULL,
	`id_type_balance` Int( 11 ) NOT NULL,
	`amount_money` Int( 11 ) NOT NULL,
	`content` VarChar( 256 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------
-- ---------------------------------------------------------


-- CREATE TABLE "type_balance" -----------------------------
-- DROP TABLE "type_balance" -----------------------------------
DROP TABLE IF EXISTS `type_balance` CASCADE;
-- -------------------------------------------------------------


-- CREATE TABLE "type_balance" ---------------------------------
CREATE TABLE `type_balance` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`name` VarChar( 50 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB
AUTO_INCREMENT = 1;
-- -------------------------------------------------------------
-- ---------------------------------------------------------


-- CREATE TABLE "user" -------------------------------------
-- DROP TABLE "user" -------------------------------------------
DROP TABLE IF EXISTS `user` CASCADE;
-- -------------------------------------------------------------


-- CREATE TABLE "user" -----------------------------------------
CREATE TABLE `user` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`username` Int( 50 ) NOT NULL,
	`password` VarChar( 50 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`type` Int( 3 ) NOT NULL,
	`updated_at` DateTime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`created_at` DateTime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB
AUTO_INCREMENT = 1;
-- -------------------------------------------------------------
-- ---------------------------------------------------------


-- CREATE TABLE "transaction" ------------------------------
-- DROP TABLE "transaction" ------------------------------------
DROP TABLE IF EXISTS `transaction` CASCADE;
-- -------------------------------------------------------------


-- CREATE TABLE "transaction" ----------------------------------
CREATE TABLE `transaction` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`from_user` Int( 11 ) NOT NULL,
	`to_user` Int( 11 ) NOT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB
AUTO_INCREMENT = 1;
-- -------------------------------------------------------------
-- ---------------------------------------------------------


-- CREATE TABLE "detail_transactions" ----------------------
-- DROP TABLE "detail_transactions" ----------------------------
DROP TABLE IF EXISTS `detail_transactions` CASCADE;
-- -------------------------------------------------------------


-- CREATE TABLE "detail_transactions" --------------------------
CREATE TABLE `detail_transactions` ( 
	`id_tranaction` Int( 11 ) NOT NULL,
	`type_balance` Int( 3 ) NOT NULL,
	`amount_money` Int( 11 ) NOT NULL,
	`fee_payment` Int( 3 ) NOT NULL )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------
-- ---------------------------------------------------------


-- CREATE TABLE "user_info" --------------------------------
-- DROP TABLE "user_info" --------------------------------------
DROP TABLE IF EXISTS `user_info` CASCADE;
-- -------------------------------------------------------------


-- CREATE TABLE "user_info" ------------------------------------
CREATE TABLE `user_info` ( 
	`id_user` Int( 11 ) NOT NULL,
	`name_user` VarChar( 50 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`date_of_birth` DateTime NOT NULL,
	`address` VarChar( 256 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`phone` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`email` VarChar( 50 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`status` Int( 11 ) NOT NULL )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------
-- ---------------------------------------------------------


-- Dump data of "balance" ----------------------------------
-- ---------------------------------------------------------


-- Dump data of "type_balance" -----------------------------
-- ---------------------------------------------------------


-- Dump data of "user" -------------------------------------
-- ---------------------------------------------------------


-- Dump data of "transaction" ------------------------------
-- ---------------------------------------------------------


-- Dump data of "detail_transactions" ----------------------
-- ---------------------------------------------------------


-- Dump data of "user_info" --------------------------------
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


