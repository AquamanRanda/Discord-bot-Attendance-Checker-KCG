const puppeteer = require("puppeteer");
const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client();
client.once("ready", () => {
  console.log("🤖 Beep beep! I am ready!");
});
client.login(process.env.BOT_TOKEN);

const prefix = "$";
const Login = async (url, username, password) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("http://studentlogin.kcgcollege.ac.in/", {
      waitUntil: "networkidle0",
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
    const name = await page.evaluate(() => {
      let name = document.querySelector("#lblsname").innerText;
      return name;
    });
    await browser.close();
    // prettier-ignore
    arr = result[13].filter(col => col != ' ');
    let final = [arr, name];
    return final;
  } catch (error) {
    console.log(error);
  }
};

client.on("message", async (message) => {
  let username = "";
  let password = "";
  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(prefix.length)
      .split(/\s+/);
    if (CMD_NAME === "attendance") {
      username = args[0];
      password = args[1];
      try {
        let response = await Login(
          "http://studentlogin.kcgcollege.ac.in/",
          username,
          password
        );
        let name = response[1];
        let arr = response[0];
        let attendance = [];
        for (let i = 8; i < arr.length; i += 10) {
          if (arr[i] == "NaN") {
            arr[i] = 0;
          }
          attendance.push(arr[i]);
        }
        attendance.splice(1, 0, " ");
        let finalMessage = "";
        for (let i = 0; i < attendance.length; i++) {
          finalMessage =
            finalMessage + `Semester ${i + 1}:  ` + attendance[i] + "\n";
        }
        message.channel.send("\n" + name + "\n" + finalMessage);
      } catch (error) {
        console.log(error);
        message.reply("Please Enter the login Credentials Properly");
      }
    }
  }
});
