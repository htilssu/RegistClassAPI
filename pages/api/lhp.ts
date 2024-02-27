import type {NextApiRequest, NextApiResponse} from 'next'
import {LHP} from "@/app/services/Storage";

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
                    LHP: lhp?.LHP,
                    secret: lhp?.secret
                });
            });
        else {
            LHP.find().then((lhps) => {
                const list: LHPData[] = [];
                for (const lhp of lhps) {
                    list.push({
                        LHP: lhp.LHP,
                        secret: lhp.secret
                    });
                }
                res.status(200).json(list);
            });
        }
    } else if (req.method === "POST") {
        const body: LHPData = req.body;
        res.status(200).end(); // Method not allowed
        const newLHP = new LHP(body);
        newLHP.save().then(() => {
            console.log("LHP saved");
        });
    } else {
        res.status(200).end(); // Method not allowed
    }
}