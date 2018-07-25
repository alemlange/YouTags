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
            firstVideoRow[0] = new VideoCount { Min = 0, Max = 1000, Points = 50, Explanation = "Низкий уровень конкуренции и объема поиска. Можно использовать в качестве брендирующего тега.", VideoCountQuality = VideoCountQuality.VeryGood };
            firstVideoRow[1] = new VideoCount { Min = 1000, Max = 10000, Points = 35, Explanation = "Низкий уровень поиска и конкуренции с таким тегом просмотры не гарантируются, попробуйте поискать иначе.", VideoCountQuality = VideoCountQuality.Good };
            firstVideoRow[2] = new VideoCount { Min = 10000, Max = 100000, Points = 25, Explanation = "Низкий объем поиска при среднем уровне конкуренции. Даже не надейтесь на успех, поищите другой тег.", VideoCountQuality = VideoCountQuality.Average };
            firstVideoRow[3] = new VideoCount { Min = 100000, Max = 999999, Points = 15, Explanation = "Большая конкуренция при низком спросе. Не используйте этот тег.", VideoCountQuality = VideoCountQuality.Bad };
            firstVideoRow[4] = new VideoCount { Min = 999999, Max = 10000000, Points = 1, Explanation = "YouTube переполнен видео с такими тегами. Новичку будет нереально набрать просмотры.", VideoCountQuality = VideoCountQuality.VeryBad };
            matrix[0].VideoCountRow = firstVideoRow;

            //Второй столбец
            matrix[1] = new SearchValueRow { MinSv = 500, MaxSv = 2000, SVQuality = SearchValueQuality.Bad };

            var secondVideoRow = new VideoCount[5];
            secondVideoRow[0] = new VideoCount { Min = 0, Max = 1000, Points = 60, Explanation = "Мало кто так ищет, набор просмотров будет медленным но постоянным.", VideoCountQuality = VideoCountQuality.VeryGood };
            secondVideoRow[1] = new VideoCount { Min = 1000, Max = 10000, Points = 45, Explanation = "Уровень поиска и конкуренции ниже среднего. Пробуйте поискать тег иначе.", VideoCountQuality = VideoCountQuality.Good };
            secondVideoRow[2] = new VideoCount { Min = 10000, Max = 100000, Points = 35, Explanation = "Существенный уровень конкуренции не даст вашему видео поднятся до первой страницы поиска.", VideoCountQuality = VideoCountQuality.Average };
            secondVideoRow[3] = new VideoCount { Min = 100000, Max = 999999, Points = 30, Explanation = "Большая конкуренция при низком спросе. Не используйте этот запрос.", VideoCountQuality = VideoCountQuality.Bad };
            secondVideoRow[4] = new VideoCount { Min = 999999, Max = 10000000, Points = 5, Explanation = "YouTube переполнен видео с такими тегами. Новичку будет нереально набрать просмотры.", VideoCountQuality = VideoCountQuality.VeryBad };
            matrix[1].VideoCountRow = secondVideoRow;

            //Третий столбец
            matrix[2] = new SearchValueRow { MinSv = 2000, MaxSv = 50000, SVQuality = SearchValueQuality.Average };

            var thirdVideoRow = new VideoCount[5];
            thirdVideoRow[0] = new VideoCount { Min = 0, Max = 1000, Points = 70, Explanation = "Низкая конкуренция при достаточном для набора просмотров уровне поиска. Используйте этот тег.", VideoCountQuality = VideoCountQuality.VeryGood };
            thirdVideoRow[1] = new VideoCount { Min = 1000, Max = 10000, Points = 60, Explanation = "Средний уровень поиска и малый уровень конкуренции. Набор просмотров будет медленным.", VideoCountQuality = VideoCountQuality.Good };
            thirdVideoRow[2] = new VideoCount { Min = 10000, Max = 100000, Points = 50, Explanation = "Средний уровень поиска и конкуренции. Не рекомендуется к использованию.", VideoCountQuality = VideoCountQuality.Average };
            thirdVideoRow[3] = new VideoCount { Min = 100000, Max = 999999, Points = 40, Explanation = "Попробуйте поискать тег иначе.", VideoCountQuality = VideoCountQuality.Bad };
            thirdVideoRow[4] = new VideoCount { Min = 999999, Max = 10000000, Points = 10, Explanation = "YouTube переполнен видео с такими тегами. Новичку будет нереально набрать просмотры.", VideoCountQuality = VideoCountQuality.VeryBad };
            matrix[2].VideoCountRow = thirdVideoRow;

            //Четвертый столбец
            matrix[3] = new SearchValueRow { MinSv = 50000, MaxSv = 300000, SVQuality = SearchValueQuality.Good };

            var fourthVideoRow = new VideoCount[5];
            fourthVideoRow[0] = new VideoCount { Min = 0, Max = 1000, Points = 80, Explanation = "Большой объем поиска и отсутствие конкуренции. Идеальный поисковой запрос. Используйте этот тег.", VideoCountQuality = VideoCountQuality.VeryGood };
            fourthVideoRow[1] = new VideoCount { Min = 1000, Max = 10000, Points = 70, Explanation = "Большой объем поиска и низкая конкуренция. Это хороший тег, используйте.", VideoCountQuality = VideoCountQuality.Good };
            fourthVideoRow[2] = new VideoCount { Min = 10000, Max = 100000, Points = 60, Explanation = "Хороший уровень поиска и средний уровень конкуренции. Набор просмотров будет медленным. Используйте в крайних случаях.", VideoCountQuality = VideoCountQuality.Average };
            fourthVideoRow[3] = new VideoCount { Min = 100000, Max = 999999, Points = 45, Explanation = "Высокий объем поиска и большая конкуренция можно использовать как тематический тег.", VideoCountQuality = VideoCountQuality.Bad };
            fourthVideoRow[4] = new VideoCount { Min = 999999, Max = 10000000, Points = 15, Explanation = "YouTube переполнен видео с такими тегами. Новичку будет нереально набрать просмотры.", VideoCountQuality = VideoCountQuality.VeryBad };
            matrix[3].VideoCountRow = fourthVideoRow;

            //Пятый столбец
            matrix[4] = new SearchValueRow { MinSv = 300000, MaxSv = 1000000, SVQuality = SearchValueQuality.VeryGood };

            var fithVideoRow = new VideoCount[5];
            fithVideoRow[0] = new VideoCount { Min = 0, Max = 1000, Points = 90, Explanation = "Успех обеспечен! Запредельный уровень поиска при нулевой конкуренции.", VideoCountQuality = VideoCountQuality.VeryGood };
            fithVideoRow[1] = new VideoCount { Min = 1000, Max = 10000, Points = 75, Explanation = "Высокий объем поиска и низкая конкуренция. Используйте этот тег.", VideoCountQuality = VideoCountQuality.Good };
            fithVideoRow[2] = new VideoCount { Min = 10000, Max = 100000, Points = 65, Explanation = "Высокий объем поиска и средний уровень конкуренции. Использовать можно, но советуем поискать еще.", VideoCountQuality = VideoCountQuality.Average };
            fithVideoRow[3] = new VideoCount { Min = 100000, Max = 999999, Points = 45, Explanation = "Высокий объем поиска и большая конкуренция можно использовать как тематический тег.", VideoCountQuality = VideoCountQuality.Bad };
            fithVideoRow[4] = new VideoCount { Min = 999999, Max = 10000000, Points = 10, Explanation = "Очень популярный запрос как у публики так и каналов YouTube. Попробуйте поискать иначе.", VideoCountQuality = VideoCountQuality.VeryBad };
            matrix[4].VideoCountRow = fithVideoRow;

            return matrix;
        }
    }
}