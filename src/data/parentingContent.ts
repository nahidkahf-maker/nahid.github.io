import { AgeStage } from '@/types';

export interface DailyTip {
  id: string;
  tip: string;
  category: string;
  stage: AgeStage | 'all';
  icon: string;
}

export interface IslamicGuidance {
  id: string;
  title: string;
  source: string;
  sourceType: 'quran' | 'hadith' | 'scholar';
  arabicText?: string;
  content: string;
  category: string;
  stage: AgeStage | 'all';
}

export interface ParentingStory {
  id: string;
  title: string;
  story: string;
  moral: string;
  ageGroup: string;
  icon: string;
}

export interface OfflineActivity {
  id: string;
  title: string;
  description: string;
  materials: string[];
  duration: string;
  stage: AgeStage | 'all';
  icon: string;
}

// ============ BEDTIME DUAS ============
export interface BedtimeDua {
  id: string;
  title: string;
  arabicText: string;
  transliteration: string;
  translation: string;
  benefit: string;
  stage: AgeStage | 'all';
}

// ============ SEERAH LESSONS ============
export interface SeerahLesson {
  id: string;
  title: string;
  story: string;
  lesson: string;
  application: string;
  stage: AgeStage | 'all';
  icon: string;
}

// ============ RAMADAN ACTIVITIES ============
export interface RamadanActivity {
  id: string;
  title: string;
  description: string;
  materials: string[];
  duration: string;
  stage: AgeStage | 'all';
  icon: string;
}

