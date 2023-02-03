using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AutomationPortal.DB.Entity
{
    public class CustomField
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string DefaultValue { get; set; }
        public string Template { get; set; }
        [Required]
        public string CustomFieldType { get; set; }
        public bool Mandatory { get; set; }
        public string Entity { get; set; }
        public int SortOrder { get; set; }
    }
}
