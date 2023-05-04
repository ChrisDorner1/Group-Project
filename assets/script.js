// Variables for lyrics search
var lyricsSearchEl = document.getElementById('lyricsSearch');
var lyricsInputEl = document.getElementById('lyricsInput');
var songHereEl = document.getElementById('songHere');
var artistHereEl = document.getElementById('artistHere');
var lyricsHereEl = document.getElementById('lyricsHere');
var lyricsCopyrightEL = document.getElementById('lyricsCopyright');
// Variables for related artists search
var artistSearchEl = document.getElementById('artistSearch');
var artistInputEl = document.getElementById('artistInput');
var searchedArtistEl = document.getElementById('searched-artist');
var relatedArtist1El = document.getElementById('related-artist1');
var relatedArtist2El = document.getElementById('related-artist2');
var relatedArtist3El = document.getElementById('related-artist3');
var relatedArtist4El = document.getElementById('related-artist4');
var relatedArtist5El = document.getElementById('related-artist5');
var artistImgEl = document.getElementById('artistImg');
// Variables to add borders to certian divs on click
var div1El = document.getElementById('div1');
var div2El = document.getElementById('div2');
var div3El = document.getElementById('div3');
var div4El = document.getElementById('div4');
// Click events for lyrics and artist search
lyricsSearchEl.addEventListener("click", captureInputLyrics);
artistSearchEl.addEventListener("click", getRelatedArtists);
// Lyrics search
function captureInputLyrics() {
    div1El.setAttribute('class', 'haveBorder')
    var currentSearch = lyricsInputEl.value
    var trackSearch = 'https://api.musixmatch.com/ws/1.1/track.search?q_track=' + currentSearch + '&page_size=3&page=1&s_track_rating=desc&apikey=fc5dac7d8cef5bd747f29be95f28953d'
    fetch(trackSearch)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        songHereEl.innerHTML = "Song - <span>" + data.message.body.track_list[0].track.track_name + "</span>"
        artistHereEl.innerHTML = "Artist - <span>" + data.message.body.track_list[0].track.artist_name + "</span>"
        var trackID = data.message.body.track_list[0].track.track_id
        var lyricsURL =  'https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + trackID + '&apikey=fc5dac7d8cef5bd747f29be95f28953d'
        fetch(lyricsURL)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
            var x = data.message.body.lyrics.lyrics_body.split("******* This Lyrics is NOT for Commercial use *******").shift();
            lyricsHereEl.innerHTML = x
            lyricsCopyrightEL.innerHTML = data.message.body.lyrics.lyrics_copyright
        })
    });
};
// Related artist search
function getRelatedArtists () {
    var artistSearch = artistInputEl.value
    var deezerSearch = artistInputEl.value.replace(/\s+/g, '-').toLowerCase();
    var getArtistIdURL = 'https://api.musixmatch.com/ws/1.1/artist.search?q_artist='+ artistSearch +'&page_size=5&apikey=fc5dac7d8cef5bd747f29be95f28953d'
    fetch(getArtistIdURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        searchedArtistEl.innerHTML = "You searched for artists related to: <span>" + data.message.body.artist_list[0].artist.artist_name + "</span>"
        var relatedArtistURL = 'https://api.musixmatch.com/ws/1.1/artist.related.get?artist_id=' + data.message.body.artist_list[0].artist.artist_id + '&page_size=5&page=1&apikey=fc5dac7d8cef5bd747f29be95f28953d'
        fetch(relatedArtistURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            relatedArtist1El.innerHTML = "Five related artists are: <br> 1. <span>" + data.message.body.artist_list[0].artist.artist_name + "</span>"
            relatedArtist2El.innerHTML = "2. <span>" + data.message.body.artist_list[1].artist.artist_name + "</span>"
            relatedArtist3El.innerHTML = "3. <span>" + data.message.body.artist_list[2].artist.artist_name + "</span>"
            relatedArtist4El.innerHTML = "4. <span>" + data.message.body.artist_list[3].artist.artist_name + "</span>"
            relatedArtist5El.innerHTML = "5. <span>" + data.message.body.artist_list[4].artist.artist_name + "</span>"
        })  
    });
    var deezerURL = 'https://api.deezer.com/artist/' + deezerSearch
    fetch(deezerURL)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        artistImgEl.setAttribute('src', data.picture_big)
        artistImgEl.setAttribute('alt', data.name)
        artistImgEl.setAttribute('class', 'imageSize')
    });
};
// Superhero search variables
superheroInputEl = document.getElementById('superheroInput');
superheroSearchEl = document.getElementById('superheroSearch');
superheroSearchEl.addEventListener('click', fetchSuperhero);
var mediaTitleEl = document.getElementById('mediaTitle');
var mediaTypeEl = document.getElementById('mediaType');
var mediaReleaseEl = document.getElementById('mediaRelease');
var mediaGenreEl = document.getElementById('mediaGenre');
var mediaDirectorEl = document.getElementById('mediaDirector');
var mediaActorsEl = document.getElementById('mediaActors');
var mediaLanguageEl = document.getElementById('mediaLanguage');
var imdbRatingEl = document.getElementById('imdbRating');
var mediaPlotEl = document.getElementById('mediaPlot');
var comicNameEl = document.getElementById('comicName');
var comicImgEl = document.getElementById('comicImg');
var comicFullNameEl = document.getElementById('comicFullName');
var comicBirthEl = document.getElementById('comicBirth');
var comicAliasesEl = document.getElementById('comicAliases');
var comicAlterEgoEl = document.getElementById('comicAlterEgo');
var comicAlignmentEl = document.getElementById('comicAlignment');
var comicPublisherEl = document.getElementById('comicPublisher');
var comicFirstAppEl = document.getElementById('comicFirstApp');
var comicRelativesEl = document.getElementById('comicRelatives');
var comicAffiliationEl = document.getElementById('comicAffiliation');
var comicOccupationEl = document.getElementById('comicOccupation');
var comicBaseEl = document.getElementById('comicBase');
var powerstatHeaderEl = document.getElementById('powerstatHeader');
var combatEl = document.getElementById('combat');
var durabilityEl = document.getElementById('durability');
var intelligenceEl = document.getElementById('intelligence');
var powerEl = document.getElementById('power');
var speedEl = document.getElementById('speed');
var strengthEl = document.getElementById('strength');
// Superhero search
function fetchSuperhero() {
    div3El.setAttribute('class', 'haveBorder')
    div4El.setAttribute('class', 'haveBorder')
    var hero = superheroInputEl.value
    var omdbHero = hero.replace(/\s+/g, '+').toLowerCase();
    var OMDBAPI = 'http://www.omdbapi.com/?t=' + omdbHero + '&plot=full&apikey=187295ff'
    fetch(OMDBAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        mediaTitleEl.innerHTML = "Title -  <span>" + data.Title + "</span>"
        mediaTypeEl.innerHTML = "is it a Movie or Series?  <span>" + data.Type + "</span>"
        mediaReleaseEl.innerHTML = "Release Date -  <span>" + data.Released + "</span>"
        mediaGenreEl.innerHTML = "Genre -  <span>" + data.Genre + "</span>"
        mediaDirectorEl.innerHTML = "Director -  <span>" + data.Director + "</span>"
        mediaActorsEl.innerHTML = "Actors -  <span>" + data.Actors + "</span>"
        mediaLanguageEl.innerHTML = "Language -  <span>" + data.Language + "</span>"
        imdbRatingEl.innerHTML = " IMBD Rating -  <span>" + data.Ratings[0].Value + "</span>"
        mediaPlotEl.innerHTML = "Plot -  <span>" + data.Plot + "</span>"

    });
    var heroHero = hero.replace(/\s/g, '').toLowerCase();
    var superheroAPI = 'https://superheroapi.com/api/10161471631413923/search/' + heroHero
    fetch(superheroAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        comicNameEl.innerHTML = "Name - <span>" +  data.results[0].name + "</span>"
        comicImgEl.setAttribute('src', data.results[0].image.url)
        comicImgEl.setAttribute('alt', data.results[0].name)
        comicImgEl.setAttribute('class', 'imageSize2')
        comicFullNameEl.innerHTML = "Full Name -  <span>" + data.results[0].biography['full-name'] + "</span>"
        comicBirthEl.innerHTML = "Birthplade -  <span>" + data.results[0].biography['place-of-birth'] + "</span>"
        comicAliasesEl.innerHTML = "Aliases -  <span>" + data.results[0].biography.aliases + "</span>"
        comicAlterEgoEl.innerHTML = "Alter-Egos -  <span>" + data.results[0].biography['alter-ego'] + "</span>"
        comicAlignmentEl.innerHTML = "Good or Bad?  <span>" + data.results[0].biography.alignment + "</span>"
        comicPublisherEl.innerHTML = "Publisher -  <span>" + data.results[0].biography.publisher + "</span>"
        comicFirstAppEl.innerHTML = "First Appearance -  <span>" + data.results[0].biography['first-appearance'] + "</span>"
        comicRelativesEl.innerHTML = "Relatives -  <span>" + data.results[0].connections.relatives + "</span>"
        comicAffiliationEl.innerHTML = "Affiliations -  <span>" + data.results[0].connections['group-affiliation'] + "</span>"
        comicOccupationEl.innerHTML = "Occupations -  <span>" + data.results[0].work.occupation + "</span>"
        comicBaseEl.innerHTML = "Base/Bases -  <span>" + data.results[0].work.base + "</span>"
        powerstatHeaderEl.innerHTML = "Power Stats:"
        combatEl.innerHTML = "Combat -  <span>" + data.results[0].powerstats.combat + "</span>"
        durabilityEl.innerHTML = "Durability -  <span>" + data.results[0].powerstats.durability + "</span>"
        intelligenceEl.innerHTML = "Intelligence -  <span>" + data.results[0].powerstats.intelligence + "</span>"
        powerEl.innerHTML = "Power -  <span>" + data.results[0].powerstats.power + "</span>"
        speedEl.innerHTML = "Speed -  <span>" + data.results[0].powerstats.speed + "</span>"
        strengthEl.innerHTML = "Strength -  <span>" + data.results[0].powerstats.strength + "</span>"
    });
};