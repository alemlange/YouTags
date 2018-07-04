using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AdWordsService.Clients.Enums;

namespace AdWordsService.Clients.Models
{
    public class VideoCount
    {
        public int Min { get; set; }

        public int Max { get; set; }

        public int Points { get; set; }

        public VideoCountQuality VideoCountQuality { get; set; }

        public string Explanation { get; set; }
    }
}