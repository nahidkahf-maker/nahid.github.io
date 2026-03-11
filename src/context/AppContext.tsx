import React, { createContext, useContext, ReactNode } from 'react';
import { Child, FamilyMember, JournalEntry, AppSettings, Language } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface AppContextType {
  children: Child[];
  setChildren: (v: Child[] | ((prev: Child[]) => Child[])) => void;
  familyMembers: FamilyMember[];
  setFamilyMembers: (v: FamilyMember[] | ((prev: FamilyMember[]) => FamilyMember[])) => void;
  journalEntries: JournalEntry[];
  setJournalEntries: (v: JournalEntry[] | ((prev: JournalEntry[]) => JournalEntry[])) => void;
  settings: AppSettings;
  setSettings: (v: AppSettings | ((prev: AppSettings) => AppSettings)) => void;
  selectedChildId: string | null;
  setSelectedChildId: (v: string | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children: childrenNode }: { children: ReactNode }) {
  const [childrenData, setChildren] = useLocalStorage<Child[]>('bgt-children', []);
  const [familyMembers, setFamilyMembers] = useLocalStorage<FamilyMember[]>('bgt-family', []);
  const [journalEntries, setJournalEntries] = useLocalStorage<JournalEntry[]>('bgt-journal', []);
  const [settings, setSettings] = useLocalStorage<AppSettings>('bgt-settings', {
    language: 'en',
    theme: 'light',
  });
  const [selectedChildId, setSelectedChildId] = useLocalStorage<string | null>('bgt-selected-child', null);

  return (
    <AppContext.Provider value={{
      children: childrenData,
      setChildren,
      familyMembers,
      setFamilyMembers,
      journalEntries,
      setJournalEntries,
      settings,
      setSettings,
      selectedChildId,
      setSelectedChildId,
    }}>
      {childrenNode}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
