using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PruebaFullStack.Models
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Correo { get; set; }

        [Required]
        public string Passwordhash { get; set; }

        public string Nombre { get; set; }

       
        public ICollection<Feedback> Feedbacks { get; set; }
    }
}