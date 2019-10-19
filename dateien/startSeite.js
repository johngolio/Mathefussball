document.getElementById("schueler_zahlen").style.display = "block";
        document.getElementById("schueler_namen").style.display = "none";
document.getElementById("select_1").onchange = function(){
    var selection = document.getElementById("select_1").value;
    if (selection=="1") {
        document.getElementById("schueler_zahlen").style.display = "block";
        document.getElementById("schueler_namen").style.display = "none";
    }else{
        document.getElementById("schueler_zahlen").style.display = "none";
        document.getElementById("schueler_namen").style.display = "block";
    }
};
