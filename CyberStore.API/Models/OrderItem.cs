using System.Text.Json.Serialization;

namespace CyberStore.API.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }

        [JsonIgnore] //  ESTO SOLUCIONA ahora
        public Order Order { get; set; } // orden inverso

        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}