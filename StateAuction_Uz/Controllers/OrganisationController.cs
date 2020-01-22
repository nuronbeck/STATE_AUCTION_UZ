using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StateAuction_Uz.Models;

namespace StateAuction_Uz.Controllers
{
    public class OrganisationController : Controller
    {
        OrganisationDataAccessLayer objectOrganisation = new OrganisationDataAccessLayer();

        [HttpGet]
        [Route("api/Organisation/All")]
        public IEnumerable<Organisation> Index()
        {
            return objectOrganisation.getOrganisations();
        }

        [HttpPost]
        [Route("api/Organisation/Create")]
        public Organisation Create(Organisation organisation)
        {
            return objectOrganisation.addOrganisation(organisation);
        }

        [HttpGet]
        [Route("api/Organisation/Details/{id}")]
        public Organisation Details(int id)
        {
            return objectOrganisation.getOrganisationData(id);
        }

        [HttpDelete]
        [Route("api/Organisation/Delete/{id}")]
        public int Delete(int id)
        {
            return objectOrganisation.deleteOrganisation(id);
        }

        [HttpPut]
        [Route("api/Organisation/Edit")]
        public int Edit([FromBody] Organisation org)
        {
            var jsonResult = Json(org);
            string jsonString = JsonConvert.SerializeObject(jsonResult.Value);
            //System.Diagnostics.Debug.WriteLine("Данные => " + jsonString);
            return objectOrganisation.UpdateOrganisation(jsonString);
        }

    }
}
