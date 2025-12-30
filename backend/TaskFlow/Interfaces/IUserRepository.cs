using TaskFlow.Entities;

namespace TaskFlow.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task AddAsync(User user);
        Task<IEnumerable<User>> GetAllUsersAsync();
    }
}
