base
create database user;

<-- Create Table Naemed 'user' !->
create table user(id integer primary key auto_increment,
firstname varchar(20)DEFAULT NULL,
lastname varchar(20) DEFAULT NULL,
email varchar(40) DEFAULT NULL,
phone varchar(15) DEFAULT NULL,
addres varchar(600) DEFAULT NULL,
password varchar(200) DEFAULT NULL,
status int DEFAULT NULL
);

--Create table contactbook---
create table
 contactbook(id integer primary key auto_increment,
 fname varchar(30),
 mname varchar(30),
 lname varchar(30),
 email varchar(50),
 phone int(15),
 alterphone int(15),
 address varchar(500));

ALTER TABLE contactbook
ADD CONSTRAINT email UNIQUE (email);

--create table forFeedbac form--
create table
 feedback(id integer primary key auto_increment,
 fname varchar(30),
 email varchar(50),
 feedback varchar(500)
);

ALTER TABLE feedback ADD date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;