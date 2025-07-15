
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from 'https://esm.sh/resend@0.16.0'

const resendApiKey = Deno.env.get('RESEND_API_KEY');
if (!resendApiKey) {
  console.error("RESEND_API_KEY environment variable is not set");
}

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
    
    const requestBody = await req.json();
    const { type, ...data } = requestBody;
    
    console.log("Received email request:", { type, data });

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

    let emailOptions;

    // Handle different email types
    switch (type) {
      case 'consultation':
        emailOptions = {
          from: 'Garrison Health <onboarding@resend.dev>',
          to: ['garrisonhealth147@gmail.com'],
          subject: `🏥 New Health Consultation Request - ${data.condition}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <div style="background: linear-gradient(135deg, #00a99d 0%, #00796b 100%); color: white; padding: 20px; text-align: center;">
                <h2 style="margin: 0; font-size: 24px;">🏥 New Health Consultation Request</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Garrison Health Center</p>
              </div>
              
              <div style="padding: 20px;">
                <div style="background-color: #f8f9fa; border-left: 4px solid #00a99d; padding: 15px; margin-bottom: 20px;">
                  <h3 style="color: #00796b; margin: 0 0 15px 0;">👤 Patient Information</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 5px 0; font-weight: bold; width: 30%;">Full Name:</td><td style="padding: 5px 0;">${data.patientName}</td></tr>
                    <tr><td style="padding: 5px 0; font-weight: bold;">Age:</td><td style="padding: 5px 0;">${data.age} years</td></tr>
                    <tr><td style="padding: 5px 0; font-weight: bold;">Gender:</td><td style="padding: 5px 0;">${data.gender.charAt(0).toUpperCase() + data.gender.slice(1)}</td></tr>
                    <tr><td style="padding: 5px 0; font-weight: bold;">Contact:</td><td style="padding: 5px 0;">${data.contact}</td></tr>
                    <tr><td style="padding: 5px 0; font-weight: bold;">National ID:</td><td style="padding: 5px 0;">${data.nationalId || 'Not provided'}</td></tr>
                  </table>
                </div>

                <div style="background-color: #f8f9fa; border-left: 4px solid #00a99d; padding: 15px; margin-bottom: 20px;">
                  <h3 style="color: #00796b; margin: 0 0 15px 0;">🩺 Consultation Details</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 5px 0; font-weight: bold; width: 30%;">Condition:</td><td style="padding: 5px 0;">${data.condition}</td></tr>
                    <tr><td style="padding: 5px 0; font-weight: bold;">Category:</td><td style="padding: 5px 0;">${data.conditionType.charAt(0).toUpperCase() + data.conditionType.slice(1)}</td></tr>
                    <tr><td style="padding: 5px 0; font-weight: bold;">System:</td><td style="padding: 5px 0;">${data.system}</td></tr>
                    <tr><td style="padding: 5px 0; font-weight: bold;">Consultation Fee:</td><td style="padding: 5px 0; color: #d32f2f; font-weight: bold;">${data.fee ? data.fee.toLocaleString() : 'N/A'} UGX</td></tr>
                    <tr><td style="padding: 5px 0; font-weight: bold;">Preferred Mode:</td><td style="padding: 5px 0;">${data.consultationMode.charAt(0).toUpperCase() + data.consultationMode.slice(1)}</td></tr>
                    <tr><td style="padding: 5px 0; font-weight: bold;">Payment Status:</td><td style="padding: 5px 0; color: ${data.paid ? '#4caf50' : '#ff9800'}; font-weight: bold;">${data.paid ? '✅ Paid' : '⏳ Pending'}</td></tr>
                  </table>
                </div>

                <div style="background-color: #f8f9fa; border-left: 4px solid #00a99d; padding: 15px; margin-bottom: 20px;">
                  <h3 style="color: #00796b; margin: 0 0 15px 0;">📋 Medical Information</h3>
                  <div style="margin-bottom: 15px;">
                    <strong style="color: #555;">Patient's Symptoms:</strong>
                    <div style="background-color: white; border: 1px solid #ddd; border-radius: 4px; padding: 10px; margin-top: 5px; line-height: 1.5;">
                      ${data.symptomsDescription || 'No symptoms described'}
                    </div>
                  </div>
                  
                  <div style="margin-bottom: 15px;">
                    <strong style="color: #555;">Medical History:</strong>
                    <div style="background-color: white; border: 1px solid #ddd; border-radius: 4px; padding: 10px; margin-top: 5px; line-height: 1.5;">
                      ${data.medicalHistory || 'No medical history provided'}
                    </div>
                  </div>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 5px 0; font-weight: bold; width: 30%;">Symptom Onset:</td><td style="padding: 5px 0;">${data.onsetDate || 'Not specified'}</td></tr>
                  </table>
                </div>

                <div style="background-color: #e3f2fd; border: 1px solid #2196f3; border-radius: 4px; padding: 15px; text-align: center;">
                  <p style="margin: 0; color: #1976d2;">
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

                <div style="margin-top: 20px; padding: 15px; background-color: #fff3e0; border-radius: 4px; border-left: 4px solid #ff9800;">
                  <p style="margin: 0; color: #f57c00; font-weight: bold;">⚡ Action Required:</p>
                  <p style="margin: 5px 0 0 0; color: #ef6c00;">Please review this consultation request and contact the patient to schedule their appointment.</p>
                </div>
              </div>
              
              <div style="background-color: #f5f5f5; padding: 15px; text-align: center; color: #666; font-size: 12px;">
                <p style="margin: 0;">Garrison Health Center - "Your health, Our priority"</p>
              </div>
            </div>
          `,
        };
        break;

      case 'newsletter':
        emailOptions = {
          from: 'Garrison Health <onboarding@resend.dev>',
          to: ['garrisonhealth147@gmail.com'],
          subject: 'New Newsletter Subscription',
          html: `
            <h2>New Newsletter Subscription</h2>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subscription Date:</strong> ${new Date().toLocaleString()}</p>
            <p>This user has subscribed to receive the latest health articles and medical updates.</p>
          `,
        };
        break;

      case 'contact':
        emailOptions = {
          from: 'Garrison Health <onboarding@resend.dev>',
          to: ['garrisonhealth147@gmail.com'],
          subject: `Contact Form: ${data.subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <hr>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            
            <h3>Message:</h3>
            <p>${data.message}</p>
            
            <hr>
            <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
          `,
        };
        break;

      default:
        return new Response(
          JSON.stringify({ error: "Invalid email type" }),
          { 
            status: 400, 
            headers: { 
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*" 
            } 
          }
        );
    }

    console.log("Sending email with options:", emailOptions);

    const data_result = await resend.emails.send(emailOptions);
    console.log("Email sent successfully:", data_result);

    return new Response(
      JSON.stringify({ 
        message: "Email sent successfully", 
        data: data_result
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
