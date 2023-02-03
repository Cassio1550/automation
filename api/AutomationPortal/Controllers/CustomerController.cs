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
    public class CustomerController : ControllerBase
    {
        private readonly ILogger<CustomerController> _logger;

        public AutomationContext Context { get; }

        public CustomerController(ILogger<CustomerController> logger, AutomationContext context)
        {
            _logger = logger;
            Context = context;
        }

        [HttpGet]
        public IEnumerable<Customer> Get()
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return Context.Customer.OrderBy(x => x.Name);
        }

        [HttpGet("{id}")]
        public Customer Get(int id)
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return
                Context
                    .Customer
                    .Include(entity => entity.CustomFieldValue)
                    .First(x => x.Id == id);
        }

        [HttpPost]
        public void Post(Customer entity)
        {
            HttpContext.ValidateAppRole(Role.WRITE);

            Context.Customer.Add(entity);
            Context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void Put(int id, Customer entity)
        {
            HttpContext.ValidateAppRole(Role.WRITE);

            Context.CustomFieldValue.RemoveRange(Context.CustomFieldValue.OfType<CustomerCustomFieldValue>().Where(x => x.CustomerId == id));

            Context.Customer.Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
            Context.SaveChanges();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            HttpContext.ValidateAppRole(Role.WRITE);

            var entity = Context.Customer.First(x => x.Id == id);
            Context.Customer.Remove(entity);

            Context.SaveChanges();
        }

        [HttpGet("WithCustomFields/{mnemonic}")]
        public ActionResult<Dictionary<string, object>> GetWithCustomFields(string mnemonic)
        {
            HttpContext.ValidateAppRole(Role.ANY);

            var customer = Context
                                .Customer
                                .Include(entity => entity.CustomFieldValue)
                                .ThenInclude(entity => entity.CustomField)
                                .Include(entity => entity.Team)
                                .ThenInclude(entity => entity.CustomFieldValue)
                                .ThenInclude(entity => entity.CustomField)
                                .FirstOrDefault(x => x.Mnemonic == mnemonic && x.Enabled);
            if (customer == null)
                return NotFound();

            var customerDict = DictionaryHelper.ObjectToDictionary(customer);
            customer.CustomFieldValue.ToList().ForEach(customField => customerDict.AddCustomFieldValue(customField));

            var team = customer.Team.OrderByDescending(x => x.IsDefault).FirstOrDefault();
            if (team != null)
            {
                var teamDict = DictionaryHelper.ObjectToDictionary(team);
                team.CustomFieldValue.ToList().ForEach(customField => teamDict.AddCustomFieldValue(customField));

                foreach (var teamInfo in teamDict)
                {
                    customerDict.AddIfDoNotExist($"team.{teamInfo.Key}", teamInfo.Value);
                }
            }

            return customerDict;
        }
    }
}
