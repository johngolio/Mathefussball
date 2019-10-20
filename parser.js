var content;
var player;
var exercises;
var results;

window.onload = function () {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('txtAufgaben');
        fileSelected.addEventListener('change', function (e) {
            var fileExtension = /text.*/;
            var fileTobeRead = fileSelected.files[0];
            if (fileTobeRead.type.match(fileExtension)) {
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    content = fileReader.result;
                    parse(content);
                }
                fileReader.readAsText(fileTobeRead);
            }
            else {
                alert("Achtung! Es muss eine txt Datei ausgewählt werden.");
            }
        }, false);

        var fileSelectedSchueler = document.getElementById('txtSchueler');
        fileSelectedSchueler.addEventListener('change', function (e) {
            var fileExtension = /text.*/;
            var fileTobeReadSchueler = fileSelectedSchueler.files[0];
            if (fileTobeReadSchueler.type.match(fileExtension)) {
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    content = fileReader.result;
                    parse_schueler(content);
                }
                fileReader.readAsText(fileTobeReadSchueler);
            }
            else {
                alert("Achtung! Es muss eine txt Datei ausgewählt werden.");
            }
        }, false);
    }
    else {
        alert("Dateiformat wird nicht unterstützt.");
    }
}

function parse_schueler(string) {
    var fileContents = document.getElementById('text');
    fileContents.innerHTML = string;
}

function parse(string) {
    exercises = [];
    results = [];

    var lines = string.split("\n");
    player = lines[0];

    var fileContents = document.getElementById('aufgaben');

    for (var i = 1; i < lines.length; i++) {
        fileContents.innerHTML += lines[i] + "\n";

        var split = lines[i].split("=");
        exercises.push(split[0].trim());
        results.push(split[1].trim());
    }


    console.log(exercises[0]);
}

var saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", function () {
    var saveTxt = "";
    var selection = document.getElementById("select_1").value;
    var team_rot = [];
    var team_blau = [];
    var string1 = "";
    var string2 = "";
    if (selection == "1") {
        // Zahlen
        var team1_size;
        var team2_size;
        var int = document.getElementById("kids").value;
        team1_size = Math.ceil(int / 2);
        team2_size = Math.floor(int / 2);
        string1 = "1";
        string2 = "1";
        var loop;
        for (loop = 2; loop < team2_size; loop++) {
            string1 += "," + loop;
            string2 += "," + loop;
        }
        if (team1_size > team2_size) {
            string1 += "," + loop;
        }
        saveTxt += string1 + "\n" + string2 + "\n";
    }
    else {
        // Namen
        var schueler_txt = document.getElementById("text").value;
        schueler_namen = schueler_txt.split("\n");
        schueler_namen = shuffle(schueler_namen);
        var max_size = Math.ceil(schueler_namen.length / 2);
        team_blau = schueler_namen.slice(0, max_size);
        if (schueler_namen.length % 2 == 1) {
            team_rot = schueler_namen.slice(max_size, schueler_namen.length);
        }
        else team_rot = schueler_namen.slice(max_size, schueler_namen.length);
        string1 += team_blau[0];
        string2 += team_rot[0];
        for (var loopi = 1; loopi < team_blau.length; loopi++) {
            string1 += "," + team_blau[loopi];
        }
        for (var loopi2 = 1; loopi2 < team_rot.length; loopi2++) {
            string2 += "," + team_rot[loopi2];
        }
        saveTxt += string1 + "\n" + string2 + "\n";
    }
    saveTxt += document.getElementById("aufgaben").value;
    download("Klasse1", saveTxt);
});

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}