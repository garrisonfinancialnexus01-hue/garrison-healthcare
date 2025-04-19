
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from 'https://esm.sh/resend@0.16.0'

// Initialize Resend with API key from environment variable
const resendApiKey = Deno.env.get('RESEND_API_KEY');
if (!resendApiKey) {
  console.error("RESEND_API_KEY environment variable is not set");
}

const resend = new Resend(resendApiKey);

console.log("Edge function initialized, Resend API key available:", !!resendApiKey);

serve(async (req) => {
  try {
    // Parse request body
    const { to, subject, content } = await req.json();
    
    console.log("Received email request:", { to, subject, contentLength: content?.length });

    // Validation
    if (!to || !subject || !content) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: to, subject, or content" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Garrison Health Contact <contact@garrisonhealth.com>',
      to: [to],
      subject: subject,
      text: content,
    });

    console.log("Email sent successfully:", data);

    return new Response(
      JSON.stringify({ message: "Email sent successfully", data }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
})
