import type {NextApiRequest, NextApiResponse} from 'next'
import {LHP} from "@/app/services/Storage";

type LHPData = {
    LHP: string | undefined | null;
    secret: string | undefined | null
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LHPData>
) {
    if (req.method === "GET") {
        LHP.findOne({LHP: req.query.LHP as string}).then((lhp) => {
            res.status(200).json({
                LHP: lhp?.LHP,
                secret: lhp?.secret
            });

        });
    } else if (req.method === "POST") {
        const body: LHPData = req.body;
        res.status(200).json(body);
        const newLHP = new LHP(body);
        newLHP.save().then(() => {
            console.log("LHP saved");
        });
    } else {
        res.status(405).end(); // Method not allowed
    }
}