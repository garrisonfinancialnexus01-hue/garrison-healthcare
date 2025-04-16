
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Patient",
    testimonial: "Garrison Health has been an invaluable resource for me and my family. The medical information provided is accurate, easy to understand, and has helped us make informed decisions about our health.",
    rating: 5
  },
  {
    id: 2,
    name: "David Mukasa",
    position: "Healthcare Professional",
    testimonial: "As a healthcare professional, I appreciate the reliable and up-to-date information provided by Garrison Health. It's a great resource to recommend to my patients.",
    rating: 5
  },
  {
    id: 3,
    name: "Mary Namuli",
    position: "Community Health Worker",
    testimonial: "The resources provided by Garrison Health have been extremely helpful in my community health outreach work. The information is culturally sensitive and relevant to our local context.",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">What People Say</h2>
          <p className="mt-4 text-muted-foreground">
            Hear from people who have benefited from our services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-health-green-light p-6 rounded-lg shadow-sm relative overflow-hidden"
            >
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="italic text-foreground mb-4">"{testimonial.testimonial}"</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-health-red-light flex items-center justify-center text-health-red-dark font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-health-green-dark/10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
