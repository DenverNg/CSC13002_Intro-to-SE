﻿use master
IF DB_ID('SEBANK') IS NOT NULL
    DROP DATABASE SEBANK

GO
CREATE Database SEBANK

GO
use SEBANK


--Tạo bảng
DROP TABLE DONVI_TOITHIEU
DROP TABLE PHIEUGUITIEN
DROP TABLE PHIEURUTTIEN
DROP TABLE SOTIETKIEM
DROP TABLE LOAI_SOTK
DROP TABLE KHACHHANG
CREATE TABLE KHACHHANG (
	MAKH INT PRIMARY KEY,
	HOTEN NVARCHAR(100),
	DIACHI NVARCHAR(100),
	CMND CHAR(12) UNIQUE
)
CREATE TABLE LOAI_SOTK (
	MALOAI INT PRIMARY KEY, --KKH:0 --3M:3 --6M:6
	KYHAN NCHAR(20),
	LAISUAT FLOAT
)
CREATE TABLE SOTIETKIEM (
	MASO CHAR(8) PRIMARY KEY,
	MAKH INT,
	SODU INT,
	LOAI INT, 
	NGAYMOSO DATE, 
	TRANGTHAI INT, --Close: 0 --Open:1
)
CREATE TABLE PHIEUGUITIEN(
	MAPHIEUGUI INT PRIMARY KEY,
	MASO CHAR(8), 
	MAKH INT,
	NGAYGUI DATE,
	SOTIEN INT
)
CREATE TABLE PHIEURUTTIEN(
	MAPHIEURUT INT PRIMARY KEY,
	MASO CHAR(8), 
	MAKH INT,
	NGAYRUT DATE,
	SOTIEN INT,
	TIENLAI INT
)
CREATE TABLE DONVI_TOITHIEU(
	TEN CHAR(10) PRIMARY KEY,
	GIATRI INT
)
SET DATEFORMAT DMY
--TẠO KHOÁ NGOẠI
ALTER TABLE SOTIETKIEM
ADD
	CONSTRAINT FK_SOTK_KH
	FOREIGN KEY (MAKH)
	REFERENCES KHACHHANG,

	CONSTRAINT FK_SOTK_LOAI
	FOREIGN KEY (LOAI)
	REFERENCES LOAI_SOTK

ALTER TABLE PHIEUGUITIEN
ADD
	CONSTRAINT FK_PHIEUGUI_KH
	FOREIGN KEY (MAKH)
	REFERENCES KHACHHANG,

	CONSTRAINT FK_PHIEUGUI_STK
	FOREIGN KEY (MASO)
	REFERENCES SOTIETKIEM

ALTER TABLE PHIEURUTTIEN
ADD
	CONSTRAINT FK_PHIEURUT_KH
	FOREIGN KEY (MAKH)
	REFERENCES KHACHHANG,

	CONSTRAINT FK_PHIEURUT_STK
	FOREIGN KEY (MASO)
	REFERENCES SOTIETKIEM
GO
--Thêm các loại tiết kiệm
INSERT LOAI_SOTK(MALOAI, KYHAN, LAISUAT)
VALUES
	(0, N'KHÔNG KỲ HẠN', 0.0015),
	(3, N'3 THÁNG', 0.005),
	(6, N'6 THÁNG', 0.0055)
--Thêm các đơn vị tối thiểu
INSERT DONVI_TOITHIEU(TEN, GIATRI)
VALUES
	('SOTIENGUI', 100000),
	('THOIGIAN',  15)
GO
--Tạo mã sổ mới
CREATE OR ALTER FUNCTION dbo.TAO_MASO()
RETURNS CHAR(8)
AS
BEGIN
    DECLARE @MASO CHAR(8);

    SELECT @MASO = 'MS' + RIGHT('000000' + CAST(MAX(CAST(SUBSTRING(MASO, 3, 6) AS INT) + 1) AS VARCHAR(6)), 6)
    FROM SOTIETKIEM;
    RETURN @MASO;
END;

GO
--Mở sổ tiết kiệm
CREATE OR ALTER PROCEDURE MOSOTIETKIEM
	@LOAITK INT,
	@TENKH NVARCHAR(100),
	@CMND CHAR(12),
	@DIACHI NVARCHAR(100),
	@NGAYMOSO DATE,
	@SOTIEN INT
