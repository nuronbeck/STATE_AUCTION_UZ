using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StateAuction_Uz.Models;

namespace StateAuction_Uz.Controllers
{
    public class UnitsMeasuringController : Controller
    {
        UnitsMeasuringDataAccessLayer objectUM = new UnitsMeasuringDataAccessLayer();

        [HttpGet]
        [Route("api/UnitsMeasuring/All")]
        public IEnumerable<UnitsMeasuring> Index()
        {
            return objectUM.getUnitsMeasures();
        }

        [HttpPost]
        [Route("api/UnitsMeasuring/Create")]
        public UnitsMeasuring Create(UnitsMeasuring um)
        {
            return objectUM.addUnitsMeasure(um);
        }

        [HttpGet]
        [Route("api/UnitsMeasuring/Details/{id}")]
        public UnitsMeasuring Details(int id)
        {
            return objectUM.getUnitsMeasureData(id);
        }

        [HttpDelete]
        [Route("api/UnitsMeasuring/Delete/{id}")]
        public int Delete(int id)
        {
            return objectUM.deleteUnitsMeasure(id);
        }
    }
}
