//call using:
//  <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>
//  <script src='main.js'></script>

var baseURL = 'https://www.thebluealliance.com/api/v3/';
var hmm = '';
var hmmKey;
var hmmVal;
var jqxhr;
var mScores = [7];
for (var bob = 0; bob < 7; bob++) {
    mScores[bob] = [];
}
var yearWeekAr = [];

//get season
function oof(x) {
    TBAretrieve('status');
    if (x == 0) {
        x = hmm.current_season;
        return x;
    }
    if (x == 1) {
        x = hmm.max_season;
        return x;
    }
}

//take form stuff, put it in an array
function start(currentYear, maxYear, ) {
    if (parseInt($("input[name='yearInput']").val()) >= 2016 && parseInt($("input[name='yearInput']").val()) <= parseInt(maxYear) && parseInt(maxYear) != "NaN") {
        if ($("input[name='yearInput']").val() != null) {
            yearWeekAr[0] = parseInt($("input[name='yearInput']").val());
        }
    }
    else {
        yearWeekAr[0] = 2018;//currentYear;//replaced for debugging and 2019 tests
    }
    for (var i = 1; i < 7; i++) {
        if ($("input[name='w" + i + "']").is(":checked")) {
            yearWeekAr[i] = 1;
        } else {
            yearWeekAr[i] = 0;
        }
    }
    return yearWeekAr;
}

//retrieve function
function TBAretrieve(inURL) {
    $.ajax({
        url: baseURL + inURL,
        dataType: 'HTML',
        async: false,
        success: (function (data) {
            hmm = data;
            hmm = JSON.parse(hmm, (hmmKey, hmmVal));
        }),
        headers: { 'X-TBA-Auth-Key': '7zyl3s8GtJlKGQs0jo053ZHYyY4pXaYJuYGNV85sOhF4cUAnyZ6idKGVVm6lLMpw' }
    });
}

//get match score
function avgMatchScore(bing, yearNWeeks) {
    var incremnt = 0;
    var answer;
    //for each week
    for (var i = 0; i < 6; i++) {
        //if the week was checked
        if (yearNWeeks[i + 1] == 1) {
            //reset increment counter for each week
            incremnt = 0;
            //check each event
            for (var x = 0; x < bing[i].length; x++) {
                //retrieve match data of all matches at said event
                TBAretrieve("event/" + bing[i][x] + "/matches/simple")
                for (var z = 0; z < hmm.length; z++) {
                    //store scores in array
                    mScores[i][incremnt] = (hmm[z].alliances.blue.score);
                    incremnt = incremnt + 1;
                    mScores[i][incremnt] = (hmm[z].alliances.red.score);
                    incremnt = incremnt + 1;
                }
            }
            //sort
            mScores[i].sort(function (a, b) { return a - b });
        }
    }
    //put all scores in one array
    incremnt = 0;
    for (var i = 0; i < 6; i++) {
        for (var v = 0; v < mScores[i].length; v++) {
            mScores[6][incremnt] = mScores[i][v];
            incremnt += 1;
        }
    }
    //sort in ascending order
    mScores[6].sort(function (a, b) { return a - b });
}

function matchScoreStuff(yearNWeeks) {
    //setup 2D array
    var week = [6];
    for (var no = 0; no < 6; no++) {
        week[no] = [];
    }
    var tempCount = 0;
    var increment = 0;
    //O.o get events of year
    TBAretrieve("events/" + yearNWeeks[0]);
    //bobbb the builder checks the weeks
    for (var i = 1; i < 7; i++) {
        //if week has been checked
        if (yearNWeeks[i] == 1) {
            for (var z = 0; z < hmm.length; z++) {
                //check each event for the week it happens in
                if (hmm[z]["week"] == i) {
                    //if the event is in said week, add to array
                    //variable week is week[week-1][event(alphabetical order)] = event key
                    week[i - 1][increment] = hmm[z]["key"];
                    increment += 1;
                    console.log(hmm[z]["key"]); //debug
                }
            }
        }
        increment = 0;
        tempCount += yearNWeeks[i];
    }
    //if no weeks were selected give error, redirect
    if (tempCount == 0) {
        alert("no weeks were selected");
        window.location.href = 'gameInfo.html';
    }
    else {
        avgMatchScore(week, yearNWeeks);
    }
}

function data2graph(arrayy, mode){
    if (mode === 'median') {
        return arrayy[Math.round(arrayy.length / 2)];
    }
    if (mode === 'topq') {
        return arrayy[Math.round(3 * (arrayy.length / 4))];
    }
    if (mode === 'bottomq') {
        return arrayy[Math.round(arrayy.length / 4)];
    }
    if (mode === 'mean') {
        for (var u = 1; u < arrayy.length; u++) {
            arrayy[0] += arrayy[u];
        }
        arrayy[0] = arrayy[0] / arrayy.length;
        return arrayy[0];
    }
    if(mode == 'top'){
        var answer;
        var IQR = (arrayy[Math.round(3 * (arrayy.length / 4))] - arrayy[Math.round(arrayy.length / 4)]);
        IQR += arrayy[Math.round(3 * (arrayy.length / 4))];
        for(var u = 0; u< arrayy.length;u++){
            if(arrayy[u] <= IQR){
                answer = IQR;
            }
        }
        return answer;
    }
    if(mode == 'bottom'){
        var answer;
        var IQR = (arrayy[Math.round(3 * (arrayy.length / 4))] - arrayy[Math.round(arrayy.length / 4)]);
        IQR = arrayy[Math.round((arrayy.length / 4))] - IQR;
        for(var u = arrayy.length - 1; u>= 0;){
            if(arrayy[u] >= IQR){
                answer = IQR;
            }
            u -= 1;
        }
        return answer;
    }
}