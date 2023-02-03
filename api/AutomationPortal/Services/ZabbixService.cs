using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutomationPortal.DB.Entity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ZabbixApi;
using ZabbixApi.Entities;

namespace AutomationPortal.Services
{
    public class ZabbixService
    {
        private readonly ILogger<ZabbixService> _logger;
        private readonly IContext _zabbixContext;
        private readonly IConfiguration _configuration;
        private const string PREFIX = "CLI";
        private const string IP_PATTERN = @"(\d{1,3})(\.\d{1,3}){3}";
        public ZabbixService(ILogger<ZabbixService> logger, IContext zabbixContext, IConfiguration configuration)
        {
            _logger = logger;
            _zabbixContext = zabbixContext;
            _configuration = configuration;
        }

        public void AddHost(Device device)
        {
            var host = BuildHost(device);
            var deviceId = _zabbixContext.Hosts.Create(host);
            device.MonitoringId = deviceId;
        }

        public void UpdateHost(Device device)
        {
            var host = BuildHost(device);
            host.Id = device.MonitoringId;
            _zabbixContext.Hosts.Update(host);
        }

        private Host BuildHost(Device device)
        {
            return new Host
            {
                host = device.Name,
                interfaces = GetInterfaces(device).ToList(),
                groups = GetGroups(device),
                templates = GetTemplate(device),
                tags = new Tag[] { new Tag { tag = "customer", value = device.Site.Customer.Mnemonic } },
                macros = GetMacros(device),
                status = device.Enabled ? Host.Status.Monitored : Host.Status.Unmonitored,
                inventory_mode = Host.InventoryMode.Manual,
                inventory = GetInventory(device),
            };
        }

        private HostInventory GetInventory(Device device)
        {
            var hostInventory = new HostInventory();

            var vantive = device.Site.CustomFieldValue.FirstOrDefault(x => x.CustomField.Name.ToLower() == "vantive");
            if (vantive != null)
                hostInventory.contract_number = vantive.Value;

            return hostInventory;
        }

        public void DeleteDevice(Device device)
        {
            _zabbixContext.Authenticate(_configuration["ZabbixApi:user"], _configuration["ZabbixApi:password"]);

            if (GetExistingHost(device) != null)
                _zabbixContext.Hosts.Delete(new Host { Id = device.MonitoringId });
        }

        public void Sync(Device device)
        {
            _zabbixContext.Authenticate(_configuration["ZabbixApi:user"], _configuration["ZabbixApi:password"]);

            if (string.IsNullOrWhiteSpace(device.MonitoringId))
                AddHost(device);
            else
                UpdateHost(device);
        }

        private IList<HostGroup> GetGroups(Device device)
        {
            var groupName = $"{PREFIX}_{device.DeviceType.Mnemonic}_{device.Site.Customer.Mnemonic}";

            var hostGroups = new List<HostGroup>();
            var hostGroup = _zabbixContext.HostGroups.Get(new { name = groupName }).FirstOrDefault();
            if (hostGroup == null)
            {
                var hostGroupId = _zabbixContext.HostGroups.Create(new HostGroup { name = groupName });
                hostGroups.Add(new HostGroup { Id = hostGroupId });
            }
            else
            {
                hostGroups.Add(new HostGroup { Id = hostGroup.Id });
            }
            return hostGroups;
        }

        private IList<HostMacro> GetMacros(Device device)
        {
            var macros = new List<HostMacro>();
            foreach (var item in device.CustomFieldValue.Where(x => x.CustomField.Name.StartsWith("MACRO_")))
            {
                if (!string.IsNullOrWhiteSpace(item.Value))
                {
                    var macroName = item.CustomField.Name.Replace("MACRO_", string.Empty).ToUpper();
                    macros.Add(new HostMacro { macro = $"{{${macroName}}}", value = item.Value, type = HostMacro.MacroType.Text });
                }
            }
            return macros;
        }

        private IList<Template> GetTemplate(Device device)
        {
            var zabbixTemplates = _zabbixContext.Templates.Get(new { name = device.DeviceType.Templates.Split(',').Select(x => x.Trim()).ToList() });
            if (zabbixTemplates != null)
                return zabbixTemplates.Select(zabbixTemplate => new Template { Id = zabbixTemplate.Id }).ToList();
            return new List<Template>();
        }

        private IEnumerable<HostInterface> GetInterfaces(Device device)
        {
            var useIp = Regex.IsMatch(device.Address, IP_PATTERN);

            if (device.DeviceType.InterfaceType == "SNMPv2c")
            {
                yield return new HostInterface
                {
                    type = HostInterface.InterfaceType.SNMP,
                    main = true,
                    useip = useIp,
                    dns = useIp ? string.Empty : device.Address,
                    ip = useIp ? device.Address : string.Empty,
                    port = "161",
                    details = new InterfaceDetails
                    {
                        version = InterfaceDetails.SNMPInterfaceVersion.SNMPv2c,
                        community = "{$SNMP_COMMUNITY}",
                    }
                };
            }


            if (device.DeviceType.InterfaceType == "SNMPv3")
            {
                yield return new HostInterface
                {
                    Id = GetExistingHost(device)?.interfaces?.FirstOrDefault()?.Id,
                    type = HostInterface.InterfaceType.SNMP,
                    main = true,
                    useip = useIp,
                    dns = useIp ? string.Empty : device.Address,
                    ip = useIp ? device.Address : string.Empty,
                    port = "161",
                    details = new InterfaceDetails
                    {
                        version = InterfaceDetails.SNMPInterfaceVersion.SNMPv3,
                        securityname = "{$SNMPV3_SECURITY_NAME}",
                        securitylevel = InterfaceDetails.SNMPv3SecurityLevel.authPriv,
                        authprotocol = InterfaceDetails.SNMPv3AuthProtocol.SHA,
                        authpassphrase = "{$SNMPV3_AUTHENTICATION_PASSPHRASE}",
                        privprotocol = InterfaceDetails.SNMPv3PrivProtocol.AES,
                        privpassphrase = "{$SNMPV3_PRIVACY_PASSPHRASE}",
                    }
                };
            }
        }

        private Host GetExistingHost(Device device)
        {
            if (!string.IsNullOrWhiteSpace(device.MonitoringId))
                return _zabbixContext.Hosts.GetById(device.MonitoringId);
            return null;
        }
    }
}
