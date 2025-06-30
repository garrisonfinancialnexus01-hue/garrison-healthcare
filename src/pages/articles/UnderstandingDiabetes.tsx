
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ArrowLeft, Calendar, Heart, AlertTriangle, Activity } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const UnderstandingDiabetes = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/articles" className="hover:text-foreground">Articles</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Understanding Diabetes</span>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Understanding Diabetes: Symptoms, Causes, and Management</h1>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>April 12, 2025</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/010d885b-6a86-4fa9-b298-275e7ce0ecb1.png" 
            alt="Diabetes blood sugar monitoring illustration" 
            className="w-full h-auto rounded-lg object-cover"
          />
          <p className="text-sm text-muted-foreground mt-2 text-center">Regular blood sugar monitoring is essential for diabetes management</p>
        </div>

        {/* Important Alert */}
        <div className="bg-health-red-light border border-health-red/20 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-health-red mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-health-red-dark mb-2">Important</h3>
              <p className="text-sm">
                Diabetes is a lifelong condition that requires consistent management. If you experience symptoms like increased thirst, frequent urination, or unexplained weight loss, see a healthcare provider promptly for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <Activity className="h-6 w-6 mr-2 text-health-red" />
            Overview
          </h2>
          
          <p className="mb-4">
            Diabetes is a common condition that affects people of all ages. There are several forms of diabetes. Type 2 is the most common. 
            A combination of treatment strategies can help you manage the condition to live a healthy life and prevent complications.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">What is diabetes?</h3>
          <p className="mb-4">
            Diabetes is a condition that happens when your blood sugar (glucose) is too high. It develops when your pancreas doesn't make enough insulin or any at all, or when your body isn't responding to the effects of insulin properly. Diabetes affects people of all ages. Most forms of diabetes are chronic (lifelong), and all forms are manageable with medications and/or lifestyle changes.
          </p>

          <p className="mb-4">
            Glucose (sugar) mainly comes from carbohydrates in your food and drinks. It's your body's go-to source of energy. Your blood carries glucose to all your body's cells to use for energy.
          </p>

          <p className="mb-4">
            When glucose is in your bloodstream, it needs help — a "key" — to reach its final destination. This key is insulin (a hormone). If your pancreas isn't making enough insulin or your body isn't using it properly, glucose builds up in your bloodstream, causing high blood sugar (hyperglycemia).
          </p>

          <p className="mb-6">
            Over time, having consistently high blood glucose can cause health problems, such as heart disease, nerve damage and eye issues.
          </p>

          <div className="bg-health-blue-light border border-health-blue/20 rounded-lg p-6 my-6">
            <h4 className="font-semibold text-health-blue-dark mb-2">Did you know?</h4>
            <p className="text-sm">
              The technical name for diabetes is diabetes mellitus. Another condition shares the term "diabetes" — diabetes insipidus — but they're distinct. They share the name "diabetes" because they both cause increased thirst and frequent urination. Diabetes insipidus is much rarer than diabetes mellitus.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">What are the types of diabetes?</h3>
          <p className="mb-4">There are several types of diabetes. The most common forms include:</p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Type 2 diabetes:</strong> With this type, your body doesn't make enough insulin and/or your body's cells don't respond normally to the insulin (insulin resistance). This is the most common type of diabetes. It mainly affects adults, but children can have it as well.</li>
            <li><strong>Prediabetes:</strong> This type is the stage before Type 2 diabetes. Your blood glucose levels are higher than normal but not high enough to be officially diagnosed with Type 2 diabetes.</li>
            <li><strong>Type 1 diabetes:</strong> This type is an autoimmune disease in which your immune system attacks and destroys insulin-producing cells in your pancreas for unknown reasons. Up to 10% of people who have diabetes have Type 1. It's usually diagnosed in children and young adults, but it can develop at any age.</li>
            <li><strong>Gestational diabetes:</strong> This type develops in some people during pregnancy. Gestational diabetes usually goes away after pregnancy. However, if you have gestational diabetes, you're at a higher risk of developing Type 2 diabetes later in life.</li>
          </ul>

          <p className="mb-4">Other types of diabetes include:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Type 3c diabetes:</strong> This form happens when your pancreas experiences damage (other than autoimmune damage), which affects its ability to produce insulin.</li>
            <li><strong>Latent autoimmune diabetes in adults (LADA):</strong> Like Type 1 diabetes, LADA results from an autoimmune reaction, but develops much more slowly than Type 1.</li>
            <li><strong>Maturity-onset diabetes of the young (MODY):</strong> MODY happens due to an inherited genetic mutation that affects how your body makes and uses insulin.</li>
            <li><strong>Neonatal diabetes:</strong> This is a rare form of diabetes that occurs within the first six months of life.</li>
            <li><strong>Brittle diabetes:</strong> A form of Type 1 diabetes marked by frequent and severe episodes of high and low blood sugar levels.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">How common is diabetes?</h3>
          <p className="mb-6">
            Diabetes is a growing health concern in Uganda, with recent data from the International Diabetes Federation (IDF) indicating a prevalence of 3.6% in adults in 2021, representing an estimated 716,000 cases. This represents a significant increase over previous years, with some community-based studies showing a prevalence as high as 9% and a recent survey indicating it's higher than 3%.
          </p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Symptoms and Causes</h2>
          
          <p className="mb-4">
            The severity of symptoms can vary based on the type of diabetes you have. These symptoms are usually more intense in Type 1 diabetes than Type 2 diabetes.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">What are the symptoms of diabetes?</h3>
          <p className="mb-4">Symptoms of diabetes include:</p>
          <ul className="list-disc pl-6 mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            <li>Increased thirst (polydipsia) and dry mouth</li>
            <li>Frequent urination</li>
            <li>Fatigue</li>
            <li>Blurred vision</li>
            <li>Unexplained weight loss</li>
            <li>Numbness or tingling in hands or feet</li>
            <li>Slow-healing sores or cuts</li>
            <li>Frequent skin/vaginal yeast infections</li>
          </ul>

          <p className="mb-4">It's important to talk to your healthcare provider if you or your child has these symptoms.</p>

          <div className="bg-health-green-light border border-health-green/20 rounded-lg p-6 my-6">
            <h4 className="font-semibold text-health-green-dark mb-3">Additional details about symptoms per type:</h4>
            <ul className="text-sm list-disc pl-6 space-y-2">
              <li><strong>Type 1 diabetes:</strong> Symptoms can develop quickly — over a few weeks or months. May include signs of diabetic ketoacidosis (DKA) like vomiting, stomach pains, fruity-smelling breath.</li>
              <li><strong>Type 2 diabetes and prediabetes:</strong> You may not have any symptoms at all, or may not notice them since they develop slowly.</li>
              <li><strong>Gestational diabetes:</strong> You typically won't notice symptoms. Healthcare providers test for it between 24 and 28 weeks of pregnancy.</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">What causes diabetes?</h3>
          <p className="mb-4">
            Too much glucose circulating in your bloodstream causes diabetes, regardless of the type. However, the reason why your blood glucose levels are high differs depending on the type of diabetes.
          </p>

          <p className="mb-4">Causes of diabetes include:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Insulin resistance:</strong> Type 2 diabetes mainly results from insulin resistance. Several factors contribute including obesity, lack of physical activity, diet, hormonal imbalances, genetics and certain medications.</li>
            <li><strong>Autoimmune disease:</strong> Type 1 diabetes and LADA happen when your immune system attacks the insulin-producing cells in your pancreas.</li>
            <li><strong>Hormonal imbalances:</strong> During pregnancy, the placenta releases hormones that cause insulin resistance, potentially leading to gestational diabetes.</li>
            <li><strong>Pancreatic damage:</strong> Physical damage to your pancreas can impact its ability to make insulin, resulting in Type 3c diabetes.</li>
            <li><strong>Genetic mutations:</strong> Certain genetic mutations can cause MODY and neonatal diabetes.</li>
          </ul>

          <p className="mb-6">
            Long-term use of certain medications can also lead to Type 2 diabetes, including HIV/AIDS medications and corticosteroids.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">What are the complications of diabetes?</h3>
          <p className="mb-4">
            Diabetes can lead to acute (sudden and severe) and long-term complications — mainly due to extreme or prolonged high blood sugar levels.
          </p>

          <h4 className="text-lg font-semibold mt-4 mb-3">Acute diabetes complications</h4>
          <p className="mb-4">Acute diabetes complications that can be life-threatening include:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Hyperosmolar hyperglycemic state (HHS):</strong> Mainly affects people with Type 2 diabetes. Happens when blood sugar levels are very high (over 600 mg/dL) for a long period.</li>
            <li><strong>Diabetes-related ketoacidosis (DKA):</strong> Mainly affects people with Type 1 diabetes. Occurs when your body doesn't have enough insulin and breaks down fat for energy.</li>
            <li><strong>Severe low blood sugar (hypoglycemia):</strong> Mainly affects people with diabetes who use insulin. Can cause blurred vision, disorientation and seizures.</li>
          </ul>

          <h4 className="text-lg font-semibold mt-4 mb-3">Long-term diabetes complications</h4>
          <p className="mb-4">
            Blood glucose levels that remain high for too long can damage your body's tissues and organs. Cardiovascular issues are the most common type of long-term diabetes complication.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold mb-2">Cardiovascular Issues</h5>
              <ul className="text-sm list-disc pl-4 space-y-1">
                <li>Coronary artery disease</li>
                <li>Heart attack</li>
                <li>Stroke</li>
                <li>Atherosclerosis</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold mb-2">Other Complications</h5>
              <ul className="text-sm list-disc pl-4 space-y-1">
                <li>Nerve damage (neuropathy)</li>
                <li>Kidney damage (nephropathy)</li>
                <li>Eye damage (retinopathy)</li>
                <li>Foot conditions and amputations</li>
              </ul>
            </div>
          </div>

          <p className="mb-6">
            Living with diabetes can also affect your mental health. People with diabetes are two to three times more likely to have depression than people without diabetes.
          </p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Diagnosis and Tests</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">How is diabetes diagnosed?</h3>
          <p className="mb-4">
            Healthcare providers diagnose diabetes by checking your glucose level in a blood test. Three tests can measure your blood glucose level:
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Fasting blood glucose test:</strong> You don't eat or drink anything except water for at least eight hours before the test.</li>
            <li><strong>Random blood glucose test:</strong> You can get this test at any time, regardless of if you've fasted.</li>
            <li><strong>A1c:</strong> This test provides your average blood glucose level over the past two to three months.</li>
          </ul>

          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-health-green-light">
                  <th className="border border-gray-300 px-4 py-2 text-left">Type of test</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Normal (mg/dL)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Prediabetes (mg/dL)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Diabetes (mg/dL)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Fasting blood glucose</td>
                  <td className="border border-gray-300 px-4 py-2">Less than 100</td>
                  <td className="border border-gray-300 px-4 py-2">100 to 125</td>
                  <td className="border border-gray-300 px-4 py-2">126 or higher</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">Random blood glucose</td>
                  <td className="border border-gray-300 px-4 py-2">N/A</td>
                  <td className="border border-gray-300 px-4 py-2">N/A</td>
                  <td className="border border-gray-300 px-4 py-2">200 or higher</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">A1c</td>
                  <td className="border border-gray-300 px-4 py-2">Less than 5.7%</td>
                  <td className="border border-gray-300 px-4 py-2">5.7% to 6.4%</td>
                  <td className="border border-gray-300 px-4 py-2">6.5% or higher</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Management and Treatment</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">How is diabetes managed?</h3>
          <p className="mb-4">
            Diabetes is a complex condition, so its management involves several strategies. In addition, diabetes affects everyone differently, so management plans are highly individualized.
          </p>

          <p className="mb-4">The four main aspects of managing diabetes include:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-health-green-light border border-health-green/20 rounded-lg p-6">
              <h4 className="font-semibold text-health-green-dark mb-3">Blood Sugar Monitoring</h4>
              <p className="text-sm">
                Monitoring your blood sugar is key to determining how well your current treatment plan is working. You can use glucose meters with finger sticks and/or continuous glucose monitors (CGM).
              </p>
            </div>
            <div className="bg-health-blue-light border border-health-blue/20 rounded-lg p-6">
              <h4 className="font-semibold text-health-blue-dark mb-3">Medications</h4>
              <p className="text-sm">
                Oral diabetes medications help manage blood sugar levels. People with Type 1 diabetes need synthetic insulin. Some people with Type 2 diabetes also require insulin.
              </p>
            </div>
            <div className="bg-health-red-light border border-health-red/20 rounded-lg p-6">
              <h4 className="font-semibold text-health-red-dark mb-3">Diet Management</h4>
              <p className="text-sm">
                Meal planning and choosing a healthy diet are key aspects of diabetes management, as food greatly impacts blood sugar. Carb counting is important for insulin users.
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6">
              <h4 className="font-semibold text-yellow-800 mb-3">Exercise</h4>
              <p className="text-sm">
                Physical activity increases insulin sensitivity and helps reduce insulin resistance, making regular exercise important for all people with diabetes.
              </p>
            </div>
          </div>

          <p className="mb-6">
            Due to the increased risk for heart disease, it's also important to maintain healthy weight, blood pressure, and cholesterol levels.
          </p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Outlook / Prognosis</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">What is the prognosis for diabetes?</h3>
          <p className="mb-4">The prognosis (outlook) for diabetes varies greatly depending on several factors:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>The type of diabetes</li>
            <li>How well you manage the condition over time and your access to diabetes care</li>
            <li>Your age at diagnosis/how long you've had diabetes</li>
            <li>If you have other health conditions</li>
            <li>If you develop diabetes complications</li>
          </ul>

          <div className="bg-health-green-light border border-health-green/20 rounded-lg p-6 my-6">
            <h4 className="font-semibold text-health-green-dark mb-3">Key to Better Prognosis</h4>
            <ul className="text-sm list-disc pl-6 space-y-1">
              <li>Lifestyle changes</li>
              <li>Regular exercise</li>
              <li>Dietary changes</li>
              <li>Regular blood sugar monitoring</li>
            </ul>
            <p className="text-sm mt-3">
              Studies show that people with diabetes may be able to reduce their risk of complications by consistently keeping their A1c levels below 7%.
            </p>
          </div>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Prevention</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">How can I prevent diabetes?</h3>
          <p className="mb-4">
            You can't prevent autoimmune and genetic forms of diabetes. But there are some steps you can take to lower your risk for developing prediabetes, Type 2 diabetes and gestational diabetes:
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Eat a healthy diet, such as the Mediterranean diet</li>
            <li>Get physically active. Aim for 30 minutes a day at least five days a week</li>
            <li>Work to achieve a weight that's healthy for you</li>
            <li>Manage your stress</li>
            <li>Limit alcohol intake</li>
            <li>Get adequate sleep (typically 7 to 9 hours) and seek treatment for sleep disorders</li>
            <li>Quit smoking</li>
            <li>Take medications as directed by your healthcare provider to manage existing risk factors</li>
          </ul>

          <p className="mb-6">
            It's important to note that there are some diabetes risk factors you can't change, such as your genetics/family history, age and race. Know that Type 2 diabetes is a complex condition that involves many contributing factors.
          </p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Living With Diabetes</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">When should I see my healthcare provider?</h3>
          <p className="mb-4">
            If you haven't been diagnosed with diabetes, you should see a healthcare provider if you have any symptoms of diabetes, such as increased thirst and frequent urination.
          </p>
          <p className="mb-6">
            If you have diabetes, you should see your provider who helps you manage diabetes (such as an endocrinologist) regularly.
          </p>

          <div className="bg-health-green-light p-6 border-l-4 border-health-green my-8 rounded-r-lg">
            <div className="flex items-start">
              <Heart className="h-6 w-6 text-health-green-dark mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-health-green-dark mb-2">A note from Garrison Health</h3>
                <p className="text-health-green-dark">
                  Being diagnosed with diabetes is a life-changing event, but it doesn't mean you can't live a happy and healthy life. Managing diabetes involves consistent care and diligence. While it'll likely be very overwhelming at first, over time you'll get a better grasp on managing the condition and being in tune with your body. Be sure to see your healthcare provider(s) regularly. Managing diabetes involves a team effort — you'll want medical professionals, friends and family on your side. Don't be afraid to reach out to them if you need help.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to articles link */}
        <div className="mt-12">
          <Link 
            to="/articles" 
            className="inline-flex items-center text-health-green hover:text-health-green-dark transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all articles
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default UnderstandingDiabetes;
