import express from "express";
import { email } from "../models/emails.models.js";
import { sendMailFromUser } from "../utils/mailer.js"; 

const router = express.Router();

router.get("/run-cron", async (req, res) => {
    try {
        const now = new Date();

        const istNow = new Date(Date.now() + (5.5 * 60 * 60 * 1000));
        const mails = await email.find({
            scheduledTime: { $lte: istNow },
            status: "scheduled",
        })
      .populate("userId");
        console.log("Cron hit at:", now, "Mails found:", mails.length);
        let processed = 0;

        for (const mail of mails) {
            try {
                const user = mail.userId;

                if (!user) {
                    mail.status = "failed";
                    await mail.save();
                    continue;
                }
                await sendMailFromUser(
                    user.email,
                    mail.to,
                    mail.subject,
                    mail.body,
                    `<p>${mail.body}</p>`
                );

                mail.status = "sent";
                await mail.save();
                processed++;

                console.log(`✅ Mail sent: ${user.email} → ${mail.to}`);
            } catch (err) {
                console.error("❌ Error sending mail:", err.message);
                mail.status = "failed";
                await mail.save();
            }
        }

        res.json({
            message: "Cron executed",
            mailsProcessed: processed,
            totalFound: mails.length,
        });
    } catch (err) {
        console.error("Cron error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

export default router;