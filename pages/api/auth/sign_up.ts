import path from 'path';
import {promises as fs} from 'fs';
import {NextApiRequest, NextApiResponse} from "next";
import {User} from "../../../types/user";
import {serialize} from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const jsonDirectory = path.join(process.cwd(), 'data')
        const fileContents = await fs.readFile(jsonDirectory + '/users.json', 'utf8')
        const users: User[] = JSON.parse(fileContents)

        const maxId = Math.max(...users.map(u => u.id))
        const newId = maxId + 1

        const currentUser: User = {id: newId, ...JSON.parse(req.body)}

        await fs.writeFile(
            jsonDirectory + '/users.json',
            JSON.stringify([...users, currentUser], null, 2)
        )

        const cookie = serialize(
            'session_id',
            currentUser.id.toString(),
            { expires: new Date(Date.now() + 8 * 3600000), path: '/' }
        )

        res.setHeader('Set-Cookie', cookie)
        res.status(200).json(newId)
    } catch (e) {
        res.status(500).json(`Internal server error ${e}`)
    }
}
