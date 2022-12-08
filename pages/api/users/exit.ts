import {NextApiRequest, NextApiResponse} from "next";
import {serialize} from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const cookie = serialize(
            'session_id',
            '',
            { expires: new Date(Date.now() - 1), path: '/' }
        )

        res.setHeader('Set-Cookie', cookie)
    } catch (e) {
        res.status(500).json(`Internal server error ${e}`)
    }
}
