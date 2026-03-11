import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ParentingResource } from '@/data/parentingContent';

interface Props {
  resources: ParentingResource[];
  heading?: string;
}

export default function ResourcesSection({ resources, heading }: Props) {
  return (
    <div className="space-y-4">
      <div className="gradient-sunset text-primary-foreground rounded-2xl p-4">
        <h3 className="font-fredoka font-bold">{heading || '📚 Knowledge Base'}</h3>
        <p className="text-xs opacity-90 mt-1">Essential parenting knowledge at your fingertips.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {resources.map((res, i) => (
          <motion.div
            key={res.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card className="rounded-2xl hover:shadow-md transition-shadow h-full">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{res.icon}</span>
                  <div>
                    <h4 className="font-fredoka font-semibold text-sm">{res.title}</h4>
                    <Badge variant="secondary" className="text-[10px] my-1">{res.category}</Badge>
                    <p className="text-xs text-muted-foreground leading-relaxed">{res.description}</p>
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
