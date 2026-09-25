using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PruebaFullStack.Models.DTOs
{
    public class FeedbackCrearDto
    {
        [Required(ErrorMessage = "El título es obligatorio.")]
        [StringLength(150, ErrorMessage = "El título no puede exceder los 150 caracteres.")]
        public string Titulo { get; set; }

        [Required(ErrorMessage = "La descripción es obligatoria.")]
        public string Descripcion { get; set; }

        [Required(ErrorMessage = "La categoría es obligatoria.")]
        [RegularExpression("^(UI|UX|FEATURE|BUG|PERFORMANCE)$", ErrorMessage = "Las categorías debe ser UI, UX, FEATURE, BUG, PERFORMANCE")]
        public string Categoria { get; set; }

        [RegularExpression("^(open|doing|done)$", ErrorMessage = "El estado debe ser 'open', 'doing' o 'done'.")]
        public string? Estado { get; set; } = "open";
    }
}
