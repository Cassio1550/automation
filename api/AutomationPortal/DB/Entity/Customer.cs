using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AutomationPortal.DB.Entity
{
    public class Customer
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Mnemonic { get; set; }
        public bool Enabled { get; set; }

        public virtual ICollection<Team> Team { get; set; }
        [JsonIgnore]
        public virtual ICollection<ManagedObject> ManagedObject { get; set; }

        public virtual ICollection<OverrideValue> OverrideValue { get; set; }

        public virtual ICollection<CustomerCustomFieldValue> CustomFieldValue { get; set; }
    }
}
