# Scrape Torrent Galaxy

This project was created to better understand react, javascript and css. This app will capture the TV Series
episodes found at torrentgalaxy.to. A particular series can be marked as favorites as well as be added to 
an ignore list. Individual files can also be marked as already downloaded so that it will be hidden from the 
lists. 

The end result is a display of custom filtered torrents that can show what desired episodes are new and
available for download.

### Proxy
One of the dependencies in this project is http-proxy-middleware. This is needed to circumvent CORS errors
when opening HTTP pages from an app and not from your browser.

### Serve
I had installed `serve` (`npm install -g serve`) and then run `serve -s build` to allow accessing the app
remotely from my mac-mini or my cellphone. However, I started having some problems with it, and now when
I just do a regular `npm start`, I can still access it remotely.

