using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StateAuction_Uz.Models;

namespace StateAuction_Uz.Controllers
{
    public class LotTovarController : Controller
    {
        LotTovarDataAccessLayer objectLotTovar = new LotTovarDataAccessLayer();

        [HttpGet]
        [Route("api/LotTovar/All")]
        public IEnumerable<LotTovar> Index()
        {
            return objectLotTovar.getLotTovars();
        }

        [HttpPost]
        [Route("api/LotTovar/Create")]
        public LotTovar Create([FromBody] LotTovar lotTovar)
        {
            var jsonResult = Json(lotTovar);
            string jsonString = JsonConvert.SerializeObject(jsonResult.Value);
            //System.Diagnostics.Debug.WriteLine("Данные => " + jsonString);
            return objectLotTovar.addLotTovar(jsonString);
        }

        [HttpPut]
        [Route("api/LotTovar/EditPrice")]
        public LotTovar Edit([FromBody] LotTovar lotTovar)
        {
            var jsonResult = Json(lotTovar);
            string jsonString = JsonConvert.SerializeObject(jsonResult.Value);
            //System.Diagnostics.Debug.WriteLine("Входящие данные => " + jsonString);
            return objectLotTovar.UpdateLotTovar(jsonString);
        }

        [HttpGet]
        [Route("api/LotTovar/Details/{id}")]
        public LotTovar Details(int id)
        {
            return objectLotTovar.getLotTovarData(id);
        }

        [HttpDelete]
        [Route("api/LotTovar/Delete/{id}")]
        public int Delete(int id)
        {
            return objectLotTovar.deleteLotTovar(id);
        }
    }
}
