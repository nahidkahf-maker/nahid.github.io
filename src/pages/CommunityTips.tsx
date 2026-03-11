import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { t } from '@/data/translations';
import { ageStages } from '@/data/guidance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, ThumbsUp, Plus, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AgeStage } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface CommunityTip {
  id: string;
  author: string;
  stage: AgeStage;
  category: string;
  content: string;
  likes: number;
  createdAt: string;
}

const preloadedTips: CommunityTip[] = [
  { id: 'ct1', author: 'Sarah M.', stage: 'newborn', category: 'Sleep', content: 'White noise machines were a game changer for us! Our baby sleeps through the night now. We use a fan sound on low volume.', likes: 42, createdAt: '2026-02-15' },
  { id: 'ct2', author: 'James K.', stage: 'newborn', category: 'Bonding', content: 'As a dad, I found that doing skin-to-skin contact right after bath time really helped me bond with my newborn. Don\'t skip this dads!', likes: 38, createdAt: '2026-02-20' },
  { id: 'ct3', author: 'Maria L.', stage: 'infant', category: 'Feeding', content: 'Freeze breast milk in ice cube trays for easy portioning. Game changer when introducing solids — mix with purees!', likes: 55, createdAt: '2026-01-10' },
  { id: 'ct4', author: 'David R.', stage: 'infant', category: 'Development', content: 'We created a sensory board with different textures (fabric, sandpaper, foam). Our 8-month-old loves exploring it during tummy time.', likes: 31, createdAt: '2026-02-01' },
  { id: 'ct5', author: 'Amina H.', stage: 'toddler', category: 'Tantrums', content: 'When tantrums hit, I get down to eye level and say "I see you\'re upset. Can you show me with your hands how big the feeling is?" Works like magic.', likes: 67, createdAt: '2026-01-25' },
  { id: 'ct6', author: 'Tom W.', stage: 'toddler', category: 'Potty Training', content: 'We made a sticker chart and let our son pick a small toy after 10 stickers. Fully potty trained in 3 weeks!', likes: 44, createdAt: '2026-02-10' },
  { id: 'ct7', author: 'Lisa P.', stage: 'preschool', category: 'Learning', content: 'We play "grocery store math" — my daughter helps count items and compare prices. She learned addition without even realizing it!', likes: 52, createdAt: '2026-01-30' },
  { id: 'ct8', author: 'Ahmed S.', stage: 'preschool', category: 'Social Skills', content: 'Playdates with structured activities work better than free play at this age. Set up craft stations or a treasure hunt.', likes: 28, createdAt: '2026-02-05' },
  { id: 'ct9', author: 'Rachel G.', stage: 'school-age', category: 'Homework', content: 'The "20-5-20" rule: 20 min homework, 5 min break, 20 min more. Our kids focus so much better with breaks built in.', likes: 73, createdAt: '2026-01-15' },
  { id: 'ct10', author: 'Mike C.', stage: 'school-age', category: 'Screen Time', content: 'We use a "tech ticket" system. Each ticket = 30 min screen time. Kids get 3 per day and learn to budget their time.', likes: 61, createdAt: '2026-02-18' },
  { id: 'ct11', author: 'Jennifer B.', stage: 'preteen', category: 'Communication', content: 'Car rides are the BEST time to talk to preteens. No eye contact pressure, captive audience. Our best conversations happen in the car.', likes: 89, createdAt: '2026-01-20' },
  { id: 'ct12', author: 'Carlos M.', stage: 'preteen', category: 'Independence', content: 'We let our 12-year-old plan and cook dinner once a week. Builds confidence, life skills, and they actually eat what they make!', likes: 47, createdAt: '2026-02-12' },
  { id: 'ct13', author: 'Emma T.', stage: 'teen', category: 'Trust', content: 'Instead of tracking apps, we have a "no questions asked" pickup policy. Call anytime, any situation, we\'ll come get you. Zero judgment.', likes: 95, createdAt: '2026-01-28' },
  { id: 'ct14', author: 'Robert J.', stage: 'teen', category: 'Mental Health', content: 'We normalized therapy in our house. Our teen sees it as maintenance, like going to the dentist. Removes all the stigma.', likes: 78, createdAt: '2026-02-08' },
  { id: 'ct15', author: 'Priya N.', stage: 'infant', category: 'Mother Self-Care', content: 'Join a local mom group! I was struggling with isolation until I found other moms going through the same thing. It saved my sanity.', likes: 63, createdAt: '2026-02-22' },
  { id: 'ct16', author: 'Kevin O.', stage: 'toddler', category: 'Father Tips', content: 'I do "Daddy adventures" every Saturday morning — just me and the kids at the park, zoo, or library. Gives mom a break and builds amazing memories.', likes: 54, createdAt: '2026-01-18' },
];

const tipCategories = ['All', 'Sleep', 'Feeding', 'Bonding', 'Development', 'Tantrums', 'Potty Training', 'Learning', 'Social Skills', 'Homework', 'Screen Time', 'Communication', 'Independence', 'Trust', 'Mental Health', 'Mother Self-Care', 'Father Tips'];