AS
BEGIN
	-- KIỂM TRA TÍNH HỢP LỆ
	IF @LOAITK NOT IN (SELECT MALOAI FROM LOAI_SOTK)
		BEGIN
			RAISERROR(N'Loại tiết kiệm không hợp lệ', 16, 1);
			RETURN; 
		END
	IF @NGAYMOSO < GETDATE() - 1
		BEGIN
			RAISERROR(N'Ngày mở sổ không hợp lệ', 16, 1);
			RETURN;  
		END
	IF @SOTIEN < (SELECT GIATRI FROM DONVI_TOITHIEU WHERE TEN = 'SOTIENGUI')
		BEGIN
			RAISERROR(N'Số tiền gửi không hợp lệ', 16, 1);
			RETURN; 
		END

	--Cập nhật bảng KHÁCH HÀNG
	DECLARE @MAKH INT;
	IF @CMND NOT IN (SELECT CMND FROM KHACHHANG)
		BEGIN
		IF NOT EXISTS (SELECT 1 FROM KHACHHANG)
			SET @MAKH = 0;
		ELSE SET @MAKH = (SELECT MAX(MAKH) FROM KHACHHANG) + 1 
		INSERT KHACHHANG(MAKH, HOTEN, DIACHI, CMND) VALUES (@MAKH, @TENKH, @DIACHI, @CMND);
		END
	ELSE
		SET @MAKH = (SELECT MAKH FROM KHACHHANG WHERE CMND = @CMND);
	
	--Cập nhật bảng SỔ TIẾT KIỆM
	DECLARE @MASO CHAR(8)
	IF NOT EXISTS (SELECT 1 FROM SOTIETKIEM)
		SET @MASO = 'MS000000';
	ELSE SET @MASO = dbo.TAO_MASO();
	INSERT SOTIETKIEM(MASO, MAKH, SODU, LOAI, NGAYMOSO, TRANGTHAI) VALUES (@MASO, @MAKH, @SOTIEN, @LOAITK, @NGAYMOSO, 1)
	RETURN;
END
GO
--Lập phiếu gửi tiền
CREATE OR ALTER PROCEDURE LAPPHIEUGUI
	@MASO CHAR(8),
	@MAKH INT,
	@NGAYGUI DATE,
	@SOTIEN INT
AS
BEGIN
	--KIỂM TRA TÍNH HỢP LỆ
	IF @MASO NOT IN (SELECT MASO FROM SOTIETKIEM WHERE TRANGTHAI = 1)
		BEGIN
			RAISERROR(N'Mã sổ không hợp lệ', 16, 1);
			RETURN; 
		END
	IF @MAKH NOT IN (SELECT MAKH FROM KHACHHANG)
		BEGIN
			RAISERROR(N'Mã khách hàng không hợp lệ', 16, 1);
			RETURN; 
		END
	 DECLARE @LOAITK INT;
	 SET @LOAITK= (SELECT LOAI FROM SOTIETKIEM WHERE @MASO = MASO )
	 IF @LOAITK != 0
			BEGIN
				RAISERROR(N'Loại tiết kiệm không hợp lệ', 16, 1);
				RETURN;  
			END
	IF @NGAYGUI < GETDATE() - 1
		BEGIN
			RAISERROR(N'Ngày gửi tiền không hợp lệ', 16, 1);
			RETURN;  
		END
	IF @SOTIEN < (SELECT GIATRI FROM DONVI_TOITHIEU WHERE TEN = 'SOTIENGUI')
		BEGIN
			RAISERROR(N'Số tiền gửi không hợp lệ', 16, 1);
			RETURN; 
		END


	 DECLARE @MAPHIEUGUI INT;
	 IF NOT EXISTS (SELECT 1 FROM PHIEUGUITIEN)
		SET @MAPHIEUGUI = 0;
	 ELSE SET @MAPHIEUGUI = (SELECT MAX(MAPHIEUGUI) FROM PHIEUGUITIEN) + 1;

	INSERT PHIEUGUITIEN (MAPHIEUGUI, MASO, MAKH, NGAYGUI, SOTIEN) VALUES (@MAPHIEUGUI, @MASO, @MAKH, @NGAYGUI, @SOTIEN)
	
	UPDATE SOTIETKIEM
	SET SODU = SODU + @SOTIEN
	WHERE MASO = @MASO

	RETURN;	
END
GO
--Lập phiếu rút tiền
CREATE OR ALTER PROCEDURE LAPPHIEURUT
	@MASO CHAR(8),
	@MAKH INT,
	@NGAYRUT DATE,
	@SOTIEN INT
