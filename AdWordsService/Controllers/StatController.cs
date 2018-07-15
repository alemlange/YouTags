using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AdWordsService.Clients;
using AdWordsService.Clients.Models;
using AdWordsService.Clients.Enums;
using System.Threading;

namespace AdWordsService.Controllers
{
    public class StatController : ApiController
    {
        [HttpGet]
        public ParserResult ParseKey(string key, int videoc)
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


            var realSv = Convert.ToInt32(frequency);

            var searchValueTrimmed = realSv;
            if (searchValueTrimmed > 1000000)
                searchValueTrimmed = 1000000;

            var matrix = StatCreator.GetMatrix();
            ParserResult result = null;

            if (videoc == 0)
                videoc = 1;

            if (searchValueTrimmed == 0)
                result = new ParserResult { Explanation="Такие теги никто не ищет, пробуйте иначе.", Points=0, SearchValue = realSv, VideoCount = videoc,SVQuality = SearchValueQuality.VeryBad, VideoCountQuality=VideoCountQuality.Average };
            else
            {
                foreach (var column in matrix)
                {
                    if (searchValueTrimmed > column.MinSv && searchValueTrimmed <= column.MaxSv)
                    {
                        foreach (var videoRow in column.VideoCountRow)
                        {
                            if (videoc > videoRow.Min && videoc <= videoRow.Max)
                            {
                                result = new ParserResult { Explanation = videoRow.Explanation, Points = videoRow.Points, SearchValue = realSv, VideoCount = videoc, SVQuality = column.SVQuality, VideoCountQuality = videoRow.VideoCountQuality };
                            }
                        }
                    }
                }
            }

            if (result == null)
                throw new Exception("Не удалось подобрать статистику");

            return result;
        }

    }
}
