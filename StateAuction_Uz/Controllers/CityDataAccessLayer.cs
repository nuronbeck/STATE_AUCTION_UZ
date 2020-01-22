using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StateAuction_Uz.Models
{
    public class CityDataAccessLayer
    {
        STATE_AUCTION_DBContext db = new STATE_AUCTION_DBContext();

        public IEnumerable<City> getCities()
        {
            try
            {
                return db.City.ToList();
            }
            catch { throw; }
        }

        public City addCity(City city)
        {
            try
            {
                using (db)
                {
                    var initCity = new City();
                    initCity = city;

                    db.City.Add(initCity);
                    db.SaveChanges();

                    return initCity;
                }


                //db.Organisation.Add(organisation);
                //db.SaveChanges();
                //return 1;
                //return db.SaveChanges();
            }
            catch { throw; }
        }


        public City getCityData(int idCity)
        {
            try
            {
                City city = db.City.Find(idCity);
                return city;
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


        public int deleteCity(int cityId)
        {
            try
            {
                City city = db.City.Find(cityId);
                db.City.Remove(city);
                db.SaveChanges();
                return 1;
            }
            catch { throw; }
        }
    }
}
