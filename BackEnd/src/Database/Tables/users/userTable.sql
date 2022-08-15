CREATE TABLE Users
(
    id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(200) NOT NULL UNIQUE,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    role VARCHAR(200) DEFAULT 'user'
    
)
UPDATE Users SET role='admin' WHERE id ='1'