// @flow

export default class Parser
{

  titleYearNoParathesisRegex: String;
  fileExtensionRegex: String;
  YearInTitleRegex: string;

  static titleYearNoParathesisRegex = /(.+)\W(\d{4})?/
  static fileExtensionRegex = /\.[a-z0-9]{2,4}$/
  static yearInTitleRegex = "/^(?<title>.+?)(?:\W|_)?(?<year>\d{4})/"
  static reportGameTitleRegex = [
            //Special, Despecialized, etc. Edition Movies, e.g: Mission.Impossible.3.Special.Edition.2011
            "/^(?<title>(?![(\[]).+?)?(?:(?:[-_\W](?<![)\[!]))*\(?\b(?<edition>(((Extended.|Ultimate.)?(Director.?s|Collector.?s|Theatrical|Ultimate|Final(?=(.(Cut|Edition|Version)))|Extended|Rogue|Special|Despecialized|\d{2,3}(th)?.Anniversary)(.(Cut|Edition|Version))?(.(Extended|Uncensored|Remastered|Unrated|Uncut|IMAX|Fan.?Edit))?|((Uncensored|Remastered|Unrated|Uncut|IMAX|Fan.?Edit|Edition|Restored|((2|3|4)in1))))))\b\)?.{1,3}(?<year>(1(8|9)|20)\d{2}(?!p|i|\d+|\]|\W\d+)))+(\W+|_|$)(?!\\)/",

            //Special, Despecialized, etc. Edition Movies, e.g: Mission.Impossible.3.2011.Special.Edition //TODO: Seems to slow down parsing heavily!
            /*new Regex(@"^(?<title>(?![(\[]).+?)?(?:(?:[-_\W](?<![)\[!]))*(?<year>(19|20)\d{2}(?!p|i|(19|20)\d{2}|\]|\W(19|20)\d{2})))+(\W+|_|$)(?!\\)\(?(?<edition>(((Extended.|Ultimate.)?(Director.?s|Collector.?s|Theatrical|Ultimate|Final(?=(.(Cut|Edition|Version)))|Extended|Rogue|Special|Despecialized|\d{2,3}(th)?.Anniversary)(.(Cut|Edition|Version))?(.(Extended|Uncensored|Remastered|Unrated|Uncut|IMAX|Fan.?Edit))?|((Uncensored|Remastered|Unrated|Uncut|IMAX|Fan.?Edit|Edition|Restored|((2|3|4)in1))))))\)?",
                          RegexOptions.IgnoreCase | RegexOptions.Compiled),*/

            //Normal movie format, e.g: Mission.Impossible.3.2011
            "/^(?<title>(?![(\[]).+?)?(?:(?:[-_\W](?<![)\[!]))*(?<year>(1(8|9)|20)\d{2}(?!p|i|(1(8|9)|20)\d{2}|\]|\W(1(8|9)|20)\d{2})))+(\W+|_|$)(?!\\)/",

            //PassThePopcorn Torrent names: Star.Wars[PassThePopcorn]
            "/^(?<title>.+?)?(?:(?:[-_\W](?<![()\[!]))*(?<year>(\[\w *\])))+(\W+|_|$)(?!\\)/",

            //That did not work? Maybe some tool uses [] for years. Who would do that?
            "/^(?<title>(?![(\[]).+?)?(?:(?:[-_\W](?<![)!]))*(?<year>(1(8|9)|20)\d{2}(?!p|i|\d+|\W\d+)))+(\W+|_|$)(?!\\)/",

			//As a last resort for movies that have ( or [ in their title.
			"/^(?<title>.+?)?(?:(?:[-_\W](?<![)\[!]))*(?<year>(1(8|9)|20)\d{2}(?!p|i|\d+|\]|\W\d+)))+(\W+|_|$)(?!\\)/",
        ];

  static RejectHashedReleasesRegex = [
                    // Generic match for md5 and mixed-case hashes.
                    new RegExp("^[0-9a-zA-Z]{32}"),

                    // Generic match for shorter lower-case hashes.
                    new RegExp("^[a-z0-9]{24}$"),

                    // Format seen on some NZBGeek releases
                    // Be very strict with these coz they are very close to the valid 101 ep numbering.
                    new RegExp("^[A-Z]{11}\d{3}$"),
                    new RegExp("^[a-z]{12}\d{3}$"),

                    //Backup filename (Unknown origins)
                    new RegExp("^Backup_\d{5,}S\d{2}-\d{2}$"),

                    //123 - Started appearing December 2014
                    new RegExp("^123$"),

                    //abc - Started appearing January 2015
                    new RegExp("^abc$", 'i'),

                    //b00bs - Started appearing January 2015
                    new RegExp("^b00bs$", 'i')
  ]
        constructor() {
  }

  static RemoveFileExtension(title: string): string {
    return title.split('.').slice(0, -1).join('.')
  }


  static parseGameTitle(title: string) {
      const realResult = this.RemoveFileExtension(title);
      try {

        if(this.yearInTitleRegex.test(realResult)){
          const groups = realResult.match(this.yearInTitleRegex).groups
          const {title, year } = groups
          return {title, year}
        }
        else{
          throw Error();
        }
      }
      catch( error) {
        console.debug("Parsing Game Title Failed for %s", realResult)
      }

      return {title: realResult, year: ""};
  }

  // trys to
  static parseGameTitle(title: string) {
      const realResult = this.RemoveFileExtension(title);
      try {
        if (!this._validateBeforeParsing(title)) return null;

        if(this.yearInTitleRegex.test(realResult)){
          const groups = realResult.match(this.yearInTitleRegex).groups
          const {title, year } = groups
          return {title, year}
        }
        else{
          throw Error();
        }
      }
      catch( error) {
        console.debug("Parsing Game Title Failed for %s", realResult)
      }

      return {title: realResult, year: ""};
  }

  static _validateBeforeParsing(title: string): boolean {
    if (title.toLowerCase().includes("password") && title.toLowerCase().includes("yenc")) {
        console.debug("");
        return false;
    }

    if (!title) {
        return false;
    }

    var titleWithoutExtension = this.RemoveFileExtension(title);

    if (this.RejectHashedReleasesRegex.some(v => v.test(titleWithoutExtension)))
    {
        console.debug("Rejected Hashed Release Title: " + title);
        return false;
    }
    return true;
  }
}

export function slugify(text: string): string
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}


