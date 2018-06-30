DROP DATABASE IF EXISTS joboboflow_db;

CREATE DATABASE joboboflow_db;

USE joboboflow_db;

INSERT INTO users (user_name, first_name, last_name, password,createdAt,updatedAt)
VALUES ("tester1","hi","there","123456",current_timestamp(),current_timestamp()),  ("tester2","hi2","there2","123456",current_timestamp(),current_timestamp()), ("tester3","hi3","there3","123456",current_timestamp(),current_timestamp()), ("tester4","hi4","there4","123456",current_timestamp(),current_timestamp());
