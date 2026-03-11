import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { t } from '@/data/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Plus, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function GrowthCharts() {
  const { children, selectedChildId, setSelectedChildId, setChildren, settings } = useApp();
  const lang = settings.language;
  const child = children.find(c => c.id === selectedChildId);

  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [head, setHead] = useState('');

  const addRecord = () => {
    if (!child) return;
    const record = {
      id: crypto.randomUUID(),
      date: date.toISOString(),
      weight: weight ? parseFloat(weight) : undefined,
      height: height ? parseFloat(height) : undefined,
      headCircumference: head ? parseFloat(head) : undefined,
    };
    setChildren(prev => prev.map(c =>
      c.id === child.id ? { ...c, growthRecords: [...c.growthRecords, record].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) } : c
    ));
    setWeight(''); setHeight(''); setHead('');
    setShowForm(false);
  };

  const chartData = child?.growthRecords.map(r => ({
    date: format(new Date(r.date), 'MMM dd'),
    weight: r.weight,
    height: r.height,
    head: r.headCircumference,
  })) || [];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-fredoka font-bold">{t('growth', lang)} 📊</h1>
        <p className="text-muted-foreground">Track height, weight & head circumference</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3">
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
          <Button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground rounded-xl gap-2">
            <Plus className="w-4 h-4" /> {t('addRecord', lang)}
          </Button>
        )}
      </div>

      {showForm && child && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
          <Card className="rounded-2xl">
            <CardContent className="p-5 space-y-4">
              <div>
                <Label>{t('date', lang)}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start rounded-xl mt-1">
                      {format(date, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={d => d && setDate(d)} className="p-3 pointer-events-auto" /></PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>{t('weight', lang)}</Label>
                  <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="rounded-xl mt-1" placeholder="kg" />
                </div>
                <div>
                  <Label>{t('height', lang)}</Label>
                  <Input type="number" value={height} onChange={e => setHeight(e.target.value)} className="rounded-xl mt-1" placeholder="cm" />
                </div>
                <div>
                  <Label>{t('headCircumference', lang)}</Label>
                  <Input type="number" value={head} onChange={e => setHead(e.target.value)} className="rounded-xl mt-1" placeholder="cm" />
                </div>
              </div>
              <Button onClick={addRecord} className="w-full gradient-primary text-primary-foreground rounded-xl">{t('save', lang)}</Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {child && chartData.length > 0 ? (
        <div className="space-y-4">
          <Card className="rounded-2xl">
            <CardHeader><CardTitle className="font-fredoka flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> {t('weight', lang)} & {t('height', lang)}</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))' }} />
                  <Legend />
                  <Line type="monotone" dataKey="weight" stroke="hsl(var(--baby-blue))" strokeWidth={3} dot={{ r: 5 }} name="Weight (kg)" />
                  <Line type="monotone" dataKey="height" stroke="hsl(var(--baby-green))" strokeWidth={3} dot={{ r: 5 }} name="Height (cm)" />
                  <Line type="monotone" dataKey="head" stroke="hsl(var(--baby-pink))" strokeWidth={3} dot={{ r: 5 }} name="Head (cm)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Records table */}
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-2">{t('date', lang)}</th>
                      <th className="text-right py-2 px-2">{t('weight', lang)}</th>
                      <th className="text-right py-2 px-2">{t('height', lang)}</th>
                      <th className="text-right py-2 px-2">Head</th>
                    </tr>
                  </thead>
                  <tbody>
                    {child.growthRecords.map(r => (
                      <tr key={r.id} className="border-b border-border/50">
                        <td className="py-2 px-2">{format(new Date(r.date), 'MMM dd, yyyy')}</td>
                        <td className="text-right py-2 px-2">{r.weight ?? '-'}</td>
                        <td className="text-right py-2 px-2">{r.height ?? '-'}</td>
                        <td className="text-right py-2 px-2">{r.headCircumference ?? '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : child ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">📏</div>
          <p className="text-muted-foreground">No growth records yet. Add your first measurement!</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">👶</div>
          <p className="text-muted-foreground">{t('selectChild', lang)}</p>
        </div>
      )}
    </div>
  );
}
