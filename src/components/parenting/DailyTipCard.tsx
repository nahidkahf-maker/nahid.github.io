import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DailyTip } from '@/data/parentingContent';

interface Props {
  tips: DailyTip[];
  tipOfDayLabel?: string;
}

export default function DailyTipCard({ tips, tipOfDayLabel }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(tips.map(t => t.category))];

  const filtered = useMemo(() =>
    selectedCategory === 'All' ? tips : tips.filter(t => t.category === selectedCategory),
    [tips, selectedCategory]
  );

  // "Tip of the day" based on date
  const todayIndex = new Date().getDate() % tips.length;
  const tipOfDay = tips[todayIndex];

  return (
    <div className="space-y-4">
      {/* Tip of the Day */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="rounded-2xl gradient-warm text-primary-foreground overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">✨</span>
              <span className="font-fredoka font-bold text-lg">{tipOfDayLabel || 'Tip of the Day'}</span>
            </div>
            <p className="text-sm leading-relaxed opacity-95">{tipOfDay.tip}</p>
            <Badge variant="outline" className="mt-3 border-primary-foreground/30 text-primary-foreground text-[10px]">
              {tipOfDay.icon} {tipOfDay.category}
            </Badge>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-2">
        {categories.map(cat => (
          <Badge
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            className={cn('cursor-pointer text-xs shrink-0', selectedCategory === cat && 'gradient-primary border-transparent')}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* Tips grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((tip, i) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card className="rounded-2xl hover:shadow-md transition-shadow h-full">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{tip.icon}</span>
                  <div>
                    <Badge variant="secondary" className="text-[10px] mb-1.5">{tip.category}</Badge>
                    <p className="text-sm leading-relaxed">{tip.tip}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
