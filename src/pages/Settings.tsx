import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { t, languageNames } from '@/data/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Language } from '@/types';
import { Download, Upload, Globe, Sun, Moon } from 'lucide-react';
import { useEffect } from 'react';

export default function SettingsPage() {
  const { children, familyMembers, journalEntries, settings, setSettings, setChildren, setFamilyMembers, setJournalEntries } = useApp();
  const lang = settings.language;
  const isDark = settings.theme === 'dark';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setSettings(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  const exportData = () => {
    const data = { children, familyMembers, journalEntries, settings, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `baby-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          if (data.children) setChildren(data.children);
          if (data.familyMembers) setFamilyMembers(data.familyMembers);
          if (data.journalEntries) setJournalEntries(data.journalEntries);
          if (data.settings) setSettings(data.settings);
        } catch (err) {
          console.error('Invalid file', err);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-fredoka font-bold">{t('settings', lang)} ⚙️</h1>
      </motion.div>

      {/* Dark Mode */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="font-fredoka flex items-center gap-2">
            {isDark ? <Moon className="w-5 h-5 text-baby-purple" /> : <Sun className="w-5 h-5 text-baby-yellow" />}
            {t('theme', lang)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{isDark ? 'Dark Mode' : 'Light Mode'}</p>
              <p className="text-sm text-muted-foreground">
                {isDark ? 'Easy on the eyes for late-night feeds 🌙' : 'Bright and cheerful ☀️'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-baby-yellow" />
              <Switch checked={isDark} onCheckedChange={toggleTheme} />
              <Moon className="w-4 h-4 text-baby-purple" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="font-fredoka flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" /> {t('language', lang)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={settings.language} onValueChange={(v: Language) => setSettings(prev => ({ ...prev, language: v }))}>
            <SelectTrigger className="rounded-xl w-full sm:w-64"><SelectValue /></SelectTrigger>
            <SelectContent>
              {(Object.entries(languageNames) as [Language, string][]).map(([code, name]) => (
                <SelectItem key={code} value={code}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="font-fredoka">Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={exportData} variant="outline" className="rounded-xl gap-2">
              <Download className="w-4 h-4" /> {t('exportData', lang)}
            </Button>
            <Button onClick={importData} variant="outline" className="rounded-xl gap-2">
              <Upload className="w-4 h-4" /> {t('importData', lang)}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Export your data as JSON for backup. Import to restore.</p>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="font-fredoka">App Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-baby-pink/10 rounded-xl p-3">
              <div className="font-fredoka text-2xl font-bold">{children.length}</div>
              <div className="text-xs text-muted-foreground">Children</div>
            </div>
            <div className="bg-baby-blue/10 rounded-xl p-3">
              <div className="font-fredoka text-2xl font-bold">{familyMembers.length}</div>
              <div className="text-xs text-muted-foreground">Family</div>
            </div>
            <div className="bg-baby-green/10 rounded-xl p-3">
              <div className="font-fredoka text-2xl font-bold">{journalEntries.length}</div>
              <div className="text-xs text-muted-foreground">Journal</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
