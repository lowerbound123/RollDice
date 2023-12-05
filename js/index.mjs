import {checkAccessToken, redirectToPage, clearAllCookie} from "./basic.mjs";

const RoleBaseButton = document.getElementById("RoleBase");
RoleBaseButton.onclick = function () {
    redirectToPage("RoleBase");
}

const ItemBaseButton = document.getElementById("ItemBase");
ItemBaseButton.onclick = function () {
    redirectToPage("ItemBase");
}

const SettingButton = document.getElementById("Settings");
SettingButton.onclick = function () {
    redirectToPage("Settings");
}

const GameBaseButton = document.getElementById("GameBase");
GameBaseButton.onclick = function () {
    redirectToPage("GameBase");
}

const SimpleRollButton = document.getElementById("SimpleRoll");
SimpleRollButton.onclick = function () {
    redirectToPage("SimpleRoll");
}

const ReadmeButton = document.getElementById("Readme");
ReadmeButton.onclick = function () {
    redirectToPage("Readme");
}

// import {checkAccessToken, redirectToPage, clearAllCookie} from "./js/basic.mjs";
checkAccessToken()
    .then(function (result) {
        if (result == 0) {
            document.getElementById("loginField").innerHTML = "<p>用户" + localStorage.getItem("nickname") + "欢迎您！<button id='logoutButton'>注销</button></p>";
            const LogoutButton = document.getElementById("logoutButton");
            LogoutButton.onclick = function () {
                clearAllCookie();
                redirectToPage("Index");
            }
        } else {
            document.getElementById("loginField").innerHTML = "<button id=\"LoginPage\">登入</button>\n" + "<button id=\"RegisterPage\">注册</button>"
            const RegisterButton = document.getElementById("RegisterPage");
            RegisterButton.onclick = function () {
                redirectToPage("RegisterPage");
            }

            const LoginButton = document.getElementById("LoginPage");
            LoginButton.onclick = function () {
                redirectToPage("LoginPage");
            }
        }
    })
