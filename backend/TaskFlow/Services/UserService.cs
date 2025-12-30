using TaskFlow.DTOs;
using TaskFlow.Interfaces;

namespace TaskFlow.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;

        public UserService(IUserRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<ResponseUserDto>> GetAllUsersAsync()
        {
            var users = await _repo.GetAllUsersAsync();

            return users.Select(u => new ResponseUserDto
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email,
                ImageUrl = u.ImageUrl,
            });
        }
    }
}
