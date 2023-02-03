using AutomationPortal.DB;
using AutomationPortal.Helper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomationPortal
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddTransient<ZabbixApi.IContext>(provider => new ZabbixApi.Context(Configuration["ZabbixApi:url"]))
                .AddTransient<Services.ZabbixService, Services.ZabbixService>()
                .AddSingleton<RabbitMQ.Client.IConnectionFactory>(provider => new RabbitMQ.Client.ConnectionFactory { Uri = new Uri(Configuration["RabbiMQ"]) })
                .AddTransient(provider => provider.GetService<RabbitMQ.Client.IConnectionFactory>().CreateConnection())
                ;


            //services.AddDbContext<AutomationContext>(options => options.UseMySql(Configuration["ConnectionStrings:AutomationPortal"], new MariaDbServerVersion(new Version(15, 5, 9))));
            services.AddDbContext<AutomationContext>(options => options.UseNpgsql(Configuration["ConnectionStrings:AutomationPortal"]));

            services.AddAuthentication(AzureADDefaults.BearerAuthenticationScheme)
                .AddAzureADBearer(options => Configuration.Bind("AzureAd", options));

            services.AddAuthorization();

            services.AddControllers();

            services.AddCors(o => o.AddDefaultPolicy(builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(policyBuilder =>
            {
                policyBuilder.AllowAnyOrigin();
                policyBuilder.AllowAnyMethod();
                policyBuilder.AllowAnyHeader();
                policyBuilder.WithExposedHeaders("content-disposition");
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseMiddleware<RequestResponseLoggingMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            InitializeDatabase(app);
        }

        private void InitializeDatabase(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                scope.ServiceProvider.GetRequiredService<AutomationContext>().Database.Migrate();
            }
        }
    }
}
