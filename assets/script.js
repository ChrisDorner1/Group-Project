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
var artistImgEl = document.getElementById('artistImg')
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
    var deezerSearch = artistInputEl.value.replace(/\s+/g, '-').toLowerCase();
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
            console.log(data)
            relatedArtist1El.innerHTML = data.message.body.artist_list[0].artist.artist_name
            relatedArtist2El.innerHTML = data.message.body.artist_list[1].artist.artist_name
            relatedArtist3El.innerHTML = data.message.body.artist_list[2].artist.artist_name
            relatedArtist4El.innerHTML = data.message.body.artist_list[3].artist.artist_name
            relatedArtist5El.innerHTML = data.message.body.artist_list[4].artist.artist_name
        })  
    })
    var deezerURL = 'https://api.deezer.com/artist/' + deezerSearch
    fetch(deezerURL)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        // console.log(data)
        artistImgEl.setAttribute('src', data.picture_big)
        artistImgEl.setAttribute('alt', data.name)
    })
};

superheroInputEl = document.getElementById('superheroInput')
superheroSearchEl = document.getElementById('superheroSearch')
superheroSearchEl.addEventListener('click', fetchSuperhero)
var mediaTitleEl = document.getElementById('mediaTitle')
var mediaTypeEl = document.getElementById('mediaType')
var mediaReleaseEl = document.getElementById('mediaRelease')
var mediaGenreEl = document.getElementById('mediaGenre')
var mediaDirectorEl = document.getElementById('mediaDirector')
var mediaActorsEl = document.getElementById('mediaActors')
var mediaLanguageEl = document.getElementById('mediaLanguage')
var imdbRatingEl = document.getElementById('imdbRating')

var mediaPlotEl = document.getElementById('mediaPlot')

var comicNameEl = document.getElementById('comicName')
var comicImgEl = document.getElementById('comicImg')
var comicFullNameEl = document.getElementById('comicFullName')
var comicBirthEl = document.getElementById('comicBirth')
var comicAliasesEl = document.getElementById('comicAliases')
var comicAlterEgoEl = document.getElementById('comicAlterEgo')
var comicAlignmentEl = document.getElementById('comicAlignment')
var comicPublisherEl = document.getElementById('comicPublisher')
var comicFirstAppEl = document.getElementById('comicFirstApp')
var comicRelativesEl = document.getElementById('comicRelatives')
var comicAffiliationEl = document.getElementById('comicAffiliation')
var comicOccupationEl = document.getElementById('comicOccupation')
var comicBaseEl = document.getElementById('comicBase')
var powerstatHeaderEl = document.getElementById('powerstatHeader')
var combatEl = document.getElementById('combat')
var durabilityEl = document.getElementById('durability')
var intelligenceEl = document.getElementById('intelligence')
var powerEl = document.getElementById('power')
var speedEl = document.getElementById('speed')
var strengthEl = document.getElementById('strength')

function fetchSuperhero() {
    var hero = superheroInputEl.value
    var omdbHero = hero.replace(/\s+/g, '+').toLowerCase();
    var OMDBAPI = 'http://www.omdbapi.com/?t=' + omdbHero + '&plot=full&apikey=187295ff'
    fetch(OMDBAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data)
        mediaTitleEl.innerHTML = "Title: " + data.Title
        mediaTypeEl.innerHTML = "Movie or Series? " + data.Type
        mediaReleaseEl.innerHTML = "Release Date: " + data.Released
        mediaGenreEl.innerHTML = "Genre: " + data.Genre
        mediaDirectorEl.innerHTML = "Director: " + data.Director
        mediaActorsEl.innerHTML = "Actors: " + data.Actors
        mediaLanguageEl.innerHTML = "Language: " + data.Language
        imdbRatingEl.innerHTML = " IMBD Rating: " + data.Ratings[0].Value
        mediaPlotEl.innerHTML = "Plot: " + data.Plot

    })
    var heroHero = hero.replace(/\s/g, '').toLowerCase();
    var superheroAPI = 'https://superheroapi.com/api/10161471631413923/search/' + heroHero
    fetch(superheroAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data)
        console.log(Object.keys(data.results[0].connections))
        comicNameEl.innerHTML = "Name: " +  data.results[0].name
        comicImgEl.setAttribute('src', data.results[0].image.url)
        comicImgEl.setAttribute('alt', data.results[0].name)
        comicFullNameEl.innerHTML = "Full Name: " + data.results[0].biography['full-name']
        comicBirthEl.innerHTML = "Birthplade: " + data.results[0].biography['place-of-birth']
        comicAliasesEl.innerHTML = "Aliases: " + data.results[0].biography.aliases
        comicAlterEgoEl.innerHTML = "Alter-Egos: " + data.results[0].biography['alter-ego']
        comicAlignmentEl.innerHTML = "Good or Bad?" + data.results[0].biography.alignment
        comicPublisherEl.innerHTML = "Publisher: " + data.results[0].biography.publisher
        comicFirstAppEl.innerHTML = "First Appearance: " + data.results[0].biography['first-appearance']
        comicRelativesEl.innerHTML = "Relatives: " + data.results[0].connections.relatives
        comicAffiliationEl.innerHTML = "Affiliations: " + data.results[0].connections['group-affiliation']
        comicOccupationEl.innerHTML = "Occupations: " + data.results[0].work.occupation
        comicBaseEl.innerHTML = "Base/Bases: " + data.results[0].work.base
        powerstatHeaderEl.innerHTML = "Power Stats:"
        combatEl.innerHTML = "Combat: " + data.results[0].powerstats.combat
        durabilityEl.innerHTML = "Durability: " + data.results[0].powerstats.durability
        intelligenceEl.innerHTML = "Intelligence: " + data.results[0].powerstats.intelligence
        powerEl.innerHTML = "Power: " + data.results[0].powerstats.power
        speedEl.innerHTML = "Speed: " + data.results[0].powerstats.speed
        strengthEl.innerHTML = "Strength: " + data.results[0].powerstats.strength
    })
}