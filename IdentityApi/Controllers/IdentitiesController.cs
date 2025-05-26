using Microsoft.AspNetCore.Mvc;
using IdentityApi.Models;
using IdentityApi.Data;

namespace IdentityApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IdentitiesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IdentitiesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = _context.UserIdentities.Find(id);
            if (user == null) return NotFound();
            return Ok(user);
        }
        [HttpPatch("{id}")]
        public IActionResult Patch(int id, [FromBody] UserUpdateDto updated)
        {
            var user = _context.UserIdentities.Find(id);
            if (user == null) return NotFound();

            if (string.IsNullOrWhiteSpace(updated.Email) || string.IsNullOrWhiteSpace(updated.FullName))
                return BadRequest("FullName and Email are required.");

            user.FullName = updated.FullName;
            user.Email = updated.Email;
            user.LastUpdated = DateTime.UtcNow;

            _context.SaveChanges();
            return Ok(user);
        }

    }
}
