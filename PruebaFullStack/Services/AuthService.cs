using PruebaFullStack.Exceptions;
using PruebaFullStack.Models;
using PruebaFullStack.Repositories;

namespace PruebaFullStack.Services
{
    public class AuthService
    {
        private readonly AuthRepository _authRepository;

        public AuthService(AuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        //validar credenciales del login
        public async Task<Usuario> LoginAsync(string correo, string password)
        {
            var usuario = await _authRepository.ObtenerUsuarioPorCorreolAsync(correo);
            if (usuario == null)
            {
                throw new ApiException("Credenciales inválidas.", 401);
            }

            bool passwordValido = BCrypt.Net.BCrypt.Verify(password, usuario.Passwordhash);

            if (!passwordValido)
            {
                throw new ApiException("Credenciales inválidas.", 401);
            }

            return usuario;
        }

    }
}
