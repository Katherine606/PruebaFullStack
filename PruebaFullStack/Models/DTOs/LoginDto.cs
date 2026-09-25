using System.ComponentModel.DataAnnotations;

namespace PruebaFullStack.Models.DTOs
{
    public class LoginDto
    {
        [Required(ErrorMessage = "El correo electrónico es obligatorio.")]
        [EmailAddress(ErrorMessage = "El formato del correo electrónico no es válido.")]
        public string Correo { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
    }
}
