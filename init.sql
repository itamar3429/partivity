-- create table users(
-- 	id int not null auto_increment,
-- 	first_name text,
-- 	last_name text,
-- 	username text,
-- 	email text,
-- 	password text,
-- 	role text,
-- 	primary key (id)
-- );


insert into users (username, email,password, role) values 
('ic','ic@gmail.com', '$2b$10$unvJKMGQt1kJZmhBJKueFuLf.bgZesO/xUxeOv6/q4ZVVRBH0Ro1S','admin'),
('ic1','ic1@gmail.com', '$2b$10$unvJKMGQt1kJZmhBJKueFuLf.bgZesO/xUxeOv6/q4ZVVRBH0Ro1S','provider')
('ic2','ic2@gmail.com', '$2b$10$unvJKMGQt1kJZmhBJKueFuLf.bgZesO/xUxeOv6/q4ZVVRBH0Ro1S','client');