export interface ParentingResource {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

// ============ DAILY PARENTING TIPS ============
export const dailyTips: DailyTip[] = [
  { id: 'dt1', tip: 'Spend 15 minutes of undivided attention with each child daily. Put away your phone and be fully present.', category: 'Bonding', stage: 'all', icon: '💕' },
  { id: 'dt2', tip: 'Use "I" statements instead of "You" statements. Say "I feel worried when..." instead of "You always..."', category: 'Communication', stage: 'all', icon: '🗣️' },
  { id: 'dt3', tip: 'Create a bedtime ritual: bath, book, song, prayer. Consistency helps children feel secure.', category: 'Routine', stage: 'all', icon: '🌙' },
  { id: 'dt4', tip: 'Praise effort, not results. "You worked so hard on that!" builds resilience better than "You\'re so smart!"', category: 'Encouragement', stage: 'all', icon: '⭐' },
  { id: 'dt5', tip: 'Let children make age-appropriate choices. Even toddlers can pick between two shirts.', category: 'Independence', stage: 'toddler', icon: '👕' },
  { id: 'dt6', tip: 'Model the behavior you want to see. Children learn more from what you do than what you say.', category: 'Role Model', stage: 'all', icon: '🪞' },
  { id: 'dt7', tip: 'Take deep breaths before responding to misbehavior. A calm response teaches emotional regulation.', category: 'Discipline', stage: 'all', icon: '🧘' },
  { id: 'dt8', tip: 'Eat at least one meal together as a family daily. It strengthens bonds and improves nutrition.', category: 'Family', stage: 'all', icon: '🍽️' },
  { id: 'dt9', tip: 'Read aloud for 20 minutes every day. It\'s the single best thing you can do for brain development.', category: 'Learning', stage: 'all', icon: '📚' },
  { id: 'dt10', tip: 'Apologize to your children when you make mistakes. It teaches them accountability and humility.', category: 'Character', stage: 'all', icon: '🙏' },
  { id: 'dt11', tip: 'Create a "worry jar" where children write worries on paper. Review them together weekly.', category: 'Emotional Health', stage: 'school-age', icon: '🫙' },
  { id: 'dt12', tip: 'Limit screen time and replace it with outdoor play. Nature is the best classroom.', category: 'Screen Time', stage: 'all', icon: '🌳' },
  { id: 'dt13', tip: 'Validate your child\'s emotions even when correcting behavior. "I see you\'re angry, but hitting is not okay."', category: 'Emotional Health', stage: 'all', icon: '💗' },
  { id: 'dt14', tip: 'Create a family gratitude practice. Share 3 things you\'re thankful for at dinner.', category: 'Gratitude', stage: 'all', icon: '🌟' },
  { id: 'dt15', tip: 'Let children experience natural consequences when safe. Forgot lunch? They\'ll remember tomorrow.', category: 'Discipline', stage: 'school-age', icon: '🎒' },
  { id: 'dt16', tip: 'Newborns can see your face clearly at 8-12 inches. Hold them close when talking.', category: 'Development', stage: 'newborn', icon: '👶' },
  { id: 'dt17', tip: 'Toddlers say "no" to practice autonomy, not to defy you. Offer choices instead of commands.', category: 'Understanding', stage: 'toddler', icon: '🧒' },
  { id: 'dt18', tip: 'Teens need more sleep, not less. Encourage 8-10 hours even though they resist.', category: 'Health', stage: 'teen', icon: '😴' },
  { id: 'dt19', tip: 'Play is a child\'s work. Don\'t rush them through play to get to "learning" — play IS learning.', category: 'Play', stage: 'all', icon: '🎯' },
  { id: 'dt20', tip: 'Hug your children at least 8 times a day. Physical touch is crucial for emotional development.', category: 'Bonding', stage: 'all', icon: '🤗' },
  { id: 'dt21', tip: 'Create a calm-down corner instead of a time-out corner. Fill it with sensory items and books.', category: 'Discipline', stage: 'toddler', icon: '🧸' },
  { id: 'dt22', tip: 'Teach children to identify and name their emotions. Use an emotions chart with faces.', category: 'Emotional Health', stage: 'preschool', icon: '😊' },
  { id: 'dt23', tip: 'Involve children in cooking. Even a 2-year-old can wash vegetables and stir ingredients.', category: 'Life Skills', stage: 'all', icon: '👨‍🍳' },
  { id: 'dt24', tip: 'Don\'t compare siblings. Each child is unique and needs to feel valued for who they are.', category: 'Siblings', stage: 'all', icon: '🌈' },
  { id: 'dt25', tip: 'Schedule regular one-on-one dates with each child. It doesn\'t have to be expensive.', category: 'Bonding', stage: 'all', icon: '📅' },
  { id: 'dt26', tip: 'Teach problem-solving by asking "What do you think we should do?" before offering solutions.', category: 'Critical Thinking', stage: 'preschool', icon: '💡' },
  { id: 'dt27', tip: 'Be consistent with boundaries. Changing rules confuses children and increases testing behavior.', category: 'Discipline', stage: 'all', icon: '🚧' },
  { id: 'dt28', tip: 'Celebrate small wins. Finished their vegetables? Tied their shoes? That deserves recognition!', category: 'Encouragement', stage: 'all', icon: '🎉' },
  { id: 'dt29', tip: 'Teach your preteens about digital citizenship before giving them a phone.', category: 'Technology', stage: 'preteen', icon: '📱' },
  { id: 'dt30', tip: 'Your mental health matters. A well-rested, happy parent raises happier children.', category: 'Self-Care', stage: 'all', icon: '🌻' },
];

// ============ ISLAMIC PARENTING GUIDANCE ============
export const islamicGuidance: IslamicGuidance[] = [
  // Quran-based
  { id: 'ig1', title: 'The Prayer of Ibrahim (AS)', source: 'Surah Ibrahim 14:40', sourceType: 'quran', arabicText: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي', content: '"My Lord, make me an establisher of prayer, and from my descendants." — Teach children to pray by praying yourself. Be the role model.', category: 'Prayer & Worship', stage: 'all' },
  { id: 'ig2', title: 'Luqman\'s Advice to His Son', source: 'Surah Luqman 31:13', sourceType: 'quran', arabicText: 'يَا بُنَيَّ لَا تُشْرِكْ بِاللَّهِ إِنَّ الشِّرْكَ لَظُلْمٌ عَظِيمٌ', content: '"O my son, do not associate anything with Allah. Indeed, association with Him is great injustice." — Teach Tawheed (oneness of God) from a young age through simple conversations.', category: 'Faith & Belief', stage: 'all' },
  { id: 'ig3', title: 'Luqman on Patience', source: 'Surah Luqman 31:17', sourceType: 'quran', arabicText: 'يَا بُنَيَّ أَقِمِ الصَّلَاةَ وَأْمُرْ بِالْمَعْرُوفِ وَانْهَ عَنِ الْمُنكَرِ وَاصْبِرْ عَلَىٰ مَا أَصَابَكَ', content: '"O my son, establish prayer, enjoin good, forbid evil, and be patient over what befalls you." — Teach children that prayer and patience go hand in hand.', category: 'Character Building', stage: 'all' },
  { id: 'ig4', title: 'Kindness to Parents', source: 'Surah Al-Isra 17:23-24', sourceType: 'quran', arabicText: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا', content: '"Your Lord has decreed that you worship none but Him, and that you be kind to parents." — Model respect for elders so children absorb it naturally.', category: 'Respect & Manners', stage: 'all' },
  { id: 'ig5', title: 'Raising Grateful Children', source: 'Surah Ibrahim 14:7', sourceType: 'quran', arabicText: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ', content: '"If you are grateful, I will surely increase you." — Teach children to say Alhamdulillah and count blessings daily.', category: 'Gratitude', stage: 'all' },
  { id: 'ig6', title: 'Trust in Allah\'s Plan', source: 'Surah At-Talaq 65:3', sourceType: 'quran', arabicText: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ', content: '"Whoever puts their trust in Allah, He will be sufficient for them." — Teach children Tawakkul by sharing how you rely on Allah in daily life.', category: 'Faith & Belief', stage: 'all' },
  { id: 'ig7', title: 'Speaking with Gentleness', source: 'Surah Luqman 31:19', sourceType: 'quran', arabicText: 'وَاقْصِدْ فِي مَشْيِكَ وَاغْضُضْ مِن صَوْتِكَ', content: '"Be moderate in your pace and lower your voice." — Teach children to speak softly and respectfully. Model gentle speech at home.', category: 'Respect & Manners', stage: 'preschool' },

  // Hadith-based
  { id: 'ig8', title: 'Be Merciful to Receive Mercy', source: 'Sahih Muslim', sourceType: 'hadith', content: '"Those who show mercy will be shown mercy by the Most Merciful. Show mercy to those on earth, and the One above the heavens will show mercy to you." — Show mercy and compassion to your children, even when disciplining.', category: 'Mercy & Compassion', stage: 'all' },
  { id: 'ig9', title: 'Kissing and Embracing Children', source: 'Sahih Bukhari', sourceType: 'hadith', content: 'The Prophet ﷺ kissed his grandson Al-Hasan. A man said, "I have ten children and I have never kissed any of them." The Prophet ﷺ said, "He who does not show mercy, will not be shown mercy." — Physical affection is a Sunnah!', category: 'Mercy & Compassion', stage: 'all' },
  { id: 'ig10', title: 'Teaching Children to Pray', source: 'Abu Dawud', sourceType: 'hadith', content: '"Teach your children to pray when they are seven years old, and encourage them at ten." — Start with making prayer fun and beautiful, not burdensome.', category: 'Prayer & Worship', stage: 'school-age' },
  { id: 'ig11', title: 'Being Just Between Children', source: 'Sahih Bukhari & Muslim', sourceType: 'hadith', content: '"Fear Allah and treat your children fairly." — Be equal in gifts, attention, and affection between all your children.', category: 'Justice & Fairness', stage: 'all' },
  { id: 'ig12', title: 'The Best Gift to Children', source: 'Tirmidhi', sourceType: 'hadith', content: '"The best gift a father can give to his children is good manners and good character." — Invest in character building over material gifts.', category: 'Character Building', stage: 'all' },
  { id: 'ig13', title: 'Supplication for Children', source: 'Surah Al-Furqan 25:74', sourceType: 'quran', arabicText: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ', content: '"Our Lord, grant us from among our spouses and offspring comfort to our eyes." — Make dua for your children regularly. They feel the love behind your prayers.', category: 'Dua & Supplication', stage: 'all' },
  { id: 'ig14', title: 'Playing with Children is Sunnah', source: 'Ahmad', sourceType: 'hadith', content: 'The Prophet ﷺ used to play with Hasan and Husain, letting them ride on his back. He was the best example of a loving grandfather and father figure.', category: 'Play & Fun', stage: 'all' },
  { id: 'ig15', title: 'Saying Bismillah Before Eating', source: 'Sahih Muslim', sourceType: 'hadith', content: '"O young boy, say Bismillah, eat with your right hand, and eat from what is nearest to you." — Teach Islamic table manners from a young age.', category: 'Daily Habits', stage: 'toddler' },
  { id: 'ig16', title: 'Honoring the Mother', source: 'Sahih Bukhari', sourceType: 'hadith', content: 'A man asked, "Who deserves my best companionship?" The Prophet ﷺ said, "Your mother." three times, then "Your father." — Teach children to honor and respect their mother especially.', category: 'Respect & Manners', stage: 'all' },
  { id: 'ig17', title: 'Teaching Honesty', source: 'Musnad Ahmad', sourceType: 'hadith', content: '"Do not lie to your children. If you promise them something, fulfill it." — Never make false promises. Children learn honesty by watching you.', category: 'Character Building', stage: 'all' },
  { id: 'ig18', title: 'Aqiqah for Newborns', source: 'Tirmidhi', sourceType: 'hadith', content: 'The Prophet ﷺ recommended the Aqiqah (sacrifice) on the seventh day after birth, along with naming the child and shaving the head. A beautiful Sunnah to celebrate new life.', category: 'Newborn Sunnah', stage: 'newborn' },
  { id: 'ig19', title: 'Adhan in the Newborn\'s Ear', source: 'Tirmidhi', sourceType: 'hadith', content: 'It is Sunnah to recite the Adhan in the right ear of the newborn. Let the first words your baby hears be the call to Allah.', category: 'Newborn Sunnah', stage: 'newborn' },
  { id: 'ig20', title: 'Patience in Parenting', source: 'Surah Al-Ahqaf 46:15', sourceType: 'quran', arabicText: 'وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ إِحْسَانًا', content: '"We have enjoined upon man kindness to his parents." — Parenting is an act of worship. Every sleepless night and patient moment is rewarded.', category: 'Patience', stage: 'all' },
];

// ============ STORY-BASED LEARNING ============
export const parentingStories: ParentingStory[] = [
  { id: 'ps1', title: 'The Cracked Pot', story: 'A water bearer had two pots. One was perfect, the other had a crack. The cracked pot felt ashamed. But the bearer said, "Did you notice the flowers on your side of the path? I planted seeds there because I knew you would water them."', moral: 'Every child has unique strengths. What seems like a weakness can be their greatest gift. Celebrate their differences.', ageGroup: 'All Ages', icon: '🏺' },
  { id: 'ps2', title: 'The Two Wolves', story: 'A grandfather told his grandson, "Inside you are two wolves fighting. One is anger, jealousy, and greed. The other is joy, peace, and love." The boy asked, "Which wolf wins?" The grandfather smiled, "The one you feed."', moral: 'Teach children that they have the power to choose their responses. What we nurture in them grows stronger.', ageGroup: 'Age 5+', icon: '🐺' },
  { id: 'ps3', title: 'The Carrot, Egg, and Coffee Bean', story: 'A mother showed her child three pots of boiling water. She put a carrot in one (it became soft), an egg in another (it became hard), and coffee beans in the third (they changed the water). "Which will you be?" she asked.', moral: 'Teach children that adversity can make you soft, hard, or transformative. Choose to be the coffee bean — change your environment for the better.', ageGroup: 'Age 7+', icon: '☕' },
  { id: 'ps4', title: 'The Boy and the Starfish', story: 'An old man saw a boy throwing starfish back into the ocean. "There are thousands," the man said, "you can\'t make a difference." The boy threw another one and said, "I made a difference to that one."', moral: 'Small acts of kindness matter. Teach children they don\'t need to change the whole world — helping one person is enough.', ageGroup: 'Age 4+', icon: '⭐' },
  { id: 'ps5', title: 'The Elephant Rope', story: 'A man saw elephants held by a small rope. They could easily break free but didn\'t try. The trainer explained, "When they were young, the same rope held them. They grew up believing they couldn\'t break free."', moral: 'Don\'t let limiting beliefs hold your child back. Encourage them to try, fail, and try again. They\'re stronger than they think.', ageGroup: 'Age 6+', icon: '🐘' },
  { id: 'ps6', title: 'Prophet Ibrahim and His Son', story: 'When Ibrahim (AS) was asked to sacrifice his son Ismail, he discussed it with him openly. Young Ismail said, "O my father, do as you are commanded. You will find me, if Allah wills, of the steadfast."', moral: 'Involve children in important discussions. Respect their opinions. Trust builds obedience rooted in love, not fear.', ageGroup: 'Age 6+', icon: '🕌' },
  { id: 'ps7', title: 'The Prophet and the Bedouin', story: 'A Bedouin man urinated in the mosque. Companions rushed to stop him, but the Prophet ﷺ said, "Leave him and pour water over it." He then gently taught the man.', moral: 'Correct children with gentleness, not anger. Wait until the moment passes, then teach calmly. Harshness creates fear, not understanding.', ageGroup: 'All Ages', icon: '💧' },
  { id: 'ps8', title: 'The Oak and the Reed', story: 'A mighty oak stood firm against the wind, while a reed bent with every breeze. When a great storm came, the oak snapped and fell, but the reed survived by bending.', moral: 'Teach children flexibility and adaptability. Being rigid doesn\'t mean being strong. True strength is knowing when to bend.', ageGroup: 'Age 5+', icon: '🌿' },
  { id: 'ps9', title: 'The Stonecutter', story: 'A stonecutter wished to be the sun, then a cloud, then the wind, then a mountain. Finally, he wished to be a stonecutter again — realizing his own work was powerful enough to shape mountains.', moral: 'Help children appreciate who they are. The grass isn\'t always greener. Their unique abilities are exactly what the world needs.', ageGroup: 'Age 5+', icon: '⛏️' },
  { id: 'ps10', title: 'Musa (AS) and the Shepherd', story: 'Musa (AS) heard a shepherd talking to Allah in simple, childlike words. He corrected him. Then Allah revealed: "You have driven away a servant of Mine. I look at the heart, not the words."', moral: 'Don\'t judge your child\'s spirituality by adult standards. Their innocent duas and simple worship are beloved by Allah.', ageGroup: 'Age 8+', icon: '🐑' },
];

// ============ OFFLINE ACTIVITY IDEAS ============
export const offlineActivities: OfflineActivity[] = [
  { id: 'oa1', title: 'Sensory Play Bags', description: 'Fill ziplock bags with hair gel and small objects. Tape to a surface for mess-free sensory exploration.', materials: ['Ziplock bags', 'Hair gel', 'Small toys', 'Tape'], duration: '20-30 min', stage: 'infant', icon: '🎨' },
  { id: 'oa2', title: 'Nature Scavenger Hunt', description: 'Create a list with pictures of items to find outdoors: leaves, rocks, flowers, bugs. Great for observation skills!', materials: ['Paper', 'Crayons', 'Bag for collecting'], duration: '45-60 min', stage: 'toddler', icon: '🔍' },
  { id: 'oa3', title: 'DIY Playdough', description: 'Make homemade playdough together. Mix flour, salt, water, oil, and food coloring. Knead and create!', materials: ['2 cups flour', '1 cup salt', 'Water', 'Food coloring', 'Oil'], duration: '30-45 min', stage: 'toddler', icon: '🫐' },
  { id: 'oa4', title: 'Shadow Puppet Theater', description: 'Use a flashlight and hands/paper cutouts to create shadow puppets on the wall. Tell stories together!', materials: ['Flashlight', 'Paper', 'Scissors', 'Sticks'], duration: '30 min', stage: 'preschool', icon: '🎭' },
  { id: 'oa5', title: 'Kitchen Science Lab', description: 'Baking soda + vinegar volcanoes, dissolving experiments, color mixing with food coloring in water.', materials: ['Baking soda', 'Vinegar', 'Food coloring', 'Cups'], duration: '30-45 min', stage: 'preschool', icon: '🔬' },
  { id: 'oa6', title: 'Fort Building Challenge', description: 'Use blankets, pillows, chairs, and clips to build the ultimate indoor fort. Read books inside!', materials: ['Blankets', 'Pillows', 'Chairs', 'Clips'], duration: '60+ min', stage: 'school-age', icon: '🏰' },
  { id: 'oa7', title: 'Family Board Game Night', description: 'Choose age-appropriate board games or card games. Great for teaching turn-taking and good sportsmanship.', materials: ['Board games', 'Card games', 'Snacks'], duration: '60-90 min', stage: 'school-age', icon: '🎲' },
  { id: 'oa8', title: 'DIY Bird Feeder', description: 'Coat a pine cone or cardboard tube with peanut butter and roll in birdseed. Hang outside and watch birds visit!', materials: ['Pine cone/cardboard tube', 'Peanut butter', 'Birdseed', 'String'], duration: '30 min', stage: 'preschool', icon: '🐦' },
  { id: 'oa9', title: 'Journaling & Doodling', description: 'Give preteens a blank journal. Prompt: "Draw your mood today" or "Write a letter to your future self."', materials: ['Blank journal', 'Colored pens', 'Stickers'], duration: '20-40 min', stage: 'preteen', icon: '📓' },
  { id: 'oa10', title: 'Cooking Together', description: 'Let teens plan and cook a full meal for the family. From grocery list to plating. Life skills in action!', materials: ['Recipe ingredients', 'Kitchen utensils'], duration: '90+ min', stage: 'teen', icon: '🍳' },
  { id: 'oa11', title: 'Treasure Map Adventure', description: 'Draw a treasure map of your house/garden. Hide small "treasures" and let kids follow clues!', materials: ['Paper', 'Markers', 'Small prizes'], duration: '45 min', stage: 'preschool', icon: '🗺️' },
  { id: 'oa12', title: 'Tummy Time Play Mat', description: 'Place colorful toys and mirrors around baby during tummy time. Sing and encourage reaching.', materials: ['Play mat', 'Colorful toys', 'Baby-safe mirror'], duration: '10-15 min', stage: 'newborn', icon: '🧸' },
  { id: 'oa13', title: 'Obstacle Course', description: 'Set up an indoor obstacle course with cushions, tunnels (blankets over chairs), and balance beams (tape on floor).', materials: ['Cushions', 'Blankets', 'Tape', 'Chairs'], duration: '30-45 min', stage: 'toddler', icon: '🏃' },
  { id: 'oa14', title: 'Letter Writing Station', description: 'Set up paper, envelopes, and stamps. Kids write letters to grandparents, friends, or pen pals!', materials: ['Paper', 'Envelopes', 'Stamps', 'Pens'], duration: '30 min', stage: 'school-age', icon: '✉️' },
];

// ============ PARENTING RESOURCES ============
export const parentingResources: ParentingResource[] = [
  { id: 'pr1', title: 'Positive Discipline Basics', description: 'Focus on teaching, not punishing. Use logical consequences, empathy, and problem-solving together.', category: 'Discipline', icon: '📋' },
  { id: 'pr2', title: 'Understanding Attachment Styles', description: 'Secure attachment develops through consistent, responsive caregiving. Your child needs to know you\'re their safe base.', category: 'Psychology', icon: '🔗' },
  { id: 'pr3', title: 'Ages & Stages Quick Reference', description: 'Newborn: survival mode. Infant: exploration. Toddler: independence. Preschool: curiosity. School-age: competence. Preteen: identity. Teen: autonomy.', category: 'Development', icon: '📊' },
  { id: 'pr4', title: 'Sibling Rivalry Solutions', description: 'Don\'t take sides. Teach conflict resolution. Give each child individual attention. Avoid comparisons at all costs.', category: 'Family Dynamics', icon: '👫' },
  { id: 'pr5', title: 'Building Emotional Intelligence', description: 'Name emotions. Validate feelings. Teach coping strategies. Model healthy emotional expression. Create a safe space for big feelings.', category: 'Emotional Health', icon: '🧠' },
  { id: 'pr6', title: 'Nutrition by Age Group', description: 'Breast milk/formula (0-6m) → Purees (6-8m) → Finger foods (8-12m) → Family meals (1y+). Always introduce allergens early and safely.', category: 'Health', icon: '🥗' },
  { id: 'pr7', title: 'Screen Time Guidelines', description: '0-18m: No screens. 18-24m: Video calls only. 2-5y: 1 hour/day. 6+: Consistent limits. Always co-watch when possible.', category: 'Technology', icon: '📺' },
  { id: 'pr8', title: 'Sleep Training Methods', description: 'Graduated extinction, chair method, pick up/put down, fading. Choose what aligns with your parenting style. Consistency is key.', category: 'Sleep', icon: '🛏️' },
  { id: 'pr9', title: 'Father\'s Role in Development', description: 'Active fathers boost children\'s cognitive development, emotional security, and social skills. Rough-and-tumble play teaches risk assessment.', category: 'Fatherhood', icon: '👨' },
  { id: 'pr10', title: 'Maternal Mental Health', description: 'Postpartum depression affects 1 in 7 mothers. Symptoms: persistent sadness, anxiety, difficulty bonding. Seek help — it\'s not weakness, it\'s wisdom.', category: 'Motherhood', icon: '👩' },
  { id: 'pr11', title: 'Teaching Financial Literacy', description: 'Give allowance (age 5+). Three jars: save, spend, give. Involve kids in budgeting. Teach needs vs. wants early.', category: 'Life Skills', icon: '💰' },
  { id: 'pr12', title: 'Raising Bilingual Children', description: 'One parent, one language method works well. Read, sing, and play in both languages. Don\'t worry about mixing — it\'s normal and temporary.', category: 'Education', icon: '🌍' },
];

export const islamicCategories = ['All', 'Faith & Belief', 'Prayer & Worship', 'Character Building', 'Respect & Manners', 'Mercy & Compassion', 'Gratitude', 'Justice & Fairness', 'Dua & Supplication', 'Daily Habits', 'Newborn Sunnah', 'Play & Fun', 'Patience', 'Seerah', 'Bedtime Duas', 'Ramadan'];

// ============ BEDTIME DUAS FOR CHILDREN ============
export const bedtimeDuas: BedtimeDua[] = [
  { id: 'bd1', title: 'Dua Before Sleeping', arabicText: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', transliteration: 'Bismika Allahumma amutu wa ahya', translation: 'In Your name, O Allah, I die and I live.', benefit: 'Teaches children that sleep is a "small death" and waking is a gift from Allah.', stage: 'all' },
  { id: 'bd2', title: 'Dua Upon Waking', arabicText: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', transliteration: 'Alhamdulillahil-ladhi ahyana ba\'da ma amatana wa ilayhin-nushur', translation: 'Praise be to Allah who gave us life after death, and to Him is the resurrection.', benefit: 'Start the day with gratitude for another chance at life.', stage: 'all' },
  { id: 'bd3', title: 'Ayatul Kursi', arabicText: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ', transliteration: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum...', translation: 'Allah! There is no god but He, the Living, the Self-Subsisting...', benefit: 'Reciting before sleep brings protection from Shaytan until morning.', stage: 'all' },
  { id: 'bd4', title: 'Surah Al-Ikhlas', arabicText: 'قُلْ هُوَ اللَّهُ أَحَدٌ', transliteration: 'Qul Huwa Allahu Ahad...', translation: 'Say: He is Allah, the One...', benefit: 'Recite 3 times along with Al-Falaq and An-Nas for protection.', stage: 'all' },
  { id: 'bd5', title: 'Surah Al-Falaq', arabicText: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', transliteration: 'Qul a\'udhu bi Rabbil-Falaq...', translation: 'Say: I seek refuge in the Lord of daybreak...', benefit: 'Protection from harm and evil. Blow into palms and wipe over body.', stage: 'all' },
  { id: 'bd6', title: 'Surah An-Nas', arabicText: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', transliteration: 'Qul a\'udhu bi Rabbin-Nas...', translation: 'Say: I seek refuge in the Lord of mankind...', benefit: 'Protection from whispers of Shaytan. Complete the nighttime routine.', stage: 'all' },
  { id: 'bd7', title: 'Protection Dua', arabicText: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', transliteration: 'A\'udhu bikalimatil-lahit-tammati min sharri ma khalaq', translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.', benefit: 'General protection dua, especially good for children with nighttime fears.', stage: 'all' },
  { id: 'bd8', title: 'Dua for Good Dreams', arabicText: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ', transliteration: 'Allahumma qini \'adhabaka yawma tab\'athu \'ibadak', translation: 'O Allah, protect me from Your punishment on the Day You resurrect Your servants.', benefit: 'The Prophet ﷺ would say this while placing his right hand under his cheek.', stage: 'school-age' },
];

// ============ SEERAH-BASED PARENTING LESSONS ============
export const seerahLessons: SeerahLesson[] = [
  { id: 'sl1', title: 'The Prophet\'s Kindness to Anas', story: 'Anas ibn Malik served the Prophet ﷺ for 10 years from childhood. He reported: "He never said to me \'Uff!\' nor \'Why did you do that?\' or \'Why didn\'t you do that?\'"', lesson: 'Never express frustration with harsh words. Children remember how you made them feel more than what you taught them.', application: 'When your child makes a mistake, pause. Replace "Why did you do that?!" with "Let\'s fix this together."', stage: 'all', icon: '💕' },
  { id: 'sl2', title: 'Playing with Hasan and Husain', story: 'The Prophet ﷺ would let his grandsons ride on his back during prayer, extending his prostration until they got off. He kissed them often, shocking companions who never showed such affection.', lesson: 'Physical affection and playful parenting are Sunnah. Never consider yourself "above" playing with children.', application: 'Get on the floor and play. Let them climb on you. Kiss them daily. These moments build lifelong bonds.', stage: 'all', icon: '🤗' },
  { id: 'sl3', title: 'Consulting Young Usama', story: 'The Prophet ﷺ appointed Usama ibn Zayd as army commander at just 18 years old, despite criticism from older companions. He trusted young people with responsibility.', lesson: 'Give children real responsibilities that match their capabilities. Trust builds confidence.', application: 'Ask your preteen\'s opinion on family decisions. Give your teen leadership roles. Trust them before they "prove" themselves.', stage: 'preteen', icon: '⚔️' },
  { id: 'sl4', title: 'Gentle Correction with the Bedouin', story: 'When a Bedouin man urinated in the mosque, companions rushed to stop him harshly. The Prophet ﷺ said "Leave him," then gently taught him privately after he finished.', lesson: 'Correct in private, not public. Wait for the emotional moment to pass before teaching.', application: 'Don\'t yell corrections across the room. Pull your child aside. Speak softly. Shame never teaches effectively.', stage: 'all', icon: '🌿' },
  { id: 'sl5', title: 'The Prophet\'s Patience with Questions', story: 'The Prophet ﷺ never dismissed a question as silly. When a man asked if he should tie his camel or trust in Allah, he answered: "Tie it, then trust in Allah."', lesson: 'Every question deserves a thoughtful answer. Children learn to seek knowledge when their curiosity is honored.', application: 'Never say "That\'s a stupid question." Answer patiently, or say "Great question! Let\'s find out together."', stage: 'all', icon: '❓' },
  { id: 'sl6', title: 'Equality Among Children', story: 'A companion came to the Prophet ﷺ asking him to witness a gift he was giving to only one of his sons. The Prophet ﷺ asked, "Did you give the same to all your children?" When he said no, the Prophet refused to witness it.', lesson: 'Treat all children equally in gifts, attention, and affection. Favoritism breeds resentment between siblings.', application: 'If you give one child a gift, give all children gifts. Spend individual time with each child.', stage: 'all', icon: '⚖️' },
  { id: 'sl7', title: 'Teaching by Example', story: 'Aisha (RA) said: "The Prophet\'s character was the Quran." He didn\'t just preach — he lived every teaching. Children observed and absorbed.', lesson: 'Children learn more from what you do than what you say. You are their first and most powerful teacher.', application: 'If you want honest children, be honest. If you want patient children, model patience. They\'re always watching.', stage: 'all', icon: '🪞' },
  { id: 'sl8', title: 'The Prophet\'s Love for Fatimah', story: 'When Fatimah (RA) would visit, the Prophet ﷺ would stand up, kiss her, and give her his seat. He would say, "Fatimah is part of me. Whoever angers her, angers me."', lesson: 'Show your children they are precious to you through actions, not just words. Stand up for them.', application: 'When your child enters the room, acknowledge them warmly. Defend them when others criticize unfairly.', stage: 'all', icon: '👑' },
  { id: 'sl9', title: 'Orphan Care', story: 'The Prophet ﷺ was himself an orphan. He said: "I and the one who looks after an orphan will be in Paradise like this" — and he joined his index and middle fingers.', lesson: 'Teach children compassion for those less fortunate. Service to others is worship.', application: 'Sponsor an orphan as a family. Involve children in charity. Teach them their blessings come with responsibilities.', stage: 'school-age', icon: '🤲' },
  { id: 'sl10', title: 'Forgiving Mistakes', story: 'When Makkah was conquered, the Prophet ﷺ forgave all those who had persecuted him and killed his companions. He said: "Go, you are free."', lesson: 'Model forgiveness. Children who see their parents forgive learn to let go of grudges.', application: 'When someone wrongs you, verbalize your forgiveness in front of your children. "I forgive them because Allah forgives."', stage: 'all', icon: '☮️' },
];

// ============ RAMADAN ACTIVITIES FOR KIDS ============
export const ramadanActivities: RamadanActivity[] = [
  { id: 'ra1', title: 'Ramadan Good Deeds Jar', description: 'Create a jar where children add a paper slip for each good deed. Count them together on Eid to see how many blessings they collected!', materials: ['Glass jar', 'Colored paper slips', 'Markers', 'Decorations'], duration: 'Daily', stage: 'all', icon: '🫙' },
  { id: 'ra2', title: 'DIY Ramadan Lanterns', description: 'Make paper lanterns (fanous) together. Use colored paper, scissors, and LED candles for safe illumination. Hang them around the house!', materials: ['Colored paper', 'Scissors', 'Glue', 'LED candles', 'String'], duration: '45 min', stage: 'preschool', icon: '🏮' },
  { id: 'ra3', title: 'Ramadan Countdown Calendar', description: 'Create an advent-style calendar with 30 pockets or doors. Each day reveals a small treat, good deed challenge, or Quran verse.', materials: ['Cardboard', 'Paper pockets/envelopes', 'Treats', 'Verses to print'], duration: '60-90 min to make', stage: 'all', icon: '📅' },
  { id: 'ra4', title: 'Iftar Helper Badge', description: 'Create "Iftar Helper" badges. Children earn stickers for helping set the table, pour drinks, arrange dates, or clean up after iftar.', materials: ['Badge templates', 'Stickers', 'Markers', 'Safety pins'], duration: 'Daily', stage: 'toddler', icon: '🥇' },
  { id: 'ra5', title: 'Quran Story Time', description: 'Read one story of a Prophet each night after Taraweeh or before bed. Use picture books for young children or storytelling for older ones.', materials: ['Islamic children\'s books', 'Story cards'], duration: '15-20 min', stage: 'all', icon: '📖' },
  { id: 'ra6', title: 'Charity Box Decorating', description: 'Decorate a Sadaqah box together. Children collect coins throughout Ramadan and choose a charity to donate to before Eid.', materials: ['Box/jar', 'Paint', 'Stickers', 'Islamic stencils'], duration: '30 min', stage: 'preschool', icon: '💰' },
  { id: 'ra7', title: 'Moon Sighting Journal', description: 'Keep a nightly moon journal. Draw the moon\'s shape each night, track its phases, and learn the lunar calendar.', materials: ['Notebook', 'Pencils', 'Moon phase guide'], duration: '10 min nightly', stage: 'school-age', icon: '🌙' },
  { id: 'ra8', title: 'Eid Gift Making', description: 'Make homemade Eid cards, bookmarks, or small crafts throughout Ramadan to give as gifts on Eid day.', materials: ['Card stock', 'Markers', 'Glitter', 'Stickers', 'Ribbon'], duration: '30-60 min', stage: 'preschool', icon: '🎁' },
  { id: 'ra9', title: 'Suhoor Breakfast Prep', description: 'Involve older children in preparing suhoor. Teach them simple recipes like overnight oats, smoothies, or egg dishes.', materials: ['Recipe ingredients', 'Kid-safe utensils'], duration: '20-30 min', stage: 'school-age', icon: '🍳' },
  { id: 'ra10', title: 'Taraweeh Prayer Tracking', description: 'Create a visual chart to track Taraweeh prayers. Children mark each night they pray, building a sense of accomplishment.', materials: ['Poster board', 'Star stickers', 'Markers'], duration: 'Daily tracking', stage: 'school-age', icon: '⭐' },
  { id: 'ra11', title: 'Names of Allah Learning', description: 'Learn one name of Allah each day with its meaning. Create cards, draw pictures representing each attribute, or write them in calligraphy.', materials: ['Index cards', 'Markers', 'List of 99 names'], duration: '15 min daily', stage: 'all', icon: '✨' },
  { id: 'ra12', title: 'Ramadan Recipe Book', description: 'Create a family Ramadan recipe book. Let children help write recipes, draw pictures of dishes, and collect family favorites.', materials: ['Binder', 'Paper', 'Markers', 'Photos'], duration: '30 min per entry', stage: 'school-age', icon: '📕' },
];
