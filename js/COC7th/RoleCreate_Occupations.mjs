import {getCookie, quest, redirectToPage} from "../basic.mjs";

function showDescription(optionId) {
    // 隐藏所有的description
    hideAllDescriptions();

    // 获取对应选项的label
    const label = document.querySelector('label[for=' + optionId + ']');

    // 获取对应选项的description
    const description = document.getElementById('description' + optionId);

    // 显示description在label的位置
    if (label && description) {
        var labelRect = label.getBoundingClientRect();
        description.style.top = labelRect.bottom + 'px';
        description.style.left = labelRect.left + 'px';
        description.style.display = 'block';
    }
}

// 隐藏所有的description
function hideAllDescriptions() {
    var descriptions = document.querySelectorAll('.description');
    descriptions.forEach(function (desc) {
        desc.style.display = 'none';
    });
}

async function get_occupations() {
    if (localStorage.getItem('coc7th_occupationList') == null) {
        var data = {};
        data["accessToken"] = getCookie("accessToken");
        data["id"] = getCookie("id");
        data["rule"] = "COC7th"
        await quest(data, 'occupationList')
            .then((result) => {
                localStorage.setItem('coc7th_occupationList', JSON.stringify(result['occupationList']));
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const occupations = JSON.parse(localStorage.getItem('coc7th_occupationList'));
    const table = document.getElementById('selectionTable');
    const description = document.getElementById('descriptions')
    var cnt = 0;
    var row, cell;
    occupations.forEach(item => {
        if (cnt % 8 === 0) {
            row = table.insertRow();
        }
        // 创建input元素
        const inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'radio');
        inputElement.setAttribute('name', 'options');
        inputElement.setAttribute('id', "Option" + item["id"]);
        // 创建label元素
        const labelElement = document.createElement('label');
        labelElement.setAttribute('for', 'Option' + item["id"]);
        labelElement.setAttribute('class', 'occupationLabel');
        labelElement.textContent = item["name"];
        //将元素插入表格
        cell = row.insertCell(cnt % 8);
        cell.appendChild(inputElement);
        cell.appendChild(labelElement)

        //创建description元素
        const descriptionElement = document.createElement('div');
        descriptionElement.setAttribute('id', 'descriptionOption' + item["id"]);
        descriptionElement.setAttribute('class', 'description');
        descriptionElement.innerHTML = item["description"].replace(/\n/g, "<br>");
        description.appendChild(descriptionElement);

        cnt += 1;
    })
}

async function init_page() {
    await get_occupations();
    document.addEventListener('click', function (event) {
        var clickedElement = event.target;

        // 如果点击的元素不是description或其内部元素，则隐藏所有description
        if (!clickedElement.closest('.description')) {
            hideAllDescriptions();
        }
    });

    const options = document.querySelectorAll("[name='options']");
    options.forEach(element => {
        element.addEventListener('click', function (event) {
            // 阻止事件冒泡
            event.stopPropagation();
            showDescription(element.id);
        });
    })
}
init_page();

const nextButton = document.getElementById('nextButton');
nextButton.onclick = function () {
    const options = document.querySelectorAll('input[name="options"][type="radio"]');

    let selectedOptionValue = null;

    // 遍历所有单选按钮
    options.forEach(option => {
        // 检查哪个单选按钮被选中
        if (option.checked) {
            // 获取选中的单选按钮的值
            selectedOptionValue = option.id;
        }
    });
    if (selectedOptionValue == null) {
        localStorage.setItem("Info", "请选择一个职业，3秒后返回");
        localStorage.setItem("Info_next", "back");
        redirectToPage("Info");
        return;
    }
    localStorage.setItem("occupationId", selectedOptionValue);
    redirectToPage('COC7th/RoleCreate_VocationalSkills');
}

const lastButton = document.getElementById('lastButton');
lastButton.onclick = function () {
    history.back();
}