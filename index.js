var fs = require("fs");
const https = require("https");

async function load(messageId) {
  let options = {
    host: "api.line.me",
    port: 443,
    path: `/v2/bot/message/${messageId}/content`,
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`
    }
  };

  return new Promise((resolve, reject) => {
    let req = https.request(options, res => {
      let buffers = [];
      res.on("data", chunk => {
        buffers.push(chunk);
      });
      res.on("end", () => {
        resolve(Buffer.concat(buffers));
      });
    });

    req.on("error", e => {
      reject(e);
    });
    req.end();
  });
}

load("10498560066143").then(body => {
  console.log(body);
  fs.writeFile("./img.jpeg", body, "utf-8", err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("test");
  });
});
