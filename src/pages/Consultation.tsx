
import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Heart, Banknote, MessageCircle, CheckCircle } from "lucide-react";
import ConsultationForm from "@/components/consultation/ConsultationForm";
import { conditionData } from "@/data/consultationData";

const Consultation = () => {
  const [selectedConditionType, setSelectedConditionType] = useState<"acute" | "chronic" | "obstetrics" | "paediatrics" | "surgical" | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const getConsultationFee = (type: string) => {
    switch (type) {
      case "chronic":
        return 10000;
      case "acute":
      case "obstetrics":
      case "paediatrics":
      case "surgical":
        return 5000;
      default:
        return 5000;
    }
  };

  const consultationFee = selectedConditionType ? getConsultationFee(selectedConditionType) : 5000;
  const currency = "UGX";

  const resetSelection = () => {
    setSelectedConditionType(null);
    setSelectedSystem(null);
    setSelectedDisease(null);
    setShowForm(false);
    setShowSuccess(false);
  };

  const handleStartConsultation = () => {
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setShowSuccess(true);
  };

  const getConditionTypeLabel = (type: string) => {
    switch (type) {
      case "acute":
        return "Acute Condition";
      case "chronic":
        return "Chronic Condition";
      case "obstetrics":
        return "Obstetrics & Gynaecology";
      case "paediatrics":
        return "Paediatrics";
      case "surgical":
        return "Surgical";
      default:
        return type;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-garrison-teal to-garrison-teal-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Stethoscope className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Health Consultation</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Professional medical consultation with qualified healthcare practitioners
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showSuccess ? (
          <Card className="text-center">
            <CardContent className="py-12">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Consultation Submitted Successfully!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our health practitioner will contact you soon with your preferred consultation mode.
              </p>
              <p className="text-xl font-semibold text-garrison-teal mb-8">
                Thank you!
              </p>
              <Button 
                onClick={resetSelection}
                className="garrison-btn-primary"
              >
                Submit Another Consultation
              </Button>
            </CardContent>
          </Card>
        ) : showForm ? (
          <ConsultationForm
            selectedDisease={{ name: selectedDisease!, system: selectedSystem! }}
            conditionType={selectedConditionType!}
            onBack={() => setShowForm(false)}
            onSuccess={handleSuccess}
          />
        ) : (
          <>
            {/* Step 1: Condition Type Selection */}
            {!selectedConditionType && (
              <Card className="mb-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl mb-4">Start a Consultation</CardTitle>
                  <p className="text-gray-600">Choose the type of condition you want to consult about</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div 
                      className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-garrison-teal transition-colors"
                      onClick={() => setSelectedConditionType("acute")}
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-4 h-4 border-2 border-garrison-teal rounded-full mr-3"></div>
                        <h3 className="text-lg font-semibold">Acute Condition</h3>
                      </div>
                      <p className="text-gray-600 mb-4">Short-term conditions requiring immediate attention</p>
                      <div className="flex items-center text-garrison-teal font-semibold">
                        <Banknote className="h-4 w-4 mr-2" />
                        Consultation Fee: 5,000 {currency}
                      </div>
                    </div>

                    <div 
                      className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-garrison-teal transition-colors"
                      onClick={() => setSelectedConditionType("chronic")}
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-4 h-4 border-2 border-garrison-teal rounded-full mr-3"></div>
                        <h3 className="text-lg font-semibold">Chronic Condition</h3>
                      </div>
                      <p className="text-gray-600 mb-4">Long-term conditions requiring ongoing management</p>
                      <div className="flex items-center text-garrison-teal font-semibold">
                        <Banknote className="h-4 w-4 mr-2" />
                        Consultation Fee: 10,000 {currency}
                      </div>
                    </div>

                    <div 
                      className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-garrison-teal transition-colors"
                      onClick={() => setSelectedConditionType("obstetrics")}
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-4 h-4 border-2 border-garrison-teal rounded-full mr-3"></div>
                        <h3 className="text-lg font-semibold">Obstetrics & Gynaecology</h3>
                      </div>
                      <p className="text-gray-600 mb-4">Women's health, pregnancy, and reproductive care</p>
                      <div className="flex items-center text-garrison-teal font-semibold">
                        <Banknote className="h-4 w-4 mr-2" />
                        Consultation Fee: 5,000 {currency}
                      </div>
                    </div>

                    <div 
                      className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-garrison-teal transition-colors"
                      onClick={() => setSelectedConditionType("paediatrics")}
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-4 h-4 border-2 border-garrison-teal rounded-full mr-3"></div>
                        <h3 className="text-lg font-semibold">Paediatrics</h3>
                      </div>
                      <p className="text-gray-600 mb-4">Children's health and development care</p>
                      <div className="flex items-center text-garrison-teal font-semibold">
                        <Banknote className="h-4 w-4 mr-2" />
                        Consultation Fee: 5,000 {currency}
                      </div>
                    </div>

                    <div 
                      className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-garrison-teal transition-colors"
                      onClick={() => setSelectedConditionType("surgical")}
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-4 h-4 border-2 border-garrison-teal rounded-full mr-3"></div>
                        <h3 className="text-lg font-semibold">Surgical Condition</h3>
                      </div>
                      <p className="text-gray-600 mb-4">Surgical procedures and pre/post-operative care</p>
                      <div className="flex items-center text-garrison-teal font-semibold">
                        <Banknote className="h-4 w-4 mr-2" />
                        Consultation Fee: 5,000 {currency}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: System Selection */}
            {selectedConditionType && !selectedSystem && (
              <Card className="mb-8">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-between mb-4">
                    <Button variant="outline" onClick={resetSelection}>← Back</Button>
                    <Badge variant="secondary" className="bg-garrison-teal text-white">
                      {getConditionTypeLabel(selectedConditionType)}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">Choose the System Involved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {conditionData[selectedConditionType].systems.map((system) => (
                      <Button
                        key={system.name}
                        variant="outline"
                        className="h-auto p-4 text-left justify-start"
                        onClick={() => setSelectedSystem(system.name)}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        {system.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Disease Selection */}
            {selectedSystem && !selectedDisease && (
              <Card className="mb-8">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-between mb-4">
                    <Button variant="outline" onClick={() => setSelectedSystem(null)}>← Back</Button>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-garrison-teal text-white">
                        {getConditionTypeLabel(selectedConditionType!)}
                      </Badge>
                      <Badge variant="outline">{selectedSystem}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-2xl">Which condition do you want to consult about?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {conditionData[selectedConditionType!].systems
                      .find(s => s.name === selectedSystem)?.diseases.map((disease) => (
                      <Button
                        key={disease}
                        variant="outline"
                        className="h-auto p-3 text-left justify-start"
                        onClick={() => setSelectedDisease(disease)}
                      >
                        {disease}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Payment Information & Start Consultation */}
            {selectedDisease && (
              <Card className="mb-8">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-between mb-4">
                    <Button variant="outline" onClick={() => setSelectedDisease(null)}>← Back</Button>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-garrison-teal text-white">
                        {getConditionTypeLabel(selectedConditionType!)}
                      </Badge>
                      <Badge variant="outline">{selectedSystem}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">Selected Condition: {selectedDisease}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold mb-4">Consultation Fee Summary</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span>Condition Type:</span>
                        <span className="font-semibold">{getConditionTypeLabel(selectedConditionType!)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>System:</span>
                        <span className="font-semibold">{selectedSystem}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Disease:</span>
                        <span className="font-semibold">{selectedDisease}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-garrison-teal border-t pt-2">
                        <span>Total Fee:</span>
                        <span>{consultationFee.toLocaleString()} {currency}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <Button 
                      className="garrison-btn-primary w-full md:w-auto"
                      onClick={handleStartConsultation}
                    >
                      <Stethoscope className="mr-2 h-4 w-4" />
                      Start Consultation
                    </Button>
                    
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <MessageCircle className="h-4 w-4" />
                      <span>After payment, you'll be connected to our health practitioner</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Consultation;
