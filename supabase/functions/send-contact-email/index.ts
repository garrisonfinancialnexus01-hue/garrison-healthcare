
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
};

serve(async (req) => {
  console.log(`📨 Received ${req.method} request to send-contact-email function`);
  
  try {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      console.log("✅ Handling CORS preflight request");
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }
    
    if (req.method !== "POST") {
      console.log(`❌ Method ${req.method} not allowed`);
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { 
          status: 405, 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          } 
        }
      );
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    console.log("🚀 Edge function starting, checking API key...");

    if (!resendApiKey) {
      console.error("🚨 CRITICAL: RESEND_API_KEY environment variable is not set");
      return new Response(
        JSON.stringify({ 
          error: "Email service configuration is missing. RESEND_API_KEY not configured.",
          details: "Please contact the administrator to configure the email service."
        }),
        { 
          status: 500, 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          } 
        }
      );
    } else {
      console.log("✅ RESEND_API_KEY is available");
    }
    
    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
      console.log("📋 Request body parsed successfully:", { type: requestBody.type });
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid JSON in request body",
          details: parseError.message
        }),
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          } 
        }
      );
    }
    
    const { type, ...data } = requestBody;
    console.log("🔄 Processing email request:", { type, hasData: !!data });

    let emailPayload;

    // Handle different email types
    switch (type) {
      case 'newsletter':
        console.log("📧 Preparing newsletter subscription email");
        emailPayload = {
          from: 'Garrison Health <onboarding@resend.dev>',
          to: ['garrisonhealth147@gmail.com'],
          subject: '📧 New Newsletter Subscription - Garrison Health',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <div style="background: linear-gradient(135deg, #058789 0%, #E03F3E 100%); color: white; padding: 20px; text-align: center;">
                <h2 style="margin: 0; font-size: 24px;">📧 New Newsletter Subscription</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Garrison Health Center</p>
              </div>
              
              <div style="padding: 20px;">
                <div style="background-color: #e3f2fd; border-left: 4px solid #058789; padding: 15px; margin-bottom: 20px;">
                  <h3 style="color: #058789; margin: 0 0 15px 0;">📋 Subscription Details</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; font-weight: bold; width: 30%; color: #333;">Email Address:</td><td style="padding: 8px 0; color: #555;">${data.email}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Subscription Date:</td><td style="padding: 8px 0; color: #555;">${new Date().toLocaleString('en-GB', { 
                      timeZone: 'Africa/Kampala',
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}</td></tr>
                  </table>
                </div>

                <div style="background-color: #f8f9fa; border-left: 4px solid #E03F3E; padding: 15px; margin-bottom: 20px;">
                  <p style="margin: 0; color: #333; line-height: 1.6;">
                    <strong>📬 Newsletter Subscription:</strong><br>
                    This user has subscribed to receive the latest health articles, medical updates, and health tips from Garrison Health Center.
                  </p>
                </div>

                <div style="margin-top: 20px; padding: 15px; background-color: #fff3e0; border-radius: 8px; border-left: 4px solid #E03F3E;">
                  <p style="margin: 0; color: #E03F3E; font-weight: bold;">⚡ Action Required:</p>
                  <p style="margin: 8px 0 0 0; color: #333;">Please add this email to your newsletter mailing list and consider sending a welcome email to the new subscriber.</p>
                </div>
              </div>
              
              <div style="background-color: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 14px;">
                <p style="margin: 0 0 5px 0;">Garrison Health Center</p>
                <p style="margin: 0; font-style: italic;">"Your health, Our priority"</p>
              </div>
            </div>
          `,
        };
        break;

      case 'contact':
        console.log("📞 Preparing contact form email");
        emailPayload = {
          from: 'Garrison Health <onboarding@resend.dev>',
          to: ['garrisonhealth147@gmail.com'],
          subject: `📞 Contact Form Message: ${data.subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <div style="background: linear-gradient(135deg, #058789 0%, #E03F3E 100%); color: white; padding: 20px; text-align: center;">
                <h2 style="margin: 0; font-size: 24px;">📞 New Contact Form Submission</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Garrison Health Center</p>
              </div>
              
              <div style="padding: 20px;">
                <div style="background-color: #e3f2fd; border-left: 4px solid #058789; padding: 15px; margin-bottom: 20px;">
                  <h3 style="color: #058789; margin: 0 0 15px 0;">👤 Contact Information</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; font-weight: bold; width: 30%; color: #333;">Full Name:</td><td style="padding: 8px 0; color: #555;">${data.name}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Email Address:</td><td style="padding: 8px 0; color: #555;">${data.email}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Phone Number:</td><td style="padding: 8px 0; color: #555;">${data.phone || 'Not provided'}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Subject:</td><td style="padding: 8px 0; color: #555;">${data.subject}</td></tr>
                  </table>
                </div>

                <div style="background-color: #f8f9fa; border-left: 4px solid #E03F3E; padding: 15px; margin-bottom: 20px;">
                  <h3 style="color: #E03F3E; margin: 0 0 15px 0;">💬 Message Content</h3>
                  <div style="background-color: white; border: 1px solid #ddd; border-radius: 4px; padding: 15px; line-height: 1.6; color: #555;">
                    ${data.message.replace(/\n/g, '<br>')}
                  </div>
                </div>

                <div style="background-color: #e3f2fd; border: 1px solid #058789; border-radius: 8px; padding: 20px; text-align: center;">
                  <p style="margin: 0; color: #058789; font-size: 16px;">
                    <strong>📅 Submitted:</strong> ${new Date().toLocaleString('en-GB', { 
                      timeZone: 'Africa/Kampala',
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>

                <div style="margin-top: 20px; padding: 15px; background-color: #fff3e0; border-radius: 8px; border-left: 4px solid #E03F3E;">
                  <p style="margin: 0; color: #E03F3E; font-weight: bold;">⚡ Action Required:</p>
                  <p style="margin: 8px 0 0 0; color: #333;">Please review this message and respond to the customer at their provided email address.</p>
                  <p style="margin: 8px 0 0 0; color: #666; font-size: 14px;">Contact them at: ${data.email}${data.phone ? ` or ${data.phone}` : ''}</p>
                </div>
              </div>
              
              <div style="background-color: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 14px;">
                <p style="margin: 0 0 5px 0;">Garrison Health Center</p>
                <p style="margin: 0; font-style: italic;">"Your health, Our priority"</p>
              </div>
            </div>
          `,
        };
        break;

      default:
        console.error("❌ Invalid email type received:", type);
        return new Response(
          JSON.stringify({ error: "Invalid email type" }),
          { 
            status: 400, 
            headers: { 
              "Content-Type": "application/json",
              ...corsHeaders 
            } 
          }
        );
    }

    console.log("📤 Sending email via Resend API...");
    console.log("📧 Email subject:", emailPayload.subject);

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });

      const responseData = await response.json();
      console.log("📧 Resend API response:", responseData);

      if (!response.ok) {
        console.error("❌ Resend API error:", responseData);
        return new Response(
          JSON.stringify({ 
            error: "Failed to send email",
            details: responseData,
            status: 'resend_api_error'
          }),
          { 
            status: 500, 
            headers: { 
              "Content-Type": "application/json",
              ...corsHeaders 
            } 
          }
        );
      }

      console.log("✅ Email sent successfully!");

      return new Response(
        JSON.stringify({ 
          success: true,
          message: "Email sent successfully", 
          data: responseData
        }),
        { 
          status: 200,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          } 
        }
      );

    } catch (emailError) {
      console.error("💥 Failed to send email via Resend:", emailError);
      
      return new Response(
        JSON.stringify({ 
          error: "Email delivery failed",
          details: emailError.message || "Unknown email service error",
          status: 'email_send_failed'
        }),
        { 
          status: 500, 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          } 
        }
      );
    }

  } catch (error) {
    console.error("💥 Critical error in send-contact-email function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        details: error.message || "Unknown error occurred",
        status: 'internal_server_error'
      }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  }
})
