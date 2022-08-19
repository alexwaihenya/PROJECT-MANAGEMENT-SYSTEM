CREATE PROCEDURE getUser(@email VARCHAR(200))
AS
BEGIN
SELECT * FROM Users WHERE email =@email
END

CREATE PROCEDURE getUsers
AS
BEGIN
	SELECT user_id, username,email FROM dbo.Users WHERE role = 0
END