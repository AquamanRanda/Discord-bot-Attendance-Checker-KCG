"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var puppeteer = require("puppeteer");
var Discord = require("discord.js");
require("dotenv").config();
var client = new Discord.Client();
client.once("ready", function () {
    console.log("🤖 Beep beep! I am ready!");
});
client.login(process.env.BOT_TOKEN);
var prefix = "$";
var Login = function (url, username, password) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, result, name_1, arr, final, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 15, , 16]);
                return [4 /*yield*/, puppeteer.launch({
                        headless: true,
                        args: ["--no-sandbox", "--disable-setuid-sandbox"],
                    })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto("http://studentlogin.kcgcollege.ac.in/", {
                        waitUntil: "networkidle0",
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.type('input[name="txtuname"]', username)];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.type('input[name="txtpassword"]', password)];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.click('input[type="submit"]')];
            case 6:
                _a.sent();
                return [4 /*yield*/, page.waitForTimeout(1000)];
            case 7:
                _a.sent();
                return [4 /*yield*/, page.click("div#pHeaderAttendence")];
            case 8:
                _a.sent();
                return [4 /*yield*/, page.waitForTimeout(1000)];
            case 9:
                _a.sent();
                return [4 /*yield*/, page.click("input#ImageButtonsema")];
            case 10:
                _a.sent();
                return [4 /*yield*/, page.waitForTimeout(5000)];
            case 11:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        var rows = document.querySelectorAll("table tr");
                        return Array.from(rows, function (row) {
                            var columns = row.querySelectorAll("td.s1s2");
                            return Array.from(columns, function (column) { return column.innerText; });
                        });
                    })];
            case 12:
                result = _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        //@ts-ignore
                        var name = document.querySelector("#lblsname").innerText;
                        return name;
                    })];
            case 13:
                name_1 = _a.sent();
                return [4 /*yield*/, browser.close()];
            case 14:
                _a.sent();
                // prettier-ignore
                console.log(result);
                arr = result[14].filter(function (col) { return col != " "; });
                final = [arr, name_1];
                console.log(final);
                return [2 /*return*/, final];
            case 15:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 16];
            case 16: return [2 /*return*/];
        }
    });
}); };
client.on("message", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, _a, CMD_NAME, args, response, name_2, arr, attendance, i, finalMessage, i, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                username = "";
                password = "";
                if (message.author.bot)
                    return [2 /*return*/];
                if (!message.content.startsWith(prefix)) return [3 /*break*/, 4];
                _a = message.content
                    .trim()
                    .substring(prefix.length)
                    .split(/\s+/), CMD_NAME = _a[0], args = _a.slice(1);
                if (!(CMD_NAME === "attendance")) return [3 /*break*/, 4];
                username = args[0];
                password = args[1];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Login("http://studentlogin.kcgcollege.ac.in/", username, password)];
            case 2:
                response = _b.sent();
                name_2 = response[1];
                arr = response[0];
                attendance = [];
                for (i = 8; i < arr.length; i += 10) {
                    if (arr[i] == "NaN") {
                        arr[i] = 0;
                    }
                    attendance.push(arr[i]);
                }
                attendance.splice(1, 0, " ");
                finalMessage = "";
                for (i = 0; i < attendance.length; i++) {
                    finalMessage =
                        finalMessage + ("Semester " + (i + 1) + ":  ") + attendance[i] + "\n";
                }
                message.channel.send("\n" + name_2 + "\n" + finalMessage);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                message
                    .reply("Please Enter the login Credentials Properly")
                    .then(function (msg) {
                    msg.delete({ timeout: 4000 });
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
