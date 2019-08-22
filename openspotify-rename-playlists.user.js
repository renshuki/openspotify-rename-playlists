// ==UserScript==
// @name         openspotify-rename-playlists
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Rename playlists made easy on https://open.spotify.com
// @author       renshuki
// @match        https://open.spotify.com/playlist/*
// @grant        none
// @run-at document-start
// ==/UserScript==

/* ### BEGIN CONFIGURATION ### */

var token = "PUT_YOUR_OWN_TOKEN_HERE";

/* ### END CONFIGURATION ### */

var refNode;
var fireOnHashChangesToo = true;
var pageURLCheckTimer = setInterval (
    function () {
        if ( this.lastPathStr !== location.pathname
            || this.lastQueryStr !== location.search
            || (fireOnHashChangesToo && this.lastHashStr !== location.hash)
        ) {
            this.lastPathStr = location.pathname;
            this.lastQueryStr = location.search;
            this.lastHashStr = location.hash;
            gmMain ();
        }
    }
    , 1000
);

function gmMain () {
    console.log ('A "New" page has loaded.');
    createButton();
}

function createButton() {
    var button = document.createElement("button");
    button.className = "btn btn--narrow btn-small btn--no-margin btn-white cta-button";
    button.style.margin = "0 0 0 10px";
    button.onclick = function() { renamePopup(); };
    var buttonText = document.createTextNode("Edit");
    button.appendChild(buttonText);

    refNode = document.querySelectorAll("div.mo-info-name");
    refNode[0].appendChild(button);
}

function renamePopup(){
  var popup = prompt("Please enter a new name for your playlist", refNode[0].title);
  if (popup != null) {
    console.log("Playlist Name: " + popup);
    updatePlaylistName(popup);
    //refNode[0].title = popup;
    //refNode[0].querySelector('span').innerHTML = popup;
    window.location.reload(true)
  }
}

function updatePlaylistName(playlistName) {
    var id = playlistID();
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://api.spotify.com/v1/playlists/' + id);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send(JSON.stringify({
        name: playlistName
    }));
}

function playlistID() {
    const id = new URL(window.location.href).pathname.split('/').pop();
    console.log("Playlist ID: " + id);
    return id;
}












