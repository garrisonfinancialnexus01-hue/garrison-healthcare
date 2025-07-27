
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { 
      patientName, 
      nationalId, 
      age, 
      phoneNumber, 
      symptoms, 
      medicalHistory, 
      disease, 
      consultationMode, 
      conditionType, 
      fee 
    } = await req.json()

    console.log('Consultation data received:', {
      patientName,
      nationalId,
      age,
      phoneNumber,
      symptoms,
      medicalHistory,
      disease,
      consultationMode,
      conditionType,
      fee
    })

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #058789 0%, #E03F3E 100%); border-radius: 10px;">
          <img src="https://yqkhjxnjetvhmmwrwojo.supabase.co/storage/v1/object/public/images/dc785631-58ca-4c7e-9b23-7135677f219b.png" alt="Garrison Healthcare Logo" style="height: 80px; margin-bottom: 15px;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">GARRISON HEALTHCARE</h1>
          <p style="color: white; margin: 5px 0 0 0; font-size: 16px;">Your health, Our priority</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #058789; margin-top: 0; font-size: 22px; border-bottom: 2px solid #E03F3E; padding-bottom: 10px;">🩺 New Health Consultation Request</h2>
          
          <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #058789; margin-bottom: 20px;">
            <h3 style="color: #058789; margin-top: 0; font-size: 18px;">Patient Information</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${patientName}</p>
            <p style="margin: 8px 0;"><strong>National ID:</strong> ${nationalId}</p>
            <p style="margin: 8px 0;"><strong>Age:</strong> ${age}</p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> ${phoneNumber}</p>
          </div>
          
          <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #E03F3E; margin-bottom: 20px;">
            <h3 style="color: #E03F3E; margin-top: 0; font-size: 18px;">Consultation Details</h3>
            <p style="margin: 8px 0;"><strong>Condition Type:</strong> ${conditionType}</p>
            <p style="margin: 8px 0;"><strong>Disease/Condition:</strong> ${disease}</p>
            <p style="margin: 8px 0;"><strong>Consultation Mode:</strong> ${consultationMode}</p>
            <p style="margin: 8px 0;"><strong>Consultation Fee:</strong> ${fee}</p>
          </div>
          
          <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #058789;">
            <h3 style="color: #058789; margin-top: 0; font-size: 18px;">Medical Information</h3>
            <div style="margin-bottom: 15px;">
              <strong>Patient's Symptoms:</strong>
              <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin-top: 5px; border: 1px solid #e9ecef;">
                ${symptoms || 'No symptoms provided'}
              </div>
            </div>
            ${medicalHistory ? `
              <div>
                <strong>Medical History:</strong>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin-top: 5px; border: 1px solid #e9ecef;">
                  ${medicalHistory}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, rgba(5, 135, 137, 0.1) 0%, rgba(224, 63, 62, 0.1) 100%); border-radius: 8px; border: 1px solid rgba(5, 135, 137, 0.2);">
          <p style="margin: 0; color: #058789; font-size: 14px;">
            Please contact the patient at <strong>${phoneNumber}</strong> to schedule the consultation.
          </p>
          <p style="margin: 10px 0 0 0; color: #666; font-size: 12px;">
            This consultation request was submitted through the Garrison Healthcare website.
          </p>
        </div>
      </div>
    `

    console.log('Sending email to garrisonhealth147@gmail.com')

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      },
      body: JSON.stringify({
        from: 'Garrison Healthcare <onboarding@resend.dev>',
        to: ['garrisonhealth147@gmail.com'],
        subject: `🩺 New Health Consultation Request - ${patientName}`,
        html: emailContent,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('Resend API error:', error)
      throw new Error(`Failed to send email: ${error}`)
    }

    const data = await res.json()
    console.log('Email sent successfully:', data)

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error in consultation-email function:', error)
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to send consultation email',
      details: error.toString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
