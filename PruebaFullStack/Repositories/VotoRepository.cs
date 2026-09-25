using Microsoft.EntityFrameworkCore;
using PruebaFullStack.Models;

namespace PruebaFullStack.Repositories
{
    public class VotoRepository 
    {
        private readonly AppDbContext _context;

        public VotoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Voto?> ObtenerVotoAsync(int feedbackId, int usuarioId)
        {
            return await _context.Votos.FirstOrDefaultAsync(v => v.FeedbackId == feedbackId && v.UsuarioId == usuarioId);
        }

        public async Task AgregarAsync(Voto voto)
        {
            _context.Votos.Add(voto);
            await _context.SaveChangesAsync();
        }

        public async Task RemoverAsync(Voto voto)
        {
            _context.Votos.Remove(voto);
            await _context.SaveChangesAsync();
        }
    }
}