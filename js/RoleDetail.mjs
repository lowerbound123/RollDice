import {getCookie, getOccupations, getSkillList, quest} from "./basic.mjs";

let skills, occupations, roleId;
let basicDetailTable = document.getElementById('basicDetailTable');
let skillDetailTable = document.getElementById('skillDetailTable');
let descriptionDetailTable = document.getElementById('descriptionDetailTable');
async function init_page() {
    skills = await getSkillList();
    occupations = await getOccupations();
    roleId = parseInt(sessionStorage.getItem('roleId'));
    let data = {
        accessToken: getCookie('accessToken'),
        id: getCookie('id'),
        roleId: roleId,
        rule: 'coc7th'
    }
    quest(data, 'queryRole')
        .then((result) => {
            document.getElementById('titleWord').textContent = result['rolename'];

            let row = basicDetailTable.insertRow();
            row.insertCell().textContent = "角色名";
            row.insertCell().textContent = result['rolename'];
            row.insertCell().textContent = "缩略名";
            row.insertCell().textContent = result['nickname'];
            row.insertCell().textContent = "职业";
            row.insertCell().textContent = occupations[result['occupationId'] - 1]['name'];
            row.insertCell().textContent = "生日";
            row.insertCell().textContent = result['birthday'].substring(0, 10);
            row = basicDetailTable.insertRow();
            row.insertCell().textContent = "年龄";
            row.insertCell().textContent = result['age'];
            row.insertCell().textContent = "性别";
            row.insertCell().textContent = result['gender'];
            row.insertCell().textContent = "住所";
            row.insertCell().textContent = result['residence'];
            row.insertCell().textContent = "出身";
            row.insertCell().textContent = result['birthplace'];
            row = basicDetailTable.insertRow();
            row.insertCell().textContent = "力量";
            row.insertCell().textContent = result['strength'];
            row.insertCell().textContent = "体质";
            row.insertCell().textContent = result['constitution'];
            row.insertCell().textContent = "体型";
            row.insertCell().textContent = result['size'];
            row.insertCell().textContent = "敏捷";
            row.insertCell().textContent = result['dexterity'];
            row = basicDetailTable.insertRow();
            row.insertCell().textContent = "外貌";
            row.insertCell().textContent = result['appearance'];
            row.insertCell().textContent = "教育";
            row.insertCell().textContent = result['education'];
            row.insertCell().textContent = "智力";
            row.insertCell().textContent = result['intelligence'];
            row.insertCell().textContent = "意志";
            row.insertCell().textContent = result['power'];
            row = basicDetailTable.insertRow();
            row.insertCell().textContent = "HP";
            row.insertCell().textContent = Math.floor((result['size'] + result['constitution']) / 10);
            row.insertCell().textContent = "MP";
            row.insertCell().textContent = result['power'] / 5;
            row.insertCell().textContent = "SAN";
            row.insertCell().textContent = result['power'];
            row.insertCell().textContent = "Lucky";
            row.insertCell().textContent = result['lucky'];

            let cnt = 0;
            result['skillList'].forEach((skill) => {
                if (cnt % 6 === 0) {
                    row = skillDetailTable.insertRow();
                }
                row.insertCell().textContent = skills[skill['skillId'] - 1]['name'];
                row.insertCell().textContent = skill['skillPoint'];
                cnt++;
            })

            row = descriptionDetailTable.insertRow();
            row.insertCell().textContent = "形象描述";
            row.insertCell().textContent = "思想与信念";
            row.insertCell().textContent = "重要之人";
            row.insertCell().textContent = "意义非凡之地";

            row = descriptionDetailTable.insertRow();
            row.insertCell().textContent = result['description'];
            row.insertCell().textContent = result['belief'];
            row.insertCell().textContent = result['significantPerson'];
            row.insertCell().textContent = result['significantPlace'];

            row = descriptionDetailTable.insertRow();
            row.insertCell().textContent = "宝贵之物";
            row.insertCell().textContent = "特质";
            row.insertCell().textContent = "创伤和疤痕";
            row.insertCell().textContent = "恐惧症和躁狂症";

            row = descriptionDetailTable.insertRow();
            row.insertCell().textContent = result['valuables'];
            row.insertCell().textContent = result['traits'];
            row.insertCell().textContent = result['wounds'];
            row.insertCell().textContent = result['madness'];

            document.getElementById('background').textContent = result['background'];
        })
}
init_page();