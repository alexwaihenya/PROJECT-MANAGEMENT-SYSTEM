
CREATE TABLE Projects(
    id INT PRIMARY KEY IDENTITY,
    project_name VARCHAR(200) NOT NULL UNIQUE,
    project_desc VARCHAR(200) NOT NULL,
    project_timeline VARCHAR(200) NOT NULL,
    project_status VARCHAR(200) DEFAULT 0,
    issent VARCHAR(200) DEFAULT 0,

    -- is_deleted BIT DEFAULT 0 NOT NULL,
    user_id INT,
    CONSTRAINT FK_USER_PROJECTS FOREIGN KEY (user_id)
    REFERENCES Users (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL 
)
update Projects set project_status=1 where id=1

SELECT * FROM Projects
