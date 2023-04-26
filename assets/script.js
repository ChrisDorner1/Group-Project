var lyricsSearchEl = document.getElementById('lyricsSearch')
var lyricsInputEl = document.getElementById('lyricsInput')
lyricsSearchEl.addEventListener("click", captureInput)
var lyricsHereEl = document.getElementById('lyricsHere')
var lyricsCopyrightEL = document.getElementById('lyricsCopyright')

function captureInput() {
    var currentSearch = lyricsInputEl.value
    
    var baseURL = 'https://api.musixmatch.com/ws/1.1/'
    var apiKey = 'fc5dac7d8cef5bd747f29be95f28953d'
    var trackSearch = 'track.search?q_track=' + currentSearch + '&page_size=3&page=1&s_track_rating=desc'
    
    fetch(baseURL + trackSearch + '&apikey=' + apiKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var trackID = data.message.body.track_list[0].track.track_id
        var lyricsURL =  'https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + trackID + '&apikey=fc5dac7d8cef5bd747f29be95f28953d'
        fetch(lyricsURL)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
            lyricsHereEl.innerHTML = data.message.body.lyrics.lyrics_body
            lyricsCopyrightEL.innerHTML = data.message.body.lyrics.lyrics_copyright
        })
    })
}