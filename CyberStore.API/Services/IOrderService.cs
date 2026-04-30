using CyberStore.API.Models;

namespace CyberStore.API.Services
{
    public interface IOrderService
    {
        Task<(bool Success, string Message, int? OrderId, decimal Total)> Checkout(int userId);
    }
}