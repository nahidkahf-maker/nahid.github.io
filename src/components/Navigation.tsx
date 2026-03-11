import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, TrendingUp, CheckCircle, BookHeart, Users, Settings, Syringe, FileText, MessageCircle, Sparkles, MoreHorizontal, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { t } from '@/data/translations';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/', icon: Home, labelKey: 'dashboard' as const, emoji: '🏠' },
  { path: '/guidance', icon: BookOpen, labelKey: 'guidance' as const, emoji: '📖' },
  { path: '/parenting', icon: Sparkles, label: 'Parenting', emoji: '🌟' },
  { path: '/growth', icon: TrendingUp, labelKey: 'growth' as const, emoji: '📊' },
  { path: '/milestones', icon: CheckCircle, labelKey: 'milestones' as const, emoji: '✅' },
  { path: '/journal', icon: BookHeart, labelKey: 'journal' as const, emoji: '📝' },
  { path: '/vaccinations', icon: Syringe, label: 'Vaccines', emoji: '💉' },
  { path: '/community', icon: MessageCircle, label: 'Tips', emoji: '💬' },
  { path: '/report', icon: FileText, label: 'Report', emoji: '📋' },
  { path: '/family', icon: Users, labelKey: 'family' as const, emoji: '👨‍👩‍👧' },
  { path: '/settings', icon: Settings, labelKey: 'settings' as const, emoji: '⚙️' },
];

// Mobile: show first 4 + "More" button
const mobileMainItems = navItems.slice(0, 4);
const mobileMoreItems = navItems.slice(4);

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useApp();
  const [moreOpen, setMoreOpen] = useState(false);

  const getLabel = (item: typeof navItems[0]) => {
    if ('labelKey' in item && item.labelKey) return t(item.labelKey, settings.language);
    return (item as any).label || '';
  };

  const isMoreActive = mobileMoreItems.some(item => location.pathname === item.path);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 lg:w-56 flex-col gradient-primary z-50 shadow-xl">
        <div className="flex items-center justify-center lg:justify-start gap-2 p-4 pt-6">
          <span className="text-3xl">🍼</span>
          <span className="hidden lg:block text-primary-foreground font-fredoka text-lg font-bold">
            BabyTracker
          </span>
        </div>
        <nav className="flex-1 flex flex-col gap-0.5 px-2 mt-4 overflow-y-auto">
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium',
                  active
                    ? 'bg-primary-foreground/20 text-primary-foreground shadow-md'
                    : 'text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="hidden lg:block">{getLabel(item)}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 pb-safe">
        <div className="flex items-center justify-around py-1">
          {mobileMainItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); setMoreOpen(false); }}
                className="flex flex-col items-center gap-0.5 p-2 relative"
              >
                {active && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -top-1 w-8 h-1 rounded-full gradient-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon className={cn('w-5 h-5', active ? 'text-primary' : 'text-muted-foreground')} />
                <span className={cn('text-[10px]', active ? 'text-primary font-semibold' : 'text-muted-foreground')}>
                  {getLabel(item)}
                </span>
              </button>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="flex flex-col items-center gap-0.5 p-2 relative"
          >
            {isMoreActive && !moreOpen && (
              <motion.div
                layoutId="mobile-nav-indicator"
                className="absolute -top-1 w-8 h-1 rounded-full gradient-primary"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <MoreHorizontal className={cn('w-5 h-5', moreOpen || isMoreActive ? 'text-primary' : 'text-muted-foreground')} />
            <span className={cn('text-[10px]', moreOpen || isMoreActive ? 'text-primary font-semibold' : 'text-muted-foreground')}>
              More
            </span>
          </button>
        </div>
      </nav>

      {/* More menu overlay */}
      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-foreground/30 z-40"
              onClick={() => setMoreOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="md:hidden fixed bottom-[60px] left-0 right-0 bg-card rounded-t-3xl z-40 shadow-2xl border-t border-border pb-safe"
            >
              <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <span className="font-fredoka font-bold text-sm">More</span>
                <button onClick={() => setMoreOpen(false)} className="p-1">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1 px-3 pb-4">
                {mobileMoreItems.map(item => {
                  const active = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => { navigate(item.path); setMoreOpen(false); }}
                      className={cn(
                        'flex flex-col items-center gap-1 p-3 rounded-2xl transition-all',
                        active ? 'bg-primary/10' : 'hover:bg-muted'
                      )}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <span className={cn('text-[10px] font-medium', active ? 'text-primary' : 'text-muted-foreground')}>
                        {getLabel(item)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
