var lyricsSearchEl = document.getElementById('lyricsSearch');
var lyricsInputEl = document.getElementById('lyricsInput');
var artistSearchEl = document.getElementById('artistSearch');
var artistInputEl = document.getElementById('artistInput');
var songHereEl = document.getElementById('songHere');
var artistHereEl = document.getElementById('artistHere');
var lyricsHereEl = document.getElementById('lyricsHere');
var lyricsCopyrightEL = document.getElementById('lyricsCopyright');
var searchedArtistEl = document.getElementById('searched-artist')
var relatedArtist1El = document.getElementById('related-artist1')
var relatedArtist2El = document.getElementById('related-artist2')
var relatedArtist3El = document.getElementById('related-artist3')
var relatedArtist4El = document.getElementById('related-artist4')
var relatedArtist5El = document.getElementById('related-artist5')
lyricsSearchEl.addEventListener("click", captureInputLyrics);
artistSearchEl.addEventListener("click", getRelatedArtists);

function captureInputLyrics() {
    var currentSearch = lyricsInputEl.value
    var trackSearch = 'https://api.musixmatch.com/ws/1.1/track.search?q_track=' + currentSearch + '&page_size=3&page=1&s_track_rating=desc&apikey=fc5dac7d8cef5bd747f29be95f28953d'
    fetch(trackSearch)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data)
        songHereEl.innerHTML = data.message.body.track_list[0].track.track_name
        artistHereEl.innerHTML = data.message.body.track_list[0].track.artist_name
        var trackID = data.message.body.track_list[0].track.track_id
        var lyricsURL =  'https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + trackID + '&apikey=fc5dac7d8cef5bd747f29be95f28953d'
        fetch(lyricsURL)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
            // console.log(data)
            var x = data.message.body.lyrics.lyrics_body.split("******* This Lyrics is NOT for Commercial use *******").shift();
            lyricsHereEl.innerHTML = x
            lyricsCopyrightEL.innerHTML = data.message.body.lyrics.lyrics_copyright
        })
    })
};

function getRelatedArtists () {
    var artistSearch = artistInputEl.value
    var getArtistIdURL = 'https://api.musixmatch.com/ws/1.1/artist.search?q_artist='+ artistSearch +'&page_size=5&apikey=fc5dac7d8cef5bd747f29be95f28953d'
    fetch(getArtistIdURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data)
        searchedArtistEl.innerHTML = data.message.body.artist_list[0].artist.artist_name
        var relatedArtistURL = 'https://api.musixmatch.com/ws/1.1/artist.related.get?artist_id=' + data.message.body.artist_list[0].artist.artist_id + '&page_size=5&page=1&apikey=fc5dac7d8cef5bd747f29be95f28953d'
        fetch(relatedArtistURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data)
            relatedArtist1El.innerHTML = data.message.body.artist_list[0].artist.artist_name
            relatedArtist2El.innerHTML = data.message.body.artist_list[1].artist.artist_name
            relatedArtist3El.innerHTML = data.message.body.artist_list[2].artist.artist_name
            relatedArtist4El.innerHTML = data.message.body.artist_list[3].artist.artist_name
            relatedArtist5El.innerHTML = data.message.body.artist_list[4].artist.artist_name
        })
    })
};

// var testURL = 'http://api.musixmatch.com/ws/1.1/chart.artists.get?page=1&page_size=5&country=it&apikey=fc5dac7d8cef5bd747f29be95f28953d'
// fetch(testURL)
// .then(function (response) {
//     return response.json();
// })
// .then(function (data) {
//     console.log(data)
// })
