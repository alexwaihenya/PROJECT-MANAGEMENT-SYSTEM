CREATE PROCEDURE getUser(@email VARCHAR(200))
AS
BEGIN
SELECT * FROM Users WHERE email =@email
END