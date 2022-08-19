-- CREATE PROCEDURE completeProject(
--     @id INT,
--     @project_status INT
-- ) 

-- AS

-- BEGIN 
--     UPDATE dbo.Projects SET project_status = @project_status
--     WHERE id = @id

-- END;

CREATE PROCEDURE completeProjects 
AS
BEGIN
	SELECT id,project_name,project_desc,project_timeline FROM dbo.Projects WHERE project_status= 1
END