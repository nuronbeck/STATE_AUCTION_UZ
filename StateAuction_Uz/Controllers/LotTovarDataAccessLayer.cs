using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StateAuction_Uz.Models
{
    public class LotTovarDataAccessLayer
    {
        STATE_AUCTION_DBContext db = new STATE_AUCTION_DBContext();

        public IEnumerable<LotTovar> getLotTovars()
        {
            try
            {
                return db.LotTovar.ToList();
            }
            catch { throw; }
        }

        public LotTovar addLotTovar(string lottovar)
        {
            try
            {
                using (db)
                {
                    var jsonArray = JObject.Parse(lottovar);

                    LotTovar newLotTovarObject = new LotTovar();
                    newLotTovarObject.LotId = Convert.ToInt32(jsonArray["LotId"]);
                    newLotTovarObject.NameLotTovar = Convert.ToString(jsonArray["NameLotTovar"]);
                    newLotTovarObject.CountLotTovar = Convert.ToInt32(jsonArray["CountLotTovar"]);
                    newLotTovarObject.UnitsMeasuringId = Convert.ToInt32(jsonArray["UnitsMeasuringId"]);
                    newLotTovarObject.StartPriceLotTovar = Convert.ToInt32(jsonArray["StartPriceLotTovar"]);
                    newLotTovarObject.SuggestPriceLotTovar = Convert.ToInt32(jsonArray["SuggestPriceLotTovar"]);
                    newLotTovarObject.UserId = Convert.ToInt32(jsonArray["UserId"]);

                    db.LotTovar.Add(newLotTovarObject);
                    db.SaveChanges();
                    System.Diagnostics.Debug.WriteLine("Добавлен => " + Newtonsoft.Json.JsonConvert.SerializeObject(newLotTovarObject));
                    return newLotTovarObject;


                    return new LotTovar();
                }


                //db.Organisation.Add(organisation);
                //db.SaveChanges();
                //return 1;
                //return db.SaveChanges();
            }
            catch { throw; }
        }

        public LotTovar UpdateLotTovar(string lottovarJson)
        {
            //System.Diagnostics.Debug.WriteLine("Данные => "+ JsonConvert.SerializeObject(org));
            try
            {
                using (db)
                {
                    //System.Diagnostics.Debug.WriteLine("Данные => " + org);
                    var jsonArray = JObject.Parse(lottovarJson);
                    //var id = jsonArray["idOrganisation"].ToString();

                    System.Diagnostics.Debug.WriteLine("Данные => " + jsonArray);

                    LotTovar lotTovar = db.LotTovar.Find(Convert.ToInt32(jsonArray["IdLotTovar"]));
                    lotTovar.SuggestPriceLotTovar = float.Parse(jsonArray["SuggestPriceLotTovar"].ToString(), System.Globalization.CultureInfo.InvariantCulture);
                    lotTovar.UserId = Convert.ToInt32(jsonArray["UserId"]);
                    db.SaveChanges();
                    return lotTovar;
                }
            }
            catch
            {
                throw;
            }
        }



        public LotTovar getLotTovarData(int idLotTovar)
        {
            try
            {
                LotTovar lotTovar = db.LotTovar.Find(idLotTovar);
                return lotTovar;
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


        public int deleteLotTovar(int lotTovarId)
        {
            try
            {
                LotTovar lotTov = db.LotTovar.Find(lotTovarId);
                db.LotTovar.Remove(lotTov);
                db.SaveChanges();
                return 1;
            }
            catch { throw; }
        }
    }
}
