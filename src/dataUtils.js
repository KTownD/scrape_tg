export function ChopData(htmlString) {
    //const xmlString = "<div class=overlabel>";
    //console.log(htmlString);

    const doc1 = new DOMParser().parseFromString(htmlString, 'text/html');

    if(doc1) {
      // We want just the video listings
      const divs = doc1.getElementsByClassName("hotpicks");
      var node;
      var datalist = [];
      var href='';
      var id='';

      if(divs) {
        console.log(divs);

        for(var i=0;i<divs.length;i++) {
          // Extract pertinent data from HTML such as link to episode page,
          // the id of the episode, url of the image, and the full episode name.
          try {
            node = divs[i].childNodes[0].childNodes[0].childNodes[0];
            href = divs[i].childNodes[0].childNodes[0].href.replace(divs[i].baseURI.replace('#',''), 'https://torrentgalaxy.to/');    // href="torrents-details.php?id=15595317"
            id = href.split('id=')[1];

            if(node && node.attributes[2] && node.attributes[3] && href.length > 0 && id.length > 0) {
              let baseimg = node.attributes[2].value;  // https://img.wonkychickens.org/data/cover/imdb/Z/S/ZSHOTb24rh.jpg
              let img = baseimg; // baseimg.replace('https://img.wonkychickens.org/','/wc/');
              let filename = node.attributes[3].value;

              let {season, episode, title} = parseEpisodeFileName(filename);
              datalist.push({id, filename, img, href, season, episode, title});
            }
          } catch(e) {
            console.log(e);
          }
        }
      }
      console.log(datalist)
      return datalist;
    }
    // attributes[2] = data-src
    // attributes[3] = alt.value
    //doc1.getElementsByClassName("hotpicks")[4].childNodes[0].childNodes[0].childNodes[0].attributes[3]
  }

  function parseEpisodeFileName(filename) {
      // Test for matches to series first. If no matches, then assume it is a movie.
      var seriesPattern = /(.*?)(?:(?:[\.\s]S(\d\d)E(\d\d)[\s\.].*?)|(?:[\s\.]S(\d\d)[\s\.](.*?)\.))/i; //  /^([\s\S]*?)(\.S(\d\d)[.*?]E(\d\d))/;
      var moviePattern = /(.*?)(?:(?:[\s.]HDTV[\s.])|(?:[\s.]1080p[\s.])|(?:[\s.]720p[\s.])|(?:[\s.]WEB.*?[\s.]))/i; //  /^([\s\S]*?)(\.S(\d\d)[.*?]E(\d\d))/;
      var title = '(Unknown)';
      var seasonNumber = '';
      var episodeNumber = '';
      const SEASONPREFIX = 'S: ';
      const EPISODEPREFIX = "Ep: ";

      const s_matches = seriesPattern.exec(filename);

      if (s_matches) {
        //const fullMatch = matches[0];  // Full matched string, e.g., "S01E02"
        title = s_matches[1].replaceAll('.', ' '); // Text before the "SxxExx" pattern
        if (s_matches[2]) {
          seasonNumber = SEASONPREFIX + s_matches[2]; // S##E##
          episodeNumber = EPISODEPREFIX + s_matches[3]; // 
        } else {
          seasonNumber = SEASONPREFIX + s_matches[4]; // S##.Blahblahbla
          episodeNumber = s_matches[5];
        }
      } else {
        const m_matches = moviePattern.exec(filename);
        if (m_matches) {
          title = m_matches[1].replaceAll('.', ' ');
        } else {
          title = filename;
        }
      }

      return {season:seasonNumber, episode:episodeNumber, title};
  }