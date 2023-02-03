using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutomationPortal.Constants;
using AutomationPortal.DB;
using AutomationPortal.DB.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;

namespace AutomationPortal.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ILogger<TeamController> _logger;

        public AutomationContext Context { get; }

        public TeamController(ILogger<TeamController> logger, AutomationContext context)
        {
            _logger = logger;
            Context = context;
        }

        [HttpGet]
        public IEnumerable<Team> Get()
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return Context.Team.OrderBy(x => x.Name);
        }

        [HttpGet("{id}")]
        public Team Get(int id)
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return
                Context
                    .Team
                    .Include(entity => entity.CustomFieldValue)
                    .First(x => x.Id == id);
        }

        [HttpPost]
        public void Post(Team entity)
        {
            HttpContext.ValidateAppRole(Role.WRITE);
            Context.Team.Add(entity);
            Context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void Put(int id, Team entity)
        {
            HttpContext.ValidateAppRole(Role.WRITE);

            Context.CustomFieldValue.RemoveRange(Context.CustomFieldValue.OfType<TeamCustomFieldValue>().Where(x => x.TeamId == id));

            Context.Team.Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
            Context.SaveChanges();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            HttpContext.ValidateAppRole(Role.WRITE);
            var entity = Context.Team.First(x => x.Id == id);
            Context.Team.Remove(entity);

            Context.SaveChanges();
        }

        [HttpGet("customer/{customerId}")]
        public IEnumerable<Team> GetByEntity(int customerId)
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return Context.Team.Where(x => x.CustomerId == customerId).OrderBy(x => x.Name);
        }
    }
}
