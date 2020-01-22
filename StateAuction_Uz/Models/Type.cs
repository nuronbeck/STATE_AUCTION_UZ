using System;
using System.Collections.Generic;

namespace StateAuction_Uz.Models
{
    public partial class Type
    {
        public Type()
        {
            User = new HashSet<User>();
        }

        public int IdType { get; set; }
        public string NameType { get; set; }

        public ICollection<User> User { get; set; }
    }
}
