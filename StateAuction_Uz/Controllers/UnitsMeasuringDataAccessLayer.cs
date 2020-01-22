using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StateAuction_Uz.Models
{
    public class UnitsMeasuringDataAccessLayer
    {
        STATE_AUCTION_DBContext db = new STATE_AUCTION_DBContext();

        public IEnumerable<UnitsMeasuring> getUnitsMeasures()
        {
            try
            {
                return db.UnitsMeasuring.ToList();
            }
            catch { throw; }
        }

        public UnitsMeasuring addUnitsMeasure(UnitsMeasuring um)
        {
            try
            {
                using (db)
                {
                    var initUM = new UnitsMeasuring();
                    initUM = um;

                    db.UnitsMeasuring.Add(initUM);
                    db.SaveChanges();

                    return initUM;
                }
            }
            catch { throw; }
        }


        public UnitsMeasuring getUnitsMeasureData(int idUM)
        {
            try
            {
                UnitsMeasuring ums = db.UnitsMeasuring.Find(idUM);
                return ums;
            }
            catch { throw; }
        }

        public int deleteUnitsMeasure(int umId)
        {
            try
            {
                UnitsMeasuring um = db.UnitsMeasuring.Find(umId);
                db.UnitsMeasuring.Remove(um);
                db.SaveChanges();
                return 1;
            }
            catch { throw; }
        }
    }
}
