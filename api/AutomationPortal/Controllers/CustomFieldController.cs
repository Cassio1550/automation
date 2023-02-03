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
    public class CustomFieldController : ControllerBase
    {
        private readonly ILogger<CustomFieldController> _logger;

        public AutomationContext Context { get; }

        public CustomFieldController(ILogger<CustomFieldController> logger, AutomationContext context)
        {
            _logger = logger;
            Context = context;
        }

        [HttpGet]
        public IEnumerable<CustomField> Get()
        {
            HttpContext.ValidateAppRole(Role.ADMIN);

            return Context.CustomField.OrderBy(x => x.Entity).ThenBy(x => x.SortOrder).ThenBy(x => x.Name);
        }

        [HttpGet("{id}")]
        public CustomField Get(int id)
        {
            HttpContext.ValidateAppRole(Role.ADMIN);

            return Context.CustomField.First(x => x.Id == id);
        }

        [HttpPost]
        public void Post(CustomField entity)
        {
            HttpContext.ValidateAppRole(Role.ADMIN);

            Context.CustomField.Add(entity);

            Context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void Put(int id, CustomField entity)
        {
            HttpContext.ValidateAppRole(Role.ADMIN);
            Context.CustomField.Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
            Context.SaveChanges();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            HttpContext.ValidateAppRole(Role.ADMIN);
            var entity = Context.CustomField.First(x => x.Id == id);
            Context.CustomField.Remove(entity);

            Context.SaveChanges();
        }

        [HttpGet("entity/{entity}")]
        public IEnumerable<CustomField> GetByEntity(string entity)
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return Context.CustomField.Where(x => x.Entity == entity).OrderBy(x => x.SortOrder).ThenBy(x => x.Name);
        }
    }
}
