
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using _31241026863_HoangThiMyDung.Data;
using _31241026863_HoangThiMyDung.Models;
using _31241026863_HoangThiMyDung.Extension;

namespace _31241026863_HoangThiMyDung.Controllers
{
    public class MoviesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _config;

        public MoviesController(
            ApplicationDbContext context,
            IWebHostEnvironment env,
            IConfiguration config)
        {
            _context = context;
            _env = env;
            _config = config;
        }

        // Lưu ảnh vào wwwroot/images
        private async Task<string?> SaveImageAsync(IFormFile? file)
        {
            if (file == null || file.Length == 0)
                return null;

            var ext = Path.GetExtension(file.FileName)
                .ToLowerInvariant();

            if (!new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" }
                .Contains(ext))
            {
                return null;
            }

            var folder = Path.Combine(
                _env.WebRootPath, "images");

            Directory.CreateDirectory(folder);

            var fileName = Guid.NewGuid()
                .ToString("N") + ext;

            using var stream = System.IO.File.Create(
                Path.Combine(folder, fileName));

            await file.CopyToAsync(stream);

            return "/images/" + fileName;
        }

        // GET: Movies
        public async Task<IActionResult> Index()
        {
            var movies = _context.Movies
                .Include(m => m.GenreObj);

            return View(await movies.ToListAsync());
        }

        // GET: Movies/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
                return NotFound();

            var movie = await _context.Movies
                .Include(m => m.GenreObj)
                .FirstOrDefaultAsync(m => m.ID == id);

            if (movie == null)
                return NotFound();

