using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace StateAuction_Uz.Models
{
    public partial class STATE_AUCTION_DBContext : DbContext
    {
        public STATE_AUCTION_DBContext()
        {
        }

        public STATE_AUCTION_DBContext(DbContextOptions<STATE_AUCTION_DBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<City> City { get; set; }
        public virtual DbSet<Lot> Lot { get; set; }
        public virtual DbSet<LotTovar> LotTovar { get; set; }
        public virtual DbSet<Organisation> Organisation { get; set; }
        public virtual DbSet<Type> Type { get; set; }
        public virtual DbSet<UnitsMeasuring> UnitsMeasuring { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=tcp:state-auction.database.windows.net,1433;Initial Catalog=STATE_AUCTION_DB;Persist Security Info=False;User ID=noreck77;Password=Dataproger123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<City>(entity =>
            {
                entity.HasKey(e => e.IdCity);

                entity.Property(e => e.IdCity).HasColumnName("ID_City");

                entity.Property(e => e.NameCity)
                    .IsRequired()
                    .HasMaxLength(110)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Lot>(entity =>
            {
                entity.HasKey(e => e.IdLot);

                entity.Property(e => e.IdLot).HasColumnName("ID_Lot");

                entity.Property(e => e.AddessLot)
                    .IsRequired()
                    .HasColumnName("Addess_Lot")
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.CityId).HasColumnName("City_ID");

                entity.Property(e => e.ClosedLot).HasColumnName("Closed_Lot");

                entity.Property(e => e.DeliveryDurationLot).HasColumnName("DeliveryDuration_Lot");

                entity.Property(e => e.DescriptionLot)
                    .HasColumnName("Description_Lot")
                    .HasColumnType("text");

                entity.Property(e => e.EndDateTimeLot)
                    .HasColumnName("EndDateTime_Lot")
                    .HasColumnType("datetime");

                entity.Property(e => e.ExecuterUserId).HasColumnName("ExecuterUser_ID");

                entity.Property(e => e.OrderedUserId).HasColumnName("OrderedUser_ID");

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Lot)
                    .HasForeignKey(d => d.CityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Lot_City");

                entity.HasOne(d => d.ExecuterUser)
                    .WithMany(p => p.LotExecuterUser)
                    .HasForeignKey(d => d.ExecuterUserId)
                    .HasConstraintName("FK_Lot_User1");

                entity.HasOne(d => d.OrderedUser)
                    .WithMany(p => p.LotOrderedUser)
                    .HasForeignKey(d => d.OrderedUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Lot_User");
            });

            modelBuilder.Entity<LotTovar>(entity =>
            {
                entity.HasKey(e => e.IdLotTovar);

                entity.Property(e => e.IdLotTovar).HasColumnName("ID_LotTovar");

                entity.Property(e => e.CountLotTovar).HasColumnName("Count_LotTovar");

                entity.Property(e => e.LotId).HasColumnName("Lot_ID");

                entity.Property(e => e.NameLotTovar)
                    .IsRequired()
                    .HasColumnName("Name_LotTovar")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.StartPriceLotTovar).HasColumnName("StartPrice_LotTovar");

                entity.Property(e => e.SuggestPriceLotTovar).HasColumnName("SuggestPrice_LotTovar");

                entity.Property(e => e.UnitsMeasuringId).HasColumnName("UnitsMeasuring_ID");

                entity.Property(e => e.UserId).HasColumnName("User_ID");

                entity.HasOne(d => d.Lot)
                    .WithMany(p => p.LotTovar)
                    .HasForeignKey(d => d.LotId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LotTovar_Lot");

                entity.HasOne(d => d.UnitsMeasuring)
                    .WithMany(p => p.LotTovar)
                    .HasForeignKey(d => d.UnitsMeasuringId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LotTovar_UnitsMeasuring");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.LotTovar)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LotTovar_User");
            });

            modelBuilder.Entity<Organisation>(entity =>
            {
                entity.HasKey(e => e.IdOrganisation);

                entity.Property(e => e.IdOrganisation).HasColumnName("ID_Organisation");

                entity.Property(e => e.FactAddressOrg)
                    .HasColumnName("FactAddress_Org")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.FioOrg)
                    .HasColumnName("FIO_Org")
                    .HasMaxLength(90)
                    .IsUnicode(false);

                entity.Property(e => e.FullNameOrg)
                    .HasColumnName("FullName_Org")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Inn)
                    .HasColumnName("INN")
                    .HasMaxLength(90)
                    .IsUnicode(false);

                entity.Property(e => e.Kpp)
                    .HasColumnName("KPP")
                    .HasMaxLength(90)
                    .IsUnicode(false);

                entity.Property(e => e.Ogrn)
                    .HasColumnName("OGRN")
                    .HasMaxLength(90)
                    .IsUnicode(false);

                entity.Property(e => e.Okpo)
                    .HasColumnName("OKPO")
                    .HasMaxLength(90)
                    .IsUnicode(false);

                entity.Property(e => e.Okved)
                    .HasColumnName("OKVED")
                    .HasMaxLength(90)
                    .IsUnicode(false);

                entity.Property(e => e.ShortNameOrg)
                    .HasColumnName("ShortName_Org")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.TelNumberOrg)
                    .HasColumnName("TelNumber_Org")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.YurAddressOrg)
                    .HasColumnName("YurAddress_Org")
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Type>(entity =>
            {
                entity.HasKey(e => e.IdType);

                entity.Property(e => e.IdType).HasColumnName("ID_Type");

                entity.Property(e => e.NameType)
                    .IsRequired()
                    .HasColumnName("Name_Type")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UnitsMeasuring>(entity =>
            {
                entity.HasKey(e => e.IdUnitsMeasuring);

                entity.Property(e => e.IdUnitsMeasuring).HasColumnName("ID_UnitsMeasuring");

                entity.Property(e => e.NameUnitsMeasuring)
                    .IsRequired()
                    .HasColumnName("Name_UnitsMeasuring")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.IdUser);

                entity.Property(e => e.IdUser).HasColumnName("ID_User");

                entity.Property(e => e.EmailUser)
                    .IsRequired()
                    .HasColumnName("Email_User")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FioUser)
                    .IsRequired()
                    .HasColumnName("FIO_User")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrganisationId).HasColumnName("Organisation_ID");

                entity.Property(e => e.PasswordUser)
                    .IsRequired()
                    .HasColumnName("Password_User")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TypeId).HasColumnName("Type_ID");

                entity.HasOne(d => d.Organisation)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.OrganisationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Organisation");

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.TypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Type");
            });
        }
    }
}
