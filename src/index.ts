import {Client} from "revolt.js";
import {config} from "dotenv";

const client = new Client();
config();

client.on("ready", () => {
    console.info(`Logged in as ${client.user!.username}`);
});

client.on("message", (msg) => {
    if (msg.content === "Hello") {
        msg.channel!.sendMessage("Hi!");
    }
});

client.loginBot(process.env.TOKEN!);
