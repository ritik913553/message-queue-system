import { Worker } from "bullmq";
import { connection } from "../config/redis.config.js";
import { sendEmail } from "../services/EmailSender.js";

console.log("\n\n\n\n");
console.log("==========================================================");
console.log("=                  EMAIL QUEUE WORKER                   =");
console.log("==========================================================");
console.log("\n\n\n\n");


const worker = new Worker(
    "email-queue",
    async (job) => {
        console.log(`Sending mail to ${job.data.to}:`);
        const { to, subject, htmlContent } = job.data;
        await sendEmail(to, subject, htmlContent);
    },
    { connection }
);

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed successfully.`);
});
worker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed with error:`, err);
});
worker.on("error", (err) => {
    console.error("Worker encountered an error:", err);
});
