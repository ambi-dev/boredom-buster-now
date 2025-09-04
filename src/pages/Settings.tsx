import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Globe, Volume2, VolumeX, Heart, Sun, Moon, ExternalLink } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from system preference
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const supportLinks = [
    {
      name: 'PayPal',
      url: 'https://paypal.me/nothing',
      icon: '💰',
      color: 'bg-blue-500'
    },
    {
      name: 'Ko-fi',
      url: 'https://ko-fi.com/nothing',
      icon: '☕',
      color: 'bg-red-500'
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

        <div className="space-y-6">
          {/* Language Settings */}
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Langue</h3>
                  <p className="text-sm text-muted-foreground">
                    Choisir la langue de l'application
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={language === 'fr' ? 'gradient' : 'minimal'}
                  size="sm"
                  onClick={() => setLanguage('fr')}
                  className="flex items-center gap-2"
                >
                  🇫🇷 Français
                </Button>
                <Button
                  variant={language === 'en' ? 'gradient' : 'minimal'}
                  size="sm"
                  onClick={() => setLanguage('en')}
                  className="flex items-center gap-2"
                >
                  🇬🇧 English
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sound Settings */}
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    {soundEnabled ? 
                      <Volume2 className="h-5 w-5 text-primary" /> : 
                      <VolumeX className="h-5 w-5 text-primary" />
                    }
                  </div>
                  <div>
                    <h3 className="font-medium">Son</h3>
                    <p className="text-sm text-muted-foreground">
                      Activer les effets sonores
                    </p>
                  </div>
                </div>
                <Switch
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    {darkMode ? 
                      <Moon className="h-5 w-5 text-primary" /> : 
                      <Sun className="h-5 w-5 text-primary" />
                    }
                  </div>
                  <div>
                    <h3 className="font-medium">Thème</h3>
                    <p className="text-sm text-muted-foreground">
                      Mode {darkMode ? 'sombre' : 'clair'}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={toggleDarkMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Support Section */}
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-accent/20">
                  <Heart className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium">Soutenir Nothing.</h3>
                  <p className="text-sm text-muted-foreground">
                    Aidez-nous à améliorer l'application
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {supportLinks.map((link) => (
                  <Button
                    key={link.name}
                    variant="minimal"
                    className="w-full justify-between h-12"
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{link.icon}</span>
                      <span>Soutenir sur {link.name}</span>
                    </div>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Separator className="my-6" />

          {/* Footer Info */}
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Nothing. v1.0.0
            </p>
            <p className="text-xs text-muted-foreground">
              Conçu pour les moments d'ennui ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}