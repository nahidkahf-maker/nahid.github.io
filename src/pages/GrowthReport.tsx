import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { t } from '@/data/translations';
import { getAge, getAgeStage, ageStages, milestonesByStage } from '@/data/guidance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Printer, FileText, Baby, TrendingUp, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function GrowthReport() {
  const { children, selectedChildId, setSelectedChildId, settings } = useApp();
  const lang = settings.language;
  const child = children.find(c => c.id === selectedChildId);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const stage = child ? getAgeStage(child.birthDate) : 'newborn';
  const stageInfo = ageStages.find(s => s.stage === stage);
  const milestones = milestonesByStage[stage] || [];
  const achievedIds = new Set(child?.milestones.map(m => m.milestoneId) || []);
  const latestGrowth = child?.growthRecords[child.growthRecords.length - 1];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="print:hidden">
        <h1 className="text-3xl font-fredoka font-bold">Growth Report 📋</h1>
        <p className="text-muted-foreground">Generate a printable report for your pediatrician</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3 print:hidden">
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
        {child && (
          <Button onClick={handlePrint} className="gradient-primary text-primary-foreground rounded-xl gap-2">
            <Printer className="w-4 h-4" /> Print Report
          </Button>
        )}
      </div>

      {child ? (
        <div ref={printRef} className="space-y-4 print:space-y-6">
          {/* Report Header */}
          <Card className="rounded-2xl print:rounded-none print:border-2 print:border-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                <div>
                  <h2 className="font-fredoka text-2xl font-bold">Child Growth Report</h2>
                  <p className="text-sm text-muted-foreground">Generated on {format(new Date(), 'MMMM dd, yyyy')}</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl">{stageInfo?.emoji}</span>
                  <p className="text-sm font-medium">{stageInfo?.label} Stage</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-baby-pink/10 rounded-xl p-3 print:border print:border-foreground/20">
                  <div className="text-xs text-muted-foreground flex items-center gap-1"><Baby className="w-3 h-3" /> Name</div>
                  <div className="font-fredoka font-bold text-lg">{child.name}</div>
                </div>
                <div className="bg-baby-blue/10 rounded-xl p-3 print:border print:border-foreground/20">
                  <div className="text-xs text-muted-foreground">Birth Date</div>
                  <div className="font-fredoka font-bold">{format(new Date(child.birthDate), 'MMM dd, yyyy')}</div>
                </div>
                <div className="bg-baby-green/10 rounded-xl p-3 print:border print:border-foreground/20">
                  <div className="text-xs text-muted-foreground">Current Age</div>
                  <div className="font-fredoka font-bold">{getAge(child.birthDate)}</div>
                </div>
                <div className="bg-baby-yellow/10 rounded-xl p-3 print:border print:border-foreground/20">
                  <div className="text-xs text-muted-foreground">Gender</div>
                  <div className="font-fredoka font-bold capitalize">{child.gender}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Latest Measurements */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="font-fredoka flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" /> Latest Measurements
              </CardTitle>
            </CardHeader>
            <CardContent>
              {latestGrowth ? (
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-baby-blue/10 rounded-xl">
                    <div className="text-xs text-muted-foreground">Weight</div>
                    <div className="font-fredoka text-2xl font-bold">{latestGrowth.weight ?? '-'}</div>
                    <div className="text-xs text-muted-foreground">kg</div>
                  </div>
                  <div className="text-center p-3 bg-baby-green/10 rounded-xl">
                    <div className="text-xs text-muted-foreground">Height</div>
                    <div className="font-fredoka text-2xl font-bold">{latestGrowth.height ?? '-'}</div>
                    <div className="text-xs text-muted-foreground">cm</div>
                  </div>
                  <div className="text-center p-3 bg-baby-pink/10 rounded-xl">
                    <div className="text-xs text-muted-foreground">Head Circ.</div>
                    <div className="font-fredoka text-2xl font-bold">{latestGrowth.headCircumference ?? '-'}</div>
                    <div className="text-xs text-muted-foreground">cm</div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No measurements recorded yet</p>
              )}
            </CardContent>
          </Card>

          {/* Growth History */}
          {child.growthRecords.length > 0 && (
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="font-fredoka">Growth History</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-2">Date</th>
                      <th className="text-right py-2">Weight (kg)</th>
                      <th className="text-right py-2">Height (cm)</th>
                      <th className="text-right py-2">Head (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {child.growthRecords.map(r => (
                      <tr key={r.id} className="border-b border-border/50">
                        <td className="py-2">{format(new Date(r.date), 'MMM dd, yyyy')}</td>
                        <td className="text-right py-2">{r.weight ?? '-'}</td>
                        <td className="text-right py-2">{r.height ?? '-'}</td>
                        <td className="text-right py-2">{r.headCircumference ?? '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* Milestones */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="font-fredoka flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-baby-green" /> Milestone Progress ({stageInfo?.label})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3 text-sm text-muted-foreground">
                {achievedIds.size} of {milestones.length} milestones achieved ({milestones.length > 0 ? Math.round((achievedIds.size / milestones.length) * 100) : 0}%)
              </div>
              <div className="space-y-1">
                {milestones.map(m => (
                  <div key={m.id} className="flex items-center gap-2 text-sm py-1">
                    {achievedIds.has(m.id) ? (
                      <CheckCircle2 className="w-4 h-4 text-baby-green shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                    )}
                    <span className={cn(achievedIds.has(m.id) && 'text-muted-foreground')}>{m.title}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{m.category}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground py-4 border-t border-border">
            <p>Generated by Baby Growth Tracker • {format(new Date(), 'MMMM dd, yyyy')}</p>
            <p>This report is for informational purposes. Please consult your pediatrician for medical advice.</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">{t('selectChild', lang)} to generate a report</p>
        </div>
      )}
    </div>
  );
}
