import {getCookie, quest, redirectToPage} from "../basic.mjs";

const nextButton = document.getElementById('nextButton');
nextButton.onclick = function () {
    let description = document.getElementById('description').value;
    let belief = document.getElementById('belief').value;
    let significantPerson = document.getElementById('significantPerson').value;
    let significantPlace = document.getElementById('significantPlace').value;
    let valuables = document.getElementById('valuables').value;
    let traits = document.getElementById('traits').value;
    let wounds = document.getElementById('wounds').value;
    let madness = document.getElementById('madness').value;
    let background = document.getElementById('background').value;
    sessionStorage.setItem('description', description);
    sessionStorage.setItem('belief', belief);
    sessionStorage.setItem('significantPerson', significantPerson);
    sessionStorage.setItem('significantPlace', significantPlace);
    sessionStorage.setItem('valuables', valuables);
    sessionStorage.setItem('traits', traits);
    sessionStorage.setItem('wounds', wounds);
    sessionStorage.setItem('madness', madness);
    sessionStorage.setItem('background', background);
    const data = {
        accessToken: getCookie("accessToken"),
        id: getCookie("id"),
        rolename: localStorage.getItem('rolename'),
        nickname: localStorage.getItem('nickname'),
        age: parseInt(localStorage.getItem('age')),
        birthdate: localStorage.getItem('birthdate'),
        birthplace: localStorage.getItem('birthplace'),
        gender: parseInt(localStorage.getItem('gender')),
        occupation: parseInt(localStorage.getItem('occupationId')[6]),
        residence: localStorage.getItem('residence'),
        attributes: JSON.parse(localStorage.getItem(localStorage.getItem('basicAttributionSelection'))),
        description: sessionStorage.getItem('description'),
        belief: sessionStorage.getItem('belief'),
        significantPerson: sessionStorage.getItem('significantPerson'),
        significantPlace: sessionStorage.getItem('significantPlace'),
        valuables: sessionStorage.getItem('valuables'),
        traits: sessionStorage.getItem('traits'),
        wounds: sessionStorage.getItem('wounds'),
        madness: sessionStorage.getItem('madness'),
        background: sessionStorage.getItem('background'),
        skillAdd: sessionStorage.getItem('skillAdd'),
        rule: "COC7th",
    }
    quest(data, 'roleCreate')
        .then((response) => {
            redirectToPage('RoleBase');
        })
        .catch((error) => {
            console.log(error);
        })
}

const lastButton = document.getElementById('lastButton');
lastButton.onclick = function () {
    history.back();
}