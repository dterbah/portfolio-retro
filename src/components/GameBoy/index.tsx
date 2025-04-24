import { useState, useEffect } from 'react';
import { MenuItem } from '../../types/quest';
import { useQuests } from '../../hooks/useQuests';
import { useTimeSpent } from '../../hooks/useTimeSpent';
import { Screen } from './Screen';
import { Controls } from './Controls';
import { ControlButtons } from './ControlButtons';
import '../../index.css';

const menuItems: MenuItem[] = [
  { id: 'pro', label: 'Projets Professionnels' },
  { id: 'perso', label: 'Projets Personnels' },
  { id: 'skills', label: 'Compétences' },
  { id: 'contact', label: 'Contact' }
];

const GameBoy = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('');
  const [isPowered, setIsPowered] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [contrastMode, setContrastMode] = useState<'normal' | 'high-contrast' | 'low-contrast'>('normal');
  const [visitedSections, setVisitedSections] = useState<string[]>([]);

  const timeSpent = useTimeSpent(loading, isPowered);
  const quests = useQuests(timeSpent, visitedSections, contrastMode);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setLoading(false);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const batteryTimer = setInterval(() => {
      setBatteryLevel((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000);

    return () => clearInterval(batteryTimer);
  }, []);

  useEffect(() => {
    if (currentSection && !visitedSections.includes(currentSection)) {
      setVisitedSections(prev => [...prev, currentSection]);
    }
  }, [currentSection]);

  useEffect(() => {
    const savedSections = localStorage.getItem('visitedSections');
    if (savedSections) {
      setVisitedSections(JSON.parse(savedSections));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('visitedSections', JSON.stringify(visitedSections));
  }, [visitedSections]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', contrastMode);
  }, [contrastMode]);

  const handlePowerToggle = () => {
    setIsPowered(!isPowered);
    if (isPowered) {
      setLoading(true);
      setProgress(0);
    }
  };

  const handleContrastChange = () => {
    const modes: ('normal' | 'high-contrast' | 'low-contrast')[] = ['normal', 'high-contrast', 'low-contrast'];
    const currentIndex = modes.indexOf(contrastMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setContrastMode(modes[nextIndex]);
  };

  const handleKeyPress = (key: string) => {
    if (!isPowered || loading) return;

    switch (key) {
      case 'up':
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : menuItems.length - 1));
        break;
      case 'down':
        setSelectedIndex((prev) => (prev < menuItems.length - 1 ? prev + 1 : 0));
        break;
      case 'a':
        if (currentSection === '') {
          setCurrentSection(menuItems[selectedIndex].id);
        }
        break;
      case 'b':
        if (currentSection !== '') {
          setCurrentSection('');
        }
        break;
    }
  };

  const handleItemSelect = (index: number, id: string) => {
    setSelectedIndex(index);
    setCurrentSection(id);
  };

  return (
    <div className="gameboy">
      <ControlButtons
        onPowerToggle={handlePowerToggle}
        onContrastChange={handleContrastChange}
        onQuestClick={() => setCurrentSection('quests')}
      />
      <div className="screen">
        <Screen
          loading={loading}
          progress={progress}
          isPowered={isPowered}
          currentSection={currentSection}
          batteryLevel={batteryLevel}
          currentTime={currentTime}
          selectedIndex={selectedIndex}
          menuItems={menuItems}
          quests={quests}
          onItemSelect={handleItemSelect}
        />
      </div>
      <Controls onKeyPress={handleKeyPress} />
    </div>
  );
};

export default GameBoy; 