using System.ComponentModel.DataAnnotations;

namespace PruebaFullStack.Models.DTOs
{
    public class EstadoDto
    {
        [Required(ErrorMessage = "El nuevo estado es obligatorio.")]
        [RegularExpression("^(open|doing|done)$", ErrorMessage = "El estado debe ser exactamente 'open', 'doing' o 'done'.")]
        public string NuevoEstado { get; set; }
    }
}
