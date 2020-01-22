using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StateAuction_Uz.Models;

namespace StateAuction_Uz.Controllers
{
    public class LotController : Controller
    {
        LotDataAccessLayer objectLot = new LotDataAccessLayer();

        [HttpGet]
        [Route("api/Lot/All")]
        public IEnumerable<Lot> Index()
        {
            return objectLot.getLots();
        }

        [HttpPost]
        [Route("api/Lot/Create")]
        public Lot Create(Lot lot)
        {
            return objectLot.addLot(lot);
        }


        [HttpPost]
        [Route("api/Lot/Add")]
        public Lot Add([FromBody] Lot newLot)
        {
            var jsonResult = Json(newLot);
            string jsonString = JsonConvert.SerializeObject(jsonResult.Value);
            //System.Diagnostics.Debug.WriteLine("Данные => " + jsonString);
            return objectLot.AddNewLot(jsonString);
        }


        [HttpPut]
        [Route("api/Lot/EditExecutor")]
        public Lot EditExecutor([FromBody] Lot lot)
        {
            var jsonResult = Json(lot);
            string jsonString = JsonConvert.SerializeObject(jsonResult.Value);
            //System.Diagnostics.Debug.WriteLine("Данные => " + jsonString);
            return objectLot.UpdateExecutor(jsonString);
        }


        [HttpGet]
        [Route("api/Lot/Details/{id}")]
        public Lot Details(int id)
        {
            return objectLot.getLotData(id);
        }

        [HttpDelete]
        [Route("api/Lot/Delete/{id}")]
        public int Delete(int id)
        {
            return objectLot.deleteLot(id);
        }

        
    }
}
