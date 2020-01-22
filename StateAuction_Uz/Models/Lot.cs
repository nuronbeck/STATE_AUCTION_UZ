using System;
using System.Collections.Generic;

namespace StateAuction_Uz.Models
{
    public partial class Lot
    {
        public Lot()
        {
            LotTovar = new HashSet<LotTovar>();
        }

        public int IdLot { get; set; }
        public int OrderedUserId { get; set; }
        public string AddessLot { get; set; }
        public string DescriptionLot { get; set; }
        public DateTime EndDateTimeLot { get; set; }
        public int? ExecuterUserId { get; set; }
        public int DeliveryDurationLot { get; set; }
        public bool? ClosedLot { get; set; }
        public int CityId { get; set; }

        public City City { get; set; }
        public User ExecuterUser { get; set; }
        public User OrderedUser { get; set; }
        public ICollection<LotTovar> LotTovar { get; set; }
    }
}
