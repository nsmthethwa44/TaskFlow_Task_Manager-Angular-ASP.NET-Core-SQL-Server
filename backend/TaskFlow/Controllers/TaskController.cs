using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskFlow.DTOs;
using TaskFlow.Interfaces;

namespace TaskFlow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
            private readonly ITaskItemService _service;
            public TaskController(ITaskItemService service)
            {
                _service = service;
            }

            // Helper extract userId from JWT
            // a loged-in user id
            private int GetUserId()
            {
                return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            }

            // create a task, a logged-in user
            [HttpPost]
            public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto dto)
            {
                var userId = GetUserId();
                var task = await _service.CreateTaskAsync(userId, dto);
                return Ok(task);
            }

            // get all tasks for a logged-in user
            [HttpGet]
            public async Task<IActionResult> GetAllTasks()
            {
                var userId = GetUserId();
                var tasks = await _service.GetAllAsync(userId);
                return Ok(tasks);
            }

            //update tasks
            [HttpPut("{id}")]
            public async Task<IActionResult> UpdateTask(int id, [FromBody] UpdateTaskDto dto)
            {
                var userId = GetUserId();
                var updatedTask = await _service.UpdateTaskAsync(userId, id, dto);
                return Ok(updatedTask);
            }

            // delete tasks
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteTask(int id)
            {
                var userId = GetUserId();
                await _service.DeleteTaskAsync(userId, id);
                return NoContent();
            }

            // stats 
            [HttpGet("stats")]
            public async Task<IActionResult> GetStats()
            {
                var userId = GetUserId();
                var stats = await _service.GetStatsAsync(userId);
                return Ok(stats);
            }

    }
}
