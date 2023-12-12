import {getCookie, getOccupations, getSkillList, quest, redirectToPage} from "./basic.mjs";

document.getElementById('createNewRole').onclick = function () {
    redirectToPage('COC7th/RoleCreate_Basic');
}

let occupations, skills, cnt = 0, roleList;
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
            if (result["cnt"] !== cnt) {
                cnt = result["cnt"];
                pageSelect.innerHTML = '';
                for (let i = 0; i < Math.ceil(cnt / limit); i++) {
                    let pageItem = document.createElement('option');
                    pageItem.setAttribute('value', (i + 1) + '');
                    pageItem.setAttribute('class', 'pageSelectItem')
                    pageItem.textContent = (i + 1) + '';
                    if (i * limit === offset) pageItem.selected = true; else pageItem.selected = false;
                    pageSelect.appendChild(pageItem);
                }
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
                    roleBox.style.display = 'block';
                } else {
                    roleBox.style.display = 'none';
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

pageSelect.addEventListener('change', () => {
    refresh();
})

const sortMeue = document.getElementById('sortMeue');
sortMeue.addEventListener('change', () => {
    refresh();
})

const refreshButton = document.getElementById('refreshButton');
refreshButton.onclick = function () {
    refresh();
}

function roleDetail(x) {
    sessionStorage.setItem('roleId', roleList[x]['roleId']);
    redirectToPage('RoleDetail');
}

const roleBoxes = document.querySelectorAll('.roleBox');
roleBoxes.forEach(function(box) {
    box.addEventListener('click', function() {
        if (box.style.display !== 'none') roleDetail(box.id.substring(8));
    });
});