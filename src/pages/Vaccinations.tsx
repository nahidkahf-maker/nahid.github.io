import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { t } from '@/data/translations';
import { getAge, getAgeStage } from '@/data/guidance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Syringe, AlertTriangle, CheckCircle2, Clock, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { differenceInMonths, differenceInYears, addMonths, format } from 'date-fns';

interface Vaccine {
  id: string;
  name: string;
  ageMonths: number;
  ageLabel: string;
  description: string;
  doses?: number;
}

const vaccineSchedule: Vaccine[] = [
  { id: 'hepb-1', name: 'Hepatitis B', ageMonths: 0, ageLabel: 'At Birth', description: 'First dose of Hepatitis B vaccine' },
  { id: 'dtap-1', name: 'DTaP', ageMonths: 2, ageLabel: '2 Months', description: 'Diphtheria, Tetanus & Pertussis - Dose 1' },
  { id: 'ipv-1', name: 'IPV (Polio)', ageMonths: 2, ageLabel: '2 Months', description: 'Inactivated Poliovirus - Dose 1' },
  { id: 'hib-1', name: 'Hib', ageMonths: 2, ageLabel: '2 Months', description: 'Haemophilus influenzae type b - Dose 1' },
  { id: 'pcv13-1', name: 'PCV13', ageMonths: 2, ageLabel: '2 Months', description: 'Pneumococcal conjugate - Dose 1' },
  { id: 'rv-1', name: 'Rotavirus', ageMonths: 2, ageLabel: '2 Months', description: 'Rotavirus - Dose 1' },
  { id: 'dtap-2', name: 'DTaP', ageMonths: 4, ageLabel: '4 Months', description: 'DTaP - Dose 2' },
  { id: 'ipv-2', name: 'IPV (Polio)', ageMonths: 4, ageLabel: '4 Months', description: 'IPV - Dose 2' },
  { id: 'hib-2', name: 'Hib', ageMonths: 4, ageLabel: '4 Months', description: 'Hib - Dose 2' },
  { id: 'pcv13-2', name: 'PCV13', ageMonths: 4, ageLabel: '4 Months', description: 'PCV13 - Dose 2' },
  { id: 'rv-2', name: 'Rotavirus', ageMonths: 4, ageLabel: '4 Months', description: 'Rotavirus - Dose 2' },
  { id: 'hepb-2', name: 'Hepatitis B', ageMonths: 6, ageLabel: '6 Months', description: 'Hepatitis B - Dose 2' },
  { id: 'dtap-3', name: 'DTaP', ageMonths: 6, ageLabel: '6 Months', description: 'DTaP - Dose 3' },
  { id: 'ipv-3', name: 'IPV (Polio)', ageMonths: 6, ageLabel: '6 Months', description: 'IPV - Dose 3' },
  { id: 'flu-1', name: 'Influenza', ageMonths: 6, ageLabel: '6 Months', description: 'Flu vaccine (annually after 6 months)' },
  { id: 'mmr-1', name: 'MMR', ageMonths: 12, ageLabel: '12 Months', description: 'Measles, Mumps & Rubella - Dose 1' },
  { id: 'var-1', name: 'Varicella', ageMonths: 12, ageLabel: '12 Months', description: 'Chickenpox - Dose 1' },
  { id: 'hepa-1', name: 'Hepatitis A', ageMonths: 12, ageLabel: '12 Months', description: 'Hepatitis A - Dose 1' },
  { id: 'pcv13-3', name: 'PCV13', ageMonths: 12, ageLabel: '12-15 Months', description: 'PCV13 - Booster' },
  { id: 'hib-3', name: 'Hib', ageMonths: 15, ageLabel: '12-15 Months', description: 'Hib - Booster' },
  { id: 'dtap-4', name: 'DTaP', ageMonths: 18, ageLabel: '15-18 Months', description: 'DTaP - Dose 4' },
  { id: 'hepa-2', name: 'Hepatitis A', ageMonths: 18, ageLabel: '18 Months', description: 'Hepatitis A - Dose 2' },
  { id: 'dtap-5', name: 'DTaP', ageMonths: 48, ageLabel: '4-6 Years', description: 'DTaP - Dose 5' },
  { id: 'ipv-4', name: 'IPV (Polio)', ageMonths: 48, ageLabel: '4-6 Years', description: 'IPV - Dose 4' },
  { id: 'mmr-2', name: 'MMR', ageMonths: 48, ageLabel: '4-6 Years', description: 'MMR - Dose 2' },
  { id: 'var-2', name: 'Varicella', ageMonths: 48, ageLabel: '4-6 Years', description: 'Varicella - Dose 2' },
  { id: 'hpv-1', name: 'HPV', ageMonths: 132, ageLabel: '11-12 Years', description: 'Human Papillomavirus - Series starts' },
  { id: 'tdap', name: 'Tdap', ageMonths: 132, ageLabel: '11-12 Years', description: 'Tetanus, Diphtheria & Pertussis booster' },
  { id: 'menacwy', name: 'MenACWY', ageMonths: 132, ageLabel: '11-12 Years', description: 'Meningococcal conjugate' },
  { id: 'menacwy-2', name: 'MenACWY', ageMonths: 192, ageLabel: '16 Years', description: 'Meningococcal booster' },
];

