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
		if (s[i] == 'd') option[n] = 2, n++, number[n] = 0;
		if (s[i] == '+') option[n] = 1, n++, number[n] = 0;
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
	var ans = 0;
	for (var i = 0; i <= n; i++) ans += number[i];
	return ans;
}

function AnyDice(s) {
	var text;
	// 获取 id="numb" 的值
	// s = document.getElementById("numb").value;
	text = CalculateDice(s) + "";
	document.getElementById("Output").innerHTML += "<p style = \"margin:5px\">" + s + " = " + text + "</p>";
	document.getElementById("Output").scrollTop = document.getElementById("Output").scrollHeight
}

function SanCheck() {
	var s = document.getElementById("san").value;
	var win = document.getElementById("sanlost_win").value;
	var lost = document.getElementById("sanlost_lost").value;
	var text, diceans, sanlost;
	diceans = CalculateDice("1d100");
	
	if (diceans > s) {
		text = "<p style = \"margin:5px\">1d100 = " + diceans + "\r and you failed</p>";
		sanlost = CalculateDice(lost);
		text += "<p style = \"margin:5px\">and you lost " + win + " = " + CalculateDice(win) + " Sanity</p>";
		
	} else {
		text = "<p style = \"margin:5px\">1d100 = " + diceans + " and you succeed</p>";
		sanlost = CalculateDice(win);
		text += "<p style = \"margin:5px\">and you lost " + lost + " = " + CalculateDice(win) + " Sanity</p>";
	}

	if (sanlost > 5) text += "<p style = \"margin:5px\">Sadly you fell into madness.</p>";
	if (sanlost >= s) text += "<p style = \"margin:5px\">You die</p>"
	document.getElementById("Output").innerHTML += text;
	document.getElementById("san").value = (s - sanlost) + "";
	document.getElementById("Output").scrollTop = document.getElementById("Output").scrollHeight
}

function add(s) {
	var v = parseInt(document.getElementById(s).value);
	v += 1;
	
	
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
		document.getElementById("Output").innerHTML += "<p style = \"margin:5px\">Dec Error</p>";
		return;
	}
	
	document.getElementById(s).value = v + "";
}