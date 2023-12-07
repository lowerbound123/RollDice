import {calculateDice, redirectToPage, renewCookie} from "../basic.mjs";

function get_attributes() {
    var data = {
        STR: calculateDice("3d6") * 5,
        CON: calculateDice("3d6") * 5,
        SIZ: calculateDice("2d6+6") * 5,
        DEX: calculateDice("3d6") * 5,
        APP: calculateDice("3d6") * 5,
        EDU: calculateDice("2d6+6") * 5,
        INT: calculateDice("2d6+6") * 5,
        POW: calculateDice("3d6") * 5,
        LUC: calculateDice("3d6") * 5
    }
    data["HP"] = Math.floor((data["SIZ"] + data["CON"]) / 10);
    var db = data["STR"] + data["SIZ"];
    if (db < 65) db = -2; else {
        if (db < 85) db = -1; else {
            if (db < 125) db = 0; else {
                if (db < 165) db = 1; else {
                    if (db < 205) db = 2; else {
                        db = Math.ceil((db - 204) / 80) + 1;
                        // db = "+" + db + "d6";
                    }
                }
            }
        }
    }
    data["Build"] = db;
    if (data["STR"] < data["SIZ"] && data["DEX"] < data["SIZ"]) data["MOV"] = 7;
    else if (data["STR"] > data["SIZ"] && data["DEX"] > data["SIZ"]) data["MOV"] = 8;
    else data["MOV"] = 8;
    if (localStorage.getItem("age") != null && localStorage.getItem("age") >= 40) data["MOV"] -= 1;
    if (localStorage.getItem("age") != null && localStorage.getItem("age") >= 50) data["MOV"] -= 1;
    return data;
}

function convert_to_html(data) {
    var strbegin = "<p class='basicAttribute'>";
    var strend = "</p>";
    var ans = "";
    var cnt = 0;
    for (var key in data) {
        ans += strbegin + key + " = " + data[key] + strend;
        cnt += 1;
        if (cnt % 3 === 0) ans += "<br>";
    }
    return ans;
}

function random3() {
    var att1 = get_attributes();
    var att2 = get_attributes();
    var att3 = get_attributes();
    localStorage.setItem("basicAttributions_1", att1);
    localStorage.setItem("basicAttributions_2", att2);
    localStorage.setItem("basicAttributions_3", att3);
    const selectionBox_1 = document.getElementById("basicAttributions_1");
    const selectionBox_2 = document.getElementById("basicAttributions_2");
    const selectionBox_3 = document.getElementById("basicAttributions_3");
    selectionBox_1.innerHTML = convert_to_html(att1);
    selectionBox_2.innerHTML = convert_to_html(att2);
    selectionBox_3.innerHTML = convert_to_html(att3);
}

random3();

const selections = document.querySelectorAll('.selectionBox');
selections.forEach((div) => {
    div.addEventListener('click', () => {
        selections.forEach((otherDiv) => {
            otherDiv.classList.remove('selected');
        })
        div.classList.add('selected');
        localStorage.setItem('basicAttributionSelection', div);
    })
})

document.getElementById("lastButton").onclick = function () {history.back();}
document.getElementById("nextButton").onclick = function () {
    redirectToPage("COC7th_OccupationSelect");
}