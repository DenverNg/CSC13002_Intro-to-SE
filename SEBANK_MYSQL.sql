use SEBANK


# Delete table
DROP TABLE IF EXISTS DONVI_TOITHIEU;
DROP TABLE IF EXISTS PHIEUGUITIEN;
DROP TABLE IF EXISTS PHIEURUTTIEN;
DROP TABLE IF EXISTS SOTIETKIEM;
DROP TABLE IF EXISTS LOAI_SOTK;
DROP TABLE IF EXISTS KHACHHANG;
DROP TABLE IF EXISTS PASS;

# Delete procedure
DROP PROCEDURE IF EXISTS MOSOTIETKIEM;
DROP PROCEDURE IF EXISTS LAPPHIEUGUI;
DROP PROCEDURE IF EXISTS LAPPHIEURUT;
DROP PROCEDURE IF EXISTS TRACUUSO;
DROP PROCEDURE IF EXISTS BAOCAO_NGAY;
DROP PROCEDURE IF EXISTS BAOCAO_THANG;
DROP PROCEDURE IF EXISTS SOTIENRUT_TRONGTUAN;
DROP PROCEDURE IF EXISTS SOTIENGUI_TRONGTUAN;

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
CREATE TABLE SOTIETKIEM(
	MASO CHAR(8) PRIMARY KEY,
	MAKH INT,
	SODU INT,
	LOAI INT, 
	NGAYMOSO DATE, 
	TRANGTHAI INT,
	NGAYDONGSO DATE,
	LAISUAT FLOAT,
	NGAYGUIGANNHAT DATE
);
CREATE TABLE PHIEUGUITIEN(
	MAPHIEUGUI INT PRIMARY KEY,
	MASO CHAR(8), 
	NGAYGUI DATE,
	SOTIEN INT
);

