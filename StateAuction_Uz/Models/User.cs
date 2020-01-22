using System;
using System.Collections.Generic;

namespace StateAuction_Uz.Models
{
    public partial class User
    {
        public User()
        {
            LotExecuterUser = new HashSet<Lot>();
            LotOrderedUser = new HashSet<Lot>();
            LotTovar = new HashSet<LotTovar>();
        }

        public int IdUser { get; set; }
        public string FioUser { get; set; }
        public string EmailUser { get; set; }
        public string PasswordUser { get; set; }
        public int TypeId { get; set; }
        public int OrganisationId { get; set; }

        public Organisation Organisation { get; set; }
        public Type Type { get; set; }
        public ICollection<Lot> LotExecuterUser { get; set; }
        public ICollection<Lot> LotOrderedUser { get; set; }
        public ICollection<LotTovar> LotTovar { get; set; }
    }
}
