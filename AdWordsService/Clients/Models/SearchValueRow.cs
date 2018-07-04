using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AdWordsService.Clients.Enums;

namespace AdWordsService.Clients.Models
{
    public class SearchValueRow
    {
        public int MinSv { get; set; }

        public int MaxSv { get; set; }

        public SearchValueQuality SVQuality { get; set; }

        public VideoCount[] VideoCountRow { get; set; }
    }
}