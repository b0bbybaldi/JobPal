DROP DATABASE IF EXISTS jobpal_db;
CREATE DATABASE jobpal_db;

USE jobpal_db;

DROP TABLE IF EXISTS Jobs;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Cohorts;
DROP TABLE  IF EXISTS Administrators;

INSERT INTO Administrators (name ,password, createdAt,updatedAt)
VALUES ('Kitty','123456',current_timestamp(),current_timestamp()), ('Jerome','123456',current_timestamp(),current_timestamp());

INSERT INTO Cohorts (cohort_name,createdAt,updatedAt, AdministratorId)
VALUES ("General",current_timestamp(),current_timestamp(),1),  ("TellmeTellme",current_timestamp(),current_timestamp(),1), ("Farley's Gang",current_timestamp(),current_timestamp(),1);

INSERT INTO Users (user_name, email, password,createdAt,updatedAt,CohortId)
VALUES ("kittykuma","meow@gmail.com","123456",current_timestamp(),current_timestamp(),1), ("tester1","tester1@gmail.com","123456",current_timestamp(),current_timestamp(),2),  ("tester2","tester2@yahoo.com","123456",current_timestamp(),current_timestamp(),2), ("tester3","tester3@yahoo.com","123456",current_timestamp(),current_timestamp(),2), ("tester4","tester4@yahoo.com","123456",current_timestamp(),current_timestamp(),3), ("tester5","tester5@yahoo.com","123456",current_timestamp(),current_timestamp(),3),("genralUser1","mfdf@fdmail.com","123456",current_timestamp(),current_timestamp(),1), ("genralUser2","genralUser2@gmail.com","123456",current_timestamp(),current_timestamp(),1);

INSERT INTO Jobs (job_link, job_title, company_name,createdAt,updatedAt,UserId,phone_interview,hide)
VALUES ("https://angel.co/bolt/jobs/310250-software-engineer-machine-learning", "Software Engineer - Machine Learning", "Bolt",current_timestamp(),current_timestamp(),2,0,1),
("https://angel.co/clearbit/jobs/362514-full-stack-software-engineer", "Full-stack software engineer", "Clearbit",current_timestamp(),current_timestamp(),3,1,0),
("https://angel.co/joinhouseparty/jobs/185904-backend", "Backend ", "Houseparty" ,current_timestamp(),current_timestamp(),2,0,0),
("https://angel.co/fathom-health/jobs/186407-software-engineer-data", "Software Engineer, Data", "Fathom",current_timestamp(),current_timestamp(),3,0,0),
("https://angel.co/crew-3/jobs/158070-front-end-developer", "Front-end Developer", "Crew",current_timestamp(),current_timestamp(),3,0,0),
("https://angel.co/bolt/jobs/310250-software-engineer-machine-learning", "Software Engineer - Machine Learning", "Bolt",current_timestamp(),current_timestamp(),4,0,1),
("https://angel.co/clearbit/jobs/362514-full-stack-software-engineer", "Full-stack software engineer", "Clearbit",current_timestamp(),current_timestamp(),2,1,0),
("https://angel.co/joinhouseparty/jobs/185904-backend", "Backend ", "Houseparty" ,current_timestamp(),current_timestamp(),3,0,0),
("https://angel.co/fathom-health/jobs/186407-software-engineer-data", "Software Engineer, Data", "Fathom",current_timestamp(),current_timestamp(),4,0,0),
("https://angel.co/crew-3/jobs/158070-front-end-developer", "Front-end Developer", "Crew",current_timestamp(),current_timestamp(),4,0,0),
("https://angel.co/crew-3/jobs/158070-front-end-developer", "Back-end Enginner", "Menthon",current_timestamp(),current_timestamp(),5,0,0),
("https://angel.co/bolt/jobs/310250-software-engineer-machine-learning", "Software Engineer - AI", "OceanIT",current_timestamp(),current_timestamp(),5,0,1),
("https://angel.co/clearbit/jobs/362514-full-stack-software-engineer", "Full-stack Developer", "Titum",current_timestamp(),current_timestamp(),5,1,0),
("https://angel.co/joinhouseparty/jobs/185904-backend", "Backend ", "Houseparty" ,current_timestamp(),current_timestamp(),3,0,0),
("https://angel.co/fathom-health/jobs/186407-software-engineer-data", "Software Engineer", "Thenhom",current_timestamp(),current_timestamp(),4,0,0),
("https://angel.co/crew-3/jobs/158070-front-end-developer", "Web Developer", "mokere",current_timestamp(),current_timestamp(),3,1,0),
("https://angel.co/bolt/jobs/310250-software-engineer-machine-learning", "Software Engineer - AI", "OceanIT",current_timestamp(),current_timestamp(),6,0,1),
("https://angel.co/clearbit/jobs/362514-full-stack-software-engineer", "Full-stack Developer", "Titum",current_timestamp(),current_timestamp(),8,1,0),
("https://angel.co/joinhouseparty/jobs/185904-backend", "Backend ", "Houseparty" ,current_timestamp(),current_timestamp(),6,0,0),
("https://angel.co/fathom-health/jobs/186407-software-engineer-data", "Software Engineer", "Thenhom",current_timestamp(),current_timestamp(),6,0,0),
("https://angel.co/crew-3/jobs/158070-front-end-developer", "Web Developer", "mokere",current_timestamp(),current_timestamp(),6,1,0),
("https://angel.co/clearbit/jobs/362514-full-stack-software-engineer", "Full-stack Developer", "Titum",current_timestamp(),current_timestamp(),7,1,0),
("https://angel.co/joinhouseparty/jobs/185904-backend", "Backend ", "Houseparty" ,current_timestamp(),current_timestamp(),7,0,0),
("https://angel.co/fathom-health/jobs/186407-software-engineer-data", "Software Engineer", "Thenhom",current_timestamp(),current_timestamp(),8,0,0),
("https://angel.co/crew-3/jobs/158070-front-end-developer", "Web Developer", "mokere",current_timestamp(),current_timestamp(),8,1,0),
("https://angel.co/bolt/jobs/310250-software-engineer-machine-learning", "Software Engineer - AI", "OceanIT",current_timestamp(),current_timestamp(),8,0,1),
("https://angel.co/clearbit/jobs/362514-full-stack-software-engineer", "Full-stack Developer", "Titum",current_timestamp(),current_timestamp(),6,1,0),
("https://angel.co/joinhouseparty/jobs/185904-backend", "Backend ", "Houseparty" ,current_timestamp(),current_timestamp(),8,0,0),
("https://angel.co/fathom-health/jobs/186407-software-engineer-data", "Software Engineer", "Thenhom",current_timestamp(),current_timestamp(),7,0,0),
("https://angel.co/crew-3/jobs/158070-front-end-developer", "Web Developer", "mokere",current_timestamp(),current_timestamp(),7,1,0);

update Jobs set loc3=0, loc2=1, loc1=0 where id =2;
update Jobs set hide=0 where id in (1, 2, 3, 5, 6);
-- update jobs set job_link="https://angel.co/bolt/jobs/310250-software-engineer-machine-learning" where id =1;
update Users set password="$2b$10$uq2sgpsFcS98nnWvLh7jturt7W3961qDnYfdRLokjjFdH3x8OtHTO"; 
update Users set password="$2b$10$LI2I8OxlT1wTstydpKCnLOz0oyBYj6tkeL5dvFlJHRVnZlpr44S8K" where id =1;  

-- delete from Users where id>50;
delete from Jobs where id=11;

SELECT * FROM Jobs;
SELECT * FROM Users;
SELECT * FROM Cohorts;
SELECT * FROM Administrators;