
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
          from: 'Garrison Health <contact@garrisonhealth147.com>',
          to: ['garrisonhealth147@gmail.com'],
          subject: `New Health Consultation - ${data.condition}`,
          html: `
            <h2>New Health Consultation Submission</h2>
            <hr>
            <h3>Patient Details:</h3>
            <p><strong>Name:</strong> ${data.patientName}</p>
            <p><strong>Age:</strong> ${data.age}</p>
            <p><strong>Gender:</strong> ${data.gender}</p>
            <p><strong>Contact:</strong> ${data.contact}</p>
            <p><strong>National ID:</strong> ${data.nationalId || 'Not provided'}</p>
            
            <h3>Consultation Details:</h3>
            <p><strong>Condition:</strong> ${data.condition}</p>
            <p><strong>Type:</strong> ${data.type}</p>
            <p><strong>System:</strong> ${data.system}</p>
            <p><strong>Fee:</strong> ${data.fee.toLocaleString()} UGX</p>
            <p><strong>Preferred Mode:</strong> ${data.consultationMode}</p>
            <p><strong>Payment Status:</strong> ${data.paid ? 'Paid' : 'Unpaid'}</p>
            
            <h3>Medical Information:</h3>
            <p><strong>Symptoms:</strong><br>${data.symptomsDescription}</p>
            <p><strong>Medical History:</strong><br>${data.medicalHistory || 'None provided'}</p>
            <p><strong>Onset Date:</strong> ${data.onsetDate || 'Not specified'}</p>
            
            <hr>
            <p><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>
          `,
        };
        break;

      case 'newsletter':
        emailOptions = {
          from: 'Garrison Health <contact@garrisonhealth147.com>',
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
          from: 'Garrison Health <contact@garrisonhealth147.com>',
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
