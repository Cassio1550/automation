using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutomationPortal.Constants;
using AutomationPortal.DB;
using AutomationPortal.DB.Entity;
using AutomationPortal.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;

namespace AutomationPortal.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RuleController : ControllerBase
    {
        private readonly ILogger<RuleController> _logger;
        private IWebHostEnvironment _env;

        public AutomationContext Context { get; }

        public RuleController(ILogger<RuleController> logger, IWebHostEnvironment env, AutomationContext context)
        {
            _logger = logger;
            _env = env;
            Context = context;
        }

        [HttpGet]
        public IEnumerable<Rule> Get()
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return Context.Rule.OrderBy(x => x.Name);
        }

        [HttpGet("{id}")]
        public Rule Get(int id)
        {
            HttpContext.ValidateAppRole(Role.ANY);

            return
                Context
                    .Rule
                    .Include(entity => entity.CustomFieldValue)
                    .First(x => x.Id == id);
        }

        [HttpPost]
        public void Post(Rule entity)
        {
            HttpContext.ValidateAppRole(Role.WRITE);
            Context.Rule.Add(entity);
            Context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void Put(int id, Rule entity)
        {
            HttpContext.ValidateAppRole(Role.WRITE);

            Context.CustomFieldValue.RemoveRange(Context.CustomFieldValue.OfType<RuleCustomFieldValue>().Where(x => x.RuleId == id));

            Context.Rule.Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
            Context.SaveChanges();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            HttpContext.ValidateAppRole(Role.WRITE);
            var entity = Context.Rule.First(x => x.Id == id);
            Context.Rule.Remove(entity);

            Context.SaveChanges();
        }

        [HttpGet("WithCustomFields/{externalName}")]
        public ActionResult<Dictionary<string, object>> GetWithCustomFields(string externalName)
        {
            HttpContext.ValidateAppRole(Role.ANY);

            var entity = Context
                                .Rule
                                .Include(entity => entity.CustomFieldValue)
                                .ThenInclude(entity => entity.CustomField)
                                .FirstOrDefault(x => x.ExternalName == externalName);
            if (entity == null)
                return NotFound();

            var entityDict = DictionaryHelper.ObjectToDictionary(entity);
            entity.CustomFieldValue.ToList().ForEach(customField => entityDict.AddCustomFieldValue(customField));

            return entityDict;
        }

        [HttpPost("WithCustomFields")]
        public void AddWithCustomFields(Dictionary<string, object> rule)
        {
            HttpContext.ValidateAppRole(Role.WRITE);

            var entity = new Rule
            {
                Name = rule["Name"].ToString(),
                ExternalName = rule["ExternalName"].ToString(),
                CustomFieldValue = new List<RuleCustomFieldValue>(),
            };

            Context.Rule.Add(entity);

            var entityFields = new string[] { "Name", "ExternalName", "Id" };
            foreach (var item in rule.Keys.Where(x => !entityFields.Contains(x)))
            {
                var customField = Context.CustomField.FirstOrDefault(x => x.Name == item && x.Entity == "rule");
                if (customField == null)
                    continue;

                entity.CustomFieldValue.Add(new RuleCustomFieldValue
                {
                    CustomField = customField,
                    Value = rule[item]?.ToString(),
                }); ;
            }

            Context.SaveChanges();
        }

        [HttpPost("ManyWithCustomFields")]
        public void AddManyWithCustomFields(IEnumerable<Dictionary<string, object>> rules)
        {
            foreach (var rule in rules)
            {
                AddWithCustomFields(rule);
            }
        }

        [HttpGet("use-case/{id}")]
        public ActionResult GetUseCase(int id)
        {
            HttpContext.ValidateAppRole(Role.ANY);

            var entity = Context
                                .Rule
                                .Include(entity => entity.CustomFieldValue)
                                .ThenInclude(entity => entity.CustomField)
                                .FirstOrDefault(x => x.Id == id);
            if (entity == null)
                return NotFound();

            var entityDict = DictionaryHelper.ObjectToDictionary(entity);
            entity.CustomFieldValue.ToList().ForEach(customField => entityDict.AddCustomFieldValue(customField));

            var filePath = Path.Combine(_env.ContentRootPath, "Content", "model.docx");

            return File(DocxHelper.ReplaceDocumentContent(filePath, entityDict), "application/vnd.openxmlformats-officedocument.wordprocessingml.document", $"{entity.Name}.docx");
        }
    }
}
