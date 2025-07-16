
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
};

serve(async (req) => {
  console.log(`📨 New consultation email request received`);
  
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
    
    // Check API key
    if (!resendApiKey) {
      console.error("🚨 RESEND_API_KEY not found");
      return new Response(
        JSON.stringify({ 
          error: "Email service not configured",
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
    
    // Parse request body
    let consultationData;
    try {
      consultationData = await req.json();
      console.log("📋 Consultation data received:", { 
        patientName: consultationData.patientName,
        condition: consultationData.condition 
      });
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid request data",
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

    // Helper function to get condition type label
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

    // Create email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #058789 0%, #E03F3E 100%); color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px;">🏥 New Health Consultation Request</h2>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Garrison Health Center</p>
        </div>
        
        <div style="padding: 20px;">
          <!-- Consultation Summary -->
          <div style="background-color: #e3f2fd; border-left: 4px solid #058789; padding: 15px; margin-bottom: 20px;">
            <h3 style="color: #058789; margin: 0 0 15px 0;">📋 Consultation Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 30%; color: #333;">Type:</td><td style="padding: 8px 0; color: #555;">${getConditionTypeLabel(consultationData.conditionType)}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">System:</td><td style="padding: 8px 0; color: #555;">${consultationData.system || 'Not specified'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Condition:</td><td style="padding: 8px 0; color: #555;">${consultationData.condition || 'Not specified'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Consultation Fee:</td><td style="padding: 8px 0; color: #E03F3E; font-weight: bold;">${consultationData.fee ? consultationData.fee.toLocaleString() : 'N/A'} UGX</td></tr>
            </table>
          </div>

          <!-- Patient Information -->
          <div style="background-color: #f8f9fa; border-left: 4px solid #058789; padding: 15px; margin-bottom: 20px;">
            <h3 style="color: #058789; margin: 0 0 15px 0;">👤 Patient Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 30%; color: #333;">Full Name:</td><td style="padding: 8px 0; color: #555;">${consultationData.patientName || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Age:</td><td style="padding: 8px 0; color: #555;">${consultationData.age || 'Not provided'} years</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Gender:</td><td style="padding: 8px 0; color: #555;">${consultationData.gender ? consultationData.gender.charAt(0).toUpperCase() + consultationData.gender.slice(1) : 'Not provided'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Contact:</td><td style="padding: 8px 0; color: #555;">${consultationData.contact || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">National ID:</td><td style="padding: 8px 0; color: #555;">${consultationData.nationalId || 'Not provided'}</td></tr>
            </table>
          </div>

          <!-- Consultation Details -->
          <div style="background-color: #f8f9fa; border-left: 4px solid #E03F3E; padding: 15px; margin-bottom: 20px;">
            <h3 style="color: #E03F3E; margin: 0 0 15px 0;">🩺 Consultation Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 30%; color: #333;">Preferred Mode:</td><td style="padding: 8px 0; color: #555;">${consultationData.consultationMode ? consultationData.consultationMode.charAt(0).toUpperCase() + consultationData.consultationMode.slice(1) : 'Not specified'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Payment Status:</td><td style="padding: 8px 0; color: ${consultationData.paid ? '#4caf50' : '#ff9800'}; font-weight: bold;">${consultationData.paid ? '✅ Paid' : '⏳ Pending'}</td></tr>
            </table>
          </div>

          <!-- Medical Information -->
          <div style="background-color: #f8f9fa; border-left: 4px solid #058789; padding: 15px; margin-bottom: 20px;">
            <h3 style="color: #058789; margin: 0 0 15px 0;">📋 Medical Information</h3>
            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Patient's Symptoms:</strong>
              <div style="background-color: white; border: 1px solid #ddd; border-radius: 4px; padding: 12px; margin-top: 8px; line-height: 1.5; color: #555;">
                ${consultationData.symptomsDescription || 'No symptoms described'}
              </div>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Medical History:</strong>
              <div style="background-color: white; border: 1px solid #ddd; border-radius: 4px; padding: 12px; margin-top: 8px; line-height: 1.5; color: #555;">
                ${consultationData.medicalHistory || 'No medical history provided'}
              </div>
            </div>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 30%; color: #333;">Symptom Onset:</td><td style="padding: 8px 0; color: #555;">${consultationData.onsetDate || 'Not specified'}</td></tr>
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
    `;

    // Send email using fetch instead of Resend SDK
    console.log("📤 Sending consultation email via Resend API...");
    
    const emailPayload = {
      from: 'Garrison Health <onboarding@resend.dev>',
      to: ['garrisonhealth147@gmail.com'],
      subject: `🏥 New Health Consultation Request - ${consultationData.condition}`,
      html: emailHtml,
    };

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
          details: responseData
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
        message: "Consultation email sent successfully",
        emailId: responseData.id
      }),
      { 
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );

  } catch (error) {
    console.error("💥 Critical error:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        details: error.message
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
