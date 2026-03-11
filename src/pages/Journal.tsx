import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { t } from '@/data/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Plus, Smile, Meh, Frown, ThermometerSun } from 'lucide-react';
import { JournalEntry } from '@/types';

const moodIcons = {
  happy: { icon: Smile, color: 'text-baby-green', bg: 'bg-baby-green/10', emoji: '😊' },
  neutral: { icon: Meh, color: 'text-baby-yellow', bg: 'bg-baby-yellow/10', emoji: '😐' },
  fussy: { icon: Frown, color: 'text-baby-orange', bg: 'bg-baby-orange/10', emoji: '😢' },
  sick: { icon: ThermometerSun, color: 'text-baby-coral', bg: 'bg-baby-coral/10', emoji: '🤒' },
};

export default function Journal() {
  const { children, selectedChildId, setSelectedChildId, journalEntries, setJournalEntries, settings } = useApp();
  const lang = settings.language;
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [feeding, setFeeding] = useState('');
  const [sleep, setSleep] = useState('');
  const [mood, setMood] = useState<JournalEntry['mood']>('happy');
  const [diaper, setDiaper] = useState('');
  const [notes, setNotes] = useState('');

  const childEntries = journalEntries
    .filter(e => e.childId === selectedChildId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const addEntry = () => {
    if (!selectedChildId) return;
    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      childId: selectedChildId,
      date: date.toISOString(),
      feeding: feeding || undefined,
      sleep: sleep || undefined,
      mood,
      diaper: diaper ? parseInt(diaper) : undefined,
      notes: notes || undefined,
    };
    setJournalEntries(prev => [...prev, entry]);
    setFeeding(''); setSleep(''); setDiaper(''); setNotes('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-fredoka font-bold">{t('journal', lang)} 📝</h1>
        <p className="text-muted-foreground">Daily log for feeding, sleep, mood & more</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3">
        {children.length > 0 && (
          <Select value={selectedChildId || ''} onValueChange={setSelectedChildId}>
            <SelectTrigger className="rounded-xl w-full sm:w-48"><SelectValue placeholder={t('selectChild', lang)} /></SelectTrigger>
            <SelectContent>{children.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
          </Select>
        )}
        {selectedChildId && (
          <Button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground rounded-xl gap-2">
            <Plus className="w-4 h-4" /> {t('addEntry', lang)}
          </Button>
        )}
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
          <Card className="rounded-2xl">
            <CardContent className="p-5 space-y-4">
              <div>
                <Label>{t('date', lang)}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start rounded-xl mt-1">{format(date, 'PPP')}</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={d => d && setDate(d)} className="p-3 pointer-events-auto" /></PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>{t('mood', lang)}</Label>
                <div className="flex gap-2 mt-1">
                  {(Object.keys(moodIcons) as Array<keyof typeof moodIcons>).map(m => (
                    <button
                      key={m}
                      onClick={() => setMood(m)}
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 rounded-xl border-2 text-sm font-medium transition-all',
                        mood === m ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/30'
                      )}
                    >
                      <span className="text-lg">{moodIcons[m].emoji}</span>
                      {t(m, lang)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div><Label>{t('feeding', lang)}</Label><Input value={feeding} onChange={e => setFeeding(e.target.value)} className="rounded-xl mt-1" placeholder="e.g. Breastfed 30min" /></div>
                <div><Label>{t('sleep', lang)}</Label><Input value={sleep} onChange={e => setSleep(e.target.value)} className="rounded-xl mt-1" placeholder="e.g. 10 hours" /></div>
                <div><Label>{t('diaper', lang)}</Label><Input type="number" value={diaper} onChange={e => setDiaper(e.target.value)} className="rounded-xl mt-1" placeholder="count" /></div>
              </div>

              <div><Label>{t('notes', lang)}</Label><Textarea value={notes} onChange={e => setNotes(e.target.value)} className="rounded-xl mt-1" placeholder="How was the day?" /></div>

              <Button onClick={addEntry} className="w-full gradient-primary text-primary-foreground rounded-xl">{t('save', lang)}</Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {childEntries.length > 0 ? (
        <div className="space-y-3">
          {childEntries.map((entry, idx) => {
            const moodInfo = moodIcons[entry.mood || 'happy'];
            return (
              <motion.div key={entry.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Card className="rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-fredoka font-semibold">{format(new Date(entry.date), 'EEEE, MMM dd')}</span>
                      <span className={cn('flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium', moodInfo.bg)}>
                        {moodInfo.emoji} {t(entry.mood || 'happy', lang)}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {entry.feeding && <div className="bg-baby-green/10 rounded-lg p-2"><span className="text-xs text-muted-foreground block">🍼 {t('feeding', lang)}</span>{entry.feeding}</div>}
                      {entry.sleep && <div className="bg-baby-blue/10 rounded-lg p-2"><span className="text-xs text-muted-foreground block">💤 {t('sleep', lang)}</span>{entry.sleep}</div>}
                      {entry.diaper !== undefined && <div className="bg-baby-yellow/10 rounded-lg p-2"><span className="text-xs text-muted-foreground block">🧷 {t('diaper', lang)}</span>{entry.diaper}x</div>}
                    </div>
                    {entry.notes && <p className="text-sm text-muted-foreground mt-2 italic">"{entry.notes}"</p>}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : selectedChildId ? (
        <div className="text-center py-12"><div className="text-5xl mb-3">📝</div><p className="text-muted-foreground">No journal entries yet</p></div>
      ) : (
        <div className="text-center py-12"><div className="text-5xl mb-3">👶</div><p className="text-muted-foreground">{t('selectChild', lang)}</p></div>
      )}
    </div>
  );
}
