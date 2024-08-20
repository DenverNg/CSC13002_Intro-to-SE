
GO
use SEBANK


# Delete table
DROP TABLE IF EXISTS DONVI_TOITHIEU;
DROP TABLE IF EXISTS PHIEUGUITIEN;
DROP TABLE IF EXISTS PHIEURUTTIEN;
DROP TABLE IF EXISTS SOTIETKIEM;
DROP TABLE IF EXISTS LOAI_SOTK;
DROP TABLE IF EXISTS KHACHHANG;

# Delete procedure
DROP PROCEDURE IF EXISTS MOSOTIETKIEM;
DROP PROCEDURE IF EXISTS LAPPHIEUGUI;
DROP PROCEDURE IF EXISTS LAPPHIEURUT;
DROP PROCEDURE IF EXISTS TRACUUSO;
DROP PROCEDURE IF EXISTS BAOCAO_NGAY;
DROP PROCEDURE IF EXISTS BAOCAO_THANG;

# Create Table
CREATE TABLE KHACHHANG (
	MAKH INT PRIMARY KEY,
	HOTEN NVARCHAR(100),
	DIACHI NVARCHAR(100),
	CMND CHAR(12) UNIQUE
);
CREATE TABLE LOAI_SOTK (
	MALOAI INT PRIMARY KEY,
	KYHAN NCHAR(20),
	LAISUAT FLOAT,
	TRANGTHAI INT
);
CREATE TABLE SOTIETKIEM (
	MASO CHAR(8) PRIMARY KEY,
	MAKH INT,
	SODU INT,
	LOAI INT, 
	NGAYMOSO DATE, 
	TRANGTHAI INT,
	NGAYDONGSO DATE
);
CREATE TABLE PHIEUGUITIEN(
	MAPHIEUGUI INT PRIMARY KEY,
	MASO CHAR(8), 
	NGAYGUI DATE,
	SOTIEN INT,
	MAKH INT
);
CREATE TABLE PHIEURUTTIEN(
	MAPHIEURUT INT PRIMARY KEY,
	MASO CHAR(8), 
	NGAYRUT DATE,
	SOTIEN INT,
	TIENLAI INT,
	MAKH INT
);
CREATE TABLE DONVI_TOITHIEU(
	TEN CHAR(10) PRIMARY KEY,
	GIATRI INT
);
-- TẠO KHOÁ NGOẠI
ALTER TABLE SOTIETKIEM
ADD CONSTRAINT FK_SOTK_KH FOREIGN KEY (MAKH) REFERENCES KHACHHANG(MAKH),
ADD CONSTRAINT FK_SOTK_LOAI FOREIGN KEY (LOAI) REFERENCES LOAI_SOTK(MALOAI);

ALTER TABLE PHIEUGUITIEN
ADD CONSTRAINT FK_PHIEUGUI_KH FOREIGN KEY (MAKH) REFERENCES KHACHHANG(MAKH),
ADD CONSTRAINT FK_PHIEUGUI_STK FOREIGN KEY (MASO) REFERENCES SOTIETKIEM(MASO);

ALTER TABLE PHIEURUTTIEN
ADD CONSTRAINT FK_PHIEURUT_KH FOREIGN KEY (MAKH) REFERENCES KHACHHANG(MAKH),
ADD CONSTRAINT FK_PHIEURUT_STK FOREIGN KEY (MASO) REFERENCES SOTIETKIEM(MASO);

-- Thêm các loại tiết kiệm
INSERT INTO LOAI_SOTK (MALOAI, KYHAN, LAISUAT, TRANGTHAI)
VALUES
    (0, 'KHÔNG KỲ HẠN', 0.0015, 1),
    (3, 'KỲ HẠN 3 THÁNG', 0.005, 1),
    (6, 'KỲ HẠN 6 THÁNG', 0.0055, 1);

