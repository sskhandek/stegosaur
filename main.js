
console.log("lol")
var gmail;

var main = function () {
	// NOTE: Always use the latest version of gmail.js from
	// https://github.com/KartikTalwar/gmail.js
	gmail = new Gmail();
	console.log('Hello,', gmail.get.user_email())
}
