"use server";
import type {NextApiRequest, NextApiResponse} from 'next'
import {LHP} from "@/app/services/Storage";
import client, {ClientDo, GetChannelById, GetEmbed} from "@/app/services/DiscordBot";
import {Channel} from "node:diagnostics_channel";
import {BaseChannel, EmbedBuilder} from "discord.js";

client;
type LHPData = {
    LHP: string | undefined | null;
    secret: string | undefined | null
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LHPData | LHPData[]>
) {

    if (req.method === "GET") {
        const query: string | string[] | undefined = req.query.LHP;
        if (query !== undefined)
            LHP.findOne({LHP: req.query.LHP as string}).then((lhp) => {
                res.status(200).json({
                    LHP: lhp.LHP,
                    secret: lhp.secret
                });
            });
        else {
            LHP.find().then((lhps) => {
                const list: LHPData[] = [...lhps];
                res.status(200).json(list);
            });
        }
    } else if (req.method === "POST") {
        const body: LHPData = req.body;
        res.status(200);
        const newLHP = new LHP(body);
        newLHP.save().then(() => {
            res.status(201);
            ClientDo(() => {
                const channel = GetChannelById(process.env.NOTIFY_CHANNEL_ID!)
                if (channel !== undefined) {
                    const addEmbed = GetEmbed("add")
                        .setTitle('Success: ' + body.LHP)
                        .setDescription(body.secret!)
                        .setTimestamp()
                    if (channel.isTextBased()) {
                        channel.send({embeds: [addEmbed]});
                    }
                }
            })

        });
    } else {
        res.status(403);
    }
    res.end();
}