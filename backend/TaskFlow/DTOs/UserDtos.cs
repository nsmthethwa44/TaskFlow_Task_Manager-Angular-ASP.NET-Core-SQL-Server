namespace TaskFlow.DTOs
{
    public class ResponseUserDto
    {
        public int Id { get; set; }     
        public string? Name { get; set; }
        public string? Email { get; set; }       
        public string? PasswordHash { get; set; }    
        public DateTime CreatedAt { get; set; }
        public string? ImageUrl { get; set; }
    }

    public class RegisterDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public IFormFile? ImageUrl { get; set; }
    }

    public class LoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public int Id { get; set; }   // add these
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
    }
}
