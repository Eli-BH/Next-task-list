import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConn";
import Task from "../../../models/Task";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    await dbConnect()
    if (req.method === 'POST') {
        // Process a POST request
        const { id } = req.body


        //delete a task 
        await Task.findOneAndRemove({ _id: id })


        //get all tasks
        let tasks = await Task.find()
        //send to client
        res.status(201).json({ success: true, data: tasks })

    } else {
        // Handle any other HTTP method
        res.status(200).json({ success: false, message: 'Request type not allowed' })

    }
}