function redirectToPage(x) {
	if (x === "SimpleRoll") {
		window.location.href = "SimpleRoll.html";
	}
	if (x === "LoginPage") {
		window.location.href = "LoginPage.html";
		console.log("You tried to go to LoginPage")
	}
	if (x === "RegisterPage") {
		window.location.href = "RegisterPage.html";
		console.log("You tried to go to RegisterPage")
	}
	if (x === "RoleBase") {
		window.location.href = "RoleBase.html";
		console.log("You tried to go to RoleBase");
	}
	if (x === "ItemBase") {
		window.location.href = "ItemBase.html";
		console.log("You tried to go to ItemBase");
	}
}