AS
BEGIN
	--KIỂM TRA TÌNH HỢP LỆ
	IF @MASO NOT IN (SELECT MASO FROM SOTIETKIEM WHERE TRANGTHAI = 1)
		BEGIN
			RAISERROR(N'Mã sổ không hợp lệ', 16, 1);
			RETURN; 
		END
	IF @MAKH NOT IN (SELECT MAKH FROM KHACHHANG)
		BEGIN
			RAISERROR(N'Mã khách hàng không hợp lệ', 16, 1);
			RETURN; 
		END
	
	IF @NGAYRUT < GETDATE() - 1
		BEGIN
			RAISERROR(N'Ngày rút tiền không hợp lệ', 16, 1);
			RETURN;  
		END
	DECLARE @NGAYMOSO DATE = (SELECT NGAYMOSO FROM SOTIETKIEM WHERE @MASO = MASO)
	IF DATEDIFF(DAY, @NGAYMOSO , @NGAYRUT) < (SELECT GIATRI FROM DONVI_TOITHIEU WHERE TEN = 'THOIGIAN')
		BEGIN
			RAISERROR(N'Chưa đủ thời gian gửi tối thiểu', 16, 1);
			RETURN;  
		END

	DECLARE @TIENLAI FLOAT;
	DECLARE @THOIGIANGUI INT = DATEDIFF(MONTH, @NGAYMOSO ,@NGAYRUT);
	IF DATEADD(MONTH, @THOIGIANGUI, @NGAYMOSO) > @NGAYRUT --KIEM TRA DA DU THANG HAY CHUA
		SET @THOIGIANGUI = @THOIGIANGUI - 1; 
	DECLARE @LOAITK INT;
	SET @LOAITK= (SELECT LOAI FROM SOTIETKIEM WHERE @MASO = MASO )
	DECLARE @MAPHIEURUT INT

	IF NOT EXISTS (SELECT 1 FROM PHIEURUTTIEN)
		SET @MAPHIEURUT = 0;
	ELSE SET @MAPHIEURUT = (SELECT MAX(MAPHIEURUT) FROM PHIEURUTTIEN) + 1;

	IF @LOAITK = 0 AND @SOTIEN <= (SELECT SODU FROM SOTIETKIEM WHERE @MASO = MASO ) 
		BEGIN
			IF @THOIGIANGUI >= 1 
				SET @TIENLAI = (SELECT LAISUAT FROM LOAI_SOTK WHERE @LOAITK = MALOAI) * @SOTIEN;
			ELSE SET @TIENLAI = 0;
			INSERT PHIEURUTTIEN(MAPHIEURUT, MASO, MAKH, NGAYRUT, SOTIEN, TIENLAI) VALUES (@MAPHIEURUT, @MASO, @MAKH, @NGAYRUT, @SOTIEN, @TIENLAI)
		END
	ELSE IF @LOAITK != 0 AND @SOTIEN = (SELECT SODU FROM SOTIETKIEM WHERE @MASO = MASO )
		BEGIN
			DECLARE @SOLANDAOHAN INT;
			SET @SOLANDAOHAN = FLOOR(@THOIGIANGUI / @LOAITK);
			SET @TIENLAI = (SELECT LAISUAT FROM LOAI_SOTK WHERE @LOAITK = MALOAI) * @SOTIEN * @SOLANDAOHAN;
			INSERT PHIEURUTTIEN(MAPHIEURUT, MASO, MAKH, NGAYRUT, SOTIEN, TIENLAI) VALUES (@MAPHIEURUT, @MASO, @MAKH, @NGAYRUT, @SOTIEN, @TIENLAI)
		END
	ELSE
		BEGIN
			RAISERROR(N'Rút tiền không thành công', 16, 1);
			RETURN;  
		END

	UPDATE SOTIETKIEM
	SET SODU = SODU - @SOTIEN
	WHERE MASO = @MASO

	UPDATE SOTIETKIEM
	SET TRANGTHAI = 0
	WHERE SODU = 0 

	RETURN;
END
GO




--TEST
EXEC MOSOTIETKIEM 3,N'cường','01112122','aBC','19/07/2024',1000000
EXEC MOSOTIETKIEM 0,N'DUY','0123123','aAC','20/07/2024',1000000
EXEC MOSOTIETKIEM 0,N'nghia','523123','aC','30/07/2024',1000000
EXEC LAPPHIEUGUI 'MS000000', 0, '20/07/2024',200000
EXEC LAPPHIEUGUI 'MS000001', 1, '20/07/2024',500000
EXEC LAPPHIEURUT 'MS000000', 0, '18/10/2024',1000000
EXEC LAPPHIEURUT 'MS000001', 1, '20/08/2024',500000

SELECT * FROM DONVI_TOITHIEU
SELECT * FROM LOAI_SOTK
SELECT * FROM KHACHHANG
SELECT * FROM SOTIETKIEM
SELECT * FROM PHIEUGUITIEN
SELECT * FROM PHIEURUTTIEN