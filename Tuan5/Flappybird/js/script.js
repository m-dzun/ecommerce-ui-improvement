$(function () {
  // ==========================================
  // 1. KHAI BÁO ĐỐI TƯỢNG
  // ==========================================

  var container = $("#container");
  var bird = $("#bird");
  var pole = $(".pole");
  var pole_1 = $("#pole_1");
  var pole_2 = $("#pole_2");
  var score = $("#score");

  var play_btn = $("#play_btn");
  var restart_btn = $("#restart_btn");

  var container_width = container.width();
  var container_height = container.height();

  var bird_width = bird.outerWidth();
  var bird_height = bird.outerHeight();
  var bird_left = parseFloat(bird.css("left"));
  // ===== MiniBird =====
  var mini_bird_active = false;
  var mini_bird_scale = 1;
  var mini_bird_timer = null;
  var mini_bird_duration = 10000; // 10 giây
  var mini_bird_used = false; // mỗi lượt chơi chỉ dùng 1 lần

  var current_rotation = 0;

  // ==========================================
  // 2. THÔNG SỐ GAME
  // ==========================================

  // Khoảng cách giữa hai cột
  var pole_gap = 190;

  // Chiều rộng cột
  var pole_width = pole_1.outerWidth();

  // Vị trí ban đầu của cột
  var pole_initial_position = -pole_width - 10;

  // Tốc độ di chuyển cột: pixel/giây
  var speed = 115;

  // Vật lý của chim
  var gravity = 500;
  var fly_force = 850;

  var max_fall_speed = 200;
  var max_fly_speed = -175;

  // ==========================================
  // 3. TRẠNG THÁI GAME
  // ==========================================

  var game_timer = null;

  var game_started = false;
  var game_over = false;
  var key_pressed = false;
  var score_updated = false;

  var current_score = 0;
  var current_level = 1;

  // Interval mặc định của Level 1
  var game_interval = 40;

  // Vị trí và vận tốc chim
  var bird_top = container_height * 0.4;
  var bird_velocity = 0;

  // Vị trí hiện tại của cột
  var pole_position = pole_initial_position;

  // ==========================================
  // 4. TẠO GIAO DIỆN LEVEL
  // ==========================================

  container.prepend('<div id="level">Level: 1</div>');

  // Thông báo kết quả
  container.append('<div id="game_message"></div>');
  container.append('<div id="mini_status">MiniBird: OFF</div>');

  var level_text = $("#level");
  var game_message = $("#game_message");
  var mini_status = $("#mini_status");

  // ==========================================
  // 5. TẠO CỘT NGẪU NHIÊN
  // ==========================================

  function createPole() {
    var min_height = 55;

    var max_height = container_height - pole_gap - min_height;

    var random_height =
      Math.floor(Math.random() * (max_height - min_height + 1)) + min_height;

    // Cột trên
    pole_1.css("height", random_height + "px");

    // Cột dưới
    pole_2.css("height", container_height - pole_gap - random_height + "px");
  }

  // ==========================================
  // 6. CẬP NHẬT LEVEL
  // ==========================================

  function updateLevel() {
    var new_level = 1;
    var new_interval = 40;

    if (current_score >= 40) {
      new_level = 4;
      new_interval = 20;
    } else if (current_score >= 20) {
      new_level = 3;
      new_interval = 25;
    } else if (current_score >= 5) {
      new_level = 2;
      new_interval = 30;
    }

    if (new_level !== current_level) {
      current_level = new_level;
      game_interval = new_interval;

      level_text.text("Level: " + current_level);

      showLevelUp();

      // Đổi Interval tương ứng Level
      startTimer();
    }
  }

  // ==========================================
  // 7. THÔNG BÁO LEVEL UP
  // ==========================================

  function showLevelUp() {
    game_message
      .stop(true, true)
      .html("LEVEL " + current_level + "!")
      .addClass("level-up")
      .show();

    game_message.delay(700).fadeOut(350);
  }

  // ==========================================
  // 8. BẮT ĐẦU VÒNG LẶP GAME
  // ==========================================

  function startTimer() {
    // Dừng Interval trước đó
    clearInterval(game_timer);

    // Chạy lại với Interval của Level hiện tại
    game_timer = setInterval(gameLoop, game_interval);
  }

  // ==========================================
  // 9. BẮT ĐẦU CHƠI
  // ==========================================

  function playGame() {
    if (game_started || game_over) {
      return;
    }

    game_started = true;

    play_btn.hide();
    restart_btn.hide();

    startTimer();
  }

  // ==========================================
  // 10. VÒNG LẶP CHÍNH
  // ==========================================

  function gameLoop() {
    if (!game_started || game_over) {
      return;
    }

    // Chuyển Interval sang giây
    var delta = game_interval / 1000;

    // --------------------------------------
    // A. XỬ LÝ CHIM BAY
    // --------------------------------------

    if (key_pressed) {
      // Giữ Arrow Down: chim bay lên
      bird_velocity -= fly_force * delta;
    } else {
      // Thả phím: chim rơi xuống
      bird_velocity += gravity * delta;
    }

    // Giới hạn vận tốc
    if (bird_velocity < max_fly_speed) {
      bird_velocity = max_fly_speed;
    }

    if (bird_velocity > max_fall_speed) {
      bird_velocity = max_fall_speed;
    }

    // Cập nhật vị trí chim
    bird_top += bird_velocity * delta;

    // Cập nhật giao diện chim
    bird.css("top", bird_top + "px");

    if (bird_velocity < 0) {
      current_rotation = -15;
    } else {
      current_rotation = 25;
    }

    updateBirdTransform();

    // --------------------------------------
    // B. DI CHUYỂN CỘT
    // --------------------------------------

    pole_position += speed * delta;

    // Khi cột ra khỏi màn hình
    if (pole_position > container_width) {
      pole_position = pole_initial_position;

      // Tạo cặp cột mới
      createPole();

      score_updated = false;
    }

    pole.css("right", pole_position + "px");

    // --------------------------------------
    // C. KIỂM TRA VA CHẠM
    // --------------------------------------

    var hit_top = bird_top <= 0;

    var hit_bottom = bird_top + bird_height >= container_height;

    var hit_pole = collision(bird, pole_1) || collision(bird, pole_2);

    if (hit_top || hit_bottom || hit_pole) {
      stop_the_game(false);
      return;
    }

    // ======================================
    // D. TÍNH ĐIỂM KHI VƯỢT QUA CỘT
    // ======================================

    // Tọa độ cột tính từ bên trái khung game
    var pole_left = container_width - pole_position - pole_width;

    // Tọa độ mép phải của cột
    var pole_right = pole_left + pole_width;

    // Chim đã bay qua hoàn toàn cặp cột
    if (pole_right < bird_left && score_updated === false) {
      current_score++;

      // Hiển thị điểm
      score.text(current_score);

      // Đánh dấu cột này đã được tính điểm
      score_updated = true;

      console.log("Điểm hiện tại:", current_score);

      // Đạt 50 điểm thì chiến thắng
      if (current_score >= 50) {
        stop_the_game(true);
        return;
      }

      // Cập nhật Level
      updateLevel();
    }
  }

  // ==========================================
  // 11. DỪNG GAME / CHIẾN THẮNG
  // ==========================================

  function stop_the_game(is_win) {
    if (game_over) {
      return;
    }
    clearTimeout(mini_bird_timer);
    mini_bird_active = false;
    mini_bird_scale = 1;
    mini_status.text("MiniBird: OFF");
    mini_status.removeClass("active");
    game_over = true;
    game_started = false;
    key_pressed = false;

    // Dừng vòng lặp hiện tại
    clearInterval(game_timer);
    game_timer = null;

    // Hiển thị kết quả
    game_message.stop(true, true).removeClass("level-up").show();

    if (is_win) {
      game_message.html(
        "🏆 CHIẾN THẮNG!" + "<small>Bạn đã đạt 50 điểm!</small>",
      );
    } else {
      game_message.html(
        "GAME OVER" +
          "<small>Điểm: " +
          current_score +
          " | Level: " +
          current_level +
          "</small>",
      );
    }

    restart_btn.slideDown();
  }

  // ==========================================
  // 12. KIỂM TRA VA CHẠM
  // ==========================================

  function collision($div1, $div2) {
    // Sử dụng tọa độ thực tế trên màn hình
    var rect1 = $div1[0].getBoundingClientRect();
    var rect2 = $div2[0].getBoundingClientRect();

    // Thu nhỏ vùng va chạm của chim một chút
    // Giúp trò chơi dễ chơi hơn
    var padding_x = mini_bird_active ? 14 : 9;
    var padding_y = mini_bird_active ? 12 : 7;

    var x1 = rect1.left + padding_x;
    var y1 = rect1.top + padding_y;

    var r1 = rect1.right - padding_x;
    var b1 = rect1.bottom - padding_y;

    var x2 = rect2.left;
    var y2 = rect2.top;

    var r2 = rect2.right;
    var b2 = rect2.bottom;

    // Không va chạm
    if (b1 <= y2 || y1 >= b2 || r1 <= x2 || x1 >= r2) {
      return false;
    }

    return true;
  }

  // ==========================================
  // 13. ĐIỀU KHIỂN BẰNG ARROW DOWN
  // ==========================================

  $(document).on("keydown", function (e) {
    // Phím mũi tên xuống
    if (e.which === 40) {
      // Ngăn trang web cuộn xuống
      e.preventDefault();

      // Nếu game chưa bắt đầu
      if (!game_started && !game_over) {
        playGame();
      }

      // Giữ phím để chim bay lên
      if (!game_over) {
        key_pressed = true;
      }
    }
    // Phím M để bật MiniBird

    if (e.key.toLowerCase() === "m") {
      e.preventDefault();
      activateMiniBird();
    }

    // Enter dùng để bắt đầu game
    if (e.which === 13) {
      e.preventDefault();

      if (!game_started && !game_over) {
        playGame();
      }
    }
  });

  // Khi nhả phím Arrow Down
  $(document).on("keyup", function (e) {
    if (e.which === 40) {
      key_pressed = false;
    }
  });

  // Khi chuyển khỏi cửa sổ game
  $(window).on("blur", function () {
    key_pressed = false;
  });

  // ==========================================
  // 14. NÚT CHƠI
  // ==========================================

  play_btn.on("click", function () {
    playGame();
  });

  // ==========================================
  // 15. NÚT CHƠI LẠI
  // ==========================================

  restart_btn.on("click", function () {
    resetGame();
    playGame();
  });

  // ==========================================
  // 16. RESET GAME
  // ==========================================

  function resetGame() {
    // Dừng vòng lặp cũ
    clearInterval(game_timer);
    game_timer = null;

    mini_bird_active = false;
    mini_bird_scale = 1;
    mini_bird_used = false;

    clearTimeout(mini_bird_timer);

    mini_status.text("MiniBird: OFF");
    mini_status.removeClass("active");

    current_rotation = 0;
    updateBirdTransform();
    // Reset trạng thái
    game_started = false;
    game_over = false;
    key_pressed = false;
    score_updated = false;

    // Reset điểm và Level
    current_score = 0;
    current_level = 1;
    game_interval = 40;

    score.text("0");
    level_text.text("Level: 1");

    // Reset chim
    bird_top = container_height * 0.4;
    bird_velocity = 0;

    bird.css({
      top: bird_top + "px",
      transform: "rotate(0deg)",
    });

    // Reset cột
    pole_position = pole_initial_position;

    pole.css("right", pole_position + "px");

    createPole();

    // Reset thông báo
    game_message.stop(true, true).removeClass("level-up").hide().empty();

    restart_btn.hide();
    play_btn.show();
  }

  // ==========================================
  // 17. KHỞI TẠO GAME
  // ==========================================

  resetGame();
  // Thay đổi kích thước
  function updateBirdTransform() {
    bird.css(
      "transform",
      "rotate(" + current_rotation + "deg) scale(" + mini_bird_scale + ")",
    );
  }
  // Bật mini flappy bird
  function activateMiniBird() {
    // Không cho bật nếu game over / chưa chơi / đã dùng rồi / đang bật
    if (!game_started || game_over || mini_bird_active || mini_bird_used) {
      return;
    }

    mini_bird_active = true;
    mini_bird_used = true;
    mini_bird_scale = 0.6;

    mini_status.text("MiniBird: ON");
    mini_status.addClass("active");

    updateBirdTransform();

    clearTimeout(mini_bird_timer);

    mini_bird_timer = setTimeout(function () {
      mini_bird_active = false;
      mini_bird_scale = 1;

      mini_status.text("MiniBird: OFF");
      mini_status.removeClass("active");

      updateBirdTransform();
    }, mini_bird_duration);
  }
});
