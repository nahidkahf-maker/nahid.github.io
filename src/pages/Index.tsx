import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Baby, Calendar, Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { t } from '@/data/translations';
import { getAge, getAgeStage, ageStages } from '@/data/guidance';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComp } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Child } from '@/types';
import { useNavigate } from 'react-router-dom';

const gradients = ['gradient-primary', 'gradient-warm', 'gradient-nature', 'gradient-sunset', 'gradient-sky'];
const avatarEmojis = { male: '👦', female: '👧', other: '👶' };

export default function Dashboard() {
  const { children, setChildren, selectedChildId, setSelectedChildId, settings } = useApp();
  const lang = settings.language;
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState<Date>();
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');

  const addChild = () => {
    if (!name || !birthDate) return;
    const newChild: Child = {
      id: crypto.randomUUID(),
      name,
      birthDate: birthDate.toISOString(),
      gender,
      growthRecords: [],
      milestones: [],
    };
    setChildren(prev => [...prev, newChild]);
    setSelectedChildId(newChild.id);
    setName('');
    setBirthDate(undefined);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-fredoka font-bold bg-clip-text text-transparent gradient-primary bg-gradient-to-r from-primary to-secondary">
            {t('welcome', lang)} 🍼
          </h1>
          <p className="text-muted-foreground mt-1">Track every precious moment</p>
        </div>
      </motion.div>

      {/* Add Child Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="gradient-primary text-primary-foreground border-0 shadow-lg hover:shadow-xl transition-shadow rounded-2xl px-6 py-6 text-base font-semibold gap-2">
              <Plus className="w-5 h-5" />
              {t('addChild', lang)}
            </Button>
          </motion.div>
        </DialogTrigger>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-fredoka text-2xl">{t('addChild', lang)} 👶</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>{t('childName', lang)}</Label>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Emma"
                className="rounded-xl mt-1"
              />
            </div>
            <div>
              <Label>{t('birthDate', lang)}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn('w-full justify-start text-left font-normal rounded-xl mt-1', !birthDate && 'text-muted-foreground')}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {birthDate ? format(birthDate, 'PPP') : t('birthDate', lang)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComp
                    mode="single"
                    selected={birthDate}
                    onSelect={setBirthDate}
                    disabled={date => date > new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>{t('gender', lang)}</Label>
              <Select value={gender} onValueChange={(v: any) => setGender(v)}>
                <SelectTrigger className="rounded-xl mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t('male', lang)}</SelectItem>
                  <SelectItem value="female">{t('female', lang)}</SelectItem>
                  <SelectItem value="other">{t('other', lang)}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addChild} className="w-full gradient-primary text-primary-foreground rounded-xl py-5 font-semibold">
              {t('save', lang)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Children Cards */}
      {children.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4 animate-bounce-gentle">👶</div>
          <h2 className="text-xl font-fredoka font-semibold text-foreground">{t('noChildren', lang)}</h2>
          <p className="text-muted-foreground mt-1">{t('noChildrenDesc', lang)}</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence>
            {children.map((child, idx) => {
              const stage = getAgeStage(child.birthDate);
              const stageInfo = ageStages.find(s => s.stage === stage);
              const isSelected = selectedChildId === child.id;

              return (
                <motion.div
                  key={child.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={cn(
                      'cursor-pointer overflow-hidden border-2 transition-all rounded-2xl',
                      isSelected ? 'border-primary shadow-lg' : 'border-transparent hover:border-primary/30'
                    )}
                    onClick={() => {
                      setSelectedChildId(child.id);
                      navigate('/guidance');
                    }}
                  >
                    <div className={cn('h-2', gradients[idx % gradients.length])} />
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-3xl shadow-md">
                          {avatarEmojis[child.gender]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-fredoka font-bold text-lg truncate">{child.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Baby className="w-3.5 h-3.5" />
                            <span>{getAge(child.birthDate)}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xl">{stageInfo?.emoji}</span>
                          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            {stageInfo?.label}
                          </span>
                        </div>
                      </div>

                      {/* Quick stats */}
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="bg-baby-pink/10 rounded-xl p-2 text-center">
                          <div className="text-xs text-muted-foreground">{t('milestones', lang)}</div>
                          <div className="font-fredoka font-bold text-foreground">{child.milestones.length}</div>
                        </div>
                        <div className="bg-baby-blue/10 rounded-xl p-2 text-center">
                          <div className="text-xs text-muted-foreground">{t('growth', lang)}</div>
                          <div className="font-fredoka font-bold text-foreground">{child.growthRecords.length}</div>
                        </div>
                        <div className="bg-baby-green/10 rounded-xl p-2 text-center">
                          <div className="text-xs text-muted-foreground">{t('stage', lang)}</div>
                          <div className="font-fredoka font-bold text-foreground text-xs">{stageInfo?.ageRange}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
