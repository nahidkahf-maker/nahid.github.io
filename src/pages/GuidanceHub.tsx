import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { t } from '@/data/translations';
import { guidanceCategories, guidanceData, ageStages, getAgeStage } from '@/data/guidance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AgeStage } from '@/types';
import { cn } from '@/lib/utils';

const categoryColors: Record<string, string> = {
  'baby-green': 'bg-baby-green/10 border-baby-green/30',
  'baby-blue': 'bg-baby-blue/10 border-baby-blue/30',
  'baby-yellow': 'bg-baby-yellow/10 border-baby-yellow/30',
  'baby-orange': 'bg-baby-orange/10 border-baby-orange/30',
  'baby-purple': 'bg-baby-purple/10 border-baby-purple/30',
  'baby-teal': 'bg-baby-teal/10 border-baby-teal/30',
  'baby-pink': 'bg-baby-pink/10 border-baby-pink/30',
  'baby-coral': 'bg-baby-coral/10 border-baby-coral/30',
};

export default function GuidanceHub() {
  const { children, selectedChildId, setSelectedChildId, settings } = useApp();
  const lang = settings.language;

  const selectedChild = children.find(c => c.id === selectedChildId);
  const autoStage = selectedChild ? getAgeStage(selectedChild.birthDate) : null;
  const [manualStage, setManualStage] = useState<AgeStage | null>(null);
  const currentStage = manualStage || autoStage || 'newborn';
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const stageData = guidanceData.filter(g => g.stage === currentStage);
  const stageInfo = ageStages.find(s => s.stage === currentStage);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-fredoka font-bold">{t('guidance', lang)} 📖</h1>
        <p className="text-muted-foreground">Age-appropriate guidance for every stage</p>
      </motion.div>

      {/* Child & Stage Selectors */}
      <div className="flex flex-col sm:flex-row gap-3">
        {children.length > 0 && (
          <Select value={selectedChildId || ''} onValueChange={v => { setSelectedChildId(v); setManualStage(null); }}>
            <SelectTrigger className="rounded-xl w-full sm:w-48">
              <SelectValue placeholder={t('selectChild', lang)} />
            </SelectTrigger>
            <SelectContent>
              {children.map(c => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Stage Timeline */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {ageStages.map(s => (
          <motion.button
            key={s.stage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setManualStage(s.stage)}
            className={cn(
              'flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-2xl border-2 transition-all font-medium text-sm',
              currentStage === s.stage
                ? 'gradient-primary text-primary-foreground border-transparent shadow-lg'
                : 'bg-card border-border hover:border-primary/30'
            )}
          >
            <span className="text-lg">{s.emoji}</span>
            <div className="text-left">
              <div className="font-semibold">{s.label}</div>
              <div className="text-[10px] opacity-80">{s.ageRange}</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Current stage info */}
      <motion.div
        key={currentStage}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="gradient-primary rounded-2xl p-4 text-primary-foreground shadow-lg"
      >
        <div className="flex items-center gap-3">
          <span className="text-4xl">{stageInfo?.emoji}</span>
          <div>
            <h2 className="font-fredoka text-xl font-bold">{stageInfo?.label} Stage</h2>
            <p className="opacity-90 text-sm">{stageInfo?.ageRange}</p>
          </div>
        </div>
      </motion.div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {guidanceCategories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Card
              className={cn(
                'cursor-pointer border-2 rounded-2xl transition-all h-full',
                activeCategory === cat.id ? 'ring-2 ring-primary shadow-lg' : '',
                categoryColors[cat.color] || 'bg-card'
              )}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-fredoka font-semibold text-sm">{cat.title}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Guidance Content */}
      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            key={activeCategory + currentStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {stageData
              .filter(g => g.categoryId === activeCategory)
              .map(g => {
                const cat = guidanceCategories.find(c => c.id === g.categoryId)!;
                return (
                  <Card key={g.categoryId} className="rounded-2xl border-2 overflow-hidden">
                    <CardHeader className={cn('pb-3', categoryColors[cat.color])}>
                      <CardTitle className="font-fredoka flex items-center gap-2">
                        <span className="text-2xl">{cat.icon}</span>
                        {cat.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5">
                      <ul className="space-y-3">
                        {g.items.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-3 text-sm"
                          >
                            <span className="mt-0.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show all categories if none selected */}
      {!activeCategory && (
        <div className="space-y-4">
          {stageData.map(g => {
            const cat = guidanceCategories.find(c => c.id === g.categoryId)!;
            return (
              <motion.div
                key={g.categoryId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="rounded-2xl border-2 overflow-hidden">
                  <CardHeader className={cn('pb-3 cursor-pointer', categoryColors[cat.color])} onClick={() => setActiveCategory(cat.id)}>
                    <CardTitle className="font-fredoka flex items-center gap-2 text-base">
                      <span className="text-xl">{cat.icon}</span>
                      {cat.title}
                      <span className="ml-auto text-xs text-muted-foreground">{g.items.length} tips</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      {g.items.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                      {g.items.length > 3 && (
                        <li className="text-xs text-primary font-medium cursor-pointer" onClick={() => setActiveCategory(cat.id)}>
                          +{g.items.length - 3} more tips →
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
