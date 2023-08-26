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

var log = ""

function PrintOutput(s, sender= "Dice Goddess", style="margin:10px") {
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear().toString().padStart(4, '0'); // 获取当前年份
	var currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 获取当前月份（注意月份从0开始，所以需要加1）
	var currentDay = currentDate.getDate().toString().padStart(2, '0'); // 获取当前日期
	var currentHour = currentDate.getHours().toString().padStart(2, '0'); // 获取当前小时
	var currentMinute = currentDate.getMinutes().toString().padStart(2, '0'); // 获取当前分钟
	var currentSecond = currentDate.getSeconds().toString().padStart(2, '0'); // 获取当前秒数
	timeString = `${currentYear}${currentMonth}${currentDay}-${currentHour}:${currentMinute}:${currentSecond}`
	document.getElementById("Output").innerHTML += "<p style = \"" + style + "\">" + s + "</p>\n";
	style = "color:gray; font-size:10px; margin-top:-12px; text-align: right";
	var color = "color: blue";
	if (sender == "Dice Goddess") color = "color:red";
	document.getElementById("Output").innerHTML += `<p style = "${style}"> from <span style="${color}">${sender}</span> at ${timeString} </p>\n`;
	document.getElementById("Output").scrollTop = document.getElementById("Output").scrollHeight;
	// log += "[" + currentYear + '-' + "]" + s + '\n';
	log += `[${timeString} @${sender}]: ${s}\n`;
}

function AnyDice(s) {
	var text;
	// 获取 id="numb" 的值
	// s = document.getElementById("numb").value;
	text = CalculateDice(s) + "";
	PrintOutput(s + " = " + text)
}

function CalculateWithTwo(a, b) {
	if (a == 0 && b == 0) return 100;
	return a * 10 + b;
}

function RewardDice(num) {
	var output = CalculateDice('1d100');
	var ten, one, another, output;
	ten = parseInt(output / 10);
	if (ten == 10) ten = 0;
	one = output % 10;
	
	output = `rd${num}=[${ten}`;
	for (var i = 0; i < num; i++) {
		another = CalculateDice('1d10');
		if (another == 10) another = 0;
		output += " " + another;
		if (CalculateWithTwo(another, one) < CalculateWithTwo(ten, one)) ten = another;
	}
	PrintOutput(output + `] ${one} = ${CalculateWithTwo(ten, one)}`);
	return;
}

function PunishDice(num) {
	var output = CalculateDice('1d100');
	var ten, one, another, output;
	ten = parseInt(output / 10);
	if (ten == 10) ten = 0;
	one = output % 10;
	
	output = `pd${num}=[${ten}`;
	for (var i = 0; i < num; i++) {
		another = CalculateDice('1d10');
		if (another == 10) another = 0;
		output += " " + another;
		if (CalculateWithTwo(another, one) > CalculateWithTwo(ten, one)) ten = another;
	}
	PrintOutput(output + `] ${one} = ${CalculateWithTwo(ten, one)}`);
	return;
}

function SanCheck() {
	var s = document.getElementById("san").value;
	var win = document.getElementById("sanlost_win").value;
	var lost = document.getElementById("sanlost_lost").value;
	var text, diceans, sanlost;
	diceans = CalculateDice("1d100");
	
	if (diceans > s) {
		text = "1d100 = " + diceans + " > " + s + " you failed";
		sanlost = CalculateDice(lost);
		text += "and you lost " + win + " = " + sanlost + " Sanity";
	} else {
		text = "1d100 = " + diceans + " < " + s +  " you succeed";
		sanlost = CalculateDice(win);
		text += "and you lost " + lost + " = " + sanlost + " Sanity";
	}
	PrintOutput(text);
	
	if (sanlost >= 5) text = "Sadly you fell into madness.";
	if (sanlost >= s) text = "You die.";
	if (sanlost >= 5 || sanlost >= s) PrintOutput(text);
	document.getElementById("san").value = (s - sanlost) + "";
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
		return;
	}
	
	document.getElementById(s).value = v + "";
}

function check(s) {
	var value = parseInt(document.getElementById(s).value);
	roll = CalculateDice("1d100")
	var text = s + " check:1d100 = " + roll;
	if (roll > value) text += " > " + value; else text += " < " + value;
	if ((value < 50 && roll >= 96) || (value >= 50 && roll >= 100)) text += " Fumble"; else
	if ((value < 50 && roll <= 1) || (value >= 50 && roll <= 5)) text += " Criticle"; else 
	if (roll > value) text += " Failure"; else
	if (roll <= value / 5) text += " Extreme success"; else
	if (roll <= value / 2) text += " Hard success"; else
	if (roll <= value) text += " Regular success";
	PrintOutput(text);
}

