using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutomationPortal.Constants;
using AutomationPortal.DB;
using AutomationPortal.DB.Entity;
using AutomationPortal.Helper;
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
    public class ManagedObjectController : ControllerBase
    {
        private readonly ILogger<ManagedObjectController> _logger;

        public AutomationContext Context { get; }

        public ManagedObjectController(ILogger<ManagedObjectController> logger, AutomationContext context)
        {
            _logger = logger;
            Context = context;
        }

        [HttpGet]
        public IEnumerable<ManagedObject> Get()
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return Context.ManagedObject.OrderBy(x => x.Name);
        }

        [HttpGet("{id}")]
        public ManagedObject Get(int id)
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return
                Context
                    .ManagedObject
                    .First(x => x.Id == id);
        }

        [HttpPost]
        public void Post(ManagedObject entity)
        {
            HttpContext.ValidateAppRole(Role.WRITE);
            entity.Customer = null;
            Context.ManagedObject.Add(entity);
            Context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void Put(int id, ManagedObject entity)
        {
            HttpContext.ValidateAppRole(Role.WRITE);
            entity.Customer = null;
            Context.ManagedObject.Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
            Context.SaveChanges();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            HttpContext.ValidateAppRole(Role.WRITE);
            var entity = Context.ManagedObject.First(x => x.Id == id);
            Context.ManagedObject.Remove(entity);

            Context.SaveChanges();
        }

        [HttpGet("WithCustomer/{name}")]
        public ActionResult<Dictionary<string, object>> GetWithCustomFields(string name)
        {
            HttpContext.ValidateAppRole(Role.ANY);

            var managedObject = Context
                                .ManagedObject
                                .Include(entity => entity.Customer)
                                .ThenInclude(entity => entity.CustomFieldValue)
                                .ThenInclude(entity => entity.CustomField)
                                .FirstOrDefault(x => x.Name == name && x.Customer.Enabled);
            if (managedObject == null)
                return NotFound();

            var managedObjectDict = DictionaryHelper.ObjectToDictionary(managedObject);


            var customerDict = DictionaryHelper.ObjectToDictionary(managedObject.Customer);
            managedObject.Customer.CustomFieldValue.ToList().ForEach(customField => customerDict.AddCustomFieldValue(customField));

            foreach (var teamInfo in customerDict)
            {
                managedObjectDict.AddIfDoNotExist($"customer.{teamInfo.Key}", teamInfo.Value);
            }

            return managedObjectDict;
        }
    }
}
