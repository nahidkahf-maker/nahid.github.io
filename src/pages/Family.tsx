import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { t } from '@/data/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Users } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { FamilyMember } from '@/types';
import { cn } from '@/lib/utils';

const roleEmojis: Record<string, string> = {
  mother: '👩', father: '👨', grandparent: '👴', sibling: '🧒', caretaker: '👩‍⚕️',
};

export default function Family() {
  const { children, familyMembers, setFamilyMembers, settings } = useApp();
  const lang = settings.language;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('mother');
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);

  const addMember = () => {
    if (!name) return;
    const member: FamilyMember = {
      id: crypto.randomUUID(),
      name,
      role,
      childIds: selectedChildren,
    };
    setFamilyMembers(prev => [...prev, member]);
    setName(''); setRole('mother'); setSelectedChildren([]);
    setDialogOpen(false);
  };

  const deleteMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-fredoka font-bold">{t('family', lang)} 👨‍👩‍👧‍👦</h1>
        <p className="text-muted-foreground">Manage your family members</p>
      </motion.div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="gradient-primary text-primary-foreground rounded-xl gap-2">
            <Plus className="w-4 h-4" /> {t('addFamily', lang)}
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-fredoka text-2xl">{t('addFamily', lang)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>Name</Label>
              <Input value={name} onChange={e => setName(e.target.value)} className="rounded-xl mt-1" placeholder="e.g. Sarah" />
            </div>
            <div>
              <Label>{t('role', lang)}</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['mother', 'father', 'grandparent', 'sibling', 'caretaker'].map(r => (
                    <SelectItem key={r} value={r}>{roleEmojis[r]} {t(r as any, lang)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {children.length > 0 && (
              <div>
                <Label>Linked Children</Label>
                <div className="space-y-2 mt-2">
                  {children.map(c => (
                    <label key={c.id} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedChildren.includes(c.id)}
                        onCheckedChange={checked => {
                          setSelectedChildren(prev => checked ? [...prev, c.id] : prev.filter(id => id !== c.id));
                        }}
                      />
                      <span className="text-sm">{c.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <Button onClick={addMember} className="w-full gradient-primary text-primary-foreground rounded-xl">{t('save', lang)}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {familyMembers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AnimatePresence>
            {familyMembers.map((member, idx) => (
              <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: idx * 0.1 }}>
                <Card className="rounded-2xl">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl gradient-warm flex items-center justify-center text-2xl shadow-md">
                      {roleEmojis[member.role] || '👤'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-fredoka font-bold truncate">{member.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{t(member.role as any, lang)}</p>
                      {member.childIds.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {member.childIds.map(cid => {
                            const child = children.find(c => c.id === cid);
                            return child ? <span key={cid} className="text-xs bg-muted px-2 py-0.5 rounded-full">{child.name}</span> : null;
                          })}
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteMember(member.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No family members added yet</p>
        </div>
      )}
    </div>
  );
}
