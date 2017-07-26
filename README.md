# timeUp
The page you wish to start your day with, everyday !
## Setting Up
### Step 1
Go to the directory in which you have saved the files. On a terminal run the following command. 
```
npm init
npm install
```
### Step 2
Create the required database and tables. Open mysql client and run the following commands.
```
create database timeup;
create table users(id integer auto_increment, username varchar(100), points integer, password varchar(20), thisweek integer , primary key(id));
create table notifications(id integer auto_increment, fromuser varchar(100), touser varchar(100), content varchar(200), link varchar(100) ,primary key(id));
```
### Step 3
Enter your MySQL username and password in dbconfig in db.js file

Run the file on localhost 4000 using:
```
node server
```
Hope you like it ! :)
