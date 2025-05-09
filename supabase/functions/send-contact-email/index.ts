
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
    const { to, subject, content, from_email, from_name } = requestBody;
    
    console.log("Received email request:", { 
      to, 
      subject, 
      from_email,
      from_name,
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

    // Configure email with improved options
    const emailOptions = {
      from: from_email && from_name 
        ? `${from_name} <contact@garrisonhealth.com>` 
        : 'Garrison Health Contact <contact@garrisonhealth.com>',
      to: [to],
      subject: subject,
      text: content,
      reply_to: from_email || undefined,
    };

    console.log("Sending email with options:", emailOptions);

    // Send email with retry logic
    let attempts = 0;
    let lastError = null;
    let data = null;
    
    while (attempts < 3) {
      try {
        data = await resend.emails.send(emailOptions);
        console.log(`Email sent successfully on attempt ${attempts + 1}:`, data);
        break; // Success - exit the retry loop
      } catch (error) {
        lastError = error;
        console.error(`Email sending failed on attempt ${attempts + 1}:`, error);
        attempts++;
        
        if (attempts < 3) {
          // Wait before retrying (exponential backoff)
          const waitTime = Math.pow(2, attempts) * 500; // 1s, 2s, 4s
          console.log(`Waiting ${waitTime}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }
    
    if (lastError && !data) {
      throw lastError; // Re-throw the last error if all attempts failed
    }

    return new Response(
      JSON.stringify({ 
        message: "Email sent successfully", 
        data,
        attempts 
      }),
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
