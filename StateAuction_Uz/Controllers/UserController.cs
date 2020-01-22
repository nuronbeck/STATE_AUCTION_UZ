using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StateAuction_Uz.Models;

namespace StateAuction_Uz.Controllers
{
    public class UserController : Controller
    {

        UserDataAccessLayer objectUser = new UserDataAccessLayer();

        [HttpGet]
        [Route("api/User/All")]
        public IEnumerable<User> Index()
        {
            return objectUser.getUsers();
        }

   
        [HttpPost]
        [Route("api/User/Create")]
        public int Create(User user)
        {
            return objectUser.addUser(user);
        }


        [HttpGet]
        [Route("api/User/Details/{id}")]
        public User Details(int id)
        {
            return objectUser.getUserData(id);
        }

        [HttpGet]
        [Route("api/User/CheckEmail/{email}")]
        public int CheckEmail(string email)
        {
            return objectUser.checkUserAvailable(email);
        }


        //[HttpPut]
        //[Route("api/User/Edit")]
        //public int Edit(User user)
        //{
        //    return objectUser.UpdateEmployee(user);
        //}


        [HttpDelete]
        [Route("api/User/Delete/{id}")]
        public int Delete(int id)
        {
            return objectUser.deleteUser(id);
        }


        [HttpGet]
        [Route("api/User/Lots")]
        public IEnumerable<Lot> Details()
        {
            return objectUser.getLots();
        }
    }
}
