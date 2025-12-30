using TaskFlow.Entities;
using TaskFlow.DTOs;

namespace TaskFlow.Interfaces
{
        public interface IAuthService
        {
            Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
            Task<AuthResponseDto> LoginAsync(LoginDto dto);
            AuthResponseDto GenerateJwtToken(User user);
        }
}
