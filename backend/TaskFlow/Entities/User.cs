namespace TaskFlow.Entities
{
    public class User
    {
        public int Id { get; set; } 
        public string Name { get; set; }  = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}
