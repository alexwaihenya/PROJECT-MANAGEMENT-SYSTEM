
-- CREATE PROCEDURE createProject(
--     @project_name VARCHAR(200),
--     @project_desc VARCHAR(200),
-- 	@project_timeline VARCHAR(200)
--     )AS

-- BEGIN
--     INSERT INTO Projects(
--         project_name,
--         project_desc,
-- 		project_timeline
--     )
--     VALUES(
--         @project_name,
--         @project_desc,
-- 		@project_timeline
--     );
-- END;

-- EXECUTE createProject "Advanced React", "Understand React Class Components","03/08/2022";
-- SELECT * FROM Projects;

CREATE PROCEDURE createProject (@project_name VARCHAR(200), 
@project_desc VARCHAR(200), @project_timeline VARCHAR(200),@email VARCHAR(200))
AS
BEGIN

IF EXISTS ( SELECT * FROM dbo.Projects WHERE project_name=@project_name)
BEGIN
		RAISERROR('PROJECT EXISTS', 11, 1);
		return;
END
ELSE 
	BEGIN


	INSERT INTO dbo.PROJECTS (project_name, project_desc, project_timeline,email)
	VALUES (@project_name, @project_desc, @project_timeline,@email)
END
END