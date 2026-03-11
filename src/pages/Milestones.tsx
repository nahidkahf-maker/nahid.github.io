import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { t } from '@/data/translations';
import { getAgeStage, milestonesByStage, ageStages } from '@/data/guidance';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Milestones() {
  const { children, selectedChildId, setSelectedChildId, setChildren, settings } = useApp();
  const lang = settings.language;
  const child = children.find(c => c.id === selectedChildId);
  const stage = child ? getAgeStage(child.birthDate) : 'newborn';
  const milestones = milestonesByStage[stage] || [];
  const achievedIds = new Set(child?.milestones.map(m => m.milestoneId) || []);
  const progressPct = milestones.length > 0 ? Math.round((achievedIds.size / milestones.length) * 100) : 0;
  const [celebrating, setCelebrating] = useState(false);

  const toggleMilestone = (milestoneId: string) => {
    if (!child) return;
    const isAchieved = achievedIds.has(milestoneId);
    setChildren(prev => prev.map(c => {
      if (c.id !== child.id) return c;
      if (isAchieved) {
        return { ...c, milestones: c.milestones.filter(m => m.milestoneId !== milestoneId) };
      } else {
        setCelebrating(true);
        setTimeout(() => setCelebrating(false), 2000);
        return { ...c, milestones: [...c.milestones, { id: crypto.randomUUID(), milestoneId, achievedDate: new Date().toISOString() }] };
      }
    }));
  };

  const categories = [...new Set(milestones.map(m => m.category))];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-fredoka font-bold">{t('milestones', lang)} 🎯</h1>
        <p className="text-muted-foreground">Track your child's developmental milestones</p>
      </motion.div>

      {children.length > 0 && (
        <Select value={selectedChildId || ''} onValueChange={setSelectedChildId}>
          <SelectTrigger className="rounded-xl w-full sm:w-48">
            <SelectValue placeholder={t('selectChild', lang)} />
          </SelectTrigger>
          <SelectContent>
            {children.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      )}

      {/* Celebration */}
      <AnimatePresence>
        {celebrating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="text-center">
              <PartyPopper className="w-20 h-20 text-baby-yellow mx-auto animate-bounce-gentle" />
              <p className="text-2xl font-fredoka font-bold mt-2 text-foreground">🎉 Milestone Achieved! 🎉</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {child ? (
        <>
          {/* Progress */}
          <Card className="rounded-2xl gradient-primary text-primary-foreground">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-fredoka font-bold text-lg">{t('progress', lang)}</span>
                <span className="font-fredoka font-bold text-2xl">{progressPct}%</span>
              </div>
              <Progress value={progressPct} className="h-3 bg-primary-foreground/20" />
              <p className="text-sm mt-2 opacity-90">{achievedIds.size} / {milestones.length} milestones achieved</p>
            </CardContent>
          </Card>

          {/* Milestones by category */}
          {categories.map(cat => (
            <div key={cat}>
              <h3 className="font-fredoka font-semibold text-lg mb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                {cat}
              </h3>
              <div className="space-y-2">
                {milestones.filter(m => m.category === cat).map((m, idx) => {
                  const achieved = achievedIds.has(m.id);
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Card
                        className={cn(
                          'cursor-pointer rounded-xl border-2 transition-all',
                          achieved ? 'bg-baby-green/10 border-baby-green/30' : 'hover:border-primary/30'
                        )}
                        onClick={() => toggleMilestone(m.id)}
                      >
                        <CardContent className="p-3 flex items-center gap-3">
                          {achieved ? (
                            <CheckCircle2 className="w-6 h-6 text-baby-green shrink-0" />
                          ) : (
                            <Circle className="w-6 h-6 text-muted-foreground shrink-0" />
                          )}
                          <span className={cn('text-sm font-medium', achieved && 'line-through opacity-70')}>
                            {m.title}
                          </span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">🎯</div>
          <p className="text-muted-foreground">{t('selectChild', lang)}</p>
        </div>
      )}
    </div>
  );
}
