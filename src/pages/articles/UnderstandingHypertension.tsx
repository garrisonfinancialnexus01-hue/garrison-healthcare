
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ArrowLeft, Calendar, Heart } from "lucide-react";
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
          
          <h1 className="text-3xl font-bold mb-6">Understanding High Blood Pressure (Hypertension): Causes, Symptoms, and Management</h1>
          
          <div className="mb-8">
            <img 
              src="/lovable-uploads/191cda90-e826-4e3f-8c1e-13d09dd334e5.png" 
              alt="Blood pressure monitor showing high readings" 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Overview</h2>
          <p>
            High blood pressure (hypertension) is a common condition that affects the body's arteries. It's also called hypertension. 
            If you have high blood pressure, the force of the blood pushing against the artery walls is consistently too high. 
            The heart has to work harder to pump blood.
          </p>
          
          <p>
            Blood pressure is measured in millimeters of mercury (mm Hg). In general, hypertension is a blood pressure reading of 
            130/80 millimeters of mercury (mm Hg) or higher.
          </p>
          
          <p>
            The American College of Cardiology and the American Heart Association divide blood pressure into four general categories. 
            Ideal blood pressure is categorized as normal.
          </p>
          
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Normal blood pressure.</strong> Blood pressure is lower than 120/80 mm Hg.</li>
            <li><strong>Elevated blood pressure.</strong> The top number ranges from 120 to 129 mm Hg and the bottom number is below, not above, 80 mm Hg.</li>
            <li><strong>Stage 1 hypertension.</strong> The top number ranges from 130 to 139 mm Hg or the bottom number is between 80 and 89 mm Hg.</li>
            <li><strong>Stage 2 hypertension.</strong> The top number is 140 mm Hg or higher or the bottom number is 90 mm Hg or higher.</li>
          </ul>
          
          <p className="bg-red-50 p-4 border-l-4 border-red-500 my-6">
            <strong>Emergency Warning:</strong> Blood pressure higher than 180/120 mm Hg is considered a hypertensive emergency or crisis. 
            Seek emergency medical help for anyone with these blood pressure numbers.
          </p>
          
          <p>
            Untreated, high blood pressure increases the risk of heart attack, stroke and other serious health problems. 
            It's important to have your blood pressure checked at least every two years starting at age 18. Some people need more-frequent checks.
          </p>
          
          <p>
            Healthy lifestyle habits —such as not smoking, exercising and eating well — can help prevent and treat high blood pressure. 
            Some people need medicine to treat high blood pressure.
          </p>
          
          <Separator className="my-8" />
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Symptoms</h2>
          <p>
            Most people with high blood pressure have no symptoms, even if blood pressure readings reach dangerously high levels. 
            You can have high blood pressure for years without any symptoms.
          </p>
          
          <p>A few people with high blood pressure may have:</p>
          
          <ul className="list-disc pl-6 mb-6">
            <li>Headaches</li>
            <li>Shortness of breath</li>
            <li>Nosebleeds</li>
          </ul>
          
          <p>
            However, these symptoms aren't specific. They usually don't occur until high blood pressure has reached a severe or life-threatening stage.
          </p>
          
          <div className="bg-blue-50 p-4 border-l-4 border-blue-500 my-6">
            <h3 className="font-semibold">More Information</h3>
            <p>Pulse pressure: An indicator of heart health?</p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">When to see a doctor</h2>
          <p>
            Blood pressure screening is an important part of general health care. How often you should get your blood pressure 
            checked depends on your age and overall health.
          </p>
          
          <p>
            Ask your provider for a blood pressure reading at least every two years starting at age 18. If you're age 40 or older, 
            or you're 18 to 39 with a high risk of high blood pressure, ask for a blood pressure check every year.
          </p>
          
          <p>
            Your care provider will likely recommend more-frequent readings if have high blood pressure or other risk factors for heart disease.
          </p>
          
          <p>
            Children age 3 and older may have blood pressure measured as a part of their yearly checkups.
          </p>
          
          <p>
            If you don't regularly see a care provider, you may be able to get a free blood pressure screening at a health resource fair 
            or other locations in your community. Free blood pressure machines are also available in some stores and pharmacies. 
            The accuracy of these machines depends on several things, such as a correct cuff size and proper use of the machines. 
            Ask your health care provider for advice on using public blood pressure machines.
          </p>
          
          <Separator className="my-8" />
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Causes</h2>
          <p>
            Blood pressure is determined by two things: the amount of blood the heart pumps and how hard it is for the blood to move through the arteries. 
            The more blood the heart pumps and the narrower the arteries, the higher the blood pressure.
          </p>
          
          <p>There are two main types of high blood pressure.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Primary hypertension, also called essential hypertension</h3>
          <p>
            For most adults, there's no identifiable cause of high blood pressure. This type of high blood pressure is called primary hypertension or essential hypertension. 
            It tends to develop gradually over many years. Plaque buildup in the arteries, called atherosclerosis, increases the risk of high blood pressure.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Secondary hypertension</h3>
          <p>
            This type of high blood pressure is caused by an underlying condition. It tends to appear suddenly and cause higher blood pressure than does primary hypertension. 
            Conditions and medicines that can lead to secondary hypertension include:
          </p>
          
          <ul className="list-disc pl-6 mb-6">
            <li>Adrenal gland tumors</li>
            <li>Blood vessel problems present at birth, also called congenital heart defects</li>
            <li>Cough and cold medicines, some pain relievers, birth control pills, and other prescription drugs</li>
            <li>Illegal drugs, such as cocaine and amphetamines</li>
            <li>Kidney disease</li>
            <li>Obstructive sleep apnea</li>
            <li>Thyroid problems</li>
          </ul>
          
          <p>
            Sometimes just getting a health checkup causes blood pressure to increase. This is called white coat hypertension.
          </p>
          
          <Separator className="my-8" />
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Risk factors</h2>
          <p>High blood pressure has many risk factors, including:</p>
          
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Age.</strong> The risk of high blood pressure increases with age. Until about age 64, high blood pressure is more common in men. Women are more likely to develop high blood pressure after age 65.</li>
            <li><strong>Race.</strong> High blood pressure is particularly common among Black people. It develops at an earlier age in Black people than it does in white people.</li>
            <li><strong>Family history.</strong> You're more likely to develop high blood pressure if you have a parent or sibling with the condition.</li>
            <li><strong>Obesity or being overweight.</strong> Excess weight causes changes in the blood vessels, the kidneys and other parts of the body. These changes often increase blood pressure. Being overweight or having obesity also raises the risk of heart disease and its risk factors, such as high cholesterol.</li>
            <li><strong>Lack of exercise.</strong> Not exercising can cause weight gain. Increased weight raises the risk of high blood pressure. People who are inactive also tend to have higher heart rates.</li>
            <li><strong>Tobacco use or vaping.</strong> Smoking, chewing tobacco or vaping immediately raises blood pressure for a short while. Tobacco smoking injures blood vessel walls and speeds up the process of hardening of the arteries. If you smoke, ask your care provider for strategies to help you quit.</li>
            <li><strong>Too much salt.</strong> A lot of salt — also called sodium — in the body can cause the body to retain fluid. This increases blood pressure.</li>
            <li><strong>Low potassium levels.</strong> Potassium helps balance the amount of salt in the body's cells. A proper balance of potassium is important for good heart health. Low potassium levels may be due to a lack of potassium in the diet or certain health conditions, including dehydration.</li>
            <li><strong>Drinking too much alcohol.</strong> Alcohol use has been linked with increased blood pressure, particularly in men.</li>
            <li><strong>Stress.</strong> High levels of stress can lead to a temporary increase in blood pressure. Stress-related habits such as eating more, using tobacco or drinking alcohol can lead to further increases in blood pressure.</li>
            <li><strong>Certain chronic conditions.</strong> Kidney disease, diabetes and sleep apnea are some of the conditions that can lead to high blood pressure.</li>
            <li><strong>Pregnancy.</strong> Sometimes pregnancy causes high blood pressure.</li>
          </ul>
          
          <p>
            High blood pressure is most common in adults. But kids can have high blood pressure too. High blood pressure in children may be caused by problems with the kidneys or heart. 
            But for a growing number of kids, high blood pressure is due to lifestyle habits such as an unhealthy diet and lack of exercise.
          </p>
          
          <Separator className="my-8" />
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Complications</h2>
          <p>
            The excessive pressure on the artery walls caused by high blood pressure can damage blood vessels and body organs. 
            The higher the blood pressure and the longer it goes uncontrolled, the greater the damage.
          </p>
          
          <p>Uncontrolled high blood pressure can lead to complications including:</p>
          
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Heart attack or stroke.</strong> Hardening and thickening of the arteries due to high blood pressure or other factors can lead to a heart attack, stroke or other complications.</li>
            <li><strong>Aneurysm.</strong> Increased blood pressure can cause a blood vessel to weaken and bulge, forming an aneurysm. If an aneurysm ruptures, it can be life-threatening.</li>
            <li><strong>Heart failure.</strong> When you have high blood pressure, the heart has to work harder to pump blood. The strain causes the walls of the heart's pumping chamber to thicken. This condition is called left ventricular hypertrophy. Eventually, the heart can't pump enough blood to meet the body's needs, causing heart failure.</li>
            <li><strong>Kidney problems.</strong> High blood pressure can cause the blood vessels in the kidneys to become narrow or weak. This can lead to kidney damage.</li>
            <li><strong>Eye problems.</strong> Increased blood pressure can cause thickened, narrowed or torn blood vessels in the eyes. This can result in vision loss.</li>
            <li><strong>Metabolic syndrome.</strong> This syndrome is a group of disorders of the body's metabolism. It involves the irregular breakdown of sugar, also called glucose. The syndrome includes increased waist size, high triglycerides, decreased high-density lipoprotein (HDL or "good") cholesterol, high blood pressure and high blood sugar levels. These conditions make you more likely to develop diabetes, heart disease and stroke.</li>
            <li><strong>Changes with memory or understanding.</strong> Uncontrolled high blood pressure may affect the ability to think, remember and learn.</li>
            <li><strong>Dementia.</strong> Narrowed or blocked arteries can limit blood flow to the brain. This can cause a certain type of dementia called vascular dementia. A stroke that interrupts blood flow to the brain also can cause vascular dementia.</li>
          </ul>
        </article>
      </div>
    </Layout>
  );
};

export default UnderstandingHypertension;
