namespace PruebaFullStack.Exceptions
{
    public class ApiException : Exception
    {
        public int Codigo { get; set; }
        public ApiException(string message, int codigo = 400): base(message) {
        
        Codigo = codigo;

        }
    }
}
