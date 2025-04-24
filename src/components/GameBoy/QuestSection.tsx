import { Quest } from '../../types/quest';

interface QuestSectionProps {
  quests: Quest[];
}

export const QuestSection = ({ quests }: QuestSectionProps) => {
  const completedQuests = quests.filter(quest => quest.completed).length;
  const totalQuests = quests.length;

  return (
    <div className="quest-section">
      <h2>Quêtes ({completedQuests}/{totalQuests})</h2>
      <div className="quest-list">
        {quests.map(quest => (
          <div key={quest.id} className={`quest-item ${quest.completed ? 'completed' : ''}`}>
            <div className="quest-info">
              <div className="quest-title">{quest.title}</div>
              <div className="quest-description">{quest.description}</div>
            </div>
            <div className={`quest-status ${quest.completed ? 'completed' : ''}`}>
              {quest.completed ? '✓' : '○'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 