using TaskFlow.Entities;

namespace TaskFlow.Interfaces
{
    public interface ITaskItemRepository
    {
            Task<TaskItem?> GetByIdAsync(int id, int userId);
            Task<IEnumerable<TaskItem>> GetAllAsync(int userId);
            Task AddAsync(TaskItem task);
            Task DeleteAsync(TaskItem task);
            Task SaveChangesAsync();
      
            Task<int> CountAsync(int userId);
            Task<int> CountCompletedAsync(int userId);
            Task<int> CountPendingAsync(int userId);
            Task<Dictionary<string, int>> GetCategoryCountsAsync(int userId);
    }
}
