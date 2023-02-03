using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AutomationPortal.DB.Entity
{
    public class Team
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public bool IsDefault { get; set; }
        public string Email { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        public virtual ICollection<TeamCustomFieldValue> CustomFieldValue { get; set; }
    }
}
