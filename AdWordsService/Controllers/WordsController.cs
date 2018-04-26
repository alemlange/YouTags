using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Google.Api.Ads.AdWords.Lib;
using Google.Api.Ads.AdWords.v201802;

namespace AdWordsService.Controllers
{
    public class WordsController : ApiController
    {
        public string Get()
        {
            var user = new AdWordsUser();

            using (TargetingIdeaService targetingIdeaService = (TargetingIdeaService)user.GetService(Google.Api.Ads.AdWords.Lib.AdWordsService.v201802.TargetingIdeaService))
            {
                // Create selector.
                TargetingIdeaSelector selector = new TargetingIdeaSelector();
                selector.requestType = RequestType.STATS;
                selector.ideaType = IdeaType.KEYWORD;
                selector.requestedAttributeTypes = new AttributeType[] { AttributeType.KEYWORD_TEXT, AttributeType.SEARCH_VOLUME };

                List<SearchParameter> searchParameters = new List<SearchParameter>();

                // Create related to query search parameter.
                RelatedToQuerySearchParameter relatedToQuerySearchParameter = new RelatedToQuerySearchParameter();
                relatedToQuerySearchParameter.queries = new String[] { "bakery" };
                searchParameters.Add(relatedToQuerySearchParameter);

                // Add a language search parameter (optional).
                // The ID can be found in the documentation:
                //   https://developers.google.com/adwords/api/docs/appendix/languagecodes
                LanguageSearchParameter languageParameter = new LanguageSearchParameter();
                Language english = new Language();
                english.id = 1000;
                languageParameter.languages = new Language[] { english };
                searchParameters.Add(languageParameter);

                // Add network search parameter (optional).
                NetworkSetting networkSetting = new NetworkSetting();
                networkSetting.targetGoogleSearch = true;
                networkSetting.targetSearchNetwork = false;
                networkSetting.targetContentNetwork = false;
                networkSetting.targetPartnerSearchNetwork = false;

                NetworkSearchParameter networkSearchParameter = new NetworkSearchParameter();
                networkSearchParameter.networkSetting = networkSetting;
                searchParameters.Add(networkSearchParameter);

                // Set the search parameters.
                selector.searchParameters = searchParameters.ToArray();

                // Set selector paging (required for targeting idea service).
                Paging paging = Paging.Default;
                selector.paging = paging;

                TargetingIdeaPage page = new TargetingIdeaPage();

                int i = 0;
                do
                {
                    // Get related keywords.
                    page = targetingIdeaService.get(selector);

                    // Display related keywords.
                    if (page.entries != null && page.entries.Length > 0)
                    {
                        foreach (var targetingIdea in page.entries)
                        {
                            Dictionary<AttributeType, Google.Api.Ads.AdWords.v201802.Attribute> ideas = targetingIdea.data.ToDict();

                            string keyword = (ideas[AttributeType.KEYWORD_TEXT] as StringAttribute).value;

                            long averageMonthlySearches = (ideas[AttributeType.SEARCH_VOLUME] as LongAttribute).value;

                            i++;
                        }
                    }
                    selector.paging.IncreaseOffset();
                } while (selector.paging.startIndex < page.totalNumEntries);

            }
            return "value";
        }

    }
}
