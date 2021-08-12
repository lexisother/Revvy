import {Client} from "revolt.js";

const client = new Client();

client.on("ready", () => {
    console.info(`Logged in as ${client.user!.username}`);
});

client.on("message", (msg) => {
    if (msg.content === "Hello") {
        msg.channel!.sendMessage("Hi!");
    }
});

client.loginBot("HGGjBDlEgrgv200ThQ89tc_qHzO-tq1I1CN8mx8PbL4jbQT-fo4fRrfJjIBRdWVH");
