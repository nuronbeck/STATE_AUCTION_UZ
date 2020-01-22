using System;
using System.Collections.Generic;

namespace StateAuction_Uz.Models
{
    public partial class UnitsMeasuring
    {
        public UnitsMeasuring()
        {
            LotTovar = new HashSet<LotTovar>();
        }

        public int IdUnitsMeasuring { get; set; }
        public string NameUnitsMeasuring { get; set; }

        public ICollection<LotTovar> LotTovar { get; set; }
    }
}
