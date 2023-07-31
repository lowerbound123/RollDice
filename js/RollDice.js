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
// 计算ndm

function get_element_int(s) {
	ans = document.getElementById(s).value;
	if (ans == "") return parseInt(0);
	return parseInt(ans);
}

function CalculateDice(s) {
	// console.log("begin CalculateDice");
	// console.log(s.length);
	var n = 0;
	var number = new Array();
	var option = new Array();
	number[0] = 0;
	option[0] = 0;
	for (var i = 0; i < s.length; i++) {
		if (s[i] <= '9' && s[i] >= '0') number[n] = number[n] * 10 + parseInt(s[i] + "");
		if (s[i] == 'd' || s[i] == 'D') option[n] = 2, n++, number[n] = 0;
		if (s[i] == '+') option[n] = 1, n++, number[n] = 0;
		if (s[i] == '-') option[n] = 3, n++, number[n] = 0;
		// if (s[i] == '*') option[n] = 4, n++, number[n] = 0;
		// if (s[i] == '/') option[n] = 5, n++, number[n] = 0;
	}
	// console.log("finished for 1");
	option[n] = 0;
	// for (var i = 0; i <= n; i++) console.log(number[i]);
	// for (var i = 0; i <= n; i++) console.log(option[i]);

	for (var i = 0; i <= n; i++) {
		if (option[i] == 2) {
			number[i + 1] = ndm(number[i], number[i + 1]);
			number[i] = 0;
		}
	}
	
	var ans = number[0];
	var opt = 1;
	for (var i = 1; i <= n; i++) {
		if (option[i - 1] == 1) opt = 1;
		if (option[i - 1] == 3) opt = 3;
		if (opt == 1) ans += number[i];
		if (opt == 3) ans -= number[i];
	}
	return ans;
}

function AnyDice(s) {
	var text;
	// 获取 id="numb" 的值
	// s = document.getElementById("numb").value;
	text = CalculateDice(s) + "";
	document.getElementById("Output").innerHTML += "<p style = \"margin:5px\">" + s + " = " + text + "</p>\n";
	document.getElementById("Output").scrollTop = document.getElementById("Output").scrollHeight
}

function SanCheck() {
	var s = document.getElementById("san").value;
	var win = document.getElementById("sanlost_win").value;
	var lost = document.getElementById("sanlost_lost").value;
	var text, diceans, sanlost;
	diceans = CalculateDice("1d100");
	
	if (diceans > s) {
		text = "<p style = \"margin:5px\">1d100 = " + diceans + "\r and you failed</p>\n";
		sanlost = CalculateDice(lost);
		text += "<p style = \"margin:5px\">and you lost " + win + " = " + CalculateDice(win) + " Sanity</p>\n";
		
	} else {
		text = "<p style = \"margin:5px\">1d100 = " + diceans + " and you succeed</p>\n";
		sanlost = CalculateDice(win);
		text += "<p style = \"margin:5px\">and you lost " + lost + " = " + CalculateDice(win) + " Sanity</p>\n";
	}

	if (sanlost > 5) text += "<p style = \"margin:5px\">Sadly you fell into madness.</p>\n";
	if (sanlost >= s) text += "<p style = \"margin:5px\">You die</p>\n"
	document.getElementById("Output").innerHTML += text;
	document.getElementById("san").value = (s - sanlost) + "";
	document.getElementById("Output").scrollTop = document.getElementById("Output").scrollHeight
}

function add(s) {
	var v = parseInt(document.getElementById(s).value);
	v += 1;
	if (v > 99) v = 99;
	
	if (s == "HP") {
		var top = (get_element_int("SIZ") + get_element_int("CON")) / 10;
		if (top != 0 && v > top) v = top; 
	}
	
	if (s == "MP") {
		var top = get_element_int("POW") / 5
		if (top != 0 && v > top) v = top; 
	}
	
	document.getElementById(s).value = v + "";
}

function dec(s) {
	var v = parseInt(document.getElementById(s).value);
	v -= 1;
	
	if (v == -1) {
		// document.getElementById("Output").innerHTML += "<p style = \"margin:5px\">Dec Error</p>\n";
		// document.getElementById("Output").scrollTop = document.getElementById("Output").scrollHeight;
		return;
	}
	
	document.getElementById(s).value = v + "";
}

function check(s) {
	var value = parseInt(document.getElementById(s).value);
	roll = CalculateDice("1d100")
	var text = "<p style = \"margin:5px\">" + s + " check:1d100=" + roll;
	if (roll > value) text += ">" + value; else text += "<" + value;
	if ((value < 50 && roll >= 96) || (value >= 50 && roll >= 100)) text += " Fumble</p>\n";
	if ((value < 50 && roll <= 1) || (value >= 50 && roll <= 5)) text += " Criticle</p>\n";
	if (!text.endsWith("</p>\n") && roll > value) text += " Failure</p>\n";
	if (!text.endsWith("</p>\n") && roll <= value / 5) text += " Extreme success</p>\n";
	if (!text.endsWith("</p>\n") && roll <= value / 2) text += " Hard success</p>\n";
	if (!text.endsWith("</p>\n") && roll <= value) text += " Regular success</p>\n";
	document.getElementById("Output").innerHTML += text;
	document.getElementById("Output").scrollTop = document.getElementById("Output").scrollHeight;
}

function checkwithname(s1, s2) {
	var value = parseInt(document.getElementById(s1).value);
	var name = document.getElementById(s2).value
	roll = CalculateDice("1d100")
	var text = "<p style = \"margin:5px\">" + name + " check:1d100=" + roll;
	if (roll > value) text += ">" + value; else text += "<" + value;
	if ((value < 50 && roll >= 96) || (value >= 50 && roll >= 100)) text += " Fumble</p>\n";
	if ((value < 50 && roll <= 1) || (value >= 50 && roll <= 5)) text += " Criticle</p>\n";
	if (!text.endsWith("</p>\n") && roll > value) text += " Failure</p>\n";
	if (!text.endsWith("</p>\n") && roll <= value / 5) text += " Extreme success</p>\n";
	if (!text.endsWith("</p>\n") && roll <= value / 2) text += " Hard success</p>\n";
	if (!text.endsWith("</p>\n") && roll <= value) text += " Regular success</p>\n";
	document.getElementById("Output").innerHTML += text;
	document.getElementById("Output").scrollTop = document.getElementById("Output").scrollHeight;
	
}

// function clearAllCookies() {
//   var cookies = document.cookie.split(";");

//   for (var i = 0; i < cookies.length; i++) {
//     var cookie = cookies[i];
//     var eqPos = cookie.indexOf("=");
//     var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//     document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//   }
// }

function save() {
	// clearAllCookies();
	var inputs = document.getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++) {
		var cookie_value = encodeURIComponent(inputs[i].value)
		document.cookie = inputs[i].id + "=" + cookie_value;
	}
}

function load() {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i].trim().split("=")
		var cookie_name = cookie[0]
		var cookie_value = decodeURIComponent(cookie[1]);
		document.getElementById(cookie_name).value = cookie_value;
	}
}