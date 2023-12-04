export function redirectToPage(x) {
    // var currentPath = window.location.pathname;
    // console.log(currentPath);
    switch (x) {
        case "RoleBase":
            window.location.href = "/html/RoleBase.html";
            break;
        case "ItemBase":
            window.location.href = "/html/ItemBase.html";
            break;
        case "GameBase":
            window.location.href = "/html/GameBase.html";
            break;
        case "Settings":
            break;

        case "SimpleRoll":
            window.location.href = "/html/SimpleRoll.html";
            break;
        case "Readme":
            break;

        case "LoginPage":
            window.location.href = "/html/LoginPage.html";
            break;
        case "RegisterPage":
            window.location.href = "/html/RegisterPage.html";
            break;
        case "Info":
            window.location.href = "/html/Info.html";
            break;
        case "Index":
            window.location.href = "/index.html";
            break;
    }
}

export async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    try {
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    } catch(error) {
        console.log("SHA-256 error: " + error);
        throw error;
    }
}

export function quest(data, opt) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', 'http://dyzyx.asuscomm.com:8002/' + opt, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // 请求成功，解析响应的 JSON 数据并通过 resolve 返回
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    // 请求失败，通过 reject 返回错误信息
                    reject(new Error('请求失败，状态码: ' + xhr.status));
                }
            }
        };
        xhr.send(JSON.stringify(data));
    });
}

export async function renewAccessToken(token) {
    var currentDate = new Date();
    currentDate.setDate(currentDate + 15);
    document.cookie = "accessToken=" + token + "; expires=" + currentDate.toUTCString() + "; path=/";
}