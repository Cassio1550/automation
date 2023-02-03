using AutomationPortal.DB.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace AutomationPortal.DB
{
    public class AutomationContext : DbContext
    {
        public AutomationContext([NotNull] DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CustomFieldValue>()
                .HasDiscriminator<string>("CustomFieldValueType")
                ;

            modelBuilder.Entity<Customer>()
                .HasIndex(x => x.Name)
                .IsUnique();
            modelBuilder.Entity<Customer>()
                .HasIndex(x => x.Mnemonic)
                .IsUnique();
            
            modelBuilder.Entity<ManagedObject>()
                .HasIndex(x => x.Name)
                .IsUnique();

            modelBuilder.Entity<Rule>()
                .HasIndex(x => x.Name)
                .IsUnique();

            modelBuilder.Entity<Device>()
                .HasIndex(x => x.Name)
                .IsUnique();

            modelBuilder.Entity<DeviceType>()
                .HasIndex(x => x.Name)
                .IsUnique();

            modelBuilder.Entity<Site>()
                .HasMany(x=> x.Device)
                .WithOne(x => x.Site)
                .OnDelete(DeleteBehavior.Restrict)
                ;

            modelBuilder.Entity<Customer>()
                .HasMany(x => x.ManagedObject)
                .WithOne(x => x.Customer)
                .OnDelete(DeleteBehavior.Restrict)
                ;

        }

        public DbSet<Customer> Customer { get; set; }
        public DbSet<CustomFieldValue> CustomFieldValue { get; set; }
        public DbSet<OverrideValue> OverrideValue { get; set; }
        public DbSet<Rule> Rule { get; set; }
        public DbSet<Device> Device { get; set; }
        public DbSet<DeviceType> DeviceType { get; set; }
        public DbSet<Site> Site { get; set; }
        public DbSet<Team> Team { get; set; }
        public DbSet<ManagedObject> ManagedObject { get; set; }

        public DbSet<CustomField> CustomField { get; set; }
        public DbSet<CustomerCustomFieldValue> CustomerCustomFieldValue { get; set; }
        public DbSet<RuleCustomFieldValue> RuleCustomFieldValue { get; set; }
        public DbSet<DeviceCustomFieldValue> DeviceCustomFieldValue { get; set; }
        public DbSet<SiteCustomFieldValue> SiteCustomFieldValue { get; set; }
        public DbSet<TeamCustomFieldValue> TeamCustomFieldValue { get; set; }
    }
}
