import { Queue } from "bullmq";
import { connection } from "../config/redis.config.js";
import { Welcome_Email_Template } from "../services/EmailTemplate.js";

const notificationQueue = new Queue("email-queue", connection);

export async function addMessageTOQueue(user) {

    const htmlContent = Welcome_Email_Template.replace("{user_name}", user.name);

    const res = await notificationQueue.add(`Email to ${user.email}` , {
        to: user.email,
        subject: "Welcome to Queue System Visulaization",
        html: htmlContent,
    });
    console.log("Job added to queue:", res.id);
}
