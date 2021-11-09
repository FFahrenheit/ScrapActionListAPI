CREATE DATABASE SrapActions;

USE SrapActions;

CREATE TABLE problem(
    id INT IDENTITY(1,1) PRIMARY KEY,
    description VARCHAR(50)
);

CREATE TABLE client(
    id VARCHAR(6) PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE part(
    number VARCHAR(40) PRIMARY KEY,
    area VARCHAR(30),
    department VARCHAR(20),
    location VARCHAR(20),
    client VARCHAR(6) NOT NULL
);

CREATE TABLE users(
    username VARCHAR(30) PRIMARY KEY,
    email VARCHAR(50),
    name VARCHAR(60),
    position VARCHAR(30)
);

CREATE TABLE department(
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(30),
    manager VARCHAR(30) NOT NULL
);

CREATE TABLE issue(
    id INT IDENTITY(1,1) PRIMARY KEY,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    problem INT NOT NULL,
    part VARCHAR(40) NOT NULL,
    originator VARCHAR(30) NOT NULL
);

CREATE TABLE action(
    id INT IDENTITY(1,1) PRIMARY KEY,
    description TEXT,
    status VARCHAR(12) DEFAULT 'open',
    evaluation DATE DEFAULT GETDATE(),
    due DATE DEFAULT NULL,
    closed DATETIME DEFAULT NULL,
    issue INT NOT NULL,
    responsible VARCHAR(30) NOT NULL,
    department INT NOT NULL
);

ALTER TABLE part
ADD CONSTRAINT FK_part_client
FOREIGN KEY (client) REFERENCES client(id);

ALTER TABLE issue
ADD CONSTRAINT FK_issue_problem
FOREIGN KEY (problem) REFERENCES problem(id);

ALTER TABLE issue
ADD CONSTRAINT FK_issue_part
FOREIGN KEY (part) REFERENCES part(number);

ALTER TABLE issue
ADD CONSTRAINT FK_issue_originator
FOREIGN KEY (originator) REFERENCES users(username);

ALTER TABLE action
ADD CONSTRAINT FK_action_issue
FOREIGN KEY (issue) REFERENCES issue(id);

ALTER TABLE action
ADD CONSTRAINT FK_action_responsible
FOREIGN KEY (responsible) REFERENCES users(username);

ALTER TABLE action
ADD CONSTRAINT FK_action_department
FOREIGN KEY (department) REFERENCES department(id);

ALTER TABLE department
ADD CONSTRAINT FK_department_manager
FOREIGN KEY (manager) REFERENCES users(username);