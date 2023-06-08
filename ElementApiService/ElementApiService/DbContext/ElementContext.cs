namespace ElementApiService.DbContext;

using Microsoft.EntityFrameworkCore;
using Model;

public class ElementContext : DbContext
{
    public ElementContext(DbContextOptions<ElementContext> options) : base(options){}

    public DbSet<ElementEntity> Elements { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql();
    }
}