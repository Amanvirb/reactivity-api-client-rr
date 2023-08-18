using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivityFileController : BaseApiController
    {

        [AllowAnonymous]
        [HttpPost("GetReport")]
        public ActionResult GetReport([FromForm] IFormFile file)
        {
            if (file.Length < 1) return BadRequest("Bad file");
            if (!file.FileName.EndsWith("xlsx")) return BadRequest("Bad file format");
            var kos = CommonUtilHelper.GetStrListFromExcelfile(file);
            if (kos.Count < 1) return BadRequest("Excel must have minimum one record");
            kos = kos.Distinct().ToList();
            int koId = 100;
            List<KoReportDto> output = new();
            foreach (var ko in kos)
            {
                koId++;
                output.Add(new KoReportDto
                {
                    KoId = koId.ToString(),
                    KoNumber = ko
                });
            }

            var excelData = CommonUtilHelper.GetKoReportBytes(output);
            var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            var fileName = @$"KoReport.xlsx";
            return File(excelData, contentType, fileName);
        }

        [AllowAnonymous]
        [HttpPost("SaveReport")]
        public ActionResult SaveReport([FromForm] IFormFile file)
        {
            if (file.Length < 1) return BadRequest("Bad file");
            if (!file.FileName.EndsWith("xlsx")) return BadRequest("Bad file format");
            var kos = CommonUtilHelper.GetStrListFromExcelfile(file);
            if (kos.Count < 1) return BadRequest("Excel must have minimum one record");

            return Ok("You data has been saved successfully");
        }
    }
}