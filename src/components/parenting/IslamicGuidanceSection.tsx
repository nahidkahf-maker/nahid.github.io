import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { IslamicGuidance } from '@/data/parentingContent';
import { parentingHubTranslations } from '@/data/translations';
import type { Language } from '@/types';

interface Props {
  guidance: IslamicGuidance[];
  categories: string[];
  lang?: Language;
}

const sourceColors: Record<string, string> = {
  quran: 'gradient-nature',
  hadith: 'gradient-primary',
  scholar: 'gradient-warm',
};

export default function IslamicGuidanceSection({ guidance, categories, lang = 'en' }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSource, setSelectedSource] = useState<'all' | 'quran' | 'hadith' | 'scholar'>('all');
  const pt = parentingHubTranslations[lang] || parentingHubTranslations.en;

  const filtered = useMemo(() =>
    guidance
      .filter(g => selectedCategory === 'All' || g.category === selectedCategory)
      .filter(g => selectedSource === 'all' || g.sourceType === selectedSource),
    [guidance, selectedCategory, selectedSource]
  );

  const sourceLabelsLocal: Record<string, string> = {
    all: pt.allSources,
    quran: pt.quran,
    hadith: pt.hadith,
    scholar: '🎓 Scholar',
  };

  return (
    <div className="space-y-4">
      {/* Source filter */}
      <div className="flex gap-2">
        {(['all', 'quran', 'hadith'] as const).map(src => (
          <button
            key={src}
            onClick={() => setSelectedSource(src)}
            className={cn(
              'px-4 py-2 rounded-2xl text-xs font-semibold transition-all border-2',
              selectedSource === src
                ? 'gradient-primary text-primary-foreground border-transparent'
                : 'bg-card border-border'
            )}
          >
            {sourceLabelsLocal[src]}
          </button>
        ))}
      </div>

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

      {/* Cards */}
      <div className="space-y-3">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card className="rounded-2xl hover:shadow-md transition-shadow overflow-hidden">
              <div className={cn('h-1', sourceColors[item.sourceType])} />
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-fredoka font-semibold text-sm">{item.title}</span>
                  <Badge variant="outline" className="text-[10px] ml-auto shrink-0">
                    {sourceLabelsLocal[item.sourceType] || item.sourceType}
                  </Badge>
                </div>
                {item.arabicText && (
                  <p className="text-right font-arabic text-lg leading-loose text-primary mb-2 bg-muted/50 rounded-xl p-3" dir="rtl">
                    {item.arabicText}
                  </p>
                )}
                <p className="text-xs text-muted-foreground font-medium mb-1.5">{item.source}</p>
                <p className="text-sm leading-relaxed">{item.content}</p>
                <Badge variant="secondary" className="text-[10px] mt-2">{item.category}</Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-4xl mb-2">🕌</p>
            <p>{pt.noGuidance}</p>
          </div>
        )}
      </div>
    </div>
  );
}
