CREATE DATABASE ScrapActions;

USE ScrapActions;

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
    D0 DATETIME DEFAULT CURRENT_TIMESTAMP,
    D1 DATETIME DEFAULT NULL,
    D2 DATETIME DEFAULT NULL,
    D3 DATETIME DEFAULT NULL,
    D4 DATETIME DEFAULT NULL,
    D5 DATETIME DEFAULT NULL,
    D6 DATETIME DEFAULT NULL,
    D7 DATETIME DEFAULT NULL,
    D8 DATETIME DEFAULT NULL,
    problem INT NOT NULL,
    part VARCHAR(40) NOT NULL,
    originator VARCHAR(30) NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    status VARCHAR(20) DEFAULT 'D0',
    -- evaluation DATE DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(25) NOT NULL,
    phase VARCHAR(20)
);

CREATE TABLE action(
    id INT IDENTITY(1,1) PRIMARY KEY,
    description TEXT,
    status VARCHAR(12) DEFAULT 'open',
    evaluation DATE DEFAULT GETDATE(),
    due DATE DEFAULT NULL,
    closed DATETIME DEFAULT NULL,
    type VARCHAR(20) DEFAULT 'corrective',
    issue INT NOT NULL,
    responsible VARCHAR(30) NOT NULL,
    department INT NOT NULL
);

CREATE TABLE team(
    id INT IDENTITY(1,1) PRIMARY KEY,
    position VARCHAR(30) DEFAULT 'participant',
    member VARCHAR(30) NOT NULL,
    issue INT NOT NULL
);

CREATE TABLE evidence(
    id INT IDENTITY(1,1) PRIMARY KEY,
    description VARCHAR(120) DEFAULT 'evidence',
    filename VARCHAR(255),
    date DATE DEFAULT CURRENT_TIMESTAMP,
    issue INT NOT NULL,
    author VARCHAR(30)
);

CREATE TABLE incident(
    id INT IDENTITY(1,1) PRIMARY KEY,
    car VARCHAR(60),
    issued DATE DEFAULT CURRENT_TIMESTAMP,
    contact VARCHAR(60),
    email VARCHAR(60),
    issue INT NOT NULL 
);

CREATE TABLE complication(
    id INT IDENTITY(1,1) PRIMARY KEY,
    customerPN VARCHAR(30),
    pnDescription VARCHAR(120),
    failureMode VARCHAR(120),
    whatIs VARCHAR(120),
    whereIs VARCHAR(120),
    whenIs VARCHAR(120),
    whoIs VARCHAR(120),
    whyIs VARCHAR(120),
    much VARCHAR(120),
    often VARCHAR(120),
    description VARCHAR(240),
    repeated VARCHAR(5),
    finalAffected VARCHAR(5),
    customerAffected VARCHAR(60),
    issue INT NOT NULL
);

CREATE TABLE why(
    id INT IDENTITY(1,1) PRIMARY KEY,
    question VARCHAR(120),
    keyFindings VARCHAR(128) DEFAULT '',
    answers TEXT,
    issue INT NOT NULL
);

CREATE TABLE containment(
    id INT IDENTITY(1,1) PRIMARY KEY,
    others VARCHAR(10),
    sites VARCHAR(120),
    containment VARCHAR(30),
    QA VARCHAR(255),
    poka VARCHAR(60),
    robust VARCHAR(30),
    issue INT NOT NULL
);

CREATE TABLE stock(
    id INT IDENTITY(1,1) PRIMARY KEY,
    description VARCHAR(120),
    total VARCHAR(40) DEFAULT '0',
    ok VARCHAR(40) DEFAULT '0',
    notOk VARCHAR(40) DEFAULT '0',
    clean DATE DEFAULT CURRENT_TIMESTAMP,
    issue INT NOT NULL,
    responsible VARCHAR(30) NOT NULL
);

CREATE TABLE closure(
    id INT IDENTITY(1,1) PRIMARY KEY,
    fmea VARCHAR(15),
    readAcross VARCHAR(15),
    lessons VARCHAR(15),
    control VARCHAR(15),
    issue INT NOT NULL  
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

ALTER TABLE team 
ADD CONSTRAINT FK_team_member
FOREIGN KEY (member) REFERENCES users(username);

ALTER TABLE team 
ADD CONSTRAINT FK_team_issue
FOREIGN KEY (issue) REFERENCES issue(id);

ALTER TABLE evidence
ADD CONSTRAINT FK_evidence_author
FOREIGN KEY (author) REFERENCES users(username);

ALTER TABLE evidence 
ADD CONSTRAINT FK_evidence_issue
FOREIGN KEY (issue) REFERENCES issue(id);

ALTER TABLE incident
ADD CONSTRAINT FK_incident_issue
FOREIGN KEY (issue) REFERENCES issue(id);

ALTER TABLE complication
ADD CONSTRAINT complication_issue
FOREIGN KEY (issue) REFERENCES issue(id);

ALTER TABLE why
ADD CONSTRAINT why_issue
FOREIGN KEY (issue) REFERENCES issue(id);

ALTER TABLE containment 
ADD CONSTRAINT containment_issue
FOREIGN KEY (issue) REFERENCES issue(id);

ALTER TABLE stock
ADD CONSTRAINT stock_responsible
FOREIGN KEY (responsible) REFERENCES users(username);

ALTER TABLE stock
ADD CONSTRAINT stock_issue
FOREIGN KEY (issue) REFERENCES issue(id);

ALTER TABLE closure
ADD CONSTRAINT closure_issue
FOREIGN KEY (issue) REFERENCES issue(id);