CREATE TABLE PHIEURUTTIEN(
	MAPHIEURUT INT PRIMARY KEY,
	MASO CHAR(8), 
	NGAYRUT DATE,
	SOTIEN INT,
	TIENLAI INT
);
CREATE TABLE DONVI_TOITHIEU(
	TEN CHAR(10) PRIMARY KEY,
	GIATRI INT
);
CREATE TABLE PASS (
  id INT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- TẠO KHOÁ NGOẠI
ALTER TABLE SOTIETKIEM
ADD CONSTRAINT FK_SOTK_KH FOREIGN KEY (MAKH) REFERENCES KHACHHANG(MAKH),
ADD CONSTRAINT FK_SOTK_LOAI FOREIGN KEY (LOAI) REFERENCES LOAI_SOTK(MALOAI);

ALTER TABLE PHIEUGUITIEN
ADD CONSTRAINT FK_PHIEUGUI_STK FOREIGN KEY (MASO) REFERENCES SOTIETKIEM(MASO);

ALTER TABLE PHIEURUTTIEN
ADD CONSTRAINT FK_PHIEURUT_STK FOREIGN KEY (MASO) REFERENCES SOTIETKIEM(MASO);

-- Thêm các loại tiết kiệm
INSERT INTO LOAI_SOTK (MALOAI, KYHAN, LAISUAT, TRANGTHAI)
VALUES
    (0, 'Không kỳ hạn', 0.0015, 1),
    (3, 'Kỳ hạn 3 tháng', 0.005, 1),
    (6, 'Kỳ hạn 6 tháng', 0.0055, 1);

-- Thêm các đơn vị tối thiểu
INSERT INTO DONVI_TOITHIEU (TEN, GIATRI)
VALUES
    ('SOTIENGUI', 100000),
    ('THOIGIAN',  15);

DELIMITER //

CREATE PROCEDURE MOSOTIETKIEM(
	IN p_MASO CHAR(8),
    IN p_KYHAN NCHAR(20),
    IN p_TENKH NVARCHAR(100),
    IN p_CMND CHAR(12),
    IN p_DIACHI NVARCHAR(100),
    IN p_NGAYMOSO DATE,
    IN p_SOTIEN INT
)
BEGIN
    DECLARE v_MAKH INT;
    DECLARE v_LOAITK INT;
    DECLARE v_min_amount INT;
    DECLARE v_LAISUAT FLOAT;

    -- KIỂM TRA TÍNH HỢP LỆ
    SELECT MALOAI INTO v_LOAITK FROM LOAI_SOTK WHERE KYHAN = p_KYHAN AND TRANGTHAI = 1;
    IF v_LOAITK IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Kỳ hạn không hợp lệ';
    END IF;

    IF p_NGAYMOSO < CURDATE() THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ngày mở sổ không hợp lệ';
    END IF;

    SELECT GIATRI INTO v_min_amount FROM DONVI_TOITHIEU WHERE TEN = 'SOTIENGUI';
    IF p_SOTIEN < v_min_amount THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Số tiền gửi không hợp lệ';
    END IF;
   
   SELECT LAISUAT INTO v_LAISUAT FROM LOAI_SOTK WHERE KYHAN = p_KYHAN AND TRANGTHAI = 1;

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
    INSERT INTO SOTIETKIEM (MASO, MAKH, SODU, LOAI, NGAYMOSO, TRANGTHAI, LAISUAT, NGAYGUIGANNHAT) 
    VALUES (p_MASO, v_MAKH, p_SOTIEN, v_LOAITK, p_NGAYMOSO, 1, v_LAISUAT, p_NGAYMOSO);

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
    
    UPDATE SOTIETKIEM
    SET NGAYGUIGANNHAT = p_NGAYGUI
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
    DECLARE v_NGAYGUIGANNHAT DATE;
    DECLARE v_LOAITK INT;
    DECLARE v_THOIGIANGUI INT;
    DECLARE v_TIENLAI DECIMAL(15, 2);
    DECLARE v_MAPHIEURUT INT;
    DECLARE v_SOLANDAOHAN INT;
    DECLARE v_SOTIENGUIHOPLE INT;
    DECLARE v_SOTIENHOPLE INT;

    -- KIỂM TRA TÍNH HỢP LỆ
    IF NOT EXISTS (SELECT 1 FROM SOTIETKIEM WHERE MASO = p_MASO AND TRANGTHAI = 1) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Mã sổ không hợp lệ';
    END IF;

    IF p_NGAYRUT < CURDATE() - INTERVAL 1 DAY THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ngày rút tiền không hợp lệ';
    END IF;

    SELECT NGAYGUIGANNHAT, LOAI INTO v_NGAYGUIGANNHAT, v_LOAITK FROM SOTIETKIEM WHERE MASO = p_MASO;
    IF DATEDIFF(p_NGAYRUT, v_NGAYGUIGANNHAT) < (SELECT GIATRI FROM DONVI_TOITHIEU WHERE TEN = 'THOIGIAN') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Chưa đủ thời gian gửi tối thiểu';
    END IF;

    SET v_THOIGIANGUI = TIMESTAMPDIFF(MONTH, v_NGAYGUIGANNHAT, p_NGAYRUT);
    IF DATE_ADD(v_NGAYGUIGANNHAT, INTERVAL v_THOIGIANGUI MONTH) > p_NGAYRUT THEN
        SET v_THOIGIANGUI = v_THOIGIANGUI - 1;
    END IF;
   
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
        (SELECT LOAI, COALESCE(SUM(TongTien), 0) AS TONGTHU
		FROM
		(
		SELECT S.LOAI AS LOAI, SUM(SOTIEN) AS TongTien 
		        FROM PHIEUGUITIEN P
		        JOIN SOTIETKIEM S 
		        WHERE NGAYGUI = p_NGAY AND P.MASO = S.MASO 
		        AND (SELECT NGAYMOSO FROM SOTIETKIEM S WHERE P.MASO = S.MASO) <> NGAYGUI
		        GROUP BY S.LOAI
		UNION ALL
		        SELECT LOAI AS LOAI, SUM(SODU) AS TongTien
		        FROM SOTIETKIEM
		        WHERE NGAYMOSO = p_NGAY
		        GROUP BY LOAI
		) AS RESULTS
		GROUP BY LOAI) AS TONGTHU ON L.MALOAI = TONGTHU.LOAI
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
	SELECT DATE_FORMAT(CONCAT_WS('-', NAM, LPAD(THANG, 2, '0'), LPAD(BANGSOMO.num, 2, '0')), '%d-%m-%Y') AS NGAY,
           BANGSOMO.SOMO, 
           BANGSODONG.SODONG, 
           BANGSOMO.SOMO - BANGSODONG.SODONG AS CHENHLECH
	FROM BANGSOMO
	JOIN BANGSODONG ON BANGSOMO.num = BANGSODONG.num;
	
	-- Xóa các bảng tạm sau khi sử dụng
	DROP TEMPORARY TABLE BANGSOMO;
	DROP TEMPORARY TABLE BANGSODONG;
	DROP TEMPORARY TABLE NGAYTRONGTHANG;
END //
DELIMITER ;

DELIMITER //
-- THỐNG KÊ SỐ TIỀN RÚT TRONG TUẦN
CREATE PROCEDURE SOTIENRUT_TRONGTUAN()
BEGIN
    -- Thực hiện LEFT JOIN với bảng PHIEURUTTIEN
    SELECT 
        w.Ngay AS NGAYRUT, 
        COALESCE(SUM(p.SOTIEN), 0) AS SOTIEN
    FROM (
        -- Tạo danh sách các ngày trong tuần
        SELECT 
            DATE_ADD(CURRENT_DATE(), INTERVAL -WEEKDAY(CURRENT_DATE()) + n DAY) AS Ngay
        FROM (
            SELECT 0 AS n UNION ALL 
            SELECT 1 UNION ALL 
            SELECT 2 UNION ALL 
            SELECT 3 UNION ALL 
            SELECT 4 UNION ALL 
            SELECT 5 UNION ALL 
            SELECT 6
        ) AS Numbers
    ) w
    LEFT JOIN 
        PHIEURUTTIEN p 
    ON 
        w.Ngay = p.NGAYRUT
    GROUP BY 
        w.Ngay
    ORDER BY 
        w.Ngay;
END //

DELIMITER ;
DELIMITER //
-- THỐNG KÊ SỐ TIỀN GỬI TRONG TUẦN
CREATE PROCEDURE SOTIENGUI_TRONGTUAN()
BEGIN
    -- Thực hiện LEFT JOIN với bảng PHIEUGUITIEN
    SELECT 
        w.Ngay AS NGAYRUT, 
        COALESCE(SUM(p.SOTIEN), 0) AS SOTIEN
    FROM (
        -- Tạo danh sách các ngày trong tuần
        SELECT 
            DATE_ADD(CURRENT_DATE(), INTERVAL -WEEKDAY(CURRENT_DATE()) + n DAY) AS Ngay
        FROM (
            SELECT 0 AS n UNION ALL 
            SELECT 1 UNION ALL 
            SELECT 2 UNION ALL 
            SELECT 3 UNION ALL 
            SELECT 4 UNION ALL 
            SELECT 5 UNION ALL 
            SELECT 6
        ) AS Numbers
    ) w
    LEFT JOIN 
        PHIEUGUITIEN p 
    ON 
        w.Ngay = p.NGAYGUI
    GROUP BY 
        w.Ngay
    ORDER BY 
        w.Ngay;
END //

DELIMITER ;

INSERT INTO PASS VALUES (0,'CEO','rootSEbank');

--TEST
CALL MOSOTIETKIEM(3, 'Cường', '1234', 'aBC', '2024-08-22', 1000000);
CALL MOSOTIETKIEM(0, 'Anh', '22082004', 'aAC', '2024-08-20', 1000000);
CALL MOSOTIETKIEM(0, 'CƯỜNG', '523123', 'aC', '2024-09-30', 1000000);
CALL LAPPHIEUGUI('MS000002', '2024-09-06', 500000);
CALL LAPPHIEUGUI('MS000000', '2024-12-18', 1000000);
CALL LAPPHIEURUT('MS000001', '2025-08-20', 500000);
CALL TRACUUSO('CƯỜNG');
CALL BAOCAO_NGAY('2024-08-29');
CALL BAOCAO_THANG(2, 'Kỳ hạn 3 tháng');
CALL SOTIENGUI_TRONGTUAN()
		        
		        
SHOW PROCEDURE STATUS WHERE Db = 'SEBANK';
SELECT * FROM DONVI_TOITHIEU;
SELECT * FROM LOAI_SOTK;
SELECT * FROM KHACHHANG;
SELECT * FROM SOTIETKIEM;
SELECT * FROM PHIEUGUITIEN;
SELECT * FROM PHIEURUTTIEN;
SELECT * FROM PASS;