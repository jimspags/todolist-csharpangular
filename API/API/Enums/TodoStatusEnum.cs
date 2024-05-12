using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace API.Enums
{
	public enum TodoStatusEnum
	{
		Todo,
		[Display(Name = "In Progress")]
		InProgress,
		Completed
	}

	
	public static class EnumExtensions
	{
		// Add method to get the display name
		public static string GetDisplayName(this Enum value)
		{
			return value.GetType()
						.GetMember(value.ToString())
						.First()
						.GetCustomAttribute<DisplayAttribute>()
						?.Name
					?? value.ToString();
		}
	}
}
