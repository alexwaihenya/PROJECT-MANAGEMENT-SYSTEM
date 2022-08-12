CREATE PROCEDURE assignProject(
    @id INT,
    @user_id INT
) 

AS

BEGIN 
    UPDATE dbo.Projects SET user_id = @user_id
    WHERE id = @id

END;