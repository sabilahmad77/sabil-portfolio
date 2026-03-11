import { NextRequest, NextResponse } from "next/server";

const FROM = { email: "hello@sabilahmad.com", name: "Sabil Ahmad" };
const INBOX = { email: "info@sabilahmad.com", name: "Sabil Ahmad" };

async function sendMail(token: string, payload: object) {
  const res = await fetch("https://send.api.mailtrap.io/api/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Mailtrap ${res.status}: ${err}`);
  }
  return res.json();
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message, intent } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiToken = process.env.MAILTRAP_API_TOKEN;
    if (!apiToken) {
      console.error("MAILTRAP_API_TOKEN is not set");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const safeMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeCompany = company ? company.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";

    // ─── 1. NOTIFICATION EMAIL → Sabil's inbox ──────────────────────────────
    const notifyHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#060b14;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:580px;margin:0 auto;padding:32px 20px;">

    <!-- Header bar -->
    <div style="background:linear-gradient(135deg,#0E1D31 0%,#162840 100%);border:1px solid rgba(201,166,85,0.25);border-radius:14px;padding:24px 28px;margin-bottom:16px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#3DD68C;"></span>
        <span style="color:#3DD68C;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;">New Portfolio Inquiry</span>
      </div>
      <h1 style="color:#F8F9FA;font-size:20px;font-weight:700;margin:0 0 4px 0;">${intent}</h1>
      <p style="color:#C9A655;font-size:12px;margin:0;">via sabilahmad.com · ${new Date().toUTCString()}</p>
    </div>

    <!-- Contact details -->
    <div style="background:#0E1D31;border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:18px 24px;margin-bottom:12px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:7px 0;color:#5A6A7E;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;width:80px;">Name</td>
          <td style="padding:7px 0;color:#F0F4F8;font-size:14px;font-weight:600;">${name}</td>
        </tr>
        <tr>
          <td style="padding:7px 0;color:#5A6A7E;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Email</td>
          <td style="padding:7px 0;"><a href="mailto:${email}" style="color:#C9A655;font-size:14px;text-decoration:none;">${email}</a></td>
        </tr>
        ${safeCompany ? `<tr>
          <td style="padding:7px 0;color:#5A6A7E;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Company</td>
          <td style="padding:7px 0;color:#F0F4F8;font-size:14px;">${safeCompany}</td>
        </tr>` : ""}
        <tr>
          <td style="padding:7px 0;color:#5A6A7E;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Intent</td>
          <td style="padding:7px 0;">
            <span style="background:rgba(201,166,85,0.12);color:#C9A655;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;border:1px solid rgba(201,166,85,0.3);">${intent}</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Message -->
    <div style="background:#0E1D31;border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:18px 24px;margin-bottom:20px;">
      <p style="color:#5A6A7E;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 10px 0;">Message</p>
      <p style="color:#C8CFD8;font-size:14px;line-height:1.75;margin:0;white-space:pre-wrap;">${safeMessage}</p>
    </div>

    <!-- Reply CTA -->
    <div style="text-align:center;padding:8px 0 24px;">
      <a href="mailto:${email}?subject=Re%3A ${encodeURIComponent(intent)}&body=Hi ${encodeURIComponent(name)}%2C%0A%0A"
         style="display:inline-block;background:linear-gradient(135deg,#C9A655,#B39148);color:#060b14;font-size:13px;font-weight:700;padding:13px 32px;border-radius:8px;text-decoration:none;letter-spacing:0.5px;">
        Reply to ${name} →
      </a>
    </div>

    <p style="color:#1E2D3D;font-size:11px;text-align:center;margin:0;">sabilahmad.com · Doha, Qatar</p>
  </div>
</body>
</html>`.trim();

    // ─── 2. CONFIRMATION EMAIL → visitor's inbox ─────────────────────────────
    const confirmHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#060b14;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">

    <!-- Hero -->
    <div style="background:linear-gradient(135deg,#0E1D31 0%,#162840 100%);border:1px solid rgba(201,166,85,0.25);border-radius:14px;padding:32px 28px;margin-bottom:16px;text-align:center;">
      <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,rgba(201,166,85,0.2),rgba(61,214,140,0.1));border:1.5px solid rgba(201,166,85,0.4);margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:22px;line-height:52px;">✅</div>
      <h1 style="color:#F8F9FA;font-size:22px;font-weight:700;margin:0 0 8px 0;line-height:1.3;">Message received!</h1>
      <p style="color:#8A9BB0;font-size:14px;margin:0 0 20px 0;line-height:1.6;">
        Hey ${name}, thanks for reaching out.<br/>
        I personally review every message and will reply<br/>
        <strong style="color:#C9A655;">within 24 hours.</strong>
      </p>
      <a href="https://www.sabilahmad.com"
         style="display:inline-block;background:linear-gradient(135deg,#C9A655,#B39148);color:#060b14;font-size:13px;font-weight:700;padding:11px 28px;border-radius:8px;text-decoration:none;letter-spacing:0.5px;">
        View Portfolio →
      </a>
    </div>

    <!-- What you sent -->
    <div style="background:#0E1D31;border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:18px 24px;margin-bottom:12px;">
      <p style="color:#5A6A7E;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 12px 0;">Your Submission</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:6px 0;color:#5A6A7E;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;width:70px;">Intent</td>
          <td style="padding:6px 0;">
            <span style="background:rgba(201,166,85,0.12);color:#C9A655;font-size:11px;font-weight:700;padding:2px 10px;border-radius:20px;border:1px solid rgba(201,166,85,0.25);">${intent}</span>
          </td>
        </tr>
        ${safeCompany ? `<tr>
          <td style="padding:6px 0;color:#5A6A7E;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Company</td>
          <td style="padding:6px 0;color:#C8CFD8;font-size:13px;">${safeCompany}</td>
        </tr>` : ""}
      </table>
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.05);">
        <p style="color:#5A6A7E;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 8px 0;">Message</p>
        <p style="color:#8A9BB0;font-size:13px;line-height:1.7;margin:0;white-space:pre-wrap;">${safeMessage}</p>
      </div>
    </div>

    <!-- Quick links -->
    <div style="background:#0E1D31;border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:16px 24px;margin-bottom:24px;">
      <p style="color:#5A6A7E;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 12px 0;">Connect While You Wait</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <a href="https://www.linkedin.com/in/sabilahmad" style="color:#C9A655;font-size:12px;text-decoration:none;border:1px solid rgba(201,166,85,0.3);padding:5px 14px;border-radius:6px;">LinkedIn</a>
        <a href="https://github.com/sabilahmad77" style="color:#C9A655;font-size:12px;text-decoration:none;border:1px solid rgba(201,166,85,0.3);padding:5px 14px;border-radius:6px;">GitHub</a>
        <a href="https://t.me/sabilahmad77" style="color:#C9A655;font-size:12px;text-decoration:none;border:1px solid rgba(201,166,85,0.3);padding:5px 14px;border-radius:6px;">Telegram</a>
      </div>
    </div>

    <p style="color:#1E2D3D;font-size:11px;text-align:center;margin:0;">
      You're receiving this because you contacted Sabil Ahmad at sabilahmad.com.<br/>
      Doha, Qatar · CTO &amp; Blockchain Engineer
    </p>
  </div>
</body>
</html>`.trim();

    // ─── Send both in parallel ────────────────────────────────────────────────
    const [notifyResult, confirmResult] = await Promise.allSettled([
      sendMail(apiToken, {
        from: FROM,
        to: [INBOX],
        reply_to: { email, name },
        subject: `[Portfolio] ${intent} — ${name}${company ? ` · ${company}` : ""}`,
        html: notifyHtml,
        text: `New inquiry from ${name} (${email})${company ? ` · ${company}` : ""}\nIntent: ${intent}\n\n${message}`,
        category: "portfolio-notification",
      }),
      sendMail(apiToken, {
        from: FROM,
        to: [{ email, name }],
        reply_to: INBOX,
        subject: `Got your message — I'll reply within 24 hours`,
        html: confirmHtml,
        text: `Hi ${name},\n\nThanks for reaching out! I received your message and will reply within 24 hours.\n\nWhat you sent:\nIntent: ${intent}${company ? `\nCompany: ${company}` : ""}\n\n${message}\n\n—\nSabil Ahmad · sabilahmad.com`,
        category: "portfolio-confirmation",
      }),
    ]);

    if (notifyResult.status === "rejected") {
      console.error("Notification email failed:", notifyResult.reason);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    if (confirmResult.status === "rejected") {
      // Confirmation failure is non-blocking — notification already delivered
      console.warn("Confirmation email failed (non-fatal):", confirmResult.reason);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
