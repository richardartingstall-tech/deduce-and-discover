import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft, 
  Brain, 
  Lightbulb, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Stethoscope,
  Activity
} from "lucide-react";

interface CaseStep {
  id: string;
  title: string;
  type: "presentation" | "examination" | "diagnosis" | "treatment";
  content: string;
  question?: string;
  options?: string[];
  correctAnswer?: string;
  userAnswer?: string;
  completed: boolean;
}

const mockCase: CaseStep[] = [
  {
    id: "1",
    title: "Initial Presentation",
    type: "presentation",
    content: "A 5-year-old spayed Golden Retriever named Luna presents to your clinic. The owner reports that Luna has been limping on her left front leg for the past 2 days. The limping started suddenly after a walk in the park.",
    question: "What is your first priority in examining Luna?",
    options: [
      "Immediately sedate Luna for radiographs",
      "Perform a thorough visual assessment and history taking",
      "Start pain medication before examination",
      "Order blood work immediately"
    ],
    correctAnswer: "Perform a thorough visual assessment and history taking",
    completed: false
  },
  {
    id: "2", 
    title: "Physical Examination",
    type: "examination",
    content: "Upon examination, Luna is alert and responsive. She holds her left front leg slightly elevated when standing. There is no obvious swelling or deformity visible. Her vital signs are normal: HR 95 bpm, RR 28 bpm, Temp 101.2°F.",
    question: "What examination technique should you perform next?",
    options: [
      "Palpation of the affected limb starting distally",
      "Range of motion testing immediately", 
      "Weight bearing assessment",
      "All of the above in systematic order"
    ],
    correctAnswer: "All of the above in systematic order",
    completed: false
  },
  {
    id: "3",
    title: "Diagnostic Reasoning",
    type: "diagnosis", 
    content: "Your palpation reveals pain and mild swelling around the carpus (wrist). Luna shows discomfort when you manipulate the carpal joint but allows full range of motion. No crepitus is felt.",
    question: "Based on your findings, what is the most likely diagnosis?",
    options: [
      "Fracture of the radius",
      "Carpal sprain/soft tissue injury", 
      "Elbow dysplasia",
      "Shoulder dislocation"
    ],
    correctAnswer: "Carpal sprain/soft tissue injury",
    completed: false
  }
];

interface CaseStudyProps {
  onBack: () => void;
}

export default function CaseStudy({ onBack }: CaseStudyProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(mockCase);
  const [userDiagnosis, setUserDiagnosis] = useState("");
  const [showAIInsight, setShowAIInsight] = useState(false);

  const handleAnswer = (answer: string) => {
    const updatedSteps = [...steps];
    updatedSteps[currentStep] = {
      ...updatedSteps[currentStep],
      userAnswer: answer,
      completed: true
    };
    setSteps(updatedSteps);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentCaseStep = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isCorrect = currentCaseStep.userAnswer === currentCaseStep.correctAnswer;

  const getStepIcon = (type: string) => {
    switch (type) {
      case "presentation": return <Eye className="w-4 h-4" />;
      case "examination": return <Stethoscope className="w-4 h-4" />;
      case "diagnosis": return <Brain className="w-4 h-4" />;
      case "treatment": return <Activity className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Canine Lameness Investigation</h1>
              <p className="text-sm text-muted-foreground">Case Study - Beginner Level</p>
            </div>
            <Badge variant="secondary">Step {currentStep + 1} of {steps.length}</Badge>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="w-full" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStepIcon(currentCaseStep.type)}
                  {currentCaseStep.title}
                </CardTitle>
                <CardDescription>
                  {currentCaseStep.type === "presentation" && "Patient History & Initial Observations"}
                  {currentCaseStep.type === "examination" && "Physical Examination Findings"} 
                  {currentCaseStep.type === "diagnosis" && "Diagnostic Analysis"}
                  {currentCaseStep.type === "treatment" && "Treatment Planning"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none mb-6">
                  <p className="text-foreground leading-relaxed">{currentCaseStep.content}</p>
                </div>

                {currentCaseStep.question && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">{currentCaseStep.question}</h4>
                    
                    {currentCaseStep.options && (
                      <div className="grid gap-2">
                        {currentCaseStep.options.map((option, index) => (
                          <Button
                            key={index}
                            variant={
                              currentCaseStep.userAnswer === option
                                ? isCorrect
                                  ? "default"
                                  : "destructive"
                                : "outline"
                            }
                            className="justify-start text-left h-auto p-4"
                            onClick={() => handleAnswer(option)}
                            disabled={currentCaseStep.completed}
                          >
                            <div className="flex items-center gap-2">
                              {currentCaseStep.userAnswer === option && (
                                isCorrect ? (
                                  <CheckCircle className="w-4 h-4 text-primary-foreground" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-destructive-foreground" />
                                )
                              )}
                              <span className="flex-1">{option}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    )}

                    {currentCaseStep.completed && (
                      <div className="mt-4 p-4 rounded-lg bg-muted">
                        <div className="flex items-center gap-2 mb-2">
                          {isCorrect ? (
                            <CheckCircle className="w-4 h-4 text-secondary" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-destructive" />
                          )}
                          <span className="font-medium">
                            {isCorrect ? "Correct!" : "Not quite right"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {isCorrect 
                            ? "Excellent reasoning! You've demonstrated proper diagnostic approach."
                            : `The correct answer is: ${currentCaseStep.correctAnswer}`
                          }
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={handleNext}
                    disabled={!currentCaseStep.completed || currentStep === steps.length - 1}
                  >
                    Next Step
                  </Button>
                  {currentStep === steps.length - 1 && currentCaseStep.completed && (
                    <Button variant="secondary">Complete Case</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full mb-4"
                  onClick={() => setShowAIInsight(!showAIInsight)}
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Get AI Insight
                </Button>
                
                {showAIInsight && (
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm text-foreground">
                      <strong>AI Insight:</strong> Consider the mechanism of injury and location of pain. 
                      Sudden onset lameness after exercise often indicates soft tissue injury rather than 
                      chronic conditions like dysplasia.
                    </p>
                  </div>
                )}

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Your Working Diagnosis:</label>
                  <Textarea
                    placeholder="Record your thoughts and differential diagnoses..."
                    value={userDiagnosis}
                    onChange={(e) => setUserDiagnosis(e.target.value)}
                    className="min-h-20"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {steps.map((step, index) => (
                    <div 
                      key={step.id}
                      className={`flex items-center gap-3 p-2 rounded-lg ${
                        index === currentStep ? "bg-primary/10" : ""
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? "bg-secondary text-secondary-foreground" 
                          : index === currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </div>
                      <span className={`text-sm ${
                        index === currentStep ? "font-medium" : ""
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}