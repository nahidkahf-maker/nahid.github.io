import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  dailyTips,
  islamicGuidance,
  islamicCategories,
  parentingStories,
  offlineActivities,
  parentingResources,
  bedtimeDuas,
  seerahLessons,
  ramadanActivities,
} from '@/data/parentingContent';
import { parentingHubTranslations } from '@/data/translations';
import { getTranslatedTips, getTranslatedStories, getTranslatedActivities, getTranslatedResources } from '@/data/parentingContentTranslations';
import { useApp } from '@/context/AppContext';
import DailyTipCard from '@/components/parenting/DailyTipCard';
import IslamicGuidanceSection from '@/components/parenting/IslamicGuidanceSection';
import StorySection from '@/components/parenting/StorySection';
import OfflineActivitiesSection from '@/components/parenting/OfflineActivitiesSection';
import ResourcesSection from '@/components/parenting/ResourcesSection';
import SeerahLessonsSection from '@/components/parenting/SeerahLessonsSection';
import BedtimeDuasSection from '@/components/parenting/BedtimeDuasSection';
import RamadanActivitiesSection from '@/components/parenting/RamadanActivitiesSection';

export default function ParentingHub() {
  const [activeTab, setActiveTab] = useState('daily');
  const { settings } = useApp();
  const lang = settings.language;
  const pt = parentingHubTranslations[lang] || parentingHubTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ur';

  const translatedTips = useMemo(() => getTranslatedTips(dailyTips, lang), [lang]);
  const translatedStories = useMemo(() => getTranslatedStories(parentingStories, lang), [lang]);
  const translatedActivities = useMemo(() => getTranslatedActivities(offlineActivities, lang), [lang]);
  const translatedResources = useMemo(() => getTranslatedResources(parentingResources, lang), [lang]);

  const tabs = [
    { value: 'daily', label: pt.dailyTips },
    { value: 'islamic', label: pt.islamic },
    { value: 'seerah', label: `🌙 ${pt.seerah}` },
    { value: 'duas', label: `🤲 ${pt.bedtimeDuas}` },
    { value: 'ramadan', label: `☪️ ${pt.ramadan}` },
    { value: 'stories', label: pt.stories },
    { value: 'activities', label: pt.activities },
    { value: 'resources', label: pt.resources },
  ];

  return (
    <div className="space-y-5" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-fredoka font-bold">{pt.pageTitle}</h1>
        <p className="text-muted-foreground text-sm">{pt.pageSubtitle}</p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full flex overflow-x-auto gap-1 bg-muted/50 p-1 rounded-2xl">
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex-1 min-w-fit text-xs rounded-xl data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground px-2"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="daily" className="mt-4">
          <DailyTipCard tips={translatedTips} tipOfDayLabel={pt.tipOfDay} />
        </TabsContent>

        <TabsContent value="islamic" className="mt-4">
          <IslamicGuidanceSection guidance={islamicGuidance} categories={islamicCategories} lang={lang} />
        </TabsContent>

        <TabsContent value="seerah" className="mt-4">
          <SeerahLessonsSection lessons={seerahLessons} heading={pt.seerah} />
        </TabsContent>

        <TabsContent value="duas" className="mt-4">
          <BedtimeDuasSection duas={bedtimeDuas} heading={pt.bedtimeDuas} />
        </TabsContent>

        <TabsContent value="ramadan" className="mt-4">
          <RamadanActivitiesSection activities={ramadanActivities} heading={pt.ramadan} />
        </TabsContent>

        <TabsContent value="stories" className="mt-4">
          <StorySection stories={translatedStories} heading={pt.storyHeading} subtitle={pt.storySubtitle} lessonLabel={pt.lessonLabel} />
        </TabsContent>

        <TabsContent value="activities" className="mt-4">
          <OfflineActivitiesSection activities={translatedActivities} />
        </TabsContent>

        <TabsContent value="resources" className="mt-4">
          <ResourcesSection resources={translatedResources} heading={pt.knowledgeBase} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
