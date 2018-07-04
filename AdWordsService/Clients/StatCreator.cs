using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AdWordsService.Clients.Models;
using AdWordsService.Clients.Enums;

namespace AdWordsService.Clients
{
    public class StatCreator
    {
        public static SearchValueRow[] GetMatrix()
        {
            var matrix = new SearchValueRow[5];

            //Первый столбец
            matrix[0] = new SearchValueRow { MinSv = 0, MaxSv = 1000, SVQuality = SearchValueQuality.VeryBad};

            var firstVideoRow = new VideoCount[5];
            firstVideoRow[0] = new VideoCount { Min = 0, Max = 1000, Points = 50, Explanation = "Мало поиска мало конкуренции", VideoCountQuality = VideoCountQuality.VeryGood };
            firstVideoRow[1] = new VideoCount { Min = 1000, Max = 10000, Points = 35, Explanation = "Мало поиска ниже среднего конкуренции", VideoCountQuality = VideoCountQuality.Good };
            firstVideoRow[2] = new VideoCount { Min = 10000, Max = 100000, Points = 25, Explanation = "Мало поиска средняя конкуренция", VideoCountQuality = VideoCountQuality.Average };
            firstVideoRow[3] = new VideoCount { Min = 100000, Max = 999999, Points = 15, Explanation = "Мало поиска выше среднего конкуренция", VideoCountQuality = VideoCountQuality.Bad };
            firstVideoRow[4] = new VideoCount { Min = 999999, Max = 10000000, Points = 5, Explanation = "Мало поиска высокая конкуренция", VideoCountQuality = VideoCountQuality.VeryBad };
            matrix[0].VideoCountRow = firstVideoRow;

            //Второй столбец
            matrix[1] = new SearchValueRow { MinSv = 1000, MaxSv = 10000, SVQuality = SearchValueQuality.Bad };

            var secondVideoRow = new VideoCount[5];
            secondVideoRow[0] = new VideoCount { Min = 0, Max = 1000, Points = 60, Explanation = "Ниже среднего поиска мало конкуренции", VideoCountQuality = VideoCountQuality.VeryGood };
            secondVideoRow[1] = new VideoCount { Min = 1000, Max = 10000, Points = 50, Explanation = "Ниже среднего  поиска ниже среднего конкуренции", VideoCountQuality = VideoCountQuality.Good };
            secondVideoRow[2] = new VideoCount { Min = 10000, Max = 100000, Points = 35, Explanation = "Ниже среднего  поиска средняя конкуренция", VideoCountQuality = VideoCountQuality.Average };
            secondVideoRow[3] = new VideoCount { Min = 100000, Max = 999999, Points = 30, Explanation = "Ниже среднего  поиска выше среднего конкуренция", VideoCountQuality = VideoCountQuality.Bad };
            secondVideoRow[4] = new VideoCount { Min = 999999, Max = 10000000, Points = 5, Explanation = "Ниже среднего  поиска высокая конкуренция", VideoCountQuality = VideoCountQuality.VeryBad };
            matrix[1].VideoCountRow = secondVideoRow;

            //Третий столбец
            matrix[2] = new SearchValueRow { MinSv = 10000, MaxSv = 100000, SVQuality = SearchValueQuality.Average };

            var thirdVideoRow = new VideoCount[5];
            thirdVideoRow[0] = new VideoCount { Min = 0, Max = 1000, Points = 70, Explanation = "Средний поиск мало конкуренции", VideoCountQuality = VideoCountQuality.VeryGood };
            thirdVideoRow[1] = new VideoCount { Min = 1000, Max = 10000, Points = 60, Explanation = "Средний поиск ниже среднего конкуренции", VideoCountQuality = VideoCountQuality.Good };
            thirdVideoRow[2] = new VideoCount { Min = 10000, Max = 100000, Points = 50, Explanation = "Средний поиск средняя конкуренция", VideoCountQuality = VideoCountQuality.Average };
            thirdVideoRow[3] = new VideoCount { Min = 100000, Max = 999999, Points = 40, Explanation = "Средний поиск выше среднего конкуренция", VideoCountQuality = VideoCountQuality.Bad };
            thirdVideoRow[4] = new VideoCount { Min = 999999, Max = 10000000, Points = 10, Explanation = "Средний поиск высокая конкуренция", VideoCountQuality = VideoCountQuality.VeryBad };
            matrix[2].VideoCountRow = thirdVideoRow;

            //Четвертый столбец
            matrix[3] = new SearchValueRow { MinSv = 100000, MaxSv = 500000, SVQuality = SearchValueQuality.Good };

            var fourthVideoRow = new VideoCount[5];
            fourthVideoRow[0] = new VideoCount { Min = 0, Max = 1000, Points = 80, Explanation = "Выше среднего поиск мало конкуренции", VideoCountQuality = VideoCountQuality.VeryGood };
            fourthVideoRow[1] = new VideoCount { Min = 1000, Max = 10000, Points = 70, Explanation = "Выше среднего поиск ниже среднего конкуренции", VideoCountQuality = VideoCountQuality.Good };
            fourthVideoRow[2] = new VideoCount { Min = 10000, Max = 100000, Points = 60, Explanation = "Выше среднего поиск средняя конкуренция", VideoCountQuality = VideoCountQuality.Average };
            fourthVideoRow[3] = new VideoCount { Min = 100000, Max = 999999, Points = 45, Explanation = "Выше среднего поиск выше среднего конкуренция", VideoCountQuality = VideoCountQuality.Bad };
            fourthVideoRow[4] = new VideoCount { Min = 999999, Max = 10000000, Points = 15, Explanation = "Выше среднего поиск высокая конкуренция", VideoCountQuality = VideoCountQuality.VeryBad };
            matrix[3].VideoCountRow = fourthVideoRow;

            //Пятый столбец
            matrix[4] = new SearchValueRow { MinSv = 500000, MaxSv = 1000000, SVQuality = SearchValueQuality.VeryGood };

            var fithVideoRow = new VideoCount[5];
            fithVideoRow[0] = new VideoCount { Min = 0, Max = 1000, Points = 90, Explanation = "Высокий поиск мало конкуренции", VideoCountQuality = VideoCountQuality.VeryGood };
            fithVideoRow[1] = new VideoCount { Min = 1000, Max = 10000, Points = 75, Explanation = "Высокий поиск ниже среднего конкуренции", VideoCountQuality = VideoCountQuality.Good };
            fithVideoRow[2] = new VideoCount { Min = 10000, Max = 100000, Points = 65, Explanation = "Высокий поиск средняя конкуренция", VideoCountQuality = VideoCountQuality.Average };
            fithVideoRow[3] = new VideoCount { Min = 100000, Max = 999999, Points = 45, Explanation = "Высокий поиск выше среднего конкуренция", VideoCountQuality = VideoCountQuality.Bad };
            fithVideoRow[4] = new VideoCount { Min = 999999, Max = 10000000, Points = 10, Explanation = "Высокий поиск высокая конкуренция", VideoCountQuality = VideoCountQuality.VeryBad };
            matrix[4].VideoCountRow = fithVideoRow;

            return matrix;
        }
    }
}