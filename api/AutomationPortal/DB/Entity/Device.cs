using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AutomationPortal.DB.Entity
{
    public class Device
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }
        public string MonitoringId { get; set; }
        public bool Enabled { get; set; }
        public int SiteId { get; set; }
        public Site Site { get; set; }

        public int DeviceTypeId { get; set; }
        public DeviceType DeviceType { get; set; }
        
        public ICollection<DeviceCustomFieldValue> CustomFieldValue { get; set; }
    }
}
