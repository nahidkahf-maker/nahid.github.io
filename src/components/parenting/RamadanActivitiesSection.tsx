import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { RamadanActivity } from '@/data/parentingContent';

interface Props {
  activities: RamadanActivity[];
  heading?: string;
}

export default function RamadanActivitiesSection({ activities, heading }: Props) {
  return (
    <div className="space-y-4">
      <div className="gradient-warm text-primary-foreground rounded-2xl p-4">
        <h3 className="font-fredoka font-bold">🌙 {heading || 'Ramadan Activities'}</h3>
        <p className="text-xs opacity-90 mt-1">Fun and meaningful activities to make Ramadan special for your children.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card className="rounded-2xl hover:shadow-md transition-shadow h-full overflow-hidden">
              <div className="h-1 gradient-warm" />
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{activity.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-fredoka font-semibold text-sm">{activity.title}</h4>
                    <div className="flex gap-1.5 mt-1 flex-wrap">
                      <Badge variant="secondary" className="text-[10px]">{activity.stage === 'all' ? 'All Ages' : activity.stage}</Badge>
                      <Badge variant="outline" className="text-[10px]">⏱️ {activity.duration}</Badge>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{activity.description}</p>
                
                <div className="bg-muted/50 rounded-xl p-2.5">
                  <p className="text-[10px] font-medium text-muted-foreground mb-1">Materials Needed:</p>
                  <div className="flex flex-wrap gap-1">
                    {activity.materials.map((material, idx) => (
                      <Badge key={idx} variant="outline" className="text-[10px] font-normal">
                        {material}
                      </Badge>
                    ))}
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
