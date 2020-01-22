using System;
using System.Collections.Generic;

namespace StateAuction_Uz.Models
{
    public partial class LotTovar
    {
        public int IdLotTovar { get; set; }
        public int LotId { get; set; }
        public string NameLotTovar { get; set; }
        public float CountLotTovar { get; set; }
        public int UnitsMeasuringId { get; set; }
        public float StartPriceLotTovar { get; set; }
        public float SuggestPriceLotTovar { get; set; }
        public int UserId { get; set; }

        public Lot Lot { get; set; }
        public UnitsMeasuring UnitsMeasuring { get; set; }
        public User User { get; set; }
    }
}
