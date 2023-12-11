import {getCookie, quest, redirectToPage} from "./basic.mjs";

document.getElementById('createNewRole').onclick = function () {
    redirectToPage('COC7th/RoleCreate_Basic');
}

async function init_page(ord, limit) {

    const data = {
        id: getCookie("id"),
        accessToken: getCookie("accessToken")

    }
}