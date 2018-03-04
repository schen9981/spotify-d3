s = new SpotifyWebApi();
data = [];

$.ajax({
  type: "POST",
  url: "https://accounts.spotify.com/api/token",
  xhrFields: {
    withCredentials: false
  },
  headers: {
        'Authorization': 'Basic ' + btoa("47c6369ae4194f96a070658bc5471db5:785b8c682d1d434e82a9103dc988d165"),
    },
    data: {
      grant_type: 'client_credentials'
    },
    success: function(data, status) {
      s.setAccessToken(data.access_token)
      main()
    }
})

function main() {
  document.getElementById('fartist').onkeypress = enterKeyPressedOnTextbox
  updateArtist('Mura Masa')
}

function enterKeyPressedOnTextbox(e) {
  if (e.key === "Enter") {
    document.getElementById('fartist').blur();
    updateArtist(document.getElementById('fartist').value)
  }
}

function update_data() {
  var data_bind = d3.select(".chart").selectAll(".albumcover")
    .data(data, function(d) { return d.id })

  data_bind.enter()
    .append("img")
    .attr("class", "albumcover")
    .attr("src", function (d) { return d.image })
    .style("opacity", "0.0")
    .transition()
      .delay(200)
      .duration(400)
      .style("opacity", "1.0")

    data_bind.exit()
      .transition()
        .duration(100)
        .style("opacity", "0.0").delay(200).remove()
}

function updateArtist(artist) {
  getArtistID(artist, function(artistID) {
    updateArtistAlbums(artistID);
  });
}

function getArtistID(artistName, callback) {
  s.searchArtists(artistName, function(err, data) {
    if (err) { console.error(err); }
    else {
      console.log(data)
      callback(data.artists.items[0].id)}
  })
}

function updateArtistAlbums(artistID) {
  s.getArtistAlbums(artistID, {album_type: "album"}, function(err, albums) {
    if (err) {console.error(err);}
    else {
      data = [];
      var alreadyDisplayed = [];
      for (i = 0; i < albums.items.length; i++) {
        if (!alreadyDisplayed.includes(albums.items[i].name)) {
          data[data.length] = {
            image: albums.items[i].images[0].url,
            url: albums.items[i].external_urls.spotify,
            name: albums.items[i].name,
            id: albums.items[i].id
          }
          alreadyDisplayed[alreadyDisplayed.length] = albums.items[i].name;
        }
      }
      update_data();
    }
  })
}