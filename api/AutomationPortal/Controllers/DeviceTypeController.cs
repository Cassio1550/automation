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
    public class DeviceTypeController : ControllerBase
    {
        private readonly ILogger<DeviceTypeController> _logger;

        public AutomationContext Context { get; }

        public DeviceTypeController(ILogger<DeviceTypeController> logger, AutomationContext context)
        {
            _logger = logger;
            Context = context;
        }

        [HttpGet]
        public IEnumerable<DeviceType> Get()
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return Context.DeviceType.OrderBy(x=> x.Name);
        }

        [HttpGet("{id}")]
        public DeviceType Get(int id)
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return
                Context
                    .DeviceType
                    .First(x => x.Id == id);
        }

        [HttpPost]
        public void Post(DeviceType entity)
        {
            HttpContext.ValidateAppRole(Role.ADMIN);
            Context.DeviceType.Add(entity);
            Context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void Put(int id, DeviceType entity)
        {
            HttpContext.ValidateAppRole(Role.ADMIN);
            Context.DeviceType.Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
            Context.SaveChanges();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            HttpContext.ValidateAppRole(Role.ADMIN);
            var entity = Context.DeviceType.First(x => x.Id == id);
            Context.DeviceType.Remove(entity);
            Context.SaveChanges();
        }
    }
}
