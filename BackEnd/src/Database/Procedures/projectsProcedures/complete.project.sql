CREATE PROCEDURE completeProject(
    @id INT,
    @project_status INT
) 

AS

BEGIN 
    UPDATE dbo.Projects SET project_status = @project_status
    WHERE id = @id

END;