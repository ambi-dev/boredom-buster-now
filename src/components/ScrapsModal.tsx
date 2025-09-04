import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, Gift, Zap, CheckCircle, X } from 'lucide-react';

interface ScrapsModalProps {
  isOpen: boolean;
  onClose: () => void;
  scraps: number;
}

const scrapsInfo = [
  {
    icon: Gift,
    title: "Qu'est-ce que les Scraps ?",
    description: "Les Scraps sont votre monnaie virtuelle pour débloquer des défis spéciaux et des expériences premium."
  },
  {
    icon: Zap,
    title: "Comment en gagner ?",
    description: "Répondez aux questions quotidiennes, maintenez votre série, et participez aux défis communautaires."
  },
  {
    icon: CheckCircle,
    title: "À quoi ça sert ?",
    description: "Utilisez vos Scraps pour accéder à des puzzles exclusifs, personnaliser votre expérience, et débloquer du contenu premium."
  }
];

export function ScrapsModal({ isOpen, onClose, scraps }: ScrapsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-secondary border-0 shadow-glow animate-in slide-in-from-top-4 duration-300">
        <CardHeader className="relative pb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <Coins className="h-5 w-5 text-accent" />
            Vos Scraps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-accent p-4 rounded-2xl">
              <Coins className="h-6 w-6 text-accent-foreground" />
              <span className="text-2xl font-bold text-accent-foreground">
                {scraps}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Scraps disponibles
            </p>
          </div>
          
          <div className="space-y-4">
            {scrapsInfo.map((info, index) => {
              const Icon = info.icon;
              
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                >
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium mb-1">{info.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {info.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <Button 
            onClick={onClose}
            className="w-full" 
            variant="gradient"
          >
            Compris !
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}