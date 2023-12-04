import {redirectToPage} from "./basic.mjs";

const RegisterButton = document.getElementById("RegisterPage");
RegisterButton.onclick = function () {
    redirectToPage("RegisterPage");
}

const LoginButton = document.getElementById("LoginPage");
LoginButton.onclick = function () {
    redirectToPage("LoginPage");
}

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