export default function Vaccinations() {
  const { children, selectedChildId, setSelectedChildId, settings } = useApp();
  const lang = settings.language;
  const child = children.find(c => c.id === selectedChildId);

  const [completedVaccines, setCompletedVaccines] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('bgt-vaccines');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const toggleVaccine = (childId: string, vaccineId: string) => {
    const key = `${childId}-${vaccineId}`;
    setCompletedVaccines(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      localStorage.setItem('bgt-vaccines', JSON.stringify([...next]));
      return next;
    });
  };

  const childAgeMonths = child ? differenceInMonths(new Date(), new Date(child.birthDate)) : 0;

  const getStatus = (vaccine: Vaccine) => {
    if (!child) return 'future';
    const key = `${child.id}-${vaccine.id}`;
    if (completedVaccines.has(key)) return 'completed';
    if (childAgeMonths >= vaccine.ageMonths && childAgeMonths <= vaccine.ageMonths + 2) return 'due';
    if (childAgeMonths > vaccine.ageMonths + 2) return 'overdue';
    return 'future';
  };

  const upcomingVaccines = child
    ? vaccineSchedule.filter(v => {
        const status = getStatus(v);
        return status === 'due' || status === 'overdue';
      })
    : [];

  const groupedByAge = vaccineSchedule.reduce<Record<string, Vaccine[]>>((acc, v) => {
    if (!acc[v.ageLabel]) acc[v.ageLabel] = [];
    acc[v.ageLabel].push(v);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-fredoka font-bold">Vaccinations 💉</h1>
        <p className="text-muted-foreground">Track your child's vaccination schedule</p>
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

      {/* Alerts for due/overdue */}
      {child && upcomingVaccines.length > 0 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="rounded-2xl border-2 border-baby-orange/50 bg-baby-orange/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="w-5 h-5 text-baby-orange animate-wiggle" />
                <h3 className="font-fredoka font-bold text-lg">Vaccination Alerts</h3>
              </div>
              <div className="space-y-2">
                {upcomingVaccines.map(v => {
                  const status = getStatus(v);
                  const dueDate = addMonths(new Date(child.birthDate), v.ageMonths);
                  return (
                    <div key={v.id} className={cn(
                      'flex items-center gap-3 p-3 rounded-xl',
                      status === 'overdue' ? 'bg-destructive/10' : 'bg-baby-yellow/10'
                    )}>
                      <AlertTriangle className={cn('w-4 h-4 shrink-0', status === 'overdue' ? 'text-destructive' : 'text-baby-orange')} />
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-sm">{v.name}</span>
                        <span className="text-xs text-muted-foreground block">{v.description}</span>
                      </div>
                      <Badge variant={status === 'overdue' ? 'destructive' : 'secondary'} className="text-[10px] shrink-0">
                        {status === 'overdue' ? 'OVERDUE' : 'DUE NOW'}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Full Schedule */}
      {child ? (
        <div className="space-y-4">
          {Object.entries(groupedByAge).map(([ageLabel, vaccines], groupIdx) => {
            const allCompleted = vaccines.every(v => completedVaccines.has(`${child.id}-${v.id}`));
            return (
              <motion.div
                key={ageLabel}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: groupIdx * 0.05 }}
              >
                <Card className={cn('rounded-2xl border-2 overflow-hidden', allCompleted && 'border-baby-green/30')}>
                  <CardHeader className={cn('pb-2', allCompleted ? 'bg-baby-green/10' : 'bg-muted/50')}>
                    <CardTitle className="font-fredoka text-base flex items-center gap-2">
                      {allCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-baby-green" />
                      ) : childAgeMonths >= vaccines[0].ageMonths ? (
                        <Syringe className="w-5 h-5 text-primary" />
                      ) : (
                        <Clock className="w-5 h-5 text-muted-foreground" />
                      )}
                      {ageLabel}
                      {allCompleted && <Badge className="bg-baby-green text-primary-foreground text-[10px] ml-auto">Complete</Badge>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    {vaccines.map(v => {
                      const status = getStatus(v);
                      const isCompleted = completedVaccines.has(`${child.id}-${v.id}`);
                      return (
                        <label key={v.id} className={cn(
                          'flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all hover:bg-muted/50',
                          isCompleted && 'opacity-60'
                        )}>
                          <Checkbox
                            checked={isCompleted}
                            onCheckedChange={() => toggleVaccine(child.id, v.id)}
                          />
                          <div className="flex-1 min-w-0">
                            <span className={cn('font-medium text-sm', isCompleted && 'line-through')}>{v.name}</span>
                            <span className="text-xs text-muted-foreground block">{v.description}</span>
                          </div>
                          {!isCompleted && status === 'due' && <Badge className="bg-baby-yellow text-foreground text-[10px]">Due</Badge>}
                          {!isCompleted && status === 'overdue' && <Badge variant="destructive" className="text-[10px]">Overdue</Badge>}
                        </label>
                      );
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">💉</div>
          <p className="text-muted-foreground">{t('selectChild', lang)}</p>
        </div>
      )}
    </div>
  );
}
