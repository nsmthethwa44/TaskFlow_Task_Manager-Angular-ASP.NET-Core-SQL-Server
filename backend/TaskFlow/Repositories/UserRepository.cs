using Microsoft.EntityFrameworkCore;
using TaskFlow.Data;
using TaskFlow.Entities;
using TaskFlow.Interfaces;

namespace TaskFlow.Repositories
{
    public class UserRepository : IUserRepository
    {
        public readonly AppDbContext _db;
        public UserRepository(AppDbContext db) { _db = db; }


        // -----------------------------------
        // find or login user by email
        // -----------------------------------
        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _db.Users.FirstOrDefaultAsync(x => x.Email == email);
        }

        // -----------------------------------
        // add user or register
        // -----------------------------------
        public async Task AddAsync(User user)
        {
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
        }

        // -----------------------------------
        // get all users
        // -----------------------------------
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _db.Users
                .OrderByDescending(u => u.Id)
                .ToListAsync();
        }
    }
}
