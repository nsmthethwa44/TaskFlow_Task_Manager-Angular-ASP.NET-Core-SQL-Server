using TaskFlow.Entities;
using TaskFlow.DTOs;

namespace TaskFlow.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<ResponseUserDto>> GetAllUsersAsync(); // for admin getting all users
    }
}
