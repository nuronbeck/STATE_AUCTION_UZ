using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StateAuction_Uz.Models;

namespace StateAuction_Uz.Controllers
{
    public class CityController : Controller
    {
        CityDataAccessLayer objectCity = new CityDataAccessLayer();

        [HttpGet]
        [Route("api/City/All")]
        public IEnumerable<City> Index()
        {
            return objectCity.getCities();
        }

        [HttpPost]
        [Route("api/City/Create")]
        public City Create(City city)
        {
            return objectCity.addCity(city);
        }

        [HttpGet]
        [Route("api/City/Details/{id}")]
        public City Details(int id)
        {
            return objectCity.getCityData(id);
        }

        [HttpDelete]
        [Route("api/City/Delete/{id}")]
        public int Delete(int id)
        {
            return objectCity.deleteCity(id);
        }
    }
}
