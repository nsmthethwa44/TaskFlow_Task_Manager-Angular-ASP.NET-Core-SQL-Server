namespace TaskFlow.DTOs
{
    public class CreateTaskDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsCompleted { get; set; }     // bool is better than string
        public DateTime? DueDate { get; set; }
        public string Category { get; set; } = string.Empty;
    }

    public class UpdateTaskDto {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public bool? IsCompleted { get; set; }
        public DateTime? DueDate { get; set; }
        public string? Category { get; set; }
    }

    public class TaskStatsDto
    {
        public int Total { get; set; }
        public int Completed { get; set; }
        public int Pending { get; set; }
        public Dictionary<string, int> Categories { get; set; } = new();
    }

}
