import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SeerahLesson } from '@/data/parentingContent';

interface Props {
  lessons: SeerahLesson[];
  heading?: string;
}

export default function SeerahLessonsSection({ lessons, heading }: Props) {
  return (
    <div className="space-y-4">
      <div className="gradient-nature text-primary-foreground rounded-2xl p-4">
        <h3 className="font-fredoka font-bold">🌙 {heading || 'Seerah-Based Parenting'}</h3>
        <p className="text-xs opacity-90 mt-1">Lessons from the Prophet's ﷺ life for raising righteous children.</p>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson, i) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card className="rounded-2xl hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-1 gradient-nature" />
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{lesson.icon}</span>
                  <div>
                    <h4 className="font-fredoka font-semibold">{lesson.title}</h4>
                    <Badge variant="secondary" className="text-[10px]">{lesson.stage === 'all' ? 'All Ages' : lesson.stage}</Badge>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="bg-muted/50 rounded-xl p-3">
                    <p className="font-medium text-muted-foreground mb-1">📜 Story</p>
                    <p className="leading-relaxed">{lesson.story}</p>
                  </div>
                  
                  <div className="bg-primary/5 rounded-xl p-3">
                    <p className="font-medium text-primary mb-1">💡 Lesson</p>
                    <p className="leading-relaxed">{lesson.lesson}</p>
                  </div>
                  
                  <div className="border border-border rounded-xl p-3">
                    <p className="font-medium text-muted-foreground mb-1">✅ How to Apply</p>
                    <p className="leading-relaxed text-muted-foreground">{lesson.application}</p>
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
