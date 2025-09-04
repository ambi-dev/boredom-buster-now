import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Trophy, Zap, Star, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  streak: number;
}

const rewards = [
  { days: 7, icon: Zap, name: "Éclair", description: "7 jours consécutifs", earned: true },
  { days: 14, icon: Star, name: "Étoile", description: "14 jours consécutifs", earned: true },
  { days: 30, icon: Trophy, name: "Trophée", description: "30 jours consécutifs", earned: false },
];

export function StreakWidget({ isOpen, onClose, streak }: StreakWidgetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-gradient-secondary border-0 shadow-glow animate-in slide-in-from-top-4 duration-300">
        <CardHeader className="relative pb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <Flame className="h-5 w-5 text-accent" />
            Série de {streak} jours
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {streak}
            </div>
            <p className="text-sm text-muted-foreground">
              Jours consécutifs d'activité
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Récompenses</h4>
            {rewards.map((reward) => {
              const Icon = reward.icon;
              const isEarned = streak >= reward.days;
              
              return (
                <div
                  key={reward.days}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-lg transition-smooth",
                    isEarned 
                      ? "bg-accent/10 border border-accent/20" 
                      : "bg-muted/30 opacity-50"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-full",
                    isEarned ? "bg-gradient-accent" : "bg-muted"
                  )}>
                    <Icon className={cn(
                      "h-4 w-4",
                      isEarned ? "text-accent-foreground" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{reward.name}</span>
                      {isEarned && <Zap className="h-3 w-3 text-accent" />}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {reward.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}