-- Thêm các đơn vị tối thiểu
INSERT INTO DONVI_TOITHIEU (TEN, GIATRI)
VALUES
    ('SOTIENGUI', 100000),
    ('THOIGIAN',  15);

DELIMITER //

CREATE FUNCTION TAO_MASO()
RETURNS CHAR(8)
BEGIN
    DECLARE new_maso CHAR(8);
    DECLARE current_max CHAR(8);

    -- Lấy mã số lớn nhất hiện có
    SELECT MAX(MASO) INTO current_max FROM SOTIETKIEM;

    -- Nếu không có mã số nào, bắt đầu từ 'MS000000'
    IF current_max IS NULL THEN
        SET new_maso = 'MS000000';
    ELSE
        -- Tăng mã số hiện tại và định dạng lại
        SET new_maso = CONCAT(
            'MS', 
            LPAD(CAST(SUBSTRING(current_max, 3) AS UNSIGNED) + 1, 6, '0')
        );
    END IF;

    RETURN new_maso;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE MOSOTIETKIEM(
    IN p_LOAITK INT,
    IN p_TENKH NVARCHAR(100),
    IN p_CMND CHAR(12),
    IN p_DIACHI NVARCHAR(100),
    IN p_NGAYMOSO DATE,
    IN p_SOTIEN INT
)
BEGIN
    DECLARE v_MAKH INT;
    DECLARE v_MASO CHAR(8);
    DECLARE v_min_amount INT;

    -- KIỂM TRA TÍNH HỢP LỆ
    IF p_LOAITK NOT IN (SELECT MALOAI FROM LOAI_SOTK) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Loại tiết kiệm không hợp lệ';
    END IF;

    IF p_NGAYMOSO < CURDATE() THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ngày mở sổ không hợp lệ';
    END IF;

    SELECT GIATRI INTO v_min_amount FROM DONVI_TOITHIEU WHERE TEN = 'SOTIENGUI';
    IF p_SOTIEN < v_min_amount THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Số tiền gửi không hợp lệ';
    END IF;

    -- Cập nhật bảng KHÁCH HÀNG
    IF p_CMND NOT IN (SELECT CMND FROM KHACHHANG) THEN
        IF NOT EXISTS (SELECT 1 FROM KHACHHANG) THEN
            SET v_MAKH = 0;
        ELSE
            SELECT MAX(MAKH) + 1 INTO v_MAKH FROM KHACHHANG;
        END IF;
        INSERT INTO KHACHHANG (MAKH, HOTEN, DIACHI, CMND) VALUES (v_MAKH, p_TENKH, p_DIACHI, p_CMND);
    ELSE
        SELECT MAKH INTO v_MAKH FROM KHACHHANG WHERE CMND = p_CMND;
    END IF;

    -- Cập nhật bảng SỔ TIẾT KIỆM
    SET v_MASO = TAO_MASO();
    INSERT INTO SOTIETKIEM (MASO, MAKH, SODU, LOAI, NGAYMOSO, TRANGTHAI) VALUES (v_MASO, v_MAKH, p_SOTIEN, p_LOAITK, p_NGAYMOSO, 1);

    -- Kết thúc thủ tục
END //

DELIMITER ;
GO
DELIMITER //

