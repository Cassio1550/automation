using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AutomationPortal.DB.Entity
{
    public class Site
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        public virtual ICollection<SiteCustomFieldValue> CustomFieldValue { get; set; }
        [JsonIgnore]
        public virtual ICollection<Device> Device { get; set; }
    }
}
