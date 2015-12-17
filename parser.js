function getURLs() {
  var token, aUrl, response, json, mydata, rss, trackDur
  
  token = "cUa40O3Jg3Emvp6Tv4U6ymYYO50NUGpJ"
  aUrl = "https://api.soundcloud.com/playlists/128933722?secret_token=&client_id=" + token;
  response = UrlFetchApp.fetch(aUrl); //get feed
  //json = response.getContentText();
  mydata = JSON.parse(response.getContentText());
  
  rss = '<?xml version="1.0" encoding="UTF-8"?><rss 
xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" version="2.0">';
  rss += ' <channel><title>' + mydata.title + '</title>';
  rss += ' <link>' + mydata.permalink_url + '</link>';
  rss += ' <itunes:author>' + mydata.user.username + '</itunes:author>';
  rss += ' <itunes:summary>Generated from SoundCloud Favourites playlist</itunes:summary>';
  rss += ' <description>Generated from SoundCloud Favourites playlist</description>';
  rss += ' <itunes:category text="Music"/>';
  
  for(i in mydata.tracks) { //Cycle through tracks in playlist
    if(mydata.tracks[i].downloadable == true) { //filter out non-downloadable tracks
      trackDur = mydata.tracks[i].duration / 1000;
      
      rss += ' <item>';
      rss += ' <title>' + mydata.tracks[i].title + '</title>';
      rss += ' <itunes:author>' + mydata.tracks[i].user.username + '</itunes:author>';
      rss += ' <itunes:subtitle>' + mydata.tracks[i].title + '</itunes:subtitle>';
      rss += ' <itunes:summary><![CDATA[' + mydata.tracks[i].description + 
']]</itunes:summary>';
      rss += ' <itunes:image href="' + mydata.tracks[i].artwork_url + '" />'; //needs to be 
updated to use 'crop' or 't500x500' instead of 'large'
      rss += ' <enclosure url="' + mydata.tracks[i].download_url + token + '" length="' + 
trackDur.toFixed(0) + '" type="audio/x-' + mydata.tracks[i].original_format + '" />';
      rss += ' <guid>' + mydata.tracks[i].id + '</guid>';
      rss += ' <pubDate>' +  + 'GMT</pubDate>'; //as ddd, d mmm yyyy hh:mm:ss
      rss += ' <itunes:duration>' +  + '</itunes:duration>'; //in mm:ss
      rss += ' </item>';
    }
  }
  
  rss += '</channel></rss>';
  Logger.log(rss)
  return rss
  
  
  
}
