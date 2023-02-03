using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AutomationPortal.DB.Entity
{
    public class CustomFieldValue
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public int CustomFieldId { get; set; }
        public CustomField CustomField { get; set; }

        public ICollection<OverrideValue> OverrideValue { get; set; }
    }

    public class CustomerCustomFieldValue : CustomFieldValue
    {
        public int CustomerId { get; set; }
    }

    public class RuleCustomFieldValue : CustomFieldValue
    {
        public int RuleId { get; set; }
    }

    public class DeviceCustomFieldValue : CustomFieldValue
    {
        public int DeviceId { get; set; }
    }

    public class SiteCustomFieldValue : CustomFieldValue
    {
        public int SiteId { get; set; }
    }

    public class TeamCustomFieldValue : CustomFieldValue
    {
        public int TeamId { get; set; }
    }
}
