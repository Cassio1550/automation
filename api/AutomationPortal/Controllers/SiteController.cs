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
    public class SiteController : ControllerBase
    {
        private readonly ILogger<SiteController> _logger;

        public AutomationContext Context { get; }

        public SiteController(ILogger<SiteController> logger, AutomationContext context)
        {
            _logger = logger;
            Context = context;
        }

        [HttpGet]
        public IEnumerable<Site> Get()
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return Context.Site.OrderBy(x => x.Name);
        }

        [HttpGet("{id}")]
        public Site Get(int id)
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return
                Context
                    .Site
                    .Include(entity => entity.CustomFieldValue)
                    .First(x => x.Id == id);
        }

        [HttpPost]
        public void Post(Site entity)
        {
            HttpContext.ValidateAppRole(Role.WRITE);
            entity.Customer = null;
            Context.Site.Add(entity);
            Context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void Put(int id, Site entity)
        {
            HttpContext.ValidateAppRole(Role.WRITE);
            entity.Customer = null;

            Context.CustomFieldValue.RemoveRange(Context.CustomFieldValue.OfType<SiteCustomFieldValue>().Where(x => x.SiteId == id));

            Context.Site.Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
            Context.SaveChanges();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            HttpContext.ValidateAppRole(Role.WRITE);
            var entity = Context.Site.First(x => x.Id == id);
            Context.Site.Remove(entity);

            Context.SaveChanges();
        }

        [HttpGet("customer/{customerId}")]
        public IEnumerable<Site> GetByEntity(int customerId)
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return Context.Site.Where(x => x.CustomerId == customerId).OrderBy(x => x.Name);
        }
    }
}
