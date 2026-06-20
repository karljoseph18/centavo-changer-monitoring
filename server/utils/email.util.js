import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendLowStockNotif = async ({ recipient }) => {
  await resend.emails.send({
    from: "Changetavo <noreply@changetavo.com>",
    to: recipient,
    subject: "⚠️ Machine Storage Low on Coin",
    html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
    
    <h2 style="color: #d9534f; margin-bottom: 10px;">
      ⚠️ Low Stock Alert
    </h2>

    <p style="font-size: 14px; color: #333;">
      This is an automated notification from <strong>Changetavo</strong>.
    </p>

    <p style="font-size: 14px; color: #333;">
      One or more coin denominations in the machine have reached or fallen below the minimum stock threshold.
    </p>

    <div style="margin: 20px 0; padding: 12px; background: #fff3cd; border: 1px solid #ffeeba; border-radius: 6px;">
      <strong>Action Required:</strong>
      Please check the machine inventory and replenish low stock items as soon as possible.
    </div>

    <p style="font-size: 13px; color: #666;">
      This alert is system-generated and does not include item-level details.
      Please log in to the dashboard to view full inventory status.
    </p>

    <hr style="margin-top: 20px;">

    <p style="font-size: 12px; color: #999;">
      Changetavo Inventory Management System<br>
      Please do not reply to this email.
    </p>
  </div>
`,
  });
};
