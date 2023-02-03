﻿// <auto-generated />
using AutomationPortal.DB;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace AutomationPortal.Migrations
{
    [DbContext(typeof(AutomationContext))]
    [Migration("20210629151956_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.7")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("AutomationPortal.DB.Entity.CustomField", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("CustomFieldType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("DefaultValue")
                        .HasColumnType("text");

                    b.Property<string>("Entity")
                        .HasColumnType("text");

                    b.Property<bool>("Mandatory")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("SortOrder")
                        .HasColumnType("integer");

                    b.Property<string>("Template")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("CustomField");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.CustomFieldValue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("CustomFieldId")
                        .HasColumnType("integer");

                    b.Property<string>("CustomFieldValueType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CustomFieldId");

                    b.ToTable("CustomFieldValue");

                    b.HasDiscriminator<string>("CustomFieldValueType").HasValue("CustomFieldValue");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<bool>("Enabled")
                        .HasColumnType("boolean");

                    b.Property<string>("Mnemonic")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Mnemonic")
                        .IsUnique();

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Customer");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.Device", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("DeviceTypeId")
                        .HasColumnType("integer");

                    b.Property<bool>("Enabled")
                        .HasColumnType("boolean");

                    b.Property<string>("MonitoringId")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("SiteId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("DeviceTypeId");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.HasIndex("SiteId");

                    b.ToTable("Device");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.DeviceType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("InterfaceType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Mnemonic")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Templates")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("DeviceType");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.ManagedObject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("CustomerId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("ManagedObject");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.OverrideValue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("CustomFieldValueId")
                        .HasColumnType("integer");

                    b.Property<int>("CustomerId")
                        .HasColumnType("integer");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CustomFieldValueId");

                    b.HasIndex("CustomerId");

                    b.ToTable("OverrideValue");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.Rule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("ExternalName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Rule");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.Site", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("CustomerId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.ToTable("Site");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("CustomerId")
                        .HasColumnType("integer");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<bool>("IsDefault")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.ToTable("Team");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.CustomerCustomFieldValue", b =>
                {
                    b.HasBaseType("AutomationPortal.DB.Entity.CustomFieldValue");

                    b.Property<int>("CustomerId")
                        .HasColumnType("integer");

                    b.HasIndex("CustomerId");

                    b.HasDiscriminator().HasValue("CustomerCustomFieldValue");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.DeviceCustomFieldValue", b =>
                {
                    b.HasBaseType("AutomationPortal.DB.Entity.CustomFieldValue");

                    b.Property<int>("DeviceId")
                        .HasColumnType("integer");

                    b.HasIndex("DeviceId");

                    b.HasDiscriminator().HasValue("DeviceCustomFieldValue");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.RuleCustomFieldValue", b =>
                {
                    b.HasBaseType("AutomationPortal.DB.Entity.CustomFieldValue");

                    b.Property<int>("RuleId")
                        .HasColumnType("integer");

                    b.HasIndex("RuleId");

                    b.HasDiscriminator().HasValue("RuleCustomFieldValue");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.SiteCustomFieldValue", b =>
                {
                    b.HasBaseType("AutomationPortal.DB.Entity.CustomFieldValue");

                    b.Property<int>("SiteId")
                        .HasColumnType("integer");

                    b.HasIndex("SiteId");

                    b.HasDiscriminator().HasValue("SiteCustomFieldValue");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.TeamCustomFieldValue", b =>
                {
                    b.HasBaseType("AutomationPortal.DB.Entity.CustomFieldValue");

                    b.Property<int>("TeamId")
                        .HasColumnType("integer");

                    b.HasIndex("TeamId");

                    b.HasDiscriminator().HasValue("TeamCustomFieldValue");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.CustomFieldValue", b =>
                {
                    b.HasOne("AutomationPortal.DB.Entity.CustomField", "CustomField")
                        .WithMany()
                        .HasForeignKey("CustomFieldId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CustomField");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.Device", b =>
                {
                    b.HasOne("AutomationPortal.DB.Entity.DeviceType", "DeviceType")
                        .WithMany()
                        .HasForeignKey("DeviceTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AutomationPortal.DB.Entity.Site", "Site")
                        .WithMany("Device")
                        .HasForeignKey("SiteId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("DeviceType");

                    b.Navigation("Site");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.ManagedObject", b =>
                {
                    b.HasOne("AutomationPortal.DB.Entity.Customer", "Customer")
                        .WithMany("ManagedObject")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.OverrideValue", b =>
                {
                    b.HasOne("AutomationPortal.DB.Entity.CustomFieldValue", "CustomFieldValue")
                        .WithMany("OverrideValue")
                        .HasForeignKey("CustomFieldValueId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AutomationPortal.DB.Entity.Customer", "Customer")
                        .WithMany("OverrideValue")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("CustomFieldValue");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.Site", b =>
                {
                    b.HasOne("AutomationPortal.DB.Entity.Customer", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.Team", b =>
                {
                    b.HasOne("AutomationPortal.DB.Entity.Customer", "Customer")
                        .WithMany("Team")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.CustomerCustomFieldValue", b =>
                {
                    b.HasOne("AutomationPortal.DB.Entity.Customer", null)
                        .WithMany("CustomFieldValue")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.DeviceCustomFieldValue", b =>
                {
                    b.HasOne("AutomationPortal.DB.Entity.Device", null)
                        .WithMany("CustomFieldValue")
                        .HasForeignKey("DeviceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.RuleCustomFieldValue", b =>
                {
                    b.HasOne("AutomationPortal.DB.Entity.Rule", null)
                        .WithMany("CustomFieldValue")
                        .HasForeignKey("RuleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.SiteCustomFieldValue", b =>
                {
                    b.HasOne("AutomationPortal.DB.Entity.Site", null)
                        .WithMany("CustomFieldValue")
                        .HasForeignKey("SiteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.TeamCustomFieldValue", b =>
                {
                    b.HasOne("AutomationPortal.DB.Entity.Team", null)
                        .WithMany("CustomFieldValue")
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.CustomFieldValue", b =>
                {
                    b.Navigation("OverrideValue");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.Customer", b =>
                {
                    b.Navigation("CustomFieldValue");

                    b.Navigation("ManagedObject");

                    b.Navigation("OverrideValue");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.Device", b =>
                {
                    b.Navigation("CustomFieldValue");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.Rule", b =>
                {
                    b.Navigation("CustomFieldValue");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.Site", b =>
                {
                    b.Navigation("CustomFieldValue");

                    b.Navigation("Device");
                });

            modelBuilder.Entity("AutomationPortal.DB.Entity.Team", b =>
                {
                    b.Navigation("CustomFieldValue");
                });
#pragma warning restore 612, 618
        }
    }
}
