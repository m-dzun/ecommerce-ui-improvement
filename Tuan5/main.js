/* =====================================================
   UrbanTee - main.js (nạp SAU jQuery và Bootstrap JS)
   Dùng chung cho cả 3 trang
   ===================================================== */
$(function () {

  // 1. Bật tooltip (Bootstrap 3 không tự bật)
  $('[data-toggle="tooltip"]').tooltip();

  // 2. Giỏ hàng: số lượng lưu trong localStorage để 3 trang dùng chung
  var count = 4; // số mặc định ban đầu
  try {
    var saved = localStorage.getItem('cartCount');
    if (saved !== null) { count = parseInt(saved, 10) || 0; }
  } catch (e) { /* trình duyệt chặn localStorage thì dùng số mặc định */ }

  function renderCart() { $('#cart-count').text(count); }
  renderCart();

  window.addToCart = function (n) {
    count += (n || 1);
    try { localStorage.setItem('cartCount', count); } catch (e) {}
    renderCart();
  };

  // Bấm dấu "+" trên thẻ sản phẩm -> thêm 1 vào giỏ
  $(document).on('click', '.add-to-cart a', function (e) {
    e.preventDefault();
    window.addToCart(1);
  });

  // 3. Form đăng nhập trong modal (demo)
  $('#login-form').on('submit', function (e) {
    e.preventDefault();
    $('#myModal').modal('hide');
    alert('Đăng nhập thành công (demo)');
  });

  // 4. Ô tìm kiếm (demo)
  $('.search-form').on('submit', function (e) {
    e.preventDefault();
    var q = $.trim($(this).find('input').val());
    if (q) { alert('Tìm kiếm: ' + q + ' (demo)'); }
  });
});