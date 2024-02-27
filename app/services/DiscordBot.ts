import {Client} from "discord.js";

const client: Client = new Client({
    intents:["Guilds"]
});
client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});
client.login(process.env.DISCORD_BOT_TOKEN).catch(console.error);

export default client;