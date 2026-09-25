using PruebaFullStack.Models;
using PruebaFullStack.Repositories;

namespace PruebaFullStack.Services
{
    public class FeedbackService
    {
        private readonly FeedbackRepository _feedbackRepository;
        private readonly VotoRepository _votoRepository;

        public FeedbackService(FeedbackRepository feedbackRepository, VotoRepository votoRepository)
        {
            _feedbackRepository = feedbackRepository;
            _votoRepository = votoRepository;
        }

        public async Task<IEnumerable<Feedback>> ObtenerTodosAsync()
        {
            return await _feedbackRepository.ObtenerTodosAsync();
        }

        public async Task<Feedback> CrearFeedbackAsync(string titulo, string descripcion, string categoria, string? estado, int usuarioId)
        {
            var feedback = new Feedback
            {
                Titulo = titulo,
                Descripcion = descripcion,
                Categoria = categoria,
                Estado = string.IsNullOrEmpty(estado) ? "open" : estado,
                Votos = 0,
                UsuarioId = usuarioId
            };

            await _feedbackRepository.AgregarAsync(feedback);
            return feedback;
        }

        public async Task<(int totalVotos, bool votado)> AlternarVotoAsync(int feedbackId, int usuarioId)
        {
            var feedback = await _feedbackRepository.ObtenerPorIdAsync(feedbackId);
            if (feedback == null) throw new Exception("Feedback no encontrado.");

            var votoE = await _votoRepository.ObtenerVotoAsync(feedbackId, usuarioId);
            bool votado;
            if (votoE!= null)
            {
                await _votoRepository.RemoverAsync(votoE);
                feedback.Votos = Math.Max(0, feedback.Votos - 1);
                votado = false;
            }
            else
            {
                await _votoRepository.AgregarAsync(new Voto { FeedbackId = feedbackId, UsuarioId = usuarioId });
                feedback.Votos += 1;
                votado = true;
            }

            await _feedbackRepository.ActualizarAsync(feedback);
            return (feedback.Votos, votado);
        }

        public async Task<Feedback> CambiarEstadoAsync(int feedbackId, string nuevoEstado)
        {
            var feedback = await _feedbackRepository.ObtenerPorIdAsync(feedbackId);
            if (feedback == null) throw new Exception("Feedback no encontrado.");

            feedback.Estado = nuevoEstado;
            await _feedbackRepository.ActualizarAsync(feedback);
            return feedback;
        }
    }
}