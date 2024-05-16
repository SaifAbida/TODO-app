CREATE SCHEMA `todo` ;

CREATE TABLE `todo`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE `todo`.`list` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(100) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`item_id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `todo`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);