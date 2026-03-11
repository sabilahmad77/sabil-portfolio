import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message, intent } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0a0d14;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:580px;margin:0 auto;padding:32px 24px;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0E1D31 0%,#1a2d47 100%);border:1px solid rgba(201,166,85,0.2);border-radius:12px;padding:28px 32px;margin-bottom:20px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
        <div style="width:8px;height:8px;border-radius:50%;background:#3DD68C;box-shadow:0 0 8px #3DD68C;"></div>
        <span style="color:#3DD68C;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">New Portfolio Inquiry</span>
      </div>
      <h1 style="color:#F8F9FA;font-size:22px;font-weight:700;margin:0 0 6px 0;line-height:1.3;">${intent}</h1>
      <p style="color:#C9A655;font-size:13px;margin:0;">via sabilahmad.com/contact</p>
    </div>

    <!-- Sender details -->
    <div style="background:#0E1D31;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:20px 24px;margin-bottom:16px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#6B7A8D;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;width:90px;">From</td>
          <td style="padding:8px 0;color:#F8F9FA;font-size:14px;font-weight:600;">${name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6B7A8D;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Email</td>
          <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#C9A655;font-size:14px;text-decoration:none;">${email}</a></td>
        </tr>
        ${company ? `
        <tr>
          <td style="padding:8px 0;color:#6B7A8D;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Company</td>
          <td style="padding:8px 0;color:#F8F9FA;font-size:14px;">${company}</td>
        </tr>` : ""}
        <tr>
          <td style="padding:8px 0;color:#6B7A8D;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Intent</td>
          <td style="padding:8px 0;">
            <span style="background:rgba(201,166,85,0.12);color:#C9A655;font-size:12px;font-weight:600;padding:3px 10px;border-radius:20px;border:1px solid rgba(201,166,85,0.25);">${intent}</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Message -->
    <div style="background:#0E1D31;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:20px 24px;margin-bottom:20px;">
      <p style="color:#6B7A8D;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin:0 0 12px 0;">Message</p>
      <p style="color:#C8CFD8;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
    </div>

    <!-- Reply CTA -->
    <div style="text-align:center;padding:16px 0;">
      <a href="mailto:${email}?subject=Re: ${encodeURIComponent(intent)}"
         style="display:inline-block;background:linear-gradient(135deg,#C9A655,#B39148);color:#0a0d14;font-size:13px;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;letter-spacing:0.5px;">
        Reply to ${name} →
      </a>
    </div>

    <!-- Footer -->
    <p style="color:#2A3547;font-size:11px;text-align:center;margin-top:24px;">
      Sent via sabilahmad.com · Doha, Qatar
    </p>
  </div>
</body>
</html>`.trim();

    const textBody = `New Portfolio Inquiry\n\nIntent: ${intent}\nFrom: ${name}\nEmail: ${email}${company ? `\nCompany: ${company}` : ""}\n\n---\n${message}`;

    const apiToken = process.env.MAILTRAP_API_TOKEN;
    if (!apiToken) {
      console.error("MAILTRAP_API_TOKEN env var is not set");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const res = await fetch("https://send.api.mailtrap.io/api/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { email: "noreply@sabilahmad.com", name: "Sabil Ahmad Portfolio" },
        to: [{ email: "info@sabilahmad.com", name: "Sabil Ahmad" }],
        reply_to: [{ email, name }],
        subject: `[Portfolio] ${intent} — ${name}${company ? ` · ${company}` : ""}`,
        html: htmlBody,
        text: textBody,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Mailtrap API error:", res.status, errText);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
