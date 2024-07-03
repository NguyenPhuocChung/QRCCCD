function onScanSuccess(decodedText, decodedResult) {
  // Hiển thị nội dung mã QR để kiểm tra định dạng
  console.log("Decoded Text: ", decodedText);

  // Tách dữ liệu bằng ký tự '|'
  let parts = decodedText.split("|");

  if (parts.length >= 5) {
    let name = parts[2].trim(); // Lấy tên và loại bỏ các khoảng trống xung quanh
    let dob = parts[3].trim(); // Lấy ngày sinh
    let gender = parts[4].trim(); // Lấy giới tính

    // Hiển thị thông tin
    document.getElementById("name").innerText = name;
    document.getElementById("dob").innerText = formatDate(dob);
    document.getElementById("gender").innerText = gender;
  } else {
    console.error("Unexpected QR code data format.");
  }
}

function onScanFailure(error) {
  // Xử lý lỗi quét, thường thì bạn có thể bỏ qua lỗi và tiếp tục quét
  console.warn(`Code scan error = ${error}`);
}

// Hàm định dạng ngày tháng năm từ định dạng DDMMYYYY sang DD/MM/YYYY
function formatDate(dateString) {
  return (
    dateString.slice(0, 2) +
    "/" +
    dateString.slice(2, 4) +
    "/" +
    dateString.slice(4)
  );
}

// Tạo một instance của trình quét. 'reader' là ID của phần tử HTML.
let html5QrcodeScanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250,
});

// Bắt đầu quét.
html5QrcodeScanner.render(onScanSuccess, onScanFailure);
