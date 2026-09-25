using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PruebaFullStack.Models.DTOs;
using PruebaFullStack.Services;
using System.Security.Claims;

namespace PruebaFullStack.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbacksController : ControllerBase
    {
        private readonly FeedbackService _feedbackService;

        public FeedbacksController(FeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerTodos()
        {
            var feedbacks = await _feedbackService.ObtenerTodosAsync();
            return Ok(feedbacks);
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] FeedbackCrearDto dto)
        {
            
            var usuarioIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");

            int usuarioId = int.Parse(usuarioIdClaim);

            var feedback = await _feedbackService.CrearFeedbackAsync(
                dto.Titulo,
                dto.Descripcion,
                dto.Categoria,
                dto.Estado,
                usuarioId); 

            return Ok(feedback);
        }

        [HttpPatch("{id}/votar")]
        public async Task<IActionResult> Votar(int id) 
        {

            var usuarioIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");

            int usuarioId = int.Parse(usuarioIdClaim);

            var resultado = await _feedbackService.AlternarVotoAsync(id, usuarioId);
            return Ok(new { totalVotos = resultado.totalVotos, votado = resultado.votado });
        }

        [HttpPatch("{id}/estado")]
        public async Task<IActionResult> CambiarEstado(int id, [FromBody] EstadoDto dto)
        {
       
           var feedback = await _feedbackService.CambiarEstadoAsync(id, dto.NuevoEstado);
           return Ok(feedback);
        }
    }

}