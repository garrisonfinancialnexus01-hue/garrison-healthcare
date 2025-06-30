
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ArrowLeft, Calendar, Heart, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const UnderstandingHypertension = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link to="/articles" className="inline-flex items-center text-health-red-dark hover:text-health-red transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </div>
        
        <article className="prose prose-lg max-w-none">
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Calendar className="h-4 w-4" />
            <time>May 3, 2025</time>
          </div>
          
          <h1 className="text-3xl font-bold mb-6">Understanding High Blood Pressure (Hypertension): A Comprehensive Guide</h1>
          
          <div className="mb-8">
            <img 
              src="/lovable-uploads/191cda90-e826-4e3f-8c1e-13d09dd334e5.png" 
              alt="Blood pressure monitor showing high readings" 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          <div className="bg-red-50 p-6 border-l-4 border-red-500 my-8 rounded-r-lg">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">The Silent Killer</h3>
                <p className="text-red-700">
                  Healthcare providers call high blood pressure a "silent killer" because you usually don't have any symptoms. 
                  You may not be aware that anything is wrong, but the damage is still occurring within your body.
                </p>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Overview</h2>
          <p>
            The effect of blood pressure on a vessel wall. Blood pressure is measured when the heart contracts, and also when it relaxes.
            If you have high blood pressure, the force of blood against your artery walls is too high when your heart contracts and relaxes.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">What is high blood pressure?</h3>
          <p>
            High blood pressure is when the force of blood pushing against your artery walls is consistently too high. 
            This damages your arteries over time and can lead to serious complications, like heart attack and stroke. 
            "Hypertension" is another word for this common condition.
          </p>

          <p>
            Blood pressure (BP) is the measurement of the pressure or force of blood pushing against blood vessel walls. 
            Your BP reading has two numbers:
          </p>

          <ul className="list-disc pl-6 mb-6">
            <li><strong>The top number is the systolic blood pressure</strong>, which measures the pressure on your artery walls when your heart beats or contracts.</li>
            <li><strong>The bottom number is the diastolic blood pressure</strong>. This measures the pressure on your artery walls between beats when your heart is relaxing.</li>
          </ul>

          <p>Healthcare providers measure blood pressure in millimeters of mercury (mmHg).</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">How do I know if I have high blood pressure?</h3>
          <p>
            Getting your blood pressure checked is the only way to know if it's too high. You can do this by seeing a healthcare provider 
            for a yearly check-up, even if you feel healthy. You won't feel sick if you have high blood pressure. So, these check-ups are 
            crucial and can be lifesaving. If your BP is above the normal range, your provider will recommend lifestyle changes and/or medications to lower your numbers.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">What is considered high blood pressure?</h3>
          <p>
            Definitions of high blood pressure vary slightly depending on where you live. In Uganda, healthcare providers define high blood pressure (hypertension) as:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>A top number (systolic blood pressure) of at least 130 mmHg, and/or</li>
            <li>A bottom number (diastolic blood pressure) of at least 80 mmHg.</li>
          </ul>

          <p>In Europe, healthcare providers define hypertension as:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>A top number of at least 140 mmHg, and/or</li>
            <li>A bottom number of at least 90 mmHg.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">How common is high blood pressure?</h3>
          <p>
            High blood pressure (hypertension) is common in Uganda, with the overall prevalence increasing from 24.3% in 2014 to 31.5% in 2016 
            and affecting over 25% of the adult population.
          </p>
          <p>
            The World Health Organization (WHO) estimates that globally, over 1.2 billion people aged 30 to 79 have hypertension. 
            About 2 in 3 of those individuals live in low- or middle-income countries.
          </p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Symptoms and Causes</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">What are the signs and symptoms of high blood pressure?</h3>
          <p>
            Usually, high blood pressure doesn't cause any signs or symptoms. That's why healthcare providers call it a "silent killer." 
            You could have high blood pressure for years and not know it. In fact, the World Health Organization estimates that 46% of adults 
            with hypertension don't know they have it.
          </p>

          <div className="bg-yellow-50 p-4 border-l-4 border-yellow-500 my-6 rounded-r-lg">
            <p className="text-yellow-800">
              <strong>Emergency Warning:</strong> When your blood pressure is 180/120 mmHg or higher, you may experience symptoms like headaches, 
              heart palpitations or nosebleeds. Blood pressure this high is a hypertensive crisis that requires immediate medical care.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">What are the types of high blood pressure?</h3>
          <p>Your provider will diagnose you with one of two types of high blood pressure:</p>

          <ul className="list-disc pl-6 mb-6">
            <li><strong>Primary hypertension:</strong> Causes of this more common type of high blood pressure (about 90% of all adult cases in Uganda) include aging and lifestyle factors, like not getting enough exercise.</li>
            <li><strong>Secondary hypertension:</strong> Causes of this type of high blood pressure include different medical conditions or a medication you're taking.</li>
          </ul>

          <p>You might also hear about high blood pressure that comes or goes in certain situations. These hypertension types are:</p>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>White coat hypertension:</strong> Your BP is normal at home but elevated in a healthcare setting.</li>
            <li><strong>Masked hypertension:</strong> Your BP is normal in a healthcare setting but elevated at home.</li>
            <li><strong>Sustained hypertension:</strong> Your BP is elevated in healthcare settings and at home.</li>
            <li><strong>Nocturnal hypertension:</strong> Your BP goes up when you sleep.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">What causes hypertension?</h3>
          <p>
            Primary hypertension doesn't have a single, clear cause. Usually, many factors come together to cause it. Common causes include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Unhealthy eating patterns (including a diet high in sodium)</li>
            <li>Lack of physical activity</li>
            <li>High consumption of beverages containing alcohol</li>
          </ul>

          <p>Secondary hypertension has at least one distinct cause that healthcare providers can identify. Common causes include:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Certain medications, including immunosuppressants, NSAIDs and oral contraceptives (the pill)</li>
            <li>Kidney disease</li>
            <li>Obstructive sleep apnea</li>
            <li>Primary aldosteronism (Conn's syndrome)</li>
            <li>Recreational drug use (including amphetamines and cocaine)</li>
            <li>Renal vascular diseases, which are conditions that affect blood flow in your kidneys' arteries and veins (renal artery stenosis is a common example)</li>
            <li>Tobacco use (including smoking, vaping and using smokeless tobacco)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Is high blood pressure genetic?</h3>
          <p>
            Researchers believe genes play a role in high blood pressure. If one or more of your close biological family members have high blood pressure, 
            you also have an increased risk of developing it.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">What are the risk factors for high blood pressure?</h3>
          <p>Risk factors that make you more likely to have high blood pressure include:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Having biological family members with high blood pressure, cardiovascular disease or diabetes</li>
            <li>Being over age 55</li>
            <li>Being Black</li>
            <li>Having certain medical conditions, including chronic kidney disease, metabolic syndrome, obstructive sleep apnea or thyroid disease</li>
            <li>Having overweight or obesity</li>
            <li>Not getting enough exercise</li>
            <li>Eating foods high in sodium</li>
            <li>Smoking or using tobacco products</li>
            <li>Drinking too much</li>
          </ul>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Complications</h2>
          <p>Untreated hypertension may lead to serious health problems, including:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Coronary artery disease (CAD)</li>
            <li>Stroke</li>
            <li>Heart attack</li>
            <li>Peripheral artery disease</li>
            <li>Kidney disease and kidney failure</li>
            <li>Complications during pregnancy</li>
            <li>Eye damage</li>
            <li>Vascular dementia</li>
          </ul>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Diagnosis and Tests</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">How is high blood pressure diagnosed?</h3>
          <p>
            Healthcare providers diagnose high blood pressure by measuring it with an arm cuff. Providers usually measure your blood pressure 
            at annual check-ups and other appointments.
          </p>
          <p>
            If you have high blood pressure readings at two or more appointments, your provider may tell you that you have high blood pressure. 
            They'll talk to you about your medical history and lifestyle to identify possible causes.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Blood pressure categories</h3>
          <p>
            In Uganda, blood pressure categories generally align with international guidelines, such as those from the American Heart Association (AHA) 
            and American College of Cardiology (ACC). The guidelines divide blood pressure readings into four categories:
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-health-green-light">
                  <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Top number (systolic BP)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">And/or</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Bottom number (diastolic BP)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Normal blood pressure</td>
                  <td className="border border-gray-300 px-4 py-2">Less than 120 mmHg</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">AND</td>
                  <td className="border border-gray-300 px-4 py-2">Less than 80 mmHg</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">Elevated blood pressure</td>
                  <td className="border border-gray-300 px-4 py-2">120 to 129 mmHg</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">AND</td>
                  <td className="border border-gray-300 px-4 py-2">Less than 80 mmHg</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">Stage 1 hypertension</td>
                  <td className="border border-gray-300 px-4 py-2">130 to 139 mmHg</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">OR</td>
                  <td className="border border-gray-300 px-4 py-2">80 to 89 mmHg</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">Stage 2 hypertension</td>
                  <td className="border border-gray-300 px-4 py-2">140 mmHg or higher</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">OR</td>
                  <td className="border border-gray-300 px-4 py-2">90 mmHg or higher</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Management and Treatment</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">What are the treatments for high blood pressure?</h3>
          <p>
            High blood pressure treatments include lifestyle changes and medications. Healthcare providers recommend treatment based on your 
            blood pressure readings, the causes of your high blood pressure and your underlying conditions.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Lifestyle changes to lower your blood pressure</h3>
          <p>
            You may be wondering if you can lower your blood pressure naturally. Yes, in some cases, it's possible to lower your blood pressure 
            without medication. For example, your provider may recommend starting with lifestyle changes if you have elevated blood pressure or stage 1 hypertension.
          </p>
          
          <p>Here are some proven ways to lower your blood pressure naturally:</p>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Keep a weight that's healthy for you.</strong> Your healthcare provider can give you a target range.</li>
            <li><strong>Eat a healthy diet.</strong> An example is the DASH diet. This is a way of eating that's full of fruits, vegetables, whole grains and low-fat dairy.</li>
            <li><strong>Cut down on salt.</strong> Ideally, limit your sodium intake to no more than 1,500 milligrams (mg) per day. If this is too difficult at first, you can start by reducing your daily intake by at least 1,000 milligrams.</li>
            <li><strong>Get enough potassium.</strong> Try to consume 3,500 to 5,000 milligrams per day, ideally through the foods you eat rather than supplements. Some foods high in potassium include bananas, avocados and potatoes (with skin).</li>
            <li><strong>Exercise.</strong> Ask your healthcare provider for tips to get started. In general, start slow and work your way up to 150 minutes of aerobic exercise per week. Resistance training (like lifting light weights) is also helpful.</li>
            <li><strong>Limit alcohol.</strong> If you choose to drink beverages containing alcohol, do so in moderation.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Medications to lower your blood pressure</h3>
          <p>Four classes of blood pressure medications are "first-line" (most effective and commonly prescribed) when starting treatment:</p>
          
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Angiotensin-converting enzyme (ACE) inhibitors</strong> block the production of the angiotensin II hormone, which the body naturally uses to manage blood pressure. When the medicine blocks angiotensin II, your blood vessels don't narrow.</li>
            <li><strong>Angiotensin II receptor blockers (ARBs)</strong> block this same hormone from binding with receptors in the blood vessels. ARBs work the same way as ACE inhibitors to keep blood vessels from narrowing.</li>
            <li><strong>Calcium channel blockers</strong> prevent calcium from entering the muscle cells of your heart and blood vessels, allowing these vessels to relax.</li>
            <li><strong>Diuretics (water or fluid pills)</strong> flush excess sodium from your body, reducing the amount of fluid in your blood. People often take diuretics with other high blood pressure medicines, sometimes in one combined pill.</li>
          </ul>

          <div className="bg-blue-50 p-4 border-l-4 border-blue-500 my-6 rounded-r-lg">
            <p className="text-blue-800">
              <strong>Important:</strong> Talk to your provider about possible side effects. If you get side effects that concern you, call your provider. 
              They may change your dose or try a different medication. Don't stop taking the medicine on your own.
            </p>
          </div>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Outlook / Prognosis</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">What can I expect if I have high blood pressure?</h3>
          <p>
            As high blood pressure doesn't cause symptoms, you probably won't feel any different with a high blood pressure diagnosis. 
            But it's important to follow your provider's instructions to bring your blood pressure down so it doesn't cause complications later on.
          </p>

          <p>Once high blood pressure leads to complications, you may start to feel symptoms of conditions like coronary artery disease or peripheral artery disease. These include:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Stable angina</li>
            <li>Shortness of breath</li>
            <li>Leg pain</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Should I check my blood pressure at home?</h3>
          <p>
            Your provider may recommend that you check your blood pressure regularly with a home blood pressure monitor. 
            These are automated electronic monitors you can purchase at most pharmacies or online. For some people, 24-hour ambulatory blood pressure monitoring is necessary.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">How long does high blood pressure last?</h3>
          <p>If you have primary high blood pressure, you'll need to manage it for the rest of your life.</p>
          <p>
            If you have secondary high blood pressure, your blood pressure will most likely come down after you receive treatment for the medical problem that caused it. 
            If a medication caused your high blood pressure, switching to a different medicine may lower your blood pressure.
          </p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Prevention</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Can I prevent high blood pressure?</h3>
          <p>Fortunately, there are things you can do to reduce your risk of developing high blood pressure. These include:</p>
          
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Follow a healthy eating plan.</strong> This is an important step in keeping your blood pressure normal. The DASH diet (Dietary Approaches to Stop Hypertension) emphasizes adding fruits, vegetables and whole grains to your diet.</li>
            <li><strong>Cut down on sodium.</strong> To prevent hypertension, you should reduce the amount of sodium in your diet. Try to keep it below 1,500 milligrams a day.</li>
            <li><strong>Keep a healthy weight.</strong> Going hand-in-hand with a proper diet is keeping a weight that's healthy for you. Losing excess weight with diet and exercise will help lower your blood pressure to healthier levels.</li>
            <li><strong>Keep active.</strong> Even simple physical activities, such as walking, can lower your blood pressure (and your weight).</li>
            <li><strong>Drink alcohol in moderation.</strong> Having more than one drink a day (for women) or more than two drinks a day (for men) can raise blood pressure. One drink is defined as 1 ounce of alcohol, 5 ounces of wine or 12 ounces of beer.</li>
          </ul>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Living With High Blood Pressure</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">When should I see my healthcare provider?</h3>
          <p>See your provider for yearly check-ups. They'll monitor your blood pressure and recommend treatment, if needed, to help you stay healthy.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">What questions should I ask my doctor?</h3>
          <p>Questions that can help you learn more about your risk for high blood pressure or ways to manage existing high blood pressure include:</p>
          
          <ul className="list-disc pl-6 mb-6">
            <li>What's my average blood pressure reading?</li>
            <li>What's an ideal blood pressure reading for me?</li>
            <li>Should I use a home blood pressure monitor?</li>
            <li>What lifestyle changes should I make?</li>
            <li>What kinds of exercise should I do?</li>
            <li>Do I need medications? If so, which ones and what are the side effects?</li>
            <li>Can I keep taking these medications if I get pregnant?</li>
            <li>Are there supplements or nonprescription medications I shouldn't take?</li>
          </ul>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Additional Common Questions</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Can supplements or foods lower blood pressure?</h3>
          <p>
            Research supports the DASH diet as a way to lower blood pressure naturally. Increasing potassium and reducing sodium through your food choices are specific strategies.
          </p>
          
          <p>You may read about many other dietary methods for lowering your blood pressure. These methods don't have the same level or quality of evidence to support their effectiveness. They include:</p>
          
          <ul className="list-disc pl-6 mb-6">
            <li>Probiotics</li>
            <li>Higher intake of protein, flaxseed, fish oil or fiber</li>
            <li>Garlic</li>
            <li>Dark chocolate</li>
            <li>Tea or coffee</li>
            <li>Calcium or magnesium supplements</li>
            <li>Low-carb, vegetarian or Mediterranean diets</li>
          </ul>
          
          <p>Be a cautious consumer, and talk with your healthcare provider to learn more.</p>

          <div className="bg-health-green-light p-6 border-l-4 border-health-green my-8 rounded-r-lg">
            <div className="flex items-start">
              <Heart className="h-6 w-6 text-health-green-dark mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-health-green-dark mb-2">A note from Garrison Health</h3>
                <p className="text-health-green-dark">
                  High blood pressure is a serious but silent condition that can sneak up on you over the years. 
                  Seeing a healthcare provider for regular check-ups can help you learn your numbers. If you don't have access to care, 
                  learn about available community resources (such as wellness fairs) where blood pressure checks are available. 
                  Knowing your blood pressure levels is the first step toward making lifestyle changes that can help keep your arteries healthy.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default UnderstandingHypertension;
