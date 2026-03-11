import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ParentingStory } from '@/data/parentingContent';

interface Props {
  stories: ParentingStory[];
  heading?: string;
  subtitle?: string;
  lessonLabel?: string;
}

export default function StorySection({ stories, heading, subtitle, lessonLabel }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="gradient-sky text-primary-foreground rounded-2xl p-4">
        <h3 className="font-fredoka font-bold">📖 {heading || 'Story-Based Learning'}</h3>
        <p className="text-xs opacity-90 mt-1">{subtitle || 'Beautiful stories with powerful parenting lessons. Read them to your children or reflect on them yourself.'}</p>
      </div>

      <div className="space-y-3">
        {stories.map((story, i) => {
          const expanded = expandedId === story.id;
          return (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card
                className="rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setExpandedId(expanded ? null : story.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{story.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-fredoka font-semibold text-sm">{story.title}</h4>
                      <Badge variant="secondary" className="text-[10px]">{story.ageGroup}</Badge>
                    </div>
                    <ChevronDown className={cn('w-5 h-5 text-muted-foreground transition-transform', expanded && 'rotate-180')} />
                  </div>

                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-border space-y-3">
                          <div className="bg-muted/50 rounded-xl p-3">
                            <p className="text-sm leading-relaxed italic">"{story.story}"</p>
                          </div>
                          <div className="gradient-warm text-primary-foreground rounded-xl p-3">
                            <p className="text-xs font-semibold mb-1">💡 {lessonLabel || 'Lesson'}:</p>
                            <p className="text-sm leading-relaxed">{story.moral}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