CREATE PROCEDURE LAPPHIEUGUI(
    IN p_MASO CHAR(8),
    IN p_NGAYGUI DATE,
    IN p_SOTIEN INT
)
BEGIN
    DECLARE v_LOAITK INT;
    DECLARE v_MAPHIEUGUI INT;

    -- KIỂM TRA TÍNH HỢP LỆ
    IF NOT EXISTS (SELECT 1 FROM SOTIETKIEM WHERE MASO = p_MASO AND TRANGTHAI = 1) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Mã sổ không hợp lệ';
    END IF;

    SELECT LOAI INTO v_LOAITK FROM SOTIETKIEM WHERE MASO = p_MASO;
    IF v_LOAITK != 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Loại tiết kiệm không hợp lệ';
    END IF;

    IF p_NGAYGUI < CURDATE() - INTERVAL 1 DAY THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ngày gửi tiền không hợp lệ';
    END IF;

    IF p_SOTIEN < (SELECT GIATRI FROM DONVI_TOITHIEU WHERE TEN = 'SOTIENGUI') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Số tiền gửi không hợp lệ';
    END IF;

    -- Xác định mã phiếu gửi
    SELECT COALESCE(MAX(MAPHIEUGUI), 0) + 1 INTO v_MAPHIEUGUI FROM PHIEUGUITIEN;

    INSERT INTO PHIEUGUITIEN (MAPHIEUGUI, MASO, NGAYGUI, SOTIEN) VALUES (v_MAPHIEUGUI, p_MASO, p_NGAYGUI, p_SOTIEN);
    
    UPDATE SOTIETKIEM
    SET SODU = SODU + p_SOTIEN
    WHERE MASO = p_MASO;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE LAPPHIEURUT(
    IN p_MASO CHAR(8),
    IN p_NGAYRUT DATE,
    IN p_SOTIEN INT
)
BEGIN
    DECLARE v_NGAYMOSO DATE;
    DECLARE v_LOAITK INT;
    DECLARE v_THOIGIANGUI INT;
    DECLARE v_TIENLAI DECIMAL(15, 2);
    DECLARE v_MAPHIEURUT INT;
    DECLARE v_SOLANDAOHAN INT;

    -- KIỂM TRA TÍNH HỢP LỆ
    IF NOT EXISTS (SELECT 1 FROM SOTIETKIEM WHERE MASO = p_MASO AND TRANGTHAI = 1) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Mã sổ không hợp lệ';
    END IF;

    IF p_NGAYRUT < CURDATE() - INTERVAL 1 DAY THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ngày rút tiền không hợp lệ';
    END IF;

    SELECT NGAYMOSO INTO v_NGAYMOSO FROM SOTIETKIEM WHERE MASO = p_MASO;
    IF DATEDIFF(p_NGAYRUT, v_NGAYMOSO) < (SELECT GIATRI FROM DONVI_TOITHIEU WHERE TEN = 'THOIGIAN') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Chưa đủ thời gian gửi tối thiểu';
    END IF;

    SET v_THOIGIANGUI = TIMESTAMPDIFF(MONTH, v_NGAYMOSO, p_NGAYRUT);
    IF DATE_ADD(v_NGAYMOSO, INTERVAL v_THOIGIANGUI MONTH) > p_NGAYRUT THEN
        SET v_THOIGIANGUI = v_THOIGIANGUI - 1;
    END IF;

    SELECT LOAI INTO v_LOAITK FROM SOTIETKIEM WHERE MASO = p_MASO;

    -- Xác định mã phiếu rút
    SELECT COALESCE(MAX(MAPHIEURUT), 0) + 1 INTO v_MAPHIEURUT FROM PHIEURUTTIEN;

    IF v_LOAITK = 0 AND p_SOTIEN <= (SELECT SODU FROM SOTIETKIEM WHERE MASO = p_MASO) THEN
        IF v_THOIGIANGUI >= 1 THEN
            SET v_TIENLAI = (SELECT LAISUAT FROM LOAI_SOTK WHERE MALOAI = v_LOAITK) * p_SOTIEN;
        ELSE
            SET v_TIENLAI = 0;
        END IF;
        INSERT INTO PHIEURUTTIEN (MAPHIEURUT, MASO, NGAYRUT, SOTIEN, TIENLAI) VALUES (v_MAPHIEURUT, p_MASO, p_NGAYRUT, p_SOTIEN, v_TIENLAI);
    ELSEIF v_LOAITK != 0 AND p_SOTIEN = (SELECT SODU FROM SOTIETKIEM WHERE MASO = p_MASO) THEN
        SET v_SOLANDAOHAN = FLOOR(v_THOIGIANGUI / v_LOAITK);
        IF v_SOLANDAOHAN >= 1 THEN
	        SET v_TIENLAI = (SELECT LAISUAT FROM LOAI_SOTK WHERE MALOAI = v_LOAITK) * p_SOTIEN * v_SOLANDAOHAN;
	        INSERT INTO PHIEURUTTIEN (MAPHIEURUT, MASO, NGAYRUT, SOTIEN, TIENLAI) VALUES (v_MAPHIEURUT, p_MASO, p_NGAYRUT, p_SOTIEN, v_TIENLAI);
	    ELSE
	    	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Chưa đủ thời gian đáo hạn';
	   	END IF;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rút tiền không thành công';
    END IF;

    UPDATE SOTIETKIEM
    SET SODU = SODU - p_SOTIEN
    WHERE MASO = p_MASO;

    UPDATE SOTIETKIEM
    SET TRANGTHAI = 0, NGAYDONGSO = p_NGAYRUT
    WHERE SODU = 0;
