using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StateAuction_Uz.Models
{
    public class UserDataAccessLayer
    {
        STATE_AUCTION_DBContext db = new STATE_AUCTION_DBContext();

        public IEnumerable<User> getUsers()
        {
            try
            {
                return db.User.ToList();
            }
            catch
            {
                throw;
            }
        }

        public int addUser(User user)
        {
            try
            {
                db.User.Add(user);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }


        public User getUserData(int id)
        {
            try
            {
                User user = db.User.Find(id);
                return user;
            }
            catch
            {
                throw;
            }
        }


        public int checkUserAvailable(string userEmail)
        {
            try
            {
                var issetEmail = db.User.Where(u => u.EmailUser == userEmail);

                return Convert.ToInt32(issetEmail.Count());
            }
            catch
            {
                throw;
            }
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


        public int deleteUser(int userId)
        {
            try
            {
                User user = db.User.Find(userId);
                db.User.Remove(user);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

  
        public List<Lot> getLots()
        {
            List<Lot> lstCity = new List<Lot>();
            lstCity = (from CityList in db.Lot select CityList).ToList();
            return lstCity;
        }
    }
}
