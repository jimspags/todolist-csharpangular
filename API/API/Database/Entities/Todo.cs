using System.ComponentModel.DataAnnotations;

namespace API.Database.Entities
{
	public class Todo
	{
        public Guid Id { get; set; }
        [StringLength(100)]
        public string Title { get; set; }
        [StringLength(200)]
        public string Description { get; set; }
        [MaxLength(20)]
        public string Status { get; set; }
    }
}