END //

DELIMITER ;
DELIMITER //

CREATE PROCEDURE TRACUUSO(
    IN p_INPUT NVARCHAR(100)
)
BEGIN
    SELECT 
        STK.MASO, 
        L.KYHAN,  
        KH.HOTEN, 
        STK.SODU, 
        STK.TRANGTHAI
    FROM 
        SOTIETKIEM STK
    JOIN 
        KHACHHANG KH ON KH.MAKH = STK.MAKH
    JOIN 
        LOAI_SOTK L ON L.MALOAI = STK.LOAI
    WHERE 
        p_INPUT = KH.CMND OR 
        p_INPUT = STK.MASO OR 
        KH.HOTEN LIKE CONCAT('%', p_INPUT, '%');
END //

DELIMITER ;
--Báo cáo hoạt động ngày
DELIMITER //

CREATE PROCEDURE BAOCAO_NGAY(
    IN p_NGAY DATE
)
BEGIN
    SELECT 
        L.KYHAN, 
        COALESCE(TONGTHU.TONGTHU, 0) AS TONGTHU, 
        COALESCE(TONGCHI.TONGCHI, 0) AS TONGCHI, 
        COALESCE(TONGTHU.TONGTHU, 0) - COALESCE(TONGCHI.TONGCHI, 0) AS CHENHLECH
    FROM 
        LOAI_SOTK L 
    LEFT JOIN 
        (SELECT 
            S.LOAI, 
            SUM(PGT.SOTIEN) AS TONGTHU
         FROM 
            PHIEUGUITIEN PGT
         JOIN 
            SOTIETKIEM S ON PGT.MASO = S.MASO
         WHERE 
            p_NGAY = PGT.NGAYGUI
         GROUP BY 
            S.LOAI
        ) AS TONGTHU ON L.MALOAI = TONGTHU.LOAI 
    LEFT JOIN 
        (SELECT 
            S.LOAI, 
            SUM(PRT.SOTIEN) AS TONGCHI
         FROM 
            PHIEURUTTIEN PRT
         JOIN 
            SOTIETKIEM S ON PRT.MASO = S.MASO
         WHERE 
            p_NGAY = PRT.NGAYRUT
         GROUP BY 
            S.LOAI
        ) AS TONGCHI ON L.MALOAI = TONGCHI.LOAI;
END //

DELIMITER ;

--Báo cáo tháng
DELIMITER //

