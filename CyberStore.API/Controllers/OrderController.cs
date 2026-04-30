using CyberStore.API.Data;
using CyberStore.API.Models;
using CyberStore.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CyberStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {

        private readonly IOrderService _orderService;
        private readonly AppDbContext _context;

        public OrdersController(IOrderService orderService, AppDbContext context)
        {
            _orderService = orderService;
            _context = context;
        }

        // POST: api/orders/checkout/1
        [Authorize(Roles = "USER")]
        [HttpPost("checkout")]
        public async Task<ActionResult> Checkout()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
                return Unauthorized("Token inválido");

            var userId = int.Parse(userIdClaim);

            var result = await _orderService.Checkout(userId);

            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(new
            {
                message = result.Message,
                orderId = result.OrderId,
                total = result.Total
            });
        }

        [Authorize(Roles = "USER")]
        [HttpGet("my-orders")]
        public async Task<ActionResult> GetMyOrders()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
                return Unauthorized("Token inválido");

            var userId = int.Parse(userIdClaim);

            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .ToListAsync();

            return Ok(orders);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet]
        public async Task<ActionResult> GetAllOrders()
        {
            return Ok(await _context.Orders
       .Include(o => o.User)
       .Include(o => o.OrderItems)
           .ThenInclude(oi => oi.Product)
       .ToListAsync());
        }
    }
}