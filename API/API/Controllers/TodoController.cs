using API.Database;
using API.Database.Entities;
using API.Dtos;
using API.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TodoController : ControllerBase
	{
		private readonly AutomationDbContext _dbContext;
		public TodoController(AutomationDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		// Create
		[HttpPost]
		public async Task<ActionResult<Todo>> Create(CreateTodoDto newTodo)
		{
			var todo = new Todo() { Id = Guid.NewGuid(), Title = newTodo.Title, Description = newTodo.Description, Status = TodoStatusEnum.Todo.ToString() };

			_dbContext.Todos.Add(todo);
			await _dbContext.SaveChangesAsync();

			// First - Method to retrieve the newly created todo
			// Second - Id to be passed for retrieval
			// Third - Is the object to access the details
			return CreatedAtAction(nameof(Get), new { Id = todo.Id }, todo);
		}

		// Read
		[HttpGet]
		public async Task<ActionResult<List<Todo>>> GetAll()
		{
			return await _dbContext.Todos.ToListAsync();
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Todo>> Get(Guid id)
		{
			var todo = await _dbContext.Todos.FirstOrDefaultAsync(x => x.Id == id);

			if (todo is null)
			{
				return NotFound();
			}

			return todo;
		}

		// Update
		[HttpPut("{id}")]
		public async Task<IActionResult> Update(Guid id, UpdateTodoDto todo)
		{
			// Check if the variable's value is defined in the TodoStatusEnum enum
			//if (!Enum.IsDefined(typeof(TodoStatusEnum), todo.Status))
			//{
			//	return BadRequest("Invalid Todo Status");
			//}

			var getTodo = _dbContext.Todos.FirstOrDefault(x => x.Id == id);

			if (getTodo is null)
			{
				return NotFound();
			}

			getTodo.Title = todo.Title;
			getTodo.Description = todo.Description;
			getTodo.Status = todo.Status == TodoStatusEnum.InProgress.ToString() 
				? TodoStatusEnum.InProgress.GetDisplayName() 
				: todo.Status;

			await _dbContext.SaveChangesAsync();

			return NoContent();
		}

		// Delete
		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(Guid id)
		{
			var todo = await _dbContext.Todos.FirstOrDefaultAsync(x => x.Id == id);

			if (todo is null)
			{
				return NotFound();
			}

			_dbContext.Todos.Remove(todo);

			await _dbContext.SaveChangesAsync();

			return NoContent();
		}

		[HttpGet("test")]
		public IActionResult Test()
		{
			return Ok("test");
		}
	}
}
