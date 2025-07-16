
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from 'https://esm.sh/resend@0.16.0'

const resendApiKey = Deno.env.get('RESEND_API_KEY');
console.log("🚀 Edge function starting, checking API key...");

if (!resendApiKey) {
  console.error("🚨 CRITICAL: RESEND_API_KEY environment variable is not set");
} else {
  console.log("✅ RESEND_API_KEY is available");
}

const resend = new Resend(resendApiKey);

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

    // Check API key before processing
    if (!resendApiKey) {
      console.error("🚨 API key missing - cannot send email");
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
    }
    
    // Parse request body - Supabase functions.invoke sends JSON automatically
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

    let emailOptions;

    // Handle different email types
    switch (type) {
      case 'consultation':
        console.log("🏥 Preparing consultation email with data:", {
          patientName: data.patientName,
          condition: data.condition,
          email: "garrisonhealth147@gmail.com"
        });
        
        const getConditionTypeLabel = (type: string) => {
          switch (type) {
            case "acute":
              return "Acute Condition";
            case "chronic":
              return "Chronic Condition";
            case "obstetrics":
              return "Obstetrics & Gynaecology";
            case "paediatrics":
              return "Paediatrics";
            case "surgical":
              return "Surgical";
            default:
              return type;
          }
        };
        
        emailOptions = {
          from: 'Garrison Health <onboarding@resend.dev>',
          to: ['garrisonhealth147@gmail.com'],
          subject: `🏥 New Health Consultation Request - ${data.condition}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <div style="background: linear-gradient(135deg, #058789 0%, #E03F3E 100%); color: white; padding: 20px; text-align: center;">
                <h2 style="margin: 0; font-size: 24px;">🏥 New Health Consultation Request</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Garrison Health Center</p>
              </div>
              
              <div style="padding: 20px;">
                <!-- Consultation Summary Section -->
                <div style="background-color: #e3f2fd; border-left: 4px solid #058789; padding: 15px; margin-bottom: 20px;">
                  <h3 style="color: #058789; margin: 0 0 15px 0;">📋 Consultation Summary</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; font-weight: bold; width: 30%; color: #333;">Type:</td><td style="padding: 8px 0; color: #555;">${getConditionTypeLabel(data.conditionType)}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">System:</td><td style="padding: 8px 0; color: #555;">${data.system || 'Not specified'}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Condition:</td><td style="padding: 8px 0; color: #555;">${data.condition || 'Not specified'}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Consultation Fee:</td><td style="padding: 8px 0; color: #E03F3E; font-weight: bold;">${data.fee ? data.fee.toLocaleString() : 'N/A'} UGX</td></tr>
                  </table>
                </div>

                <!-- Patient Information Section -->
                <div style="background-color: #f8f9fa; border-left: 4px solid #058789; padding: 15px; margin-bottom: 20px;">
                  <h3 style="color: #058789; margin: 0 0 15px 0;">👤 Patient Information</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; font-weight: bold; width: 30%; color: #333;">Full Name:</td><td style="padding: 8px 0; color: #555;">${data.patientName || 'Not provided'}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Age:</td><td style="padding: 8px 0; color: #555;">${data.age || 'Not provided'} years</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Gender:</td><td style="padding: 8px 0; color: #555;">${data.gender ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : 'Not provided'}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Contact:</td><td style="padding: 8px 0; color: #555;">${data.contact || 'Not provided'}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">National ID:</td><td style="padding: 8px 0; color: #555;">${data.nationalId || 'Not provided'}</td></tr>
                  </table>
                </div>

                <!-- Consultation Details Section -->
                <div style="background-color: #f8f9fa; border-left: 4px solid #E03F3E; padding: 15px; margin-bottom: 20px;">
                  <h3 style="color: #E03F3E; margin: 0 0 15px 0;">🩺 Consultation Details</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; font-weight: bold; width: 30%; color: #333;">Preferred Mode:</td><td style="padding: 8px 0; color: #555;">${data.consultationMode ? data.consultationMode.charAt(0).toUpperCase() + data.consultationMode.slice(1) : 'Not specified'}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Payment Status:</td><td style="padding: 8px 0; color: ${data.paid ? '#4caf50' : '#ff9800'}; font-weight: bold;">${data.paid ? '✅ Paid' : '⏳ Pending'}</td></tr>
                  </table>
                </div>

                <!-- Medical Information Section -->
                <div style="background-color: #f8f9fa; border-left: 4px solid #058789; padding: 15px; margin-bottom: 20px;">
                  <h3 style="color: #058789; margin: 0 0 15px 0;">📋 Medical Information</h3>
                  <div style="margin-bottom: 15px;">
                    <strong style="color: #333;">Patient's Symptoms:</strong>
                    <div style="background-color: white; border: 1px solid #ddd; border-radius: 4px; padding: 12px; margin-top: 8px; line-height: 1.5; color: #555;">
                      ${data.symptomsDescription || 'No symptoms described'}
                    </div>
                  </div>
                  
                  <div style="margin-bottom: 15px;">
                    <strong style="color: #333;">Medical History:</strong>
                    <div style="background-color: white; border: 1px solid #ddd; border-radius: 4px; padding: 12px; margin-top: 8px; line-height: 1.5; color: #555;">
                      ${data.medicalHistory || 'No medical history provided'}
                    </div>
                  </div>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; font-weight: bold; width: 30%; color: #333;">Symptom Onset:</td><td style="padding: 8px 0; color: #555;">${data.onsetDate || 'Not specified'}</td></tr>
                  </table>
                </div>

                <!-- Submission Details -->
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

                <!-- Action Required -->
                <div style="margin-top: 20px; padding: 15px; background-color: #fff3e0; border-radius: 8px; border-left: 4px solid #E03F3E;">
                  <p style="margin: 0; color: #E03F3E; font-weight: bold;">⚡ Action Required:</p>
                  <p style="margin: 8px 0 0 0; color: #333;">Please review this consultation request and contact the patient to schedule their appointment.</p>
                  <p style="margin: 8px 0 0 0; color: #666; font-size: 14px;">Contact: Tel: +256745101519 or +256761281222</p>
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

      case 'newsletter':
        emailOptions = {
          from: 'Garrison Health <onboarding@resend.dev>',
          to: ['garrisonhealth147@gmail.com'],
          subject: '📧 New Newsletter Subscription',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #058789;">📧 New Newsletter Subscription</h2>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Subscription Date:</strong> ${new Date().toLocaleString()}</p>
              <p>This user has subscribed to receive the latest health articles and medical updates.</p>
            </div>
          `,
        };
        break;

      case 'contact':
        emailOptions = {
          from: 'Garrison Health <onboarding@resend.dev>',
          to: ['garrisonhealth147@gmail.com'],
          subject: `📞 Contact Form: ${data.subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #058789;">📞 New Contact Form Submission</h2>
              <hr style="border: 1px solid #ddd;">
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
              <p><strong>Subject:</strong> ${data.subject}</p>
              
              <h3>Message:</h3>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
                ${data.message}
              </div>
              
              <hr style="border: 1px solid #ddd; margin-top: 20px;">
              <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
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

    console.log("📤 Attempting to send email to:", emailOptions.to);
    console.log("📧 Email subject:", emailOptions.subject);

    try {
      const emailResult = await resend.emails.send(emailOptions);
      console.log("✅ Email sent successfully:", emailResult);

      if (emailResult.error) {
        console.error("❌ Resend API returned an error:", emailResult.error);
        return new Response(
          JSON.stringify({ 
            error: "Failed to send email",
            details: emailResult.error,
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

      return new Response(
        JSON.stringify({ 
          success: true,
          message: "Email sent successfully", 
          data: emailResult
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
      
      // More detailed error information
      const errorDetails = {
        message: emailError.message || "Unknown email service error",
        name: emailError.name || "EmailError",
        status: emailError.status || 'unknown',
        cause: emailError.cause || 'network_or_api_error'
      };
      
      console.error("🔍 Detailed error info:", errorDetails);
      
      return new Response(
        JSON.stringify({ 
          error: "Email delivery failed",
          details: errorDetails.message,
          status: 'email_send_failed',
          errorInfo: errorDetails
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
        stack: error.stack,
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
