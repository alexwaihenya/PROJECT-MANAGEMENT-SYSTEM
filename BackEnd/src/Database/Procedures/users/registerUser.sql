CREATE PROCEDURE registerUser(
@username VARCHAR(200),
@email VARCHAR(200),
@password VARCHAR(200)
)
AS
BEGIN
	--IF EXISTS (SELECT * FROM dbo.Projects 


INSERT INTO Users(username,email,password)
VALUES(
@username,
@email,
@password
)
END;

