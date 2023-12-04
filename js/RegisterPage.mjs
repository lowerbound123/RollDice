import {quest, redirectToPage, hashPassword} from './basic.mjs';

async function register() {
    const username = document.getElementById('username').value;
    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const hash = await hashPassword(password);
    console.log(hash);
    const data = {
        username: username,
        nickname: nickname,
        sha: hash,
        email: email,
    }
    quest(data, 'register')
        .then(function (result) {
            switch (result["status"]) {
                case 0:
                    localStorage.setItem("Info", "注册成功，3秒后前往主页面，注意，您需要<strong>重新登录</strong>");
                    localStorage.setItem("Info_next", "Index");
                    redirectToPage("Info");
                    break;
                case 1:
                    localStorage.setItem("Info", "用户名重复，3秒后返回");
                    localStorage.setItem("Info_next", "back");
                    redirectToPage("Info");
                    break;
            }
        })
        .catch(function (error) {
            console.log("Error: ", error);
        })
}
// register的option code 1

const registerButton = document.getElementById("registerButton");
registerButton.onclick = function () {
    register();
}
