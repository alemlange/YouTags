using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AdWordsService.Clients.Enums;

namespace AdWordsService.Clients.Models
{
    public class ParserResult
    {
        public int SearchValue { get; set; }

        public int VideoCount { get; set; }

        public int Points { get; set; }

        public string Explanation { get; set; }

        public VideoCountQuality VideoCountQuality { get; set; }

        public SearchValueQuality SVQuality { get; set; }

    }
}