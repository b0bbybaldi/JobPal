DROP DATABASE IF EXISTS jobpal_db;
CREATE DATABASE jobpal_db;

USE jobpal_db;

DROP TABLE IF EXISTS Jobs;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Cohorts;
DROP TABLE  IF EXISTS Administrators;

INSERT INTO Administrators (name ,password, createdAt,updatedAt)
VALUES ('Kitty','654321',current_timestamp(),current_timestamp()), ('Jerome','654321',current_timestamp(),current_timestamp());

INSERT INTO cohorts (cohort_name,createdAt,updatedAt)
VALUES ("General",current_timestamp(),current_timestamp()),  ("TellmeTellme",current_timestamp(),current_timestamp()), ("Farley's Gang",current_timestamp(),current_timestamp());

INSERT INTO users (user_name, email, password,createdAt,updatedAt,CohortId)
VALUES ("tester1","tester1@gmail.com","123456",current_timestamp(),current_timestamp(),2),  ("tester2","tester2@yahoo.com","123456",current_timestamp(),current_timestamp(),2), ("tester3","tester3@yahoo.com","123456",current_timestamp(),current_timestamp(),2), ("tester4","tester4@yahoo.com","123456",current_timestamp(),current_timestamp(),3);

INSERT INTO jobs (job_link, job_title, company_name,createdAt,updatedAt,UserId,phone_interview,hide)
VALUES ("https://angel.co/bolt/jobs/310250-software-engineer-machine-learning", "Software Engineer - Machine Learning", "Bolt",current_timestamp(),current_timestamp(),2,0,1),
("https://angel.co/clearbit/jobs/362514-full-stack-software-engineer", "Full-stack software engineer", "Clearbit",current_timestamp(),current_timestamp(),3,1,0),
("https://angel.co/joinhouseparty/jobs/185904-backend", "Backend ", "Houseparty" ,current_timestamp(),current_timestamp(),3,0,0),
("https://angel.co/fathom-health/jobs/186407-software-engineer-data", "Software Engineer, Data", "Fathom",current_timestamp(),current_timestamp(),2,0,0),
("https://angel.co/crew-3/jobs/158070-front-end-developer", "Front-end Developer", "Crew",current_timestamp(),current_timestamp(),3,0,0),
("https://angel.co/bolt/jobs/310250-software-engineer-machine-learning", "Software Engineer - Machine Learning", "Bolt",current_timestamp(),current_timestamp(),2,0,1),
("https://angel.co/clearbit/jobs/362514-full-stack-software-engineer", "Full-stack software engineer", "Clearbit",current_timestamp(),current_timestamp(),4,1,0),
("https://angel.co/joinhouseparty/jobs/185904-backend", "Backend ", "Houseparty" ,current_timestamp(),current_timestamp(),4,0,0),
("https://angel.co/fathom-health/jobs/186407-software-engineer-data", "Software Engineer, Data", "Fathom",current_timestamp(),current_timestamp(),4,0,0),
("https://angel.co/crew-3/jobs/158070-front-end-developer", "Front-end Developer", "Crew",current_timestamp(),current_timestamp(),4,0,0);

update jobs set loc3=0, loc2=1, loc1=0 where id =2;
update jobs set hide=0 where id =1;
-- update jobs set job_link="https://angel.co/bolt/jobs/310250-software-engineer-machine-learning" where id =1;


SELECT * FROM jobs;
SELECT * FROM users;
SELECT * FROM cohorts;
SELECT * FROM administrators;