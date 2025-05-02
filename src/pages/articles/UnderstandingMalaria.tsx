
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ArrowLeft, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { mosquito, Shield } from "lucide-react";

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

        {/* Article Content */}
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Overview</h2>
          <p>
            Malaria is a disease caused by a parasite. The parasite is spread to humans through the bites of infected mosquitoes. People who have malaria usually feel very sick with a high fever and shaking chills.
          </p>
          <p>
            While the disease is uncommon in temperate climates, malaria is still common in tropical and subtropical countries. Each year nearly 290 million people are infected with malaria, and more than 400,000 people die of the disease.
          </p>
          <p>
            To reduce malaria infections, world health programs distribute preventive drugs and insecticide-treated bed nets to protect people from mosquito bites. The World Health Organization has recommended a malaria vaccine for use in children who live in countries with high numbers of malaria cases.
          </p>
          <p>
            Protective clothing, bed nets and insecticides can protect you while traveling. You also can take preventive medicine before, during and after a trip to a high-risk area. Many malaria parasites have developed resistance to common drugs used to treat the disease.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Symptoms</h2>
          <p>Signs and symptoms of malaria may include:</p>
          <ul className="list-disc pl-6 my-4">
            <li>Fever</li>
            <li>Chills</li>
            <li>General feeling of discomfort</li>
            <li>Headache</li>
            <li>Nausea and vomiting</li>
            <li>Diarrhea</li>
            <li>Abdominal pain</li>
            <li>Muscle or joint pain</li>
            <li>Fatigue</li>
            <li>Rapid breathing</li>
            <li>Rapid heart rate</li>
            <li>Cough</li>
          </ul>
          <p>
            Some people who have malaria experience cycles of malaria "attacks." An attack usually starts with shivering and chills, followed by a high fever, followed by sweating and a return to normal temperature.
          </p>
          <p>
            Malaria signs and symptoms typically begin within a few weeks after being bitten by an infected mosquito. However, some types of malaria parasites can lie dormant in your body for up to a year.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">When to see a doctor</h3>
          <p>
            Talk to your doctor if you experience a fever while living in or after traveling to a high-risk malaria region. If you have severe symptoms, seek emergency medical attention.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Causes</h2>
          <p>
            Malaria is caused by a single-celled parasite of the genus plasmodium. The parasite is transmitted to humans most commonly through mosquito bites.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Malaria transmission cycle</h3>
          <p>
            Malaria spreads when a mosquito becomes infected with the disease after biting an infected person, and the infected mosquito then bites a noninfected person. The malaria parasites enter that person's bloodstream and travel to the liver. When the parasites mature, they leave the liver and infect red blood cells.
          </p>
          <ol className="list-decimal pl-6 my-4">
            <li><strong>Uninfected mosquito.</strong> A mosquito becomes infected by feeding on a person who has malaria.</li>
            <li><strong>Transmission of parasite.</strong> If this mosquito bites you in the future, it can transmit malaria parasites to you.</li>
            <li><strong>In the liver.</strong> Once the parasites enter your body, they travel to your liver — where some types can lie dormant for as long as a year.</li>
            <li><strong>Into the bloodstream.</strong> When the parasites mature, they leave the liver and infect your red blood cells. This is when people typically develop malaria symptoms.</li>
            <li><strong>On to the next person.</strong> If an uninfected mosquito bites you at this point in the cycle, it will become infected with your malaria parasites and can spread them to the other people it bites.</li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-3">Other modes of transmission</h3>
          <p>
            Because the parasites that cause malaria affect red blood cells, people can also catch malaria from exposure to infected blood, including:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>From mother to unborn child</li>
            <li>Through blood transfusions</li>
            <li>By sharing needles used to inject drugs</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Risk factors</h2>
          <p>
            The greatest risk factor for developing malaria is to live in or to visit areas where the disease is common. These include the tropical and subtropical regions of:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Sub-Saharan Africa</li>
            <li>South and Southeast Asia</li>
            <li>Pacific Islands</li>
            <li>Central America and northern South America</li>
          </ul>
          <p>
            The degree of risk depends on local malaria control, seasonal changes in malaria rates and the precautions you take to prevent mosquito bites.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Risks of more-severe disease</h3>
          <p>
            People at increased risk of serious disease include:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Young children and infants</li>
            <li>Older adults</li>
            <li>Travelers coming from areas with no malaria</li>
            <li>Pregnant women and their unborn children</li>
          </ul>
          <p>
            In many countries with high malaria rates, the problem is worsened by lack of access to preventive measures, medical care and information.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Immunity can wane</h3>
          <p>
            Residents of a malaria region may be exposed to the disease enough to acquire a partial immunity, which can lessen the severity of malaria symptoms. However, this partial immunity can disappear if you move to a place where you're no longer frequently exposed to the parasite.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Complications</h2>
          <p>
            Malaria can be fatal, particularly when caused by the plasmodium species common in Africa. The World Health Organization estimates that about 94% of all malaria deaths occur in Africa — most commonly in children under the age of 5.
          </p>
          <p>
            Malaria deaths are usually related to one or more serious complications, including:
          </p>
          <ul className="pl-6 my-4">
            <li><strong>Cerebral malaria.</strong> If parasite-filled blood cells block small blood vessels to your brain (cerebral malaria), swelling of your brain or brain damage may occur. Cerebral malaria may cause seizures and coma.</li>
            <li><strong>Breathing problems.</strong> Accumulated fluid in your lungs (pulmonary edema) can make it difficult to breathe.</li>
            <li><strong>Organ failure.</strong> Malaria can damage the kidneys or liver or cause the spleen to rupture. Any of these conditions can be life-threatening.</li>
            <li><strong>Anemia.</strong> Malaria may result in not having enough red blood cells for an adequate supply of oxygen to your body's tissues (anemia).</li>
            <li><strong>Low blood sugar.</strong> Severe forms of malaria can cause low blood sugar (hypoglycemia), as can quinine — a common medication used to combat malaria. Very low blood sugar can result in coma or death.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Malaria may recur</h3>
          <p>
            Some varieties of the malaria parasite, which typically cause milder forms of the disease, can persist for years and cause relapses.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Prevention</h2>
          <p>
            If you live in or are traveling to an area where malaria is common, take steps to avoid mosquito bites. Mosquitoes are most active between dusk and dawn. To protect yourself from mosquito bites, you should:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li><strong>Cover your skin.</strong> Wear pants and long-sleeved shirts. Tuck in your shirt, and tuck pant legs into socks.</li>
            <li><strong>Apply insect repellent to skin.</strong> Use an insect repellent registered with the Environmental Protection Agency on any exposed skin. These include repellents that contain DEET, picaridin, IR3535, oil of lemon eucalyptus (OLE), para-menthane-3,8-diol (PMD) or 2-undecanone. Do not use a spray directly on your face. Do not use products with oil of lemon eucalyptus (OLE) or p-Menthane-3,8-diol (PMD) on children under age 3.</li>
            <li><strong>Apply repellent to clothing.</strong> Sprays containing permethrin are safe to apply to clothing.</li>
            <li><strong>Sleep under a net.</strong> Bed nets, particularly those treated with insecticides, such as permethrin, help prevent mosquito bites while you are sleeping.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Preventive medicine</h3>
          <p>
            If you'll be traveling to a location where malaria is common, talk to your doctor a few months ahead of time about whether you should take drugs before, during and after your trip to help protect you from malaria parasites.
          </p>
          <p>
            In general, the drugs taken to prevent malaria are the same drugs used to treat the disease. What drug you take depends on where and how long you are traveling and your own health.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Vaccine</h3>
          <p>
            The World Health Organization has recommended a malaria vaccine for use in children who live in countries with high numbers of malaria cases.
          </p>
          <p>
            Researchers are continuing to develop and study malaria vaccines to prevent infection.
          </p>
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
