import path from 'path';
import {promises as fs} from 'fs';
import {NextApiRequest, NextApiResponse} from "next";
import {User} from "../../../types/user";
import { serialize, CookieSerializeOptions } from 'cookie'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const jsonDirectory = path.join(process.cwd(), 'data')
    const fileContents = await fs.readFile(jsonDirectory + '/users.json', 'utf8')
    const users: User[] = JSON.parse(fileContents)

    const { username, password } = req.query

    const currentUser = users.find(user => user.username === username && user.password === password)

    if (currentUser) {
        res.setHeader(
            'Set-Cookie',
            serialize(
                'session_id',
                currentUser.id.toString(),
                {expires: new Date(Date.now() + 8 * 3600000), path: '/'}
            )
        )
        res.status(201).json(currentUser)
    } else {
        res.status(404).json({ message: 'User not found' })
    }
}