function checkwithname(s1, s2) {
	if (document.getElementById(s1).value == '') {
		PrintOutput("This skill is empty.");
		return;
	}
	var value = parseInt(document.getElementById(s1).value);
	var name = document.getElementById(s2).value
	roll = CalculateDice("1d100")
	var text = "<p style = \"margin:5px\">" + name + " check:1d100 = " + roll;
	if (roll > value) text += " > " + value; else text += " < " + value;
	if ((value < 50 && roll >= 96) || (value >= 50 && roll >= 100)) text += " Fumble"; else
	if ((value < 50 && roll <= 1) || (value >= 50 && roll <= 5)) text += " Criticle"; else
	if (roll > value) text += " Failure"; else
	if (roll <= value / 5) text += " Extreme success"; else
	if (roll <= value / 2) text += " Hard success"; else
	if (roll <= value) text += " Regular success";
	PrintOutput(text);
}

function save() {
	// clearAllCookies();
	var inputs = document.getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++) {
		var cookie_value = encodeURIComponent(inputs[i].value)
		document.cookie = inputs[i].id + "=" + cookie_value;
	}
	document.cookie = "log=" + encodeURIComponent(log);
	document.cookie = "Output=" + encodeURIComponent(document.getElementById("Output").innerHTML);
	PrintOutput("You have successfully saved your Character Card.");
}

function load() {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i].trim().split("=")
		var cookie_name = cookie[0]
		var cookie_value = decodeURIComponent(cookie[1]);
		if (cookie_name == "log") {
			log = cookie_value;
			continue;
		}
		if (cookie_name == "Output") {
			document.getElementById("Output").innerHTML = cookie_value;
			continue;
		}
		document.getElementById(cookie_name).value = cookie_value;
	}
	
	PrintOutput("Load last Character Card successfully.");
}

var lastoption = "";

function submitinput() {
	var input = document.getElementById("InputField").value;
	document.getElementById("InputField").value = "";
	if (input.toLowerCase() == ".repeat" || input.toLowerCase == ".re" || input == "") input = lastoption; else
		if (input[0] != '.') {
			PrintOutput(input, "Player");
			return;
		} else input = input.slice(1);
	var arg = input.split(' ');
	arg[0] = arg[0].toLowerCase();
	if (arg[0] == "roll" || arg[0] == "r") {
		if (arg.length == 1) {
			PrintOutput("Illegal parameter.")
		} else {
			ans = CalculateDice(arg[1]);
			PrintOutput("Roll" + arg[1] + ' = ' + ans);
			lastoption = input;
		}
	} else if (arg[0] == "repeat" || arg[0] == "re") {
		input = lastoption;
		submitinput();
		return;
	} else {
		PrintOutput("illegal command \'" + arg[0] + "\' is not found");
	}
}

function saveasjson() {
	var inputs = document.getElementsByTagName("input");
	var savedata = {};
	for (var i = 0; i < inputs.length; i++) {
		var value = encodeURIComponent(inputs[i].value)
		savedata[inputs[i].id] = value;
	}
	savedata["log"] = encodeURIComponent(log);
	savedata["Output"] = encodeURIComponent(document.getElementById("Output").innerHTML);
	
	var jsonstring = JSON.stringify(savedata);
	var blob = new Blob([jsonstring], { type: "application/json" });
	var url = URL.createObjectURL(blob);
	var link = document.createElement("a");
	link.href = url;
	
	link.download = "save.json";	
	link.style.display = "none";
	document.body.appendChild(link);
	
	link.click();
	
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
	PrintOutput("Out put the data to save.json.");
}

function loadfromjson() {
	var fileInput = document.getElementById("savefile");
	var file = fileInput.files[0];
	var reader = new FileReader();
	reader.onload = function(event) {
		var data = JSON.parse(event.target.result);
		for (var key in data) {
			var place = document.getElementById(key);
			if (place == 'log') {
				log = decodeURIComponent(data[key]);
				continue;
			}
			if (place == 'Output') {
				document.getElementById('Output').innerHTML = decodeURIComponent(data[key]);
				continue;
			}
			if (place != null) {
				place.value = decodeURIComponent(data[key]);
			}
		}
	}
	reader.readAsText(file, "UTF-8");
	PrintOutput("Successfully loaded from a JSON file");
}

document.getElementById("InputField").addEventListener("keydown", EnterIsDown("submitinput()"));

function EnterIsDown(param) {
	return function(event) {
	    if (event.key === "Enter") {
	      eval(param);
	    }
	}
}

function OutputLog() {
	var blob = new Blob([log], { type: "text/plain" });
	var url = URL.createObjectURL(blob);
	var link = document.createElement("a");
	link.href = url;
	
	link.download = "log.txt";	
	link.style.display = "none";
	document.body.appendChild(link);
	
	link.click();
	
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
	PrintOutput("Out put the data to log.txt.");
}