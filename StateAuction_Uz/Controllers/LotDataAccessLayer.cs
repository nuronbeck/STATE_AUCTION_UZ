using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace StateAuction_Uz.Models
{
    public class LotDataAccessLayer
    {
        STATE_AUCTION_DBContext db = new STATE_AUCTION_DBContext();

        public IEnumerable<Lot> getLots()
        {
            try
            {
                return db.Lot.ToList();
            }
            catch { throw; }
        }

        public Lot addLot(Lot lot)
        {
            try
            {
                using (db)
                {
                    var initLot = new Lot();
                    initLot = lot;

                    db.Lot.Add(initLot);
                    db.SaveChanges();

                    return initLot;
                }


                //db.Organisation.Add(organisation);
                //db.SaveChanges();
                //return 1;
                //return db.SaveChanges();
            }
            catch { throw; }
        }


        public Lot AddNewLot(string newLot)
        {
            //System.Diagnostics.Debug.WriteLine("Данные => "+ JsonConvert.SerializeObject(org));
            try
            {
                using (db)
                {
                    //System.Diagnostics.Debug.WriteLine("Данные => " + org);
                    var jsonArray = JObject.Parse(newLot);
                    //var id = jsonArray["idOrganisation"].ToString();
                    //System.Diagnostics.Debug.WriteLine("Данные поступили => JSON: " + jsonArray);

                    Lot newLotObject = new Lot();
                    newLotObject.OrderedUserId = Convert.ToInt32(jsonArray["OrderedUserId"]);
                    newLotObject.AddessLot = Convert.ToString(jsonArray["AddessLot"]);
                    newLotObject.DescriptionLot = Convert.ToString(jsonArray["DescriptionLot"]);
                    newLotObject.EndDateTimeLot = Convert.ToDateTime(jsonArray["EndDateTimeLot"]);
                    newLotObject.ExecuterUserId = Convert.ToInt32(jsonArray["ExecuterUserId"]);
                    newLotObject.DeliveryDurationLot = Convert.ToInt32(jsonArray["DeliveryDurationLot"]);
                    newLotObject.ClosedLot = Convert.ToBoolean(jsonArray["ClosedLot"]);
                    newLotObject.CityId = Convert.ToInt32(jsonArray["CityId"]);

                    db.Lot.Add(newLotObject);
                    db.SaveChanges();
                    System.Diagnostics.Debug.WriteLine("Добавлен => " + Newtonsoft.Json.JsonConvert.SerializeObject(newLotObject));
                    return newLotObject;
                }
            }
            catch
            {
                throw;
            }
        }


        public Lot UpdateExecutor(string lotJson)
        {
            try
            {
                using (db)
                {
                    //System.Diagnostics.Debug.WriteLine("Данные => " + org);
                    var jsonArray = JObject.Parse(lotJson);
                    //var id = jsonArray["idOrganisation"].ToString();
                    //System.Diagnostics.Debug.WriteLine("Данные поступили => JSON: " + jsonArray);

                    Lot lot = db.Lot.Find(Convert.ToInt32(jsonArray["IdLot"]));

                    lot.ExecuterUserId = Convert.ToInt32(jsonArray["ExecuterUserId"]);
                    db.SaveChanges();

                    System.Diagnostics.Debug.WriteLine("Добавлен => " + Newtonsoft.Json.JsonConvert.SerializeObject(lot));
                    return lot;
                }
            }
            catch
            {
                throw;
            }
        }



        public Lot getLotData(int idLot)
        {
            try
            {
                Lot lot = db.Lot.Find(idLot);
                return lot;
            }
            catch { throw; }
        }



        //To Update the records of a particluar employee    
        //public int updateUser(User user)
        //{
        //    try
        //    {
        //        db.Entry(user).State = User.Modified;
        //        db.SaveChanges();
        //        return 1;
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}


        public int deleteLot(int lotId)
        {
            try
            {
                Lot lot = db.Lot.Find(lotId);
                db.Lot.Remove(lot);
                db.SaveChanges();
                return 1;
            }
            catch { throw; }
        }


    }
}
