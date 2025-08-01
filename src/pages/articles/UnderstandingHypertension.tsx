import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, BookOpen, Heart, Printer, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SectionProps {
  id: string;
  title: string;
  content: string;
}

const UnderstandingHypertension = () => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: "Understanding High Blood Pressure (Hypertension)",
        text: "Learn about hypertension symptoms, causes, and prevention strategies.",
        url: window.location.href,
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.error("Error sharing:", error));
    } else {
      toast({
        title: "Web Share API not supported",
        description: "Please copy the link and share manually.",
      });
    }
  };

  const subscribeNewsletter = () => {
    const emailInput = document.getElementById('article-newsletter-email') as HTMLInputElement;
    const email = emailInput?.value;

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);

    // Simulate subscription process
    setTimeout(() => {
      setIsSubscribing(false);
      toast({
        title: "Subscribed Successfully!",
        description: "Thank you for subscribing to our newsletter.",
      });
      emailInput.value = '';
    }, 2000);
  };

  const sections = [
    {
      id: "overview",
      title: "Overview",
      content: `The effect of blood pressure on a vessel wall. Blood pressure is measured when the heart contracts, and also when it relaxes.

If you have high blood pressure, the force of blood against your artery walls is too high when your heart contracts and relaxes.`
    },
    {
      id: "what-is",
      title: "What is High Blood Pressure?",
      content: `High blood pressure is when the force of blood pushing against your artery walls is consistently too high. This damages your arteries over time and can lead to serious complications, like heart attack and stroke. "Hypertension" is another word for this common condition.

Healthcare providers call high blood pressure a "silent killer" because you usually don't have any symptoms. So, you may not be aware that anything is wrong, but the damage is still occurring within your body.

Blood pressure (BP) is the measurement of the pressure or force of blood pushing against blood vessel walls. Your BP reading has two numbers:

• The top number is the systolic blood pressure, which measures the pressure on your artery walls when your heart beats or contracts.
• The bottom number is the diastolic blood pressure. This measures the pressure on your artery walls between beats when your heart is relaxing.

Healthcare providers measure blood pressure in millimeters of mercury (mmHg).`
    },
    {
      id: "diagnosis",
      title: "How do I know if I have high blood pressure?",
      content: `Getting your blood pressure checked is the only way to know if it's too high. You can do this by seeing a healthcare provider for a yearly check-up, even if you feel healthy. You won't feel sick if you have high blood pressure. So, these check-ups are crucial and can be lifesaving. If your BP is above the normal range, your provider will recommend lifestyle changes and/or medications to lower your numbers.`
    },
    {
      id: "definitions",
      title: "What is considered high blood pressure?",
      content: `Definitions of high blood pressure vary slightly depending on where you live. In Uganda, healthcare providers define high blood pressure (hypertension) as:
• A top number (systolic blood pressure) of at least 130 mmHg, and/or
• A bottom number (diastolic blood pressure) of at least 80 mmHg.

In Europe, healthcare providers define hypertension as:
• A top number of at least 140 mmHg, and/or
• A bottom number of at least 90 mmHg.`
    },
    {
      id: "causes",
      title: "What causes high blood pressure?",
      content: `High blood pressure usually develops over time. It can happen because of unhealthy lifestyle choices, such as not getting enough regular physical activity. Certain health conditions, such as diabetes, can also increase your risk of developing high blood pressure.

Risk factors for high blood pressure include:
• Age: The risk of high blood pressure increases as you get older.
• Race: High blood pressure is more common in Black adults than in White adults, starting at a younger age.
• Family history: High blood pressure tends to run in families.
• Overweight or obesity: The more you weigh, the more blood you need to supply oxygen and nutrients to your tissues. As the amount of blood circulating through your body increases, so does the pressure on your arteries.
• Not being physically active: People who are inactive tend to have higher heart rates. The higher your heart rate, the harder your heart must work with each contraction and the stronger the force on your arteries.
• Tobacco use: Smoking tobacco or chewing it immediately raises your blood pressure temporarily. Also, the chemicals in tobacco can damage the lining of your artery walls. This can cause your arteries to narrow and increase your risk of heart disease. Secondhand smoke also can increase your heart disease risk.
• Too much salt (sodium) in your diet: Too much sodium in your diet can cause your body to retain fluid, which increases blood pressure.
• Too little potassium in your diet: Potassium helps balance the amount of sodium in your cells. If you don't get enough potassium in your diet, sodium can build up in your blood.
• Drinking too much alcohol: Over time, heavy drinking can damage your heart.
• Stress: High stress levels can lead to a temporary increase in blood pressure.
• Certain chronic conditions: Certain chronic conditions also may increase your risk of high blood pressure, such as kidney disease, diabetes and sleep apnea.
Sometimes pregnancy contributes to high blood pressure, as well.`
    },
    {
      id: "symptoms",
      title: "What are the symptoms of high blood pressure?",
      content: `Most people who have high blood pressure have no signs or symptoms, even if blood pressure readings reach dangerously high levels.

Although some people with high blood pressure may have headaches, shortness of breath or nosebleeds, these signs and symptoms aren't specific and usually don't occur until high blood pressure has reached a severe or life-threatening stage.`
    },
    {
      id: "complications",
      title: "Complications",
      content: `Although uncontrolled high blood pressure can be dangerous, it's often treatable. Working with your healthcare team, you can often lower your blood pressure into a healthy range with lifestyle changes and medicines.

If high blood pressure isn't treated, it can lead to serious health problems, including:
• Heart attack or stroke. High blood pressure can cause hardening and thickening of the arteries (atherosclerosis), which can lead to a heart attack, stroke or other complications.
• Heart failure. High blood pressure forces your heart to work harder to pump blood, which can lead to heart failure.
• Kidney disease or failure. High blood pressure can damage the blood vessels in your kidneys, which can lead to kidney disease or failure.
• Vision loss. High blood pressure can damage the blood vessels in your eyes, which can lead to vision loss.
• Sexual dysfunction. High blood pressure can damage the blood vessels, leading to erectile dysfunction in men or decreased libido in women.
• Peripheral artery disease (PAD). Atherosclerosis caused by high blood pressure can lead to PAD.
• Aortic aneurysm. High blood pressure can cause the aorta, the main blood vessel leading from the heart, to weaken and bulge (aneurysm). If an aneurysm ruptures, it can be life-threatening.
• Hypertensive crisis. A severe increase in blood pressure (systolic number of 180 mmHg or higher or diastolic number of 120 mmHg or higher) can result in a stroke, heart attack, kidney failure or death.`
    },
    {
      id: "prevention",
      title: "Prevention",
      content: `You can prevent high blood pressure by following a heart-healthy lifestyle, which includes:
• Eating a healthy diet.
• Getting regular physical activity.
• Maintaining a healthy weight.
• Limiting alcohol.
• Not smoking.`
    },
    {
      id: "treatment",
      title: "Treatment",
      content: `Treatment for high blood pressure includes lifestyle changes, such as eating a healthy diet and getting regular physical activity. Your healthcare provider may also recommend medicines to lower your blood pressure.

The type of medicines your healthcare provider recommends depends on your blood pressure readings and whether you have other health conditions.

Medicines used to treat high blood pressure include:
• Thiazide diuretics.
• Angiotensin-converting enzyme (ACE) inhibitors.
• Angiotensin II receptor blockers (ARBs).
• Calcium channel blockers.
• Beta blockers.`
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-garrison-teal to-garrison-teal-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 mr-4 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold">Understanding High Blood Pressure</h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8">
            A comprehensive medical guide to hypertension: symptoms, causes, prevention, and treatment strategies.
          </p>
          <div className="flex items-center justify-center">
            <BookOpen className="h-8 w-8 mr-3" />
            <span className="text-lg">Medically reviewed and regularly updated content</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Header */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              High Blood Pressure (Hypertension): A Comprehensive Guide
            </h2>
            <p className="text-gray-600 mb-6">
              Everything you need to know about hypertension - the silent killer that affects millions worldwide.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="mr-4">January 8, 2025</span>
              <Heart className="h-4 w-4 mr-2 text-garrison-red" />
              <span>Medically Reviewed</span>
            </div>
          </div>

          {/* Article Navigation */}
          <div className="bg-gradient-to-r from-garrison-teal/5 to-garrison-red/5 rounded-2xl p-8 mb-12">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Article Sections</h4>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-garrison-teal hover:text-garrison-teal-dark transition-colors block py-1">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Image */}
          <div className="mb-12">
            <img 
              src="/lovable-uploads/0543f5ea-ee91-405a-af24-f372f15921ae.png"
              alt="Understanding High Blood Pressure - Comprehensive Medical Guide"
              className="w-full h-auto rounded-2xl shadow-2xl border border-gray-200"
            />
            <p className="text-center text-gray-500 text-sm mt-4 italic">
              Comprehensive guide to understanding hypertension - Image courtesy of Garrison Healthcare
            </p>
          </div>

          {/* Article Sections */}
          <div className="prose prose-lg max-w-none">
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-garrison-teal to-garrison-teal-dark rounded-2xl p-8 text-white text-center">
            <Heart className="h-16 w-16 mx-auto mb-6 text-white" />
            <h3 className="text-2xl font-bold mb-4">Take Control of Your Blood Pressure Today</h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Don't let hypertension be a silent threat to your health. Schedule a consultation with 
              Garrison Healthcare's medical professionals for personalized blood pressure management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-garrison-teal hover:bg-gray-100 font-bold px-8 py-3 rounded-lg">
                <Link to="/consultation">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-garrison-teal font-bold px-8 py-3 rounded-lg">
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Garrison Healthcare
                </Link>
              </Button>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-garrison-teal" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Informed About Your Health</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Subscribe to Garrison Healthcare's newsletter for the latest health insights, medical breakthroughs, 
                and personalized wellness tips from our expert medical team.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-garrison-teal focus:border-garrison-teal"
                  id="article-newsletter-email"
                />
                <Button 
                  className="bg-garrison-red hover:bg-garrison-red/90 text-white px-6 py-3 rounded-lg font-bold"
                  onClick={subscribeNewsletter}
                  disabled={isSubscribing}
                >
                  {isSubscribing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
              <p className="text-gray-500 text-sm mt-3 text-center">
                Join thousands of health-conscious individuals in Uganda and beyond.
              </p>
            </div>
          </div>

          {/* Article Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-gray-600 mb-2">Published by Garrison Healthcare Team</p>
                <p className="text-sm text-gray-500">
                  Medically reviewed and evidence-based health information
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon" onClick={handlePrint}>
                  <Printer className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={shareArticle}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UnderstandingHypertension;
