using Microsoft.EntityFrameworkCore;
using PruebaFullStack.Models;

public class FeedbackRepository 
{
    private readonly AppDbContext _context;

    public FeedbackRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Feedback>> ObtenerTodosAsync()
    {
        return await _context.Feedbacks.ToListAsync();
    }

    public async Task<Feedback?> ObtenerPorIdAsync(int id)
    {
        return await _context.Feedbacks.FindAsync(id);
    }

    public async Task AgregarAsync(Feedback feedback)
    {
        await _context.Feedbacks.AddAsync(feedback);
        await _context.SaveChangesAsync();
    }

    public async Task ActualizarAsync(Feedback feedback)
    {
        _context.Feedbacks.Update(feedback);
        await _context.SaveChangesAsync();
    }
}