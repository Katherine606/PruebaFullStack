using Microsoft.EntityFrameworkCore;
using PruebaFullStack.Models;

namespace PruebaFullStack.Repositories
{
    public class AuthRepository
    {
        private readonly AppDbContext _context;


        public AuthRepository(AppDbContext context)
        {
            _context = context;
        }

        //obtiene al usuario por correo 
        public async Task<Usuario?> ObtenerUsuarioPorCorreolAsync(string correo)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(c => c.Correo == correo);
            return usuario;
        }

    }
}
