var inhalt;


window.onload = function () { 
    if (window.File && window.FileReader && window.FileList && window.Blob) {
       var fileSelected = document.getElementById('txtfiletoread');
       fileSelected.addEventListener('change', function (e) { 
            var fileExtension = /text.*/; 
            var fileTobeRead = fileSelected.files[0];
            if (fileTobeRead.type.match(fileExtension)) { 
                var fileReader = new FileReader(); 
                fileReader.onload = function (e) { 
                    var fileContents = document.getElementById('filecontents'); 
                    inhalt = fileReader.result;
                    console.log(inhalt);
                    fileContents.innerText = fileReader.result; 
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
/*var reader = new FileReader();

readTxt("1Klasse.txt");


function readTxt(file){
    reader.onloadend = function(e) {
        var text = reader.result;
        console.log(text);
        console.log("sa");
    }

    reader.readAsText( new File([""],file));
}*/