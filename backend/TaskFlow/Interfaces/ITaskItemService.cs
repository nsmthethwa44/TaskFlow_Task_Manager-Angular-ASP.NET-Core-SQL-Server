using TaskFlow.DTOs;
using TaskFlow.Entities;

namespace TaskFlow.Interfaces
{
    public interface ITaskItemService
    {
            Task<TaskItem> CreateTaskAsync(int userId, CreateTaskDto dto);
            Task<TaskItem> UpdateTaskAsync(int userId, int taskId, UpdateTaskDto dto);
            Task DeleteTaskAsync(int userId, int taskId);
            Task<IEnumerable<TaskItem>> GetAllAsync(int userId);
            Task<TaskStatsDto> GetStatsAsync(int userId);
    }
}
