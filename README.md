# openspotify-rename-playlists
Tampermonkey script to rename playlists on https://open.spotify.com (Spotify web player)
*(should be more or less compatible with other scripts managers as well)*

## Usage
 - Import the `openspotify-rename-playlists.user.js` script into Tampermonkey
 - Update `token` with your own
 - Enjoy!
 
## Demo

![](demo.gif)

## Known issues
 - Left column not refreshing properly (need to clear page cache)
 - `Edit` button shows up after 1000ms delay on a new page load (use [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) instead?)
