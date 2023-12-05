export function redirectToPage(x) {
    // var currentPath = window.location.pathname;
    // console.log(currentPath);
    const prefix = "/RollDice";
    switch (x) {
        case "RoleBase":
            window.location.href = prefix + "/html/RoleBase.html";
            break;
        case "ItemBase":
            window.location.href = prefix + "/html/ItemBase.html";
            break;
        case "GameBase":
            window.location.href = prefix + "/html/GameBase.html";
            break;
        case "Settings":
            break;

        case "SimpleRoll":
            window.location.href = prefix + "/html/SimpleRoll.html";
            break;
        case "Readme":
            break;

        case "LoginPage":
            window.location.href = prefix + "/html/LoginPage.html";
            break;
        case "RegisterPage":
            window.location.href = prefix + "/html/RegisterPage.html";
            break;
        case "Info":
            window.location.href = prefix + "/html/Info.html";
            break;
        case "Index":
            window.location.href = prefix + "/index.html";
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
        xhr.open('post', 'https://dyzyx.asuscomm.com:8000/' + opt, true);
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

export async function renewCookie(name, val) {
    var currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + (21600 * 1000 * 60));
    document.cookie = name + "=" + val + "; expires=" + currentDate.toUTCString() + "; path=/";
}

export function getCookie(name) {
    var cookieValue = null;
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');

    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();

        // 判断 Cookie 名称是否匹配
        if (cookie.indexOf(name + '=') === 0) {
            // 获取并返回 Cookie 的值
            cookieValue = cookie.substring(name.length + 1, cookie.length);
            break;
        }
    }

    return cookieValue;
}

export function clearAllCookie() {
    var date=new Date();
    date.setTime(date.getTime()-10000);
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i =  keys.length; i--;)
            document.cookie=keys[i]+"=0; expire="+date.toGMTString()+"; path=/";
    }
}

export async function checkAccessToken() {
    const token = getCookie("accessToken");
    const id = getCookie("id");
    const data = {
        id: id,
        accessToken: token
    }
    var ans = 0;
    await quest(data, 'check')
        .then(function (result) {
            console.log(result);
            ans = result["status"];
            if (ans != 0) {
                localStorage.clear();
                clearAllCookie();
            }
            if (ans == 0) {
                localStorage.setItem("nickname", result["nickname"]);
            }
        })
        .catch(function (error) {
            console.log("Check Error: ", error);
        })
    return ans;
}