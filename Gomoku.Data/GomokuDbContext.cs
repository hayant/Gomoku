
using Microsoft.EntityFrameworkCore;
using Gomoku.Data.Models;

namespace Gomoku.Data;

public class GomokuDbContext(DbContextOptions<GomokuDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Game> Games { get; set; }
    public DbSet<GameTurn>  GameTurns { get; set; }
    public DbSet<Setting> Settings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // A user can have at most one value per setting name. UserId is nullable
        // so the same table can also hold application-wide settings (UserId NULL);
        // SQL Server treats NULLs as equal in a unique index, allowing exactly one
        // application-wide row per name.
        // HasFilter(null) overrides EF's default "[UserId] IS NOT NULL" filter so the
        // unique constraint also covers application-wide rows (UserId NULL).
        modelBuilder.Entity<Setting>()
            .HasIndex(s => new { s.UserId, s.Name })
            .IsUnique()
            .HasFilter(null);
    }
}