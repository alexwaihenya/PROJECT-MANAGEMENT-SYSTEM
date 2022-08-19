 CREATE PROCEDURE setComplete (@id INT)
AS 
BEGIN
	IF EXISTS (SELECT * FROM dbo.Projects WHERE id= @id AND project_status=0)

	BEGIN
		UPDATE Projects SET project_status = 1 WHERE id= @id;
	END
	ELSE

	BEGIN
		RAISERROR('No pending project with that ProjectId',11,1);
	END
END