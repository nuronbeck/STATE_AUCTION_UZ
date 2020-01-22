using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace StateAuction_Uz.Models
{
    public partial class Organisation
    {
        public Organisation()
        {
            User = new HashSet<User>();
        }

        public static EntityState Modified { get; internal set; }
        public int IdOrganisation { get; set; }
        public string FioOrg { get; set; }
        public string FullNameOrg { get; set; }
        public string ShortNameOrg { get; set; }
        public string TelNumberOrg { get; set; }
        public string FactAddressOrg { get; set; }
        public string YurAddressOrg { get; set; }
        public string Inn { get; set; }
        public string Kpp { get; set; }
        public string Okpo { get; set; }
        public string Okved { get; set; }
        public string Ogrn { get; set; }

        public ICollection<User> User { get; set; }
    }
}
