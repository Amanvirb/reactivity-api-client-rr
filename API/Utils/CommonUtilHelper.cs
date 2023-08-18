using System.Collections.Generic;
using System.IO;
using System.Text;
using API.DTOs;
using ExcelDataReader;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;

namespace API.Utils
{
    public static class CommonUtilHelper
    {

        public static List<string> GetStrListFromExcelfile(IFormFile file)
        {
            var kos = new List<string>();
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            using (var stream = new MemoryStream())
            {
                file.CopyTo(stream);
                stream.Position = 0;
                using var reader = ExcelReaderFactory.CreateReader(stream);
                while (reader.Read()) //Each row of the file
                {
                    var pos = stream.Position;
                    string ko = reader.GetValue(0)?.ToString();

                    if (string.IsNullOrEmpty(ko))
                    {
                        break;
                    }

                    kos.Add(ko.Trim());
                }
            }

            return kos;
        }

        public static byte[] GetKoReportBytes(List<KoReportDto> koReports)
        {
            var reportFile = new FileInfo(@$"C:\Logistic\KoReport.xlsx");
            CreateDirectory(@"R:\Logistic");

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using var package = new ExcelPackage(reportFile);          
            var dataErasureWs = package.Workbook.Worksheets.Add("DataErasure");
            var range = dataErasureWs.Cells["A1"].LoadFromCollection(koReports, true);
         
            range.AutoFitColumns();
            return package.GetAsByteArray();
        }

        public static void CreateDirectory(string path)
        {
            if(!Directory.Exists(path))
                Directory.CreateDirectory(path);
        }

    }
}