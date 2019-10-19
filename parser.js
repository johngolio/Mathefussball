var content;
var player;
var exercises;
var results;

window.onload = function () { 
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('txtfiletoread');
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
    } 
    else { 
        alert("Dateiformat wird nicht unterstützt."); 
    } 
}

function parse(string){
    exercises = [];
    results = [];

    var lines = string.split("\n");
    player = lines[0];

    var fileContents = document.getElementById('filecontents'); 

    for(var i = 1; i < lines.length; i++){
        fileContents.innerText += lines[i] + "\n"; 

        var split = lines[i].split("=");
        exercises.push(split[0].trim());
        results.push(split[1].trim());
    }



    console.log(exercises[0]);
}

var saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", function(){
    var saveTxt = "";
    player = document.getElementById("kids").value;
    saveTxt += player +"\n";
    for(var i = 0; i < exercises.length; i++){
        saveTxt += exercises[i] + " = " + results[i] + "\n";
    }
    download("Klasse1", saveTxt);
}); 


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}