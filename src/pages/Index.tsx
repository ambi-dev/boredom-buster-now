import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Coins, Settings as SettingsIcon, RefreshCw } from 'lucide-react';
import { StreakWidget } from '@/components/StreakWidget';
import { ScrapsModal } from '@/components/ScrapsModal';
import { Settings } from './Settings';

const questions = [
  "Que ressentez-vous en ce moment ?",
  "Quel est votre plus beau souvenir récent ?",
  "Si vous pouviez apprendre quelque chose aujourd'hui, ce serait quoi ?",
  "Qu'est-ce qui vous fait sourire automatiquement ?",
  "Quel petit plaisir vous ferait du bien maintenant ?",
  "De quoi êtes-vous reconnaissant(e) aujourd'hui ?",
  "Quel conseil donneriez-vous à votre moi d'hier ?",
  "Qu'est-ce qui vous inspire en ce moment ?",
];

// Simple toast replacement for problematic dependencies
const showToast = (message: string) => {
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
};

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [showStreakWidget, setShowStreakWidget] = useState(false);
  const [showScrapsModal, setShowScrapsModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [streak, setStreak] = useState(12);
  const [scraps, setScraps] = useState(247);
  const [answer, setAnswer] = useState('');

  const getRandomQuestion = () => {
    const availableQuestions = questions.filter(q => q !== currentQuestion);
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    setCurrentQuestion(availableQuestions[randomIndex]);
    setAnswer('');
  };

  const handleSubmitAnswer = () => {
    if (answer.trim()) {
      setScraps(prev => prev + 5);
      setAnswer('');
      getRandomQuestion();
      showToast('+5 Scraps ! Réponse enregistrée 🎉');
    }
  };

  if (showSettings) {
    return <Settings onBack={() => setShowSettings(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-10 w-40 h-40 bg-gradient-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-4 max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center pt-4 mb-8">
          <Button
            variant="floating"
            size="floating"
            onClick={() => setShowStreakWidget(true)}
            className="flex items-center gap-2 px-4 w-auto h-12"
          >
            <Flame className="h-5 w-5 text-accent" />
            <span className="font-bold">{streak}</span>
          </Button>

          <Button
            variant="floating"
            size="floating"
            onClick={() => setShowScrapsModal(true)}
            className="flex items-center gap-2 px-4 w-auto h-12"
          >
            <Coins className="h-5 w-5 text-accent" />
            <span className="font-bold">{scraps}</span>
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center space-y-8">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Nothing.
            </h1>
            
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-soft">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4 leading-relaxed">
                  {currentQuestion}
                </h2>
                
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Votre réponse..."
                  className="w-full min-h-[100px] p-3 rounded-lg bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-smooth"
                />
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button
                onClick={handleSubmitAnswer}
                disabled={!answer.trim()}
                className="w-full"
                variant="gradient"
                size="lg"
              >
                Valider ma réponse
              </Button>
              
              <Button
                onClick={getRandomQuestion}
                variant="minimal"
                size="lg"
                className="w-full"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Nouvelle question
              </Button>
            </div>
          </div>
        </div>

        {/* Settings Button */}
        <div className="pb-4">
          <Button
            variant="floating"
            size="floating"
            onClick={() => setShowSettings(true)}
            className="ml-0"
          >
            <SettingsIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Modals */}
      <StreakWidget
        isOpen={showStreakWidget}
        onClose={() => setShowStreakWidget(false)}
        streak={streak}
      />
      
      <ScrapsModal
        isOpen={showScrapsModal}
        onClose={() => setShowScrapsModal(false)}
        scraps={scraps}
      />
    </div>
  );
};

export default Index;