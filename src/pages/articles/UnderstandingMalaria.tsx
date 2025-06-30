
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ArrowLeft, Calendar, Bug, Shield, AlertTriangle, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const UnderstandingMalaria = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/articles" className="hover:text-foreground">Articles</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Understanding Malaria</span>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Understanding Malaria: Causes, Symptoms, and Prevention</h1>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>May 2, 2025</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/da1d8d36-dad9-431e-a9b8-b02f8c75075e.png" 
            alt="No mosquito symbol representing malaria prevention" 
            className="w-full h-auto rounded-lg object-cover"
          />
          <p className="text-sm text-muted-foreground mt-2 text-center">Malaria prevention is crucial in endemic regions</p>
        </div>

        {/* Quick Facts Alert */}
        <div className="bg-health-red-light border border-health-red/20 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-health-red mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-health-red-dark mb-2">Important</h3>
              <p className="text-sm">
                Malaria is a life-threatening illness that requires immediate medical attention. If you've traveled to an area where malaria is common and experience symptoms, see a healthcare provider right away.
              </p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <Bug className="h-6 w-6 mr-2 text-health-red" />
            Overview
          </h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">What is malaria?</h3>
          <p>
            Malaria is a serious disease that spreads when you're bitten by a mosquito infected by Plasmodium parasites. When it bites, the mosquito injects malaria parasites into your bloodstream.
          </p>
          <p>
            Malaria is common in tropical areas where it's hot and humid. Most cases happen in Africa and South Asia. It's rare in the U.S.
          </p>
          <p>
            Without treatment, malaria can cause brain damage, organ failure and death. See a healthcare provider right away if you live in or have traveled to an area where malaria spreads and you have symptoms.
          </p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Symptoms and Causes</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Symptoms of malaria</h3>
          <p>Signs and symptoms of malaria include:</p>
          <ul className="list-disc pl-6 my-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            <li>Fever and sweating</li>
            <li>Chills — these can shake your whole body</li>
            <li>Headache and muscle aches</li>
            <li>Fatigue</li>
            <li>Chest pain</li>
            <li>Difficulty breathing</li>
            <li>Cough</li>
            <li>Diarrhea</li>
            <li>Nausea and vomiting</li>
            <li>Seizures</li>
          </ul>
          <p>
            Symptoms can be mild or severe. As malaria gets worse, it can cause anemia and jaundice (yellowing of your skin and the whites of your eyes).
          </p>

          <div className="bg-health-green-light border border-health-green/20 rounded-lg p-6 my-6">
            <h4 className="font-semibold text-health-green-dark mb-2">When do symptoms begin?</h4>
            <p className="text-sm mb-2">
              Malaria symptoms usually appear a week to a month after you're infected. Some people don't feel sick for a year or longer after the mosquito bite.
            </p>
            <p className="text-sm">
              Sometimes, even after treatment, malaria infections get better but come back (recur) again. You can start having symptoms again years after your initial infection.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Malaria causes</h3>
          <p>
            Plasmodium parasites cause malaria. There are five types that can infect humans.
          </p>
          <p>
            A mosquito gets infected when it bites someone who's infected with the parasites. When that mosquito bites someone else, it transfers a parasite to the other person's bloodstream. There, the parasites multiply.
          </p>
          <p>
            In rare cases, malaria can pass from a pregnant woman to the fetus during pregnancy or birth.
          </p>
          <p>
            It's possible, but unlikely, for malaria to be passed through blood transfusions, organ donations and needles.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Risk factors</h3>
          <p>
            Your risk of getting malaria is higher if you live in or travel to areas where it spreads, like parts of Africa. You're at higher risk of serious illness and death if you:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Are younger than 5 years old</li>
            <li>Are pregnant</li>
            <li>Have a weakened immune system</li>
            <li>Don't have access to healthcare</li>
          </ul>

          <div className="bg-health-blue-light border border-health-blue/20 rounded-lg p-6 my-6">
            <h4 className="font-semibold text-health-blue-dark mb-3 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Where is malaria found?
            </h4>
            <p className="text-sm mb-2">Malaria is most common in areas with warm temperatures and high humidity, including:</p>
            <ul className="text-sm list-disc pl-6">
              <li>Africa</li>
              <li>Central and South America</li>
              <li>Dominican Republic, Haiti and other areas in the Caribbean</li>
              <li>South and Southeast Asia</li>
              <li>Islands in the Central and South Pacific Ocean (Oceania)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Complications of malaria</h3>
          <p>If left untreated, malaria can cause:</p>
          <ul className="list-disc pl-6 my-4">
            <li>Coma</li>
            <li>Organ failure</li>
            <li>Death</li>
          </ul>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Diagnosis and Tests</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">How is malaria diagnosed?</h3>
          <p>
            A healthcare provider will examine you and ask about your symptoms and travel history. It's important to let them know what countries you've visited recently so they can clearly understand your risk.
          </p>
          <p>
            Your provider will take a sample of your blood and send it to a lab to see if you have Plasmodium parasites. The blood test will tell your provider if you have malaria and will also identify the Plasmodium species. They'll use this information to determine the right treatment.
          </p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Management and Treatment</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">How is malaria treated?</h3>
          <p>
            Antimalarial medications can treat malaria and clear the infection from your body, but it's important to start treatment as soon as possible. If malaria isn't treated properly, it can cause serious health problems, including permanent organ damage and death. Your provider will prescribe medications to kill the type of Plasmodium parasite responsible for your infection. Some parasites are resistant to malaria drugs.
          </p>

          <div className="bg-white border border-gray-200 rounded-lg p-6 my-6">
            <h4 className="font-semibold mb-3">Antimalarial drugs include:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <ul className="list-disc pl-6 text-sm">
                <li>Artemisinin drugs (artemether and artesunate)</li>
                <li>Atovaquone</li>
                <li>Chloroquine</li>
                <li>Doxycycline</li>
              </ul>
              <ul className="list-disc pl-6 text-sm">
                <li>Mefloquine</li>
                <li>Quinine</li>
                <li>Primaquine</li>
              </ul>
            </div>
          </div>

          <p>
            After treatment, it's important to protect yourself from mosquitoes as much as possible. If you've had malaria before, you can get it again if an infected mosquito bites you.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">When should I see my healthcare provider?</h3>
          <p>
            If you've traveled to or live in a country where malaria is common and you have symptoms, see a healthcare provider immediately. Early diagnosis makes treatment more effective.
          </p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-health-green" />
            Prevention
          </h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">How can I prevent malaria?</h3>
          <p>
            If you're traveling to an area where malaria is common, talk to a healthcare provider about ways you can prevent being infected. People who are infected and travel to Uganda can spread the disease if a mosquito bites them and then bites someone else.
          </p>
          <p>
            Your provider might prescribe antimalarial medications for you to take before, during and after your stay. Medications can greatly reduce the chances of getting malaria. If you get sick with malaria while on an antimalarial drug, it won't work to treat it. Your provider will prescribe a different medication in that case.
          </p>

          <div className="bg-health-green-light border border-health-green/20 rounded-lg p-6 my-6">
            <h4 className="font-semibold text-health-green-dark mb-3">Prevention Measures</h4>
            <p className="text-sm mb-2">To lower your chances of getting malaria, you should:</p>
            <ul className="text-sm list-disc pl-6 space-y-1">
              <li>Apply mosquito repellent with DEET (diethyltoluamide) to exposed skin</li>
              <li>Drape mosquito netting over beds</li>
              <li>Put screens on windows and doors</li>
              <li>Treat clothing, mosquito nets, tents, sleeping bags and other fabrics with an insect repellent called permethrin</li>
              <li>Wear long pants and long sleeves to cover your skin</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Is there a vaccine against malaria?</h3>
          <p>
            Two vaccines that help protect against malaria are available. Public health officials recommend vaccination against malaria for children who live in areas where infections are common.
          </p>

          <Separator className="my-8" />

          <div className="bg-health-red-light border border-health-red/20 rounded-lg p-6 my-8">
            <h3 className="font-semibold text-health-red-dark mb-3">A note from Garrison Health</h3>
            <p className="text-sm">
              Malaria is a serious illness, but you can take steps to prevent it. You can lower your risk of infection by protecting yourself from mosquito bites and taking preventive medications. If you're traveling to an area where malaria is common, talk to a healthcare provider several weeks before you leave. This is especially important if you're pregnant. And talk to a provider right away if you've traveled to an area where malaria is common and you have symptoms.
            </p>
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

export default UnderstandingMalaria;
