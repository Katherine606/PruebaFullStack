using PruebaFullStack.Exceptions;

namespace PruebaFullStack.Middlewares
{
    public class ExcepcionesGlobales
    {
        private readonly RequestDelegate _next;

        public ExcepcionesGlobales(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (ApiException ex)
            {
                context.Response.StatusCode = ex.Codigo;
                await context.Response.WriteAsJsonAsync(new
                {
                    mensaje = ex.Message
                });
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsJsonAsync(new
                {
                    mensaje = ex.Message,

                });
            }
        }
    }
}
