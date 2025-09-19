import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, BookOpen, Target, TrendingUp, Clock, CheckCircle } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  species: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  completed: boolean;
  description: string;
}

const mockCases: CaseStudy[] = [
  {
    id: "1",
    title: "Canine Lameness Investigation",
    species: "Dog",
    difficulty: "Beginner",
    duration: "15 min",
    completed: true,
    description: "A 5-year-old Golden Retriever presents with sudden onset left forelimb lameness."
  },
  {
    id: "2", 
    title: "Feline Respiratory Distress",
    species: "Cat",
    difficulty: "Intermediate",
    duration: "25 min",
    completed: false,
    description: "An 8-year-old domestic shorthair with acute breathing difficulties and cyanosis."
  },
  {
    id: "3",
    title: "Equine Colic Emergency",
    species: "Horse",
    difficulty: "Advanced",
    duration: "40 min",
    completed: false,
    description: "A 12-year-old Thoroughbred mare with severe abdominal pain and rolling behavior."
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dr. Artingstall</h1>
              <p className="text-muted-foreground">Veterinary Detective & Master of Deduction</p>
            </div>
            <Button variant="outline">
              <Brain className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cases Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
              <Target className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">+5% improvement</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24h</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skill Level</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Advanced</div>
              <p className="text-xs text-muted-foreground">Diagnostic reasoning</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI-Powered Diagnosis
              </CardTitle>
              <CardDescription>
                Practice diagnostic reasoning with our advanced AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Start New Case</Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-secondary" />
                Learning Modules
              </CardTitle>
              <CardDescription>
                Explore comprehensive veterinary medicine topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Browse Modules</Button>
            </CardContent>
          </Card>
        </div>

        {/* Case Studies */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Case Studies</CardTitle>
            <CardDescription>Continue your diagnostic journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockCases.map((caseStudy) => (
                <Card key={caseStudy.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{caseStudy.title}</CardTitle>
                      {caseStudy.completed && (
                        <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline">{caseStudy.species}</Badge>
                      <Badge 
                        variant={
                          caseStudy.difficulty === "Beginner" ? "secondary" :
                          caseStudy.difficulty === "Intermediate" ? "default" : "destructive"
                        }
                      >
                        {caseStudy.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">{caseStudy.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {caseStudy.duration}
                      </span>
                      <Button size="sm" variant={caseStudy.completed ? "outline" : "default"}>
                        {caseStudy.completed ? "Review" : "Start"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}