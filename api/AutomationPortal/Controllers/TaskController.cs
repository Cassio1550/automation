using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using AutomationPortal.Constants;
using AutomationPortal.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;
using RabbitMQ.Client;

namespace AutomationPortal.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ILogger<TaskController> _logger;
        private readonly IConnection RabbitMQConnection;

        public AutomationContext Context { get; }

        public TaskController(ILogger<TaskController> logger, AutomationContext context, IConnection rabbitMQConnection)
        {
            _logger = logger;
            Context = context;
            RabbitMQConnection = rabbitMQConnection;
        }

        [HttpPost("run")]
        public void Run(Dictionary<string, string> parameters)
        {
            HttpContext.ValidateAppRole(Role.WRITE);

            var channel = RabbitMQConnection.CreateModel();

            string message = JsonSerializer.Serialize(parameters);
            var body = Encoding.UTF8.GetBytes(message);

            channel.BasicPublish(exchange: "",
                                 routingKey: "report",
                                 basicProperties: null,
                                 body: body);

            channel.Close();
        }

        ~TaskController()
        {
            if (RabbitMQConnection != null && RabbitMQConnection.IsOpen)
                RabbitMQConnection.Close();
        }

    }
}
