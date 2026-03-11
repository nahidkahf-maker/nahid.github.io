import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BedtimeDua } from '@/data/parentingContent';

interface Props {
  duas: BedtimeDua[];
  heading?: string;
}

export default function BedtimeDuasSection({ duas, heading }: Props) {
  return (
    <div className="space-y-4">
      <div className="gradient-primary text-primary-foreground rounded-2xl p-4">
        <h3 className="font-fredoka font-bold">🌙 {heading || 'Bedtime Duas'}</h3>
        <p className="text-xs opacity-90 mt-1">Teach your children these beautiful supplications for a peaceful night.</p>
      </div>

      <div className="space-y-3">
        {duas.map((dua, i) => (
          <motion.div
            key={dua.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card className="rounded-2xl hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-1 gradient-primary" />
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-fredoka font-semibold">{dua.title}</h4>
                  <Badge variant="secondary" className="text-[10px]">🌙 Bedtime</Badge>
                </div>
                
                <div className="space-y-3">
                  {/* Arabic Text */}
                  <div className="bg-muted/50 rounded-xl p-4 text-center" dir="rtl">
                    <p className="font-arabic text-xl leading-loose text-primary">{dua.arabicText}</p>
                  </div>
                  
                  {/* Transliteration */}
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground italic">{dua.transliteration}</p>
                  </div>
                  
                  {/* Translation */}
                  <div className="bg-primary/5 rounded-xl p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Translation</p>
                    <p className="text-sm leading-relaxed">{dua.translation}</p>
                  </div>
                  
                  {/* Benefit */}
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span>✨</span>
                    <p>{dua.benefit}</p>
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
