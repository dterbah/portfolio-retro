import { Quest } from '../../types/quest';
import { LoadingScreen } from './LoadingScreen';
import { StatusBar } from './StatusBar';
import { QuestSection } from './QuestSection';
import { MainMenu } from './MainMenu';

interface ScreenProps {
  loading: boolean;
  progress: number;
  isPowered: boolean;
  currentSection: string;
  batteryLevel: number;
  currentTime: Date;
  selectedIndex: number;
  menuItems: { id: string; label: string; }[];
  quests: Quest[];
  onItemSelect: (index: number, id: string) => void;
}

export const Screen = ({
  loading,
  progress,
  isPowered,
  currentSection,
  batteryLevel,
  currentTime,
  selectedIndex,
  menuItems,
  quests,
  onItemSelect
}: ScreenProps) => {
  if (loading) {
    return <LoadingScreen progress={progress} />;
  }

  if (!isPowered) {
    return (
      <div className="screen-off">
        <div className="power-off-text">POWER OFF</div>
      </div>
    );
  }

  return (
    <>
      <StatusBar batteryLevel={batteryLevel} currentTime={currentTime} />
      <div className="content">
        <div className="portfolio-title">PORTFOLIO</div>
        {currentSection === 'quests' ? (
          <QuestSection quests={quests} />
        ) : currentSection === '' ? (
          <MainMenu
            menuItems={menuItems}
            selectedIndex={selectedIndex}
            onItemSelect={onItemSelect}
          />
        ) : (
          // TODO: Add other sections
          <div>Section content</div>
        )}
      </div>
    </>
  );
}; 