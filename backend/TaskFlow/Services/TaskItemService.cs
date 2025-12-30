using TaskFlow.DTOs;
using TaskFlow.Entities;
using TaskFlow.Interfaces;
using static TaskFlow.Interfaces.ITaskItemRepository;

namespace TaskFlow.Services
{
    public class TaskItemService : ITaskItemService
    {
        private readonly ITaskItemRepository _repo;
        public TaskItemService(ITaskItemRepository repo)
        {
            _repo = repo;
        }

        public async Task<TaskItem> CreateTaskAsync(int userId, CreateTaskDto dto)
        {
            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                IsCompleted = dto.IsCompleted,
                DueDate = dto.DueDate,
                Category = dto.Category,
                UserId = userId
            };

            await _repo.AddAsync(task);
            await _repo.SaveChangesAsync();

            return task;
        }

        public async Task<TaskItem> UpdateTaskAsync(int userId, int taskId, UpdateTaskDto dto)
        {
            var task = await _repo.GetByIdAsync(taskId, userId);
            if (task == null)
                throw new Exception("Task not found or unauthorized");

            if (dto.Title != null) task.Title = dto.Title;
            if (dto.Description != null) task.Description = dto.Description;
            if (dto.IsCompleted.HasValue) task.IsCompleted = dto.IsCompleted.Value;
            if (dto.DueDate.HasValue) task.DueDate = dto.DueDate.Value;
            if (dto.Category != null) task.Category = dto.Category;

            await _repo.SaveChangesAsync();

            return task;
        }

        public async Task DeleteTaskAsync(int userId, int taskId)
        {
            var task = await _repo.GetByIdAsync(taskId, userId);
            if (task == null)
                throw new Exception("Task not found or unauthorized");

            await _repo.DeleteAsync(task);
            await _repo.SaveChangesAsync();
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync(int userId)
        {
            return await _repo.GetAllAsync(userId);
        }

        //TaskStatsDto  
        public async Task<TaskStatsDto> GetStatsAsync(int userId)
        {
            var total = await _repo.CountAsync(userId);
            var completed = await _repo.CountCompletedAsync(userId);
            var pending = await _repo.CountPendingAsync(userId);
            var categories = await _repo.GetCategoryCountsAsync(userId);

            return new TaskStatsDto
            {
                Total = total,
                Completed = completed,
                Pending = pending,
                Categories = categories
            };
        }
    }

}
