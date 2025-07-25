﻿// <auto-generated />
using Dream.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Dream.Migrations
{
    [DbContext(typeof(DreamDbContext))]
    partial class DreamDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.6");

            modelBuilder.Entity("Dream.Models.Thought", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ThoughtText")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Thoughts");
                });
#pragma warning restore 612, 618
        }
    }
}
