using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PruebaFullStack.Models
{
    public class Voto
    {
        [Key]
        public int Id { get; set; }

        public int UsuarioId { get; set; }
        [ForeignKey("UsuarioId")]
        public Usuario Usuario { get; set; }

        public int FeedbackId { get; set; }
        [ForeignKey("FeedbackId")]
        public Feedback Feedback { get; set; }
    }
}