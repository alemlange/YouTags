using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Net;
using System.IO;
using System.Text;
using AdWordsService.Clients.Models;

namespace AdWordsService.Clients
{
    public class MutagenClient
    {
        private const string MutagenUrl = "http://api.mutagen.ru/json/";

        private string ApiKey { get; set; }

        public MutagenClient(string apiKey)
        {
            ApiKey = apiKey;
        }

        public ParserResponce PerformRequest(string query)
        {
            var client = new WebClient();

            client.Headers["Content-type"] = "application/json";
            client.Encoding = Encoding.UTF8;

            var url = MutagenUrl + ApiKey + "/mutagen.parser.get/?parser=wordstat_n&key=" + query;

            var res =  client.DownloadString(url);

            return new JavaScriptSerializer().Deserialize<ParserResponce>(res);
        }
    }
}