import path from 'path';
import {promises as fs} from 'fs';
import {NextApiRequest, NextApiResponse} from "next";
import {User} from "../../../types/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const jsonDirectory = path.join(process.cwd(), 'data')

    const fileContents = await fs.readFile(jsonDirectory + '/users.json', 'utf8')
    const users: User[] = JSON.parse(fileContents)

    res.status(200).json(users)
}
