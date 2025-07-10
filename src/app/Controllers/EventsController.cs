using Microsoft.AspNetCore.Mvc;
using CommunityConnectApi.Models;
using CommunityConnectApi.Dtos;

namespace CommunityConnectApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private static List<Event> _events = new();

        [HttpPost]
        public IActionResult CreateEvent([FromBody] CreateEventDto dto)
        {
            var newEvent = new Event
            {
                Id = _events.Count + 1,
                Title = dto.Title,
                Description = dto.Description,
                Date = dto.Date,
                Categories = dto.Categories
            };

            _events.Add(newEvent);
            return Ok(newEvent);
        }

        [HttpGet]
        public IActionResult GetAllEvents()
        {
            return Ok(_events);
        }
    }
}
