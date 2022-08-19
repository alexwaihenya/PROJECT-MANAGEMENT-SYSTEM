-- CREATE PROCEDURE usersWithNoProjects
-- AS
-- BEGIN
-- 	SELECT * FROM dbo.Users u LEFT JOIN dbo.Projects p ON  p.Id= u.Id
-- 		EXCEPT
-- 	SELECT * FROM dbo.Users u INNER JOIN dbo.Projects p ON  p.Id= u.Id
-- END

CREATE PROCEDURE IdleUsers
AS
BEGIN
		SELECT u.email FROM dbo.Users u LEFT JOIN dbo.Projects p ON  p.email= u.email
		EXCEPT
	SELECT u.email FROM dbo.Users u INNER JOIN dbo.Projects p ON  p.email= u.email
END