CREATE PROCEDURE BAOCAO_THANG(IN THANG INT, IN TENKYHAN NCHAR(20))
BEGIN
	DECLARE NAM INT DEFAULT YEAR(CURDATE());
	DECLARE LOAI INT;
	DECLARE SONGAYTRONGTHANG INT;
	SET SONGAYTRONGTHANG = DAY(LAST_DAY(CONCAT(NAM, '-',THANG,'-01')));
	SELECT MALOAI INTO LOAI FROM LOAI_SOTK WHERE TENKYHAN = KYHAN;
   	SELECT THANG, NAM, LOAI;
      CREATE TEMPORARY TABLE NGAYTRONGTHANG (
	    num INT
	);
	INSERT INTO NGAYTRONGTHANG (num)
	SELECT @rownum := @rownum + 1 AS num
	FROM information_schema.columns a, information_schema.columns b, (SELECT @rownum := 0) r
	LIMIT SONGAYTRONGTHANG;
   
	 -- Tạo bảng tạm để lưu kết quả từ các subquery
	CREATE TEMPORARY TABLE BANGSOMO AS
	SELECT N.num, S.NGAYMOSO, COUNT(S.MASO) as SOMO
	FROM NGAYTRONGTHANG N
	LEFT JOIN SOTIETKIEM S ON S.LOAI = LOAI 
	    AND MONTH(S.NGAYMOSO) = THANG 
	    AND YEAR(S.NGAYMOSO) = NAM 
	    AND N.num = DAY(S.NGAYMOSO) 
	    AND S.TRANGTHAI = 1
	GROUP BY N.num, S.NGAYMOSO;
	
	CREATE TEMPORARY TABLE BANGSODONG AS
	SELECT N2.num, S2.NGAYDONGSO, COUNT(S2.MASO) as SODONG
	FROM NGAYTRONGTHANG N2
	LEFT JOIN SOTIETKIEM S2 ON S2.LOAI = LOAI 
	    AND MONTH(S2.NGAYDONGSO) = THANG 
	    AND YEAR(S2.NGAYDONGSO) = NAM
	    AND N2.num = DAY(S2.NGAYDONGSO) 
	    AND S2.TRANGTHAI = 0
	GROUP BY N2.num, S2.NGAYDONGSO;
	
	SELECT * FROM BANGSOMO;
	SELECT * FROM BANGSODONG;
	
	
	-- Thực hiện phép nối giữa các bảng tạm
	SELECT CONCAT(BANGSOMO.NUM, THANG, NAM) AS NGAY, BANGSOMO.SOMO, BANGSODONG.SODONG, BANGSOMO.SOMO - BANGSODONG.SODONG AS CHENHLECH
	FROM BANGSOMO
	JOIN BANGSODONG ON BANGSOMO.num = BANGSODONG.num;
	
	-- Xóa các bảng tạm sau khi sử dụng
	DROP TEMPORARY TABLE BANGSOMO;
	DROP TEMPORARY TABLE BANGSODONG;
	DROP TEMPORARY TABLE NGAYTRONGTHANG;
END //
DELIMITER ;



--TEST
CALL MOSOTIETKIEM(3, 'Cường', '1234', 'aBC', '2024-08-22', 1000000);
CALL MOSOTIETKIEM(0, 'Anh', '22082004', 'aAC', '2024-08-20', 1000000);
CALL MOSOTIETKIEM(0, 'CƯỜNG', '523123', 'aC', '2024-09-30', 1000000);
CALL LAPPHIEUGUI('MS000002', '2024-09-06', 500000);
CALL LAPPHIEURUT('MS000000', '2024-12-18', 1000000);
CALL LAPPHIEURUT('MS000001', '2025-08-20', 500000);
CALL TRACUUSO('CƯỜNG');
CALL BAOCAO_NGAY('2024-10-18');
CALL BAOCAO_THANG(8, 'KỲ HẠN 3 THÁNG');



SHOW PROCEDURE STATUS WHERE Db = 'SEBANK';
SELECT * FROM DONVI_TOITHIEU
SELECT * FROM LOAI_SOTK
SELECT * FROM KHACHHANG
SELECT * FROM SOTIETKIEM
SELECT * FROM PHIEUGUITIEN
SELECT * FROM PHIEURUTTIEN