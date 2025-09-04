import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bell, Palette, User, Info } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const settingsItems = [
    {
      icon: User,
      title: "Profil",
      description: "Gérer vos informations personnelles",
      action: () => console.log("Profile clicked")
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Configurer vos préférences de notification",
      action: () => console.log("Notifications clicked")
    },
    {
      icon: Palette,
      title: "Apparence",
      description: "Personnaliser l'interface de l'application",
      action: () => console.log("Appearance clicked")
    },
    {
      icon: Info,
      title: "À propos",
      description: "Informations sur l'application",
      action: () => console.log("About clicked")
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pt-4">
          <Button
            variant="floating"
            size="floating"
            onClick={onBack}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Paramètres</h1>
        </div>

        {/* Settings List */}
        <div className="space-y-3">
          {settingsItems.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <Card 
                key={index}
                className="bg-card/80 backdrop-blur-sm border-0 shadow-soft cursor-pointer hover:shadow-glow transition-all duration-300"
                onClick={item.action}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <ArrowLeft className="h-4 w-4 text-muted-foreground rotate-180" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Nothing. v1.0.0
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Conçu pour les moments d'ennui
          </p>
        </div>
      </div>
    </div>
  );
}