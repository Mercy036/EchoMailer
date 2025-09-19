import cron from "node-cron";
import { email } from "../models/emails.models.js";
import { sendMailFromUser } from "../utils/mailer.js";
import { User } from "../models/user.models.js";

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const mails = await email.find({
    scheduledTime: { $lte: now },
    status: "scheduled",
  }).populate("userId"); 
  for (const mail of mails) {
    try {
      const user = await User.findById(mail.userId);
      if (!user) {
        mail.status = "failed";
        await mail.save();
        console.error(`User not found for ID: ${mail._id}`);
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

      console.log(`Scheduled email sent from ${user.email} to ${mail.to}`);
    } catch (err) {
      mail.status = "failed";
      await mail.save();
      console.error("There was an error sending mail:", err);
    }
  }
});