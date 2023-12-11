import {redirectToPage} from "../basic.mjs";

function get_information() {
    const textEncoder = new TextEncoder();
    const rolename = document.getElementById('rolename').value;
    const nickname = document.getElementById('nickname').value;
    const birthdate = document.getElementById('birthdate').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const birthplace = document.getElementById('birthplace').value;
    const residence = document.getElementById('residence').value;
    if (textEncoder.encode(rolename).length > 40 || rolename.length === 0) {
        localStorage.setItem('Info', '姓名仅能包含至多40个字节，3秒后返回');
        localStorage.setItem('Info_next', 'back');
        redirectToPage('Info');
        return 1;
    }
    let reg = /^[a-zA-Z]{1,6}$/;
    if (!reg.test(nickname) || nickname.length === 0) {
        localStorage.setItem('Info', '昵称仅能包含1-6个英文字母，3秒后返回');
        localStorage.setItem('Info_next', 'back');
        redirectToPage('Info');
        return 1;
    }

    reg = /^\d{4}-\d{2}-\d{2}$/
    if (!reg.test(birthdate) || birthdate.length === 0) {
        localStorage.setItem('Info', '出生日期应为yyyy-mm-dd格式，3秒后返回');
        localStorage.setItem('Info_next', 'back');
        redirectToPage('Info');
        return 1;
    }

    reg = /^\d{0,8}$/
    if (!reg.test(age) || age.length === 0) {
        localStorage.setItem('Info', '年龄应该是一个数字，3秒后返回');
        localStorage.setItem('Info_next', 'back');
        redirectToPage('Info');
        return 1;
    }

    if (!(gender === '男' || gender === '女')) {
        localStorage.setItem('Info', '性别应该是\'男\'或\'女\'');
        localStorage.setItem('Info_next', 'back');
        redirectToPage('Info');
        return 1;
    }

    if (textEncoder.encode(birthplace).length > 30) {
        localStorage.setItem('Info', '出生地仅能包含至多30个字节，3秒后返回');
        localStorage.setItem('Info_next', 'back');
        redirectToPage('Info');
        return 1;
    }

    if (textEncoder.encode(residence).length > 30) {
        localStorage.setItem('Info', '出生地仅能包含至多30个字节，3秒后返回');
        localStorage.setItem('Info_next', 'back');
        redirectToPage('Info');
        return 1;
    }

    localStorage.setItem('rolename', rolename);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('birthdate', birthdate);
    localStorage.setItem('gender', gender === '男' ? 1 : 2);
    localStorage.setItem('age', age);
    localStorage.setItem('birthplace', birthplace);
    localStorage.setItem('residence', residence);
    return 0;
}

const nextButton = document.getElementById("nextButton");
nextButton.onclick = function () {
    if (get_information() !== 0) return;
    setTimeout(() => {
        redirectToPage('COC7th/random3');
    }, 100);

}

