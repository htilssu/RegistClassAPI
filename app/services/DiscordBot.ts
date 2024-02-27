import {Channel, Client, EmbedBuilder, HexColorString} from "discord.js";

const client: Client = new Client({
    intents: ["Guilds", "GuildMessages", "GuildMessageReactions", "DirectMessages", "DirectMessageReactions"]
});
client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});
client.login(process.env.DISCORD_BOT_TOKEN).catch(console.error);

export const ClientDo =
    (callback: () => void): void => {

        if (client.isReady()) {
            callback();
        } else {
            client.on("ready", callback);
        }

    }

export const GetChannelById = (id: string): Channel | undefined => {
    return client.channels.cache.get(id);
}

export const AVATAR_URL = process.env.AVATAR_URL!;

export const ADD_REACTION = "👍";
export const REMOVE_REACTION = "👎";
export const GetEmbed = (type: EmbedType): EmbedBuilder => {
    switch (type) {
        case "add":
            return new EmbedBuilder()
                .setColor("#00FFFF")
                .setAuthor({
                    iconURL: AVATAR_URL,
                    name: "Hisu"
                })
        case "remove":
            break;
    }

};

export type EmbedType = "add" | "remove" | "subscribed";

export default client;