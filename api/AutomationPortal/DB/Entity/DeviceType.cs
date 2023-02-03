using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AutomationPortal.DB.Entity
{
    public class DeviceType
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Mnemonic { get; set; }
        [Required]
        public string InterfaceType { get; set; }
        public string Templates { get; set; }
    }
}
