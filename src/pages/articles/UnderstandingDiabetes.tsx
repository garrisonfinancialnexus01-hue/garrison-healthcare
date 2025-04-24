
import Layout from "@/components/layout/Layout";
import { ScrollArea } from "@/components/ui/scroll-area";

const UnderstandingDiabetes = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <img
            src="/lovable-uploads/010d885b-6a86-4fa9-b298-275e7ce0ecb1.png"
            alt="Diabetes blood sugar monitoring illustration"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold mb-4">Understanding Diabetes: Symptoms, Causes, and Management</h1>
          <p className="text-muted-foreground">April 12, 2025</p>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)] pr-6">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="mb-4">
              <strong>Diabetes mellitus</strong> refers to a group of diseases that affect how the body uses blood sugar (glucose). Glucose is an important source of energy for the cells that make up the muscles and tissues. It's also the brain's main source of fuel.
            </p>

            <p className="mb-6">
              The main cause of diabetes varies by type. But no matter what type of diabetes you have, it can lead to excess sugar in the blood. Too much sugar in the blood can lead to serious health problems.
            </p>

            <p className="mb-6">
              Chronic diabetes conditions include <strong>type 1 diabetes</strong> and <strong>type 2 diabetes</strong>. Potentially reversible diabetes conditions include prediabetes and gestational diabetes. Prediabetes happens when blood sugar levels are higher than normal, but the blood sugar levels aren't high enough to be called diabetes. And prediabetes can lead to diabetes unless steps are taken to prevent it. Gestational diabetes happens during pregnancy but may go away after the baby is born.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Symptoms</h2>
            <p className="mb-4">
              Diabetes symptoms depend on how high your blood sugar is. Some people, especially if they have prediabetes, gestational diabetes or type 2 diabetes, may not have symptoms. In type 1 diabetes, symptoms tend to come on quickly and be more severe.
            </p>

            <p className="mb-4">Some of the symptoms of type 1 diabetes and type 2 diabetes are:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Feeling more thirsty than usual</li>
              <li>Urinating often</li>
              <li>Losing weight without trying</li>
              <li>Presence of ketones in the urine</li>
              <li>Feeling tired and weak</li>
              <li>Feeling irritable or having other mood changes</li>
              <li>Having blurry vision</li>
              <li>Having slow-healing sores</li>
              <li>Getting a lot of infections, such as gum, skin and vaginal infections</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">When to see a doctor</h2>
            <p className="mb-6">
              <strong>If you think you or your child may have diabetes:</strong> If you notice any possible diabetes symptoms, contact your health care provider. The earlier the condition is diagnosed, the sooner treatment can begin.
            </p>

            {/* ... Additional sections would continue in the same format */}
            
            <h2 className="text-2xl font-semibold mb-4">Prevention</h2>
            <p className="mb-4">
              While Type 1 diabetes can't be prevented, healthy lifestyle choices can help prevent or manage other types:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Eat healthy foods:</strong> Choose foods lower in fat and calories and higher in fiber</li>
              <li><strong>Get more physical activity:</strong> Aim for 150 minutes of moderate aerobic activity a week</li>
              <li><strong>Lose excess pounds:</strong> Even losing 7% of your body weight can lower diabetes risk</li>
            </ul>
          </div>
        </ScrollArea>
      </div>
    </Layout>
  );
};

export default UnderstandingDiabetes;
