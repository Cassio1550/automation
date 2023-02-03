using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutomationPortal.Constants;
using AutomationPortal.DB;
using AutomationPortal.DB.Entity;
using AutomationPortal.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;

namespace AutomationPortal.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly ILogger<DeviceController> _logger;
        private readonly ZabbixService zabbixService;

        public AutomationContext Context { get; }

        public DeviceController(ILogger<DeviceController> logger, AutomationContext context, ZabbixService zabbixService)
        {
            _logger = logger;
            Context = context;
            this.zabbixService = zabbixService;
        }

        [HttpGet]
        public IEnumerable<Device> Get()
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return Context
                .Device
                .Include(entity => entity.Site)
                .ThenInclude(entity => entity.Customer)
                .OrderBy(x => x.Name);
        }

        [HttpGet("{id}")]
        public Device Get(int id)
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return
                Context
                    .Device
                    .Include(entity => entity.CustomFieldValue)
                    .Include(entity => entity.Site)
                    .First(x => x.Id == id);
        }

        [HttpPost]
        public void Post(Device entity)
        {
            HttpContext.ValidateAppRole(Role.WRITE);

            entity.Site = null;
            Context.Device.Add(entity);
            Context.SaveChanges();

            Sync(entity.Id);
        }

        [HttpPut("{id}")]
        public void Put(int id, Device entity)
        {
            HttpContext.ValidateAppRole(Role.WRITE);

            entity.Site = null;

            Context.CustomFieldValue.RemoveRange(Context.CustomFieldValue.OfType<DeviceCustomFieldValue>().Where(x => x.DeviceId == id));

            Context.Device.Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;

            Context.SaveChanges();

            Sync(entity.Id);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            HttpContext.ValidateAppRole(Role.WRITE);
            var entity = Context.Device.First(x => x.Id == id);
            zabbixService.DeleteDevice(entity);
            Context.Device.Remove(entity);
            Context.SaveChanges();
        }

        [HttpPost("sync/{id}")]
        public void Sync(int id)
        {
            HttpContext.ValidateAppRole(Role.WRITE);
            var entity = Context.Device
                .Include(x => x.Site)
                .ThenInclude(x => x.CustomFieldValue)
                .ThenInclude(x => x.CustomField)
                .Include(x => x.Site)
                .ThenInclude(x => x.Customer)
                .Include(x => x.CustomFieldValue)
                .ThenInclude(x => x.CustomField)
                .Include(x => x.DeviceType)
                .First(x => x.Id == id);
            zabbixService.Sync(entity);
            Context.SaveChanges();
        }
    }
}
