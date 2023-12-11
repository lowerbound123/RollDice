import {getCookie, quest, redirectToPage} from "../basic.mjs";

async function getSkillList() {
    var skillList = JSON.parse(localStorage.getItem("coc7th_skillList"));
    if (skillList == null) {
        var data = {
            accessToken: getCookie("accessToken"),
            id: getCookie('id'),
            rule: 'coc7th'
        }
        await quest(data, 'skillList')
            .then((result) => {
                localStorage.setItem("coc7th_skillList", JSON.stringify(result['skillList']));
                skillList = result['skillList'];
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

async function init_page() {
    await getSkillList();
    const occupationId = localStorage.getItem('occupationId')[6];
    const occupation = await JSON.parse(localStorage.getItem("coc7th_occupationList"))[parseInt(occupationId)];
    const prefix = "skill_id_";
    const skills = await JSON.parse(localStorage.getItem("coc7th_skillList"));
    var skillId;
    var selectBox;
    var optionSkill;
    for (var i = 1; i < 9; i++) {
        skillId = occupation[prefix + i];
        selectBox = document.getElementById('skill_' + i);
        if (skillId[0] === 0) {
            skills.forEach((skill) => {
                optionSkill = document.createElement('option');
                optionSkill.textContent = skill['name'];
                optionSkill.setAttribute('value', skill['id']);
                selectBox.appendChild(optionSkill);
            })
        } else {
            for (let x of skillId) {
                optionSkill = document.createElement('option');
                optionSkill.textContent = skills[x]['name'];
                optionSkill.setAttribute('value', x);
                selectBox.appendChild(optionSkill);
            }
        }
    }
}

init_page();

const nextButton = document.getElementById('nextButton');
nextButton.onclick = function () {
    let vocationalSkills = JSON.parse('[]');
    for (let i = 1; i < 9; i++) {
        let selection = document.getElementById('skill_' + i).value;
        vocationalSkills.push(selection);
    }
    localStorage.setItem("vocationalSkills", vocationalSkills);
    redirectToPage('COC7th/RoleCreate_Skills');
}

const lastButton = document.getElementById('lastButton');
lastButton.onclick = function () {
    history.back();
}