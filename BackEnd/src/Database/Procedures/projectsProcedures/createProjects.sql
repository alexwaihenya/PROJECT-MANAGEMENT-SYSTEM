CREATE PROCEDURE createProjects(
@projectId INT,
@projectName VARCHAR(200),
@projectDescription VARCHAR(200),
@projectTimeLine VARCHAR(200)
)
AS
BEGIN
	--IF EXISTS (SELECT * FROM dbo.Projects 


INSERT INTO Projects(projectId,projectName,projectDescription,projectTimeLine)
VALUES(
@projectId,
@projectName,
@projectDescription,
@projectTimeLine
)
END;