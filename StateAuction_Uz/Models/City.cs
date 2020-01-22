using System;
using System.Collections.Generic;

namespace StateAuction_Uz.Models
{
    public partial class City
    {
        public City()
        {
            Lot = new HashSet<Lot>();
        }

        public int IdCity { get; set; }
        public string NameCity { get; set; }

        public ICollection<Lot> Lot { get; set; }
    }
}
