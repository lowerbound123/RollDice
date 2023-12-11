function redirectToPage(x) {
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
        case "COC7th/RoleCreate_Basic":
            window.location.href = prefix + "/html/COC7th/RoleCreate_Basic.html";
            break
        case "COC7th/random3":
            window.location.href = prefix + "/html/COC7th/RoleCreate_Random3.html";
            break;
        case "COC7th/RoleCreate_Occupations":
            window.location.href = prefix + "/html/COC7th/RoleCreate_Occupations.html";
            break;
        case "COC7th/RoleCreate_VocationalSkills":
            window.location.href = prefix + "/html/COC7th/RoleCreate_VocationalSkills.html";
            break;
        case "COC7th/RoleCreate_Skills":
            window.location.href = prefix + "/html/COC7th/RoleCreate_Skills.html";
            break;
        case "COC7th/RoleCreate_Detail":
            window .location.href = prefix + "/html/COC7th/RoleCreate_Detail.html";
            break;
    }
}

async function hashPassword(password) {
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

function quest(data, opt) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', 'https://dyzyx.asuscomm.com:8000/' + opt, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.withCredentials = true;
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

async function renewCookie(name, val) {
    var currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + (21600 * 1000 * 60));
    document.cookie = name + "=" + val + "; expires=" + currentDate.toUTCString() + "; path=/";
}

function getCookie(name) {
    var cookieValue = "";
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

function clearAllCookie() {
    var date=new Date();
    date.setTime(date.getTime()-10000);
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i =  keys.length; i--;)
            document.cookie=keys[i]+"=0; expire="+date.toGMTString()+"; path=/";
    }
}

async function checkAccessToken() {
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

function rand(n) {
    // console.log("begin rand");
    // console.log(n);
    var ans = Math.floor(998244353 * Math.random());
    ans = parseInt(ans);
    // console.log(ans % n);
    // console.log("end rand");
    return (ans % n) + 1;
}
// 获取一个[1, n]的随机数

function ndm(n, m) {
    // console.log("begin ndm");
    var ans = 0;
    for (var i = 0; i < n; i++) ans += rand(m);
    // console.log(ans);
    // console.log("end ndm");
    return ans;

}

function calculateDice(s) {
    var n = 0;
    var number = [];
    var option = [];
    number[0] = 0;
    option[0] = 0;
    for (var i = 0; i < s.length; i++) {
        if (s[i] <= '9' && s[i] >= '0') number[n] = number[n] * 10 + parseInt(s[i] + "");
        if (s[i] === 'd' || s[i] === 'D') option[n] = 2, n++, number[n] = 0;
        if (s[i] === '+') option[n] = 1, n++, number[n] = 0;
        if (s[i] === '-') option[n] = 3, n++, number[n] = 0;
    }
    option[n] = 0;

    for (var i = 0; i <= n; i++) {
        if (option[i] === 2) {
            number[i + 1] = ndm(number[i], number[i + 1]);
            number[i] = 0;
        }
    }

    var ans = number[0];
    var opt = 1;
    for (var i = 1; i <= n; i++) {
        if (option[i - 1] === 1) opt = 1;
        if (option[i - 1] === 3) opt = 3;
        if (opt === 1) ans += number[i];
        if (opt === 3) ans -= number[i];
    }
    return ans;
}

async function getSkillList() {
    var skillList = JSON.parse(localStorage.getItem("coc7th_skillList"));
    if (skillList == null) {
        var data = {
            accessToken: getCookie("accessToken"),
            id: getCookie('id'),
            rule: 'coc7th'
        }
        await quest(data, 'skillList')
            .then((result) => {
                localStorage.setItem("coc7th_skillList", JSON.stringify(result['skillList']));
                skillList = result['skillList'];
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return skillList;
}

async function getOccupations() {
    var occupations = JSON.parse(localStorage.getItem('coc7th_occupationList'));
    if (occupations == null) {
        var data = {};
        data["accessToken"] = getCookie("accessToken");
        data["id"] = getCookie("id");
        data["rule"] = "COC7th"
        await quest(data, 'occupationList')
            .then((result) => {
                localStorage.setItem('coc7th_occupationList', JSON.stringify(result['occupationList']));
                occupations = result['occupationList'];
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return occupations;
}

export {
    redirectToPage,
    hashPassword,
    quest,
    clearAllCookie,
    renewCookie,
    checkAccessToken,
    getCookie,
    calculateDice,
    getSkillList,
    getOccupations,
};