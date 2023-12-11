import {getCookie, getOccupations, getSkillList, quest, redirectToPage} from "./basic.mjs";

document.getElementById('createNewRole').onclick = function () {
    redirectToPage('COC7th/RoleCreate_Basic');
}

let occupations, skills, cnt, roleList;
const pageSelect = document.getElementById('pageSelect');
async function refresh() {
    let limit = document.getElementById('showNum').value;
    let ord = document.getElementById('sortMeue').value;
    let offset = (pageSelect.value - 1) * limit;
    const data = {
        id: getCookie("id"),
        accessToken: getCookie("accessToken"),
        ord: ord,
        limit: parseInt(limit),
        offset: parseInt(offset)
    }
    quest(data, 'roleList')
        .then((result) => {
            cnt = result["cnt"];
            for (let i = 1; i < Math.ceil(cnt / limit); i++) {
                let pageItem = document.createElement('option');
                pageItem.setAttribute('value', (i + 1) + '');
                pageItem.setAttribute('class', 'pageSelectItem')
                pageSelect.appendChild(pageItem);
            }
            roleList = result['roleList'];
            for (let i = 1; i <= 20; i++) {
                let roleBox = document.getElementById('roleBox_' + i);
                roleBox.innerHTML = '';
                let role = result['roleList'][i - 1]
                if (role != null) {
                    let item = document.createElement('p');
                    item.textContent = role['rolename'] + '(' + role['nickname'] + ')';
                    item.textContent += occupations[role['occupationId'] - 1]['name'];
                    item.setAttribute('class', 'innerText');
                    roleBox.appendChild(item);
                    item = document.createElement('table');
                    item.setAttribute('class', 'innerText skillText');
                    let count = 0, row, cell;
                    for (const key in role['skill']) {
                        if (count % 3 === 0) row = item.insertRow();
                        row.insertCell().textContent = skills[parseInt(key) - 1]['name'];
                        row.insertCell().textContent = role['skill'][key];
                        count++;
                    }
                    roleBox.appendChild(item);
                    item = document.createElement('p');
                    item.setAttribute('class', 'innerText');
                    item.textContent = role['background'];
                    roleBox.appendChild(item);
                }
            }

        })
}

async function init_page() {
    occupations = await getOccupations();
    skills = await getSkillList()
    refresh()
}

init_page();