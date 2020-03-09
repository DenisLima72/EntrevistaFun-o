﻿CREATE PROC FI_SP_IncBenef
    @CPF           VARCHAR (11),
	@NOME          VARCHAR (50),
	@IDCLIENTE			BIGINT
AS
BEGIN
	INSERT INTO BENEFICIARIOS (CPF , NOME , IDCLIENTE)
	VALUES (@CPF , @NOME , @IDCLIENTE) 
		
	
	SELECT SCOPE_IDENTITY()
END
go
CREATE PROC FI_SP_DelBenef
	@ID			BIGINT
AS
BEGIN
	DELETE FROM BENEFICIARIOS
	WHERE ID = @ID
END
GO

CREATE PROC FI_SP_ConsBenef
	@IDCLIENTE BIGINT
AS
BEGIN
SELECT ID,CPF,NOME,IDCLIENTE FROM BENEFICIARIOS
WHERE IDCLIENTE = @IDCLIENTE

END