
using Microsoft.EntityFrameworkCore;

namespace DataBaseSetup
{
    public class Context : DbContext
    {

        public DbSet<Recognition> Recognitions { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Blob> Blobs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder o)
        {
            try
            {
                o.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=ImagesDB");
            }
            catch
            {
                System.Console.WriteLine("DSDSDSDS");
            }
        }
            
    }
}
