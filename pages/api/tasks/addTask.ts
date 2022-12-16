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
        const { title } = req.body


        //make new task 
        const newTask = await Task.create({
            title,
            status: false
        })


        //save to database
        await newTask.save()

        //send to client
        res.status(201).json({ success: true, data: newTask })

    } else {
        // Handle any other HTTP method
        res.status(200).json({ success: false, message: 'Request type not allowed' })

    }
}