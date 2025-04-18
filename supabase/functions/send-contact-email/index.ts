
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from 'https://esm.sh/resend@0.16.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  const { to, subject, content } = await req.json()

  try {
    const data = await resend.emails.send({
      from: 'Garrison Health Contact <contact@garrisonhealth.com>',
      to: [to],
      subject: subject,
      text: content,
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }
})
