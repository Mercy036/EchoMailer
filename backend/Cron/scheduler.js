import cron from "node-cron";
import { email } from "../models/emails.models.js";
import { sendMailFromUser } from "../utils/mailer.js";


function getISTTime() {
  return new Date(Date.now() + (5.5 * 60 * 60 * 1000));
}

function formatISTTime(date) {
  return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
}

console.log("🚀 EMAIL SCHEDULER INITIALIZED");
console.log(`⏰ Current IST: ${formatISTTime(getISTTime())}`);


cron.schedule("*/2 * * * *", async () => {
  try {
    const currentISTTime = getISTTime();
    console.log(`\n🕐 SCHEDULER RUNNING AT IST: ${formatISTTime(currentISTTime)}`);

    const mails = await email.find({
      scheduledTime: { $lte: currentISTTime },
      status: "scheduled",
    }).populate("userId");
    
    console.log(`📧 Found ${mails.length} emails to process`);
    
    if (mails.length === 0) {
      console.log("✨ No emails to send right now");
      return;
    }

    for (const mail of mails) {
      try {
        const user = mail.userId; 
        
        if (!user) {
          console.error(`❌ User not found for email ID: ${mail._id}`);
          mail.status = "failed";
          await mail.save();
          continue;
        }

        console.log(`📤 Sending email from ${user.email} to ${mail.to}`);
        console.log(`📅 Scheduled for: ${formatISTTime(mail.scheduledTime)}`);
        
        await sendMailFromUser(
          user.email,
          mail.to,
          mail.subject,
          mail.body,
          `<p>${mail.body}</p>`
        );

        mail.status = "sent";
        await mail.save();

        console.log(`✅ SUCCESS: Email sent from ${user.email} to ${mail.to}`);
        
      } catch (err) {
        console.error(`❌ FAILED: Error sending email ID ${mail._id}:`, err.message);
        mail.status = "failed";
        await mail.save();
      }
    }
    
    console.log(`🏁 Scheduler completed processing ${mails.length} emails\n`);
    
  } catch (error) {
    console.error("💥 SCHEDULER ERROR:", error.message);
  }
}, {
  timezone: "Asia/Kolkata" 
});