import {quest, redirectToPage, hashPassword, renewCookie} from './basic.mjs';

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const hash = await hashPassword(password);
    console.log(hash);
    const data = {
        username: username,
        sha: hash,
    };
    quest(data, 'login')
        .then(function (result) {
            console.log(result);
            switch (result["status"]) {
                case 0:
                    renewCookie("accessToken", result["accessToken"]);
                    renewCookie("id", result["id"]);
                    localStorage.setItem("Info", "登录成功，3秒后前往主页面");
                    localStorage.setItem("Info_next", "Index");
                    redirectToPage("Info");
                    break;
                case 2:
                    localStorage.setItem("Info", "登录失败，不存在该用户，3秒后返回");
                    localStorage.setItem("Info_next", "back");
                    redirectToPage("Info");
                    break;
                case 3:
                    localStorage.setItem("Info", "登录失败，密码错误，3秒后返回");
                    localStorage.setItem("Info_next", "back");
                    redirectToPage("Info");
                    break;
            }
        })
}

const loginButton = document.getElementById("loginButton");
loginButton.onclick = function () {
    login()
}

const registerButton = document.getElementById("registerButton");
registerButton.onclick = function () {
    redirectToPage("RegisterPage");
}