            return View(movie);
        }

        // GET: Movies/Create
        public IActionResult Create()
        {
            ViewData["GenreID"] = new SelectList(
                _context.Genres, "ID", "Name");

            return View();
        }

        // POST: Movies/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Movie movie)
        {
            if (ModelState.IsValid)
            {
                movie.PicturePath =
                    await SaveImageAsync(movie.PictureUpload)
                    ?? "/images/no-image.jpg";

                _context.Add(movie);
                await _context.SaveChangesAsync();

                return RedirectToAction(nameof(Index));
            }

            ViewData["GenreID"] = new SelectList(
                _context.Genres,
                "ID",
                "Name",
                movie.GenreID);

            return View(movie);
        }

        // GET: Movies/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
                return NotFound();

            var movie = await _context.Movies.FindAsync(id);

            if (movie == null)
                return NotFound();

            ViewData["GenreID"] = new SelectList(
                _context.Genres,
                "ID",
                "Name",
                movie.GenreID);

            return View(movie);
        }

        // POST: Movies/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Movie movie)
        {
            if (id != movie.ID)
                return NotFound();

            if (ModelState.IsValid)
            {
                try
                {
                    var newPath = await SaveImageAsync(
                        movie.PictureUpload);

                    if (newPath != null)
                    {
                        movie.PicturePath = newPath;
                    }
                    else if (string.IsNullOrEmpty(movie.PicturePath))
                    {
                        movie.PicturePath = "/images/no-image.jpg";
                    }

                    _context.Update(movie);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MovieExists(movie.ID))
                        return NotFound();

                    throw;
                }

                return RedirectToAction(nameof(Index));
            }

            ViewData["GenreID"] = new SelectList(
                _context.Genres,
                "ID",
                "Name",
                movie.GenreID);

            return View(movie);
        }

        // GET: Movies/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
                return NotFound();

            var movie = await _context.Movies
                .Include(m => m.GenreObj)
                .FirstOrDefaultAsync(m => m.ID == id);

            if (movie == null)
                return NotFound();

            return View(movie);
        }

        // POST: Movies/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var movie = await _context.Movies.FindAsync(id);

            if (movie != null)
                _context.Movies.Remove(movie);

            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        private bool MovieExists(int id)
        {
            return _context.Movies.Any(e => e.ID == id);
        }

        // THÊM PHIM VÀO GIỎ HÀNG
        public IActionResult AddToCart(int id)
        {
            var movie = _context.Movies
                .FirstOrDefault(x => x.ID == id);

            if (movie == null)
                return RedirectToAction(nameof(Index));

            var hoaDon = HttpContext.Session
                .Get<HoaDon>("HoaDon");

            if (hoaDon == null)
                hoaDon = new HoaDon();

            if (hoaDon.ChiTietHoaDons == null)
                return BadRequest(
                    "Danh sách chi tiết hóa đơn chưa được khởi tạo.");

            var chiTietHoaDon = hoaDon.ChiTietHoaDons
                .FirstOrDefault(x => x.MaMovie == id);

            if (chiTietHoaDon == null)
            {
                chiTietHoaDon = new ChiTietHoaDon
                {
                    MaMovie = id,
                    MovieObj = movie,
                    SoLuong = 1
                };

                hoaDon.ChiTietHoaDons.Add(chiTietHoaDon);
            }
            else
            {
                chiTietHoaDon.SoLuong++;
            }

            hoaDon.TongTien = hoaDon.ChiTietHoaDons
                .Sum(x => x.SoLuong * x.MovieObj.Price);

            HttpContext.Session.Set<HoaDon>(
                "HoaDon", hoaDon);

            return View(hoaDon);
        }

        // XÓA PHIM KHỎI GIỎ HÀNG
        public IActionResult RemoveFromCart(int maMovies)
        {
            var hoaDon = HttpContext.Session
                .Get<HoaDon>("HoaDon");

            if (hoaDon == null ||
                hoaDon.ChiTietHoaDons == null)
            {
                return RedirectToAction(nameof(Index));
            }

            var chiTietHoaDon = hoaDon.ChiTietHoaDons
                .FirstOrDefault(x => x.MaMovie == maMovies);

            if (chiTietHoaDon != null)
            {
                hoaDon.ChiTietHoaDons.Remove(chiTietHoaDon);
            }

            hoaDon.TongTien = hoaDon.ChiTietHoaDons
                .Sum(x => x.SoLuong * x.MovieObj.Price);

            HttpContext.Session.Set<HoaDon>(
                "HoaDon", hoaDon);

            return View("AddToCart", hoaDon);
        }

        // GET: Movies/Checkout
        public IActionResult Checkout()
        {
            return View(new ShippingDetail());
        }

        // POST: Movies/Checkout
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Checkout(
            ShippingDetail detail)
        {
            var hoaDon = HttpContext.Session
                .Get<HoaDon>("HoaDon");

            if (hoaDon == null ||
                hoaDon.ChiTietHoaDons == null ||
                hoaDon.ChiTietHoaDons.Count == 0)
            {
                ModelState.AddModelError(
                    "",
                    "Sorry, your cart is empty!");
            }

            if (ModelState.IsValid && hoaDon != null)
            {
                // Lưu đơn hàng vào SQL Server
                var order = new HoaDon
                {
                    NgayLap = DateTime.Now,
                    TongTien = hoaDon.TongTien
                };

                foreach (var ct in hoaDon.ChiTietHoaDons)
                {
                    order.ChiTietHoaDons.Add(
                        new ChiTietHoaDon
                        {
                            MaMovie = ct.MaMovie,
                            SoLuong = ct.SoLuong
                        });
                }

                _context.HoaDons.Add(order);
                _context.ShippingDetails.Add(detail);

                await _context.SaveChangesAsync();

                // Soạn email xác nhận đơn hàng
                Func<string, string> enc =
                    System.Net.WebUtility.HtmlEncode;

                StringBuilder body = new StringBuilder();

                body.AppendLine(
                    "<p>A new order has been submitted!</p><hr />");

                body.AppendLine("<p>Items:</p><ul>");

                foreach (var ct in hoaDon.ChiTietHoaDons)
                {
                    var subtotal =
                        ct.MovieObj.Price * ct.SoLuong;

                    body.AppendLine(
                        $"<li>{ct.SoLuong} x {enc(ct.MovieObj.Title)} " +
                        $"(subtotal: {subtotal:N0})</li>");
                }

                body.AppendLine("</ul>");

                body.AppendLine(
                    $"<p>Total order value: " +
                    $"{hoaDon.TongTien:N0}</p><hr />");

                body.AppendLine(
                    $"<p>Ship to:<br/>" +
                    $"{enc(detail.Name)}<br/>" +
                    $"{enc(detail.Address)}<br/>" +
                    $"{enc(detail.Mobile)}</p>");

                var gmail = _config["Email:Address"];
                var appPassword = _config["Email:AppPassword"];

                // Gửi email bằng Gmail SMTP
                await EmailServiceNew.SendMailGoogleSmtp(
                    gmail,
                    detail.Email,
                    "New order submitted!",
                    body.ToString(),
                    gmail,
                    appPassword);

                // Xóa giỏ hàng sau khi hoàn tất
                HttpContext.Session.Remove("HoaDon");

                return View("CheckoutCompleted");
            }

            return View(detail);
        }
    }
}
