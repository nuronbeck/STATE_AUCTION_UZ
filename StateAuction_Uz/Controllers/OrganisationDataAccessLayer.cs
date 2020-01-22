using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StateAuction_Uz.Models
{
    public class OrganisationDataAccessLayer
    {
        STATE_AUCTION_DBContext db = new STATE_AUCTION_DBContext();

        public IEnumerable<Organisation> getOrganisations()
        {
            try
            {
                return db.Organisation.ToList();
            }
            catch { throw; }
        }

        public Organisation addOrganisation(Organisation organisation)
        {
            try
            {
                using (db)
                {
                    var initOrganisation = new Organisation();
                    initOrganisation = organisation;

                    db.Organisation.Add(initOrganisation);
                    db.SaveChanges();

                    return initOrganisation;
                }


                //db.Organisation.Add(organisation);
                //db.SaveChanges();
                //return 1;
                //return db.SaveChanges();
            }
            catch { throw; }
        }


        public Organisation getOrganisationData(int idOrganisation)
        {
            try
            {
                Organisation organ = db.Organisation.Find(idOrganisation);
                return organ;
            }
            catch { throw; }
        }

        public int UpdateOrganisation(string org)
        {
            //System.Diagnostics.Debug.WriteLine("Данные => "+ JsonConvert.SerializeObject(org));
            try
            {
                using (db)
                {
                    //System.Diagnostics.Debug.WriteLine("Данные => " + org);
                    var jsonArray = JObject.Parse(org);
                    //var id = jsonArray["idOrganisation"].ToString();

                    //System.Diagnostics.Debug.WriteLine("Данные => ID_ORG" + jsonArray);

                    //db.Entry(jsonArray).State = Organisation.Modified;
                    Organisation organ = db.Organisation.Find(Convert.ToInt32(jsonArray["IdOrganisation"]));
                    organ.FioOrg = jsonArray["FioOrg"].ToString();
                    organ.FullNameOrg = jsonArray["FullNameOrg"].ToString();
                    organ.ShortNameOrg = jsonArray["ShortNameOrg"].ToString();
                    organ.TelNumberOrg = jsonArray["TelNumberOrg"].ToString();
                    organ.FactAddressOrg = jsonArray["FactAddressOrg"].ToString();
                    organ.YurAddressOrg = jsonArray["YurAddressOrg"].ToString();
                    organ.Inn = jsonArray["Inn"].ToString();
                    organ.Kpp = jsonArray["Kpp"].ToString();
                    organ.Okpo = jsonArray["Okpo"].ToString();
                    organ.Okved = jsonArray["Okved"].ToString();
                    organ.Ogrn = jsonArray["Ogrn"].ToString();
                    db.SaveChanges();
                    return 1;
                }
            }
            catch
            {
                throw;
            }
        }


        public int deleteOrganisation(int orgId)
        {
            try
            {
                Organisation organ = db.Organisation.Find(orgId);
                db.Organisation.Remove(organ);
                db.SaveChanges();
                return 1;
            }
            catch { throw; }
        }

    }
}
