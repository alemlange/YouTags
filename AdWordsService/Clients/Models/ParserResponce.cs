using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdWordsService.Clients.Models
{
    public class ParserResponce
    {
        public string Status { get; set; }

        public Wordstat_NResult Data { get; set; }
    }
}