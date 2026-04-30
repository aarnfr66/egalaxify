using CyberStore.API.Data;
using CyberStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CyberStore.API.Services
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;

        public OrderService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<(bool Success, string Message, int? OrderId, decimal Total)> Checkout(int userId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                    throw new Exception("Usuario no existe");

                var cartItems = await _context.CartItems
                    .Where(c => c.UserId == userId)
                    .Include(c => c.Product)
                    .ToListAsync();

                if (!cartItems.Any())
                    throw new Exception("El carrito está vacío");

                decimal total = 0;
                var orderItems = new List<OrderItem>();

                foreach (var item in cartItems)
                {
                    var product = item.Product;

                    if (product == null)
                        throw new Exception($"Producto no encontrado (ID: {item.ProductId})");

                    if (product.Stock < item.Quantity)
                        throw new Exception($"No hay suficiente stock para {product.Name}");

                    product.Stock -= item.Quantity;

                    total += product.Price * item.Quantity;

                    orderItems.Add(new OrderItem
                    {
                        ProductId = product.Id,
                        Quantity = item.Quantity,
                        Price = product.Price
                    });
                }

                var order = new Order
                {
                    UserId = userId,
                    TotalAmount = total,
                    Status = "COMPLETED",
                    OrderItems = orderItems //  AHORA SÍ FUNCIONA
                };

                _context.Orders.Add(order);
                _context.CartItems.RemoveRange(cartItems);

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return (true, "Compra realizada correctamente", order.Id, total);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return (false, ex.Message, null, 0);
            }
        }
    }
}