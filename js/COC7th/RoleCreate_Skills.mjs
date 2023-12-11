import {getCookie, quest, redirectToPage, getOccupations, getSkillList} from "../basic.mjs";

// 隐藏所有的description
function hideAllDescriptions() {
    var descriptions = document.querySelectorAll('.description');
    descriptions.forEach(function (desc) {
        desc.style.display = 'none';
    });
}

function showDescription(optionId) {
    // 隐藏所有的description
    hideAllDescriptions();

    // 获取对应选项的label
    const label = document.querySelector('label[for=\'' + optionId + '\']');

    // 获取对应选项的description
    const description = document.getElementById('description_' + optionId);

    // 显示description在label的位置
    if (label && description) {
        var labelRect = label.getBoundingClientRect();
        description.style.top = labelRect.bottom + 'px';
        description.style.left = labelRect.left + 'px';
        description.style.display = 'block';
    }
}

let skills, occupations;
var skillAdd = JSON.parse('{}');
let vocationalPoint = 0;
let normalPoint = 0;
let vocationalLimit;
let normalLimit;
const skill_id = JSON.parse('[' + localStorage.getItem('vocationalSkills') + ']');
const restVocationalPoint = document.getElementById('restVocationalPoint');
const restNormalPoint = document.getElementById('restNormalPoint');
const attribute = JSON.parse(localStorage.getItem(localStorage.getItem('basicAttributionSelection')));
async function init_page() {
    skills = await getSkillList();
    occupations = await getOccupations();
    const occupationId = parseInt(localStorage.getItem('occupationId')[6]);
    var cnt = 0;
    const vocationalSkillTable = document.getElementById('vocationalSkills');
    const vocationalRow = vocationalSkillTable.insertRow();
    const normalSkillTable = document.getElementById('normalSkills');
    const descriptions = document.getElementById('descriptions');
    if (occupations[occupationId]['cal'] === 'EDU') {
        vocationalLimit = attribute['EDU'] * 4;
    }
    if (occupations[occupationId]['cal'] === 'EDU+DEX') {
        vocationalLimit = attribute['EDU'] * 2 + attribute['DEX'] * 2;
    }
    if (occupations[occupationId]['cal'] === 'EDU+APP') {
        vocationalLimit = attribute['EDU'] * 2 + attribute['APP'] * 2;
    }
    normalLimit = attribute['INT'] * 2;
    restVocationalPoint.textContent = "职业技能点剩余：" + vocationalLimit;
    restNormalPoint.textContent = "兴趣技能点剩余：" + normalLimit;

    for (let vocational of skill_id) {
        let vocationalCell = vocationalRow.insertCell();
        let skill = skills[vocational - 1];

        let inputItem = document.createElement('input');
        inputItem.setAttribute('id', skill['id']);
        inputItem.setAttribute('placeholder', skill['initial']);
        inputItem.setAttribute('class', 'inputItem');
        inputItem.setAttribute('name', 'skillInput');

        let labelItem = document.createElement('label');
        labelItem.setAttribute('class', 'labelItem');
        labelItem.setAttribute('for', skill['id']);
        labelItem.textContent = skill['name'];

        let description = document.createElement('div');
        description.setAttribute('id', 'description_' + skill['id']);
        description.setAttribute('class', 'description');
        description.innerHTML = skill["description"].replace(/\n/g, "<br>");

        vocationalCell.appendChild(labelItem);
        vocationalCell.appendChild(inputItem);
        descriptions.appendChild(description);
    }
    var normalRow;
    await skills.forEach((skill => {
        if (skill_id.includes(parseInt(skill['id'])) === true) {
            return;
        }
        if (cnt % 8 === 0) {
            normalRow = normalSkillTable.insertRow();
        }
        let normalCell = normalRow.insertCell();

        let inputItem = document.createElement('input');
        inputItem.setAttribute('id', skill['id']);
        inputItem.setAttribute('placeholder', skill['initial']);
        inputItem.setAttribute('class', 'inputItem');
        inputItem.setAttribute('name', 'skillInput');

        let labelItem = document.createElement('label');
        labelItem.setAttribute('class', 'labelItem');
        labelItem.setAttribute('for', skill['id']);
        labelItem.textContent = skill['name'];

        let description = document.createElement('div');
        description.setAttribute('id', 'description_' + skill['id']);
        description.setAttribute('class', 'description');
        description.textContent = skill['description'];

        normalCell.appendChild(labelItem);
        normalCell.appendChild(inputItem);
        descriptions.appendChild(description);
        cnt += 1;
    }))
    const options = document.querySelectorAll('.labelItem');
    options.forEach(element => {
        element.addEventListener('click', function (event) {
            // 阻止事件冒泡
            event.stopPropagation();

            setTimeout(() => {
                showDescription(element.getAttribute('for'));
            }, 0);
        });
    })

    document.addEventListener('click', function (event) {
        const clickedElement = event.target;
        // 如果点击的元素不是description或其内部元素，则隐藏所有description
        if (!clickedElement.closest('.description') && !clickedElement.closest('.inputItem')) {
            hideAllDescriptions();
        }
    });

    const labelItems = document.querySelectorAll('.labelItem');
    const dodgeElement = document.getElementById(
        Array.from(labelItems).find(
            element => element.textContent.trim() === '闪避'
        ).getAttribute('for'));
    dodgeElement.placeholder = Math.floor(attribute['DEX'] / 2);

    const inputs = document.querySelectorAll('input[name="skillInput"]');
    inputs.forEach(element => {
        element.addEventListener('input', function (event) {
            console.log(skillAdd);
            console.log("vocational: ", vocationalPoint, " normal: ", normalPoint);
            console.log(event.target);
            console.log(element.id, element.value);
            let id = element.id;
            if (skillAdd[id] == null) {
                skillAdd[id] = skills[parseInt(id) - 1]['initial'];
            }
            let initial = skills[parseInt(id) - 1]['initial'];
            if (skills[parseInt(id) - 1]['name'] === '闪避') initial = Math.floor(attribute['DEX'] / 2);
            let oldAddPoint = skillAdd[id] - initial;
            if (oldAddPoint < 0) oldAddPoint = 0;
            if (element.value === '') skillAdd[id] = 0; else skillAdd[id] = parseInt(element.value);
            let addPoint = skillAdd[id] - initial;
            if (addPoint < 0) addPoint = 0;
            if (skill_id.includes(parseInt(id))) {
                vocationalPoint += addPoint - oldAddPoint;
            } else {
                normalPoint += addPoint - oldAddPoint;
            }
            let restv, restn;
            if (vocationalPoint > vocationalLimit) {
                restv = 0;
                restn = normalLimit - normalPoint - vocationalPoint + normalLimit;
            } else {
                restv = vocationalLimit - vocationalPoint;
                restn = normalLimit - normalPoint;
            }
            // console.log(skills[parseInt(id) - 1]['name'] + ' ', skills[parseInt(id) - 1]['initial']);
            // console.log("restv: ", restv, " restn: ", restn);
            restVocationalPoint.textContent = "职业技能点剩余：" + restv;
            restNormalPoint.textContent = "兴趣技能点剩余：" + restn;
        })
    })
}

init_page();

const nextButton = document.getElementById('nextButton');
nextButton.onclick = function () {
    sessionStorage.setItem("skillAdd", JSON.stringify(skillAdd));
    redirectToPage('COC7th/RoleCreate_Detail');
}

const lastButton = document.getElementById('lastButton');
lastButton.onclick = function () {
    history.back();
}