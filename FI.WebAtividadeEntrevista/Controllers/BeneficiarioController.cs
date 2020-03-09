using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        private Context _context;
        public BeneficiarioController()
        {
            _context = new Context();
        }

        // GET: Beneficiario/Create
        public ActionResult Adicionar()
        {
            return View();
        }

        // POST: Beneficiario/Create
        [HttpPost]
        public ActionResult Adicionar(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
        public JsonResult List()
        {
            return Json(_context.Benef.ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(BENEFICIARIOS beneficiario)
        {
            BENEFICIARIOS bENEFICIARIOS = _context.Benef.Add(beneficiario);
            _context.SaveChanges();
            return Json(JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(_context.Benef.FirstOrDefault(x => x.Id == ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(BENEFICIARIOS beneficiario)
        {
            var data = _context.Benef.FirstOrDefault(x => x.Id == beneficiario.Id);
            if (data != null)
            {
                data.Nome = beneficiario.Nome;
                data.CPF = beneficiario.CPF;
                data.IdCliente = beneficiario.IdCliente;

                _context.SaveChanges();
            }
            return Json(JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            var data = _context.Benef.FirstOrDefault(x => x.Id == ID);
            _context.Benef.Remove(data);
            _context.SaveChanges();
            return Json(JsonRequestBehavior.AllowGet);
        }
    }
}

