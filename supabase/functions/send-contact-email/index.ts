
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from 'https://esm.sh/resend@0.16.0'

// Initialize Resend with API key from environment variable
const resendApiKey = Deno.env.get('RESEND_API_KEY');
if (!resendApiKey) {
  console.error("RESEND_API_KEY environment variable is not set");
}

// Initialize Resend client
const resend = new Resend(resendApiKey);

console.log("Edge function initialized, Resend API key available:", !!resendApiKey);

serve(async (req) => {
  try {
    // CORS headers for preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }
    
    // Parse request body
    const requestBody = await req.json();
    const { to, subject, content } = requestBody;
    
    console.log("Received email request:", { 
      to, 
      subject, 
      contentLength: content?.length,
      requestBody 
    });

    // Validation
    if (!to || !subject || !content) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields: to, subject, or content",
          providedFields: { to: !!to, subject: !!subject, content: !!content }
        }),
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" 
          } 
        }
      );
    }

    // Validate that the API key is available
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: "Email service configuration is missing. Please contact the administrator." }),
        { 
          status: 500, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" 
          } 
        }
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
      { 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*" 
        } 
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "Unknown error occurred",
        stack: error.stack,
        name: error.name 
      }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*" 
        } 
      }
    );
  }
})