export default function CommunityTips() {
  const { settings } = useApp();
  const lang = settings.language;
  const [selectedStage, setSelectedStage] = useState<AgeStage | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userTips, setUserTips] = useLocalStorage<CommunityTip[]>('bgt-community-tips', []);
  const [showAdd, setShowAdd] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Sleep');
  const [newStage, setNewStage] = useState<AgeStage>('newborn');
  const [likedTips, setLikedTips] = useLocalStorage<string[]>('bgt-liked-tips', []);

  const allTips = [...preloadedTips, ...userTips];
  const filteredTips = allTips
    .filter(tip => selectedStage === 'all' || tip.stage === selectedStage)
    .filter(tip => selectedCategory === 'All' || tip.category === selectedCategory)
    .sort((a, b) => b.likes - a.likes);

  const addTip = () => {
    if (!newContent.trim()) return;
    const tip: CommunityTip = {
      id: crypto.randomUUID(),
      author: newAuthor || 'Anonymous',
      stage: newStage,
      content: newContent,
      category: newCategory,
      likes: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setUserTips(prev => [...prev, tip]);
    setNewAuthor(''); setNewContent(''); setShowAdd(false);
  };

  const likeTip = (tipId: string) => {
    if (likedTips.includes(tipId)) return;
    setLikedTips(prev => [...prev, tipId]);
    // Update like count for user tips
    setUserTips(prev => prev.map(t => t.id === tipId ? { ...t, likes: t.likes + 1 } : t));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-fredoka font-bold">Community Tips 💡</h1>
        <p className="text-muted-foreground">Parenting wisdom from real parents, organized by age</p>
      </motion.div>

      {/* Stage filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedStage('all')}
          className={cn(
            'flex-shrink-0 px-4 py-2 rounded-2xl border-2 text-sm font-medium transition-all',
            selectedStage === 'all' ? 'gradient-primary text-primary-foreground border-transparent' : 'bg-card border-border'
          )}
        >
          🌟 All Ages
        </motion.button>
        {ageStages.map(s => (
          <motion.button
            key={s.stage}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedStage(s.stage)}
            className={cn(
              'flex-shrink-0 px-3 py-2 rounded-2xl border-2 text-sm font-medium transition-all',
              selectedStage === s.stage ? 'gradient-primary text-primary-foreground border-transparent' : 'bg-card border-border'
            )}
          >
            {s.emoji} {s.label}
          </motion.button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-2">
        {tipCategories.map(cat => (
          <Badge
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            className={cn('cursor-pointer text-xs shrink-0', selectedCategory === cat && 'gradient-primary border-transparent')}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* Add Tip */}
      <Button onClick={() => setShowAdd(!showAdd)} className="gradient-warm text-primary-foreground rounded-xl gap-2">
        <Plus className="w-4 h-4" /> Share Your Tip
      </Button>

      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <Card className="rounded-2xl">
              <CardContent className="p-5 space-y-3">
                <Input value={newAuthor} onChange={e => setNewAuthor(e.target.value)} placeholder="Your name (optional)" className="rounded-xl" />
                <div className="flex gap-2">
                  <select
                    value={newStage}
                    onChange={e => setNewStage(e.target.value as AgeStage)}
                    className="rounded-xl border border-input bg-background px-3 py-2 text-sm flex-1"
                  >
                    {ageStages.map(s => <option key={s.stage} value={s.stage}>{s.emoji} {s.label}</option>)}
                  </select>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="rounded-xl border border-input bg-background px-3 py-2 text-sm flex-1"
                  >
                    {tipCategories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <Textarea value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="Share your parenting tip..." className="rounded-xl min-h-[80px]" />
                <Button onClick={addTip} className="w-full gradient-primary text-primary-foreground rounded-xl">Share Tip</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips List */}
      <div className="space-y-3">
        {filteredTips.map((tip, idx) => {
          const stageInfo = ageStages.find(s => s.stage === tip.stage);
          const isLiked = likedTips.includes(tip.id);
          return (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
            >
              <Card className="rounded-2xl hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <span className="font-semibold text-sm">{tip.author}</span>
                      <div className="flex gap-1.5">
                        <Badge variant="outline" className="text-[10px] py-0">{stageInfo?.emoji} {stageInfo?.label}</Badge>
                        <Badge variant="secondary" className="text-[10px] py-0">{tip.category}</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-3">{tip.content}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => likeTip(tip.id)}
                      className={cn(
                        'flex items-center gap-1 text-xs font-medium transition-all',
                        isLiked ? 'text-baby-coral' : 'text-muted-foreground hover:text-baby-coral'
                      )}
                    >
                      <Heart className={cn('w-4 h-4', isLiked && 'fill-baby-coral')} />
                      {tip.likes + (isLiked && !preloadedTips.find(p => p.id === tip.id) ? 0 : isLiked ? 1 : 0)}
                    </button>
                    <span className="text-[10px] text-muted-foreground ml-auto">{tip.createdAt}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
        {filteredTips.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No tips for this filter. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  );
}
