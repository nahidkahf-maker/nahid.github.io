import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ageStages } from '@/data/guidance';
import type { OfflineActivity } from '@/data/parentingContent';
import { AgeStage } from '@/types';

interface Props {
  activities: OfflineActivity[];
}

export default function OfflineActivitiesSection({ activities }: Props) {
  const [selectedStage, setSelectedStage] = useState<AgeStage | 'all'>('all');

  const filtered = useMemo(() =>
    selectedStage === 'all' ? activities : activities.filter(a => a.stage === selectedStage),
    [activities, selectedStage]
  );

  return (
    <div className="space-y-4">
      <div className="gradient-nature text-primary-foreground rounded-2xl p-4">
        <h3 className="font-fredoka font-bold">🎨 Screen-Free Fun!</h3>
        <p className="text-xs opacity-90 mt-1">No screens needed. Just quality time, creativity, and imagination.</p>
      </div>

      {/* Stage filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedStage('all')}
          className={cn(
            'px-3 py-1.5 rounded-2xl text-xs font-medium border-2 shrink-0',
            selectedStage === 'all' ? 'gradient-primary text-primary-foreground border-transparent' : 'bg-card border-border'
          )}
        >🌟 All Ages</button>
        {ageStages.map(s => (
          <button
            key={s.stage}
            onClick={() => setSelectedStage(s.stage)}
            className={cn(
              'px-3 py-1.5 rounded-2xl text-xs font-medium border-2 shrink-0',
              selectedStage === s.stage ? 'gradient-primary text-primary-foreground border-transparent' : 'bg-card border-border'
            )}
          >{s.emoji} {s.label}</button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((act, i) => (
          <motion.div
            key={act.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card className="rounded-2xl hover:shadow-md transition-shadow h-full">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{act.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-fredoka font-semibold text-sm">{act.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{act.description}</p>

                    <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {act.duration}</span>
                      <span className="flex items-center gap-1"><Package className="w-3 h-3" /> {act.materials.length} items</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {act.materials.map(m => (
                        <Badge key={m} variant="outline" className="text-[9px] py-0">{m}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-12 text-muted-foreground">
            <p className="text-4xl mb-2">🎨</p>
            <p>No activities for this age group yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
