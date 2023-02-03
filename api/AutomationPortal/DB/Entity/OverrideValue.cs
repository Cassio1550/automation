using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomationPortal.DB.Entity
{
    public class OverrideValue
    {
        public int Id { get; set; }
        public string Value { get; set; }

        public int CustomFieldValueId { get; set; }
        public CustomFieldValue CustomFieldValue { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}
