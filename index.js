const puppeteer = require("puppeteer");
const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client();
client.once("ready", () => {
  console.log("🤖 Beep beep! I am ready!");
});
client.login(process.env.BOT_TOKEN);

let url = "http://studentlogin.kcgcollege.ac.in/";
let username = "";
let password = "";
const prefix = "$";
const Login = async (url, username, password) => {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("http://studentlogin.kcgcollege.ac.in/", {
      waitUntil: "networkidle2",
    });
    await page.type('input[name="txtuname"]', username);
    await page.type('input[name="txtpassword"]', password);
    await page.click('input[type="submit"]');
    await page.waitForTimeout(1000);
    await page.click("div#pHeaderAttendence");
    await page.waitForTimeout(1000);
    await page.click("input#ImageButtonsema");
    await page.waitForTimeout(5000);

    const result = await page.evaluate(() => {
      const rows = document.querySelectorAll("table tr");
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll("td.s1s2");
        return Array.from(columns, (column) => column.innerText);
      });
    });
    // prettier-ignore
    arr = result[13].filter(col => col != ' ');
    return arr;
  } catch (error) {
    console.log(error);
  }
};

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(prefix.length)
      .split(/\s+/);

    if (CMD_NAME === "attendance") {
      username = args[0];
      password = args[1];
    }
  }
  let arr = await Login(url, username, password);
  let attendance = [];
  for (let i = 8; i < arr.length; i += 10) {
    if (arr[i] == "NaN") {
      arr[i] = 0;
    }
    attendance.push(arr[i]);
  }
  attendance.splice(1, 0, " ");
  message.channel.send(`Semester 6 : ` + attendance[5]);
});
