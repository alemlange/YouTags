using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AdWordsService.Clients;
using System.Threading;

namespace AdWordsService.Controllers
{
    public class StatController : ApiController
    {
        [HttpGet]
        public string ParseKey(string key)
        {
            var client = new MutagenClient("7f8e40f8ad271c3cd65ccdce486a5be3");

            var status = "";
            var frequency = "";
            while (status != "finish")
            {
                var res = client.PerformRequest(key);

                status = res.Status;
                if (status == "error")
                    throw new Exception("Failed MutagenRequest");

                if(status == "finish")
                {
                    frequency =  res.Data.Frequency;
                }

                Thread.Sleep(200);
            }

            return frequency;
        }

    }
}
