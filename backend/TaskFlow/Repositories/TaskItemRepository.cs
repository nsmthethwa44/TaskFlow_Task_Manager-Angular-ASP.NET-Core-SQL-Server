using Microsoft.EntityFrameworkCore;
using TaskFlow.Data;
using TaskFlow.Entities;
using TaskFlow.Interfaces;

namespace TaskFlow.Repositories
{
    public class TaskItemRepository : ITaskItemRepository
    {
        private readonly AppDbContext _db;
        public TaskItemRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<TaskItem?> GetByIdAsync(int id, int userId)
        {
            return await _db.Tasks
                .Where(t => t.Id == id && t.UserId == userId)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync(int userId)
        {
            return await _db.Tasks
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }

        public async Task AddAsync(TaskItem task)
        {
            await _db.Tasks.AddAsync(task);
        }

        public Task DeleteAsync(TaskItem task)
        {
            _db.Tasks.Remove(task);                
            return Task.CompletedTask;             
        }


        public async Task SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
        }

        public async Task<int> CountAsync(int userId)
        {
            return await _db.Tasks.CountAsync(t => t.UserId == userId);
        }

        public async Task<int> CountCompletedAsync(int userId)
        {
            return await _db.Tasks.CountAsync(t => t.UserId == userId && t.IsCompleted);
        }

        public async Task<int> CountPendingAsync(int userId)
        {
            return await _db.Tasks.CountAsync(t => t.UserId == userId && !t.IsCompleted);
        }

        public async Task<Dictionary<string, int>> GetCategoryCountsAsync(int userId)
        {
            return await _db.Tasks
                .Where(t => t.UserId == userId)
                .GroupBy(t => t.Category)
                .ToDictionaryAsync(g => g.Key, g => g.Count());
        }
    }
}
