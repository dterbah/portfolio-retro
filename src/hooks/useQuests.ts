import { useState, useEffect } from 'react';
import { Quest } from '../types/quest';

export const useQuests = (
  timeSpent: number,
  visitedSections: string[],
  contrastMode: string
) => {
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: 'visit-skills',
      title: 'Explorateur de Compétences',
      description: 'Visite la section Compétences',
      completed: false
    },
    {
      id: 'time-spent',
      title: 'Visiteur Assidu',
      description: 'Passe 10 secondes sur le portfolio',
      completed: false
    },
    {
      id: 'visit-all',
      title: 'Explorateur Complet',
      description: 'Visite toutes les sections du portfolio',
      completed: false
    },
    {
      id: 'change-contrast',
      title: 'Maître des Couleurs',
      description: 'Teste tous les modes de contraste',
      completed: false
    }
  ]);

  useEffect(() => {
    const checkQuests = () => {
      setQuests(prevQuests => 
        prevQuests.map(quest => {
          let shouldComplete = false;

          switch (quest.id) {
            case 'visit-skills':
              shouldComplete = visitedSections.includes('skills');
              break;
            case 'time-spent':
              shouldComplete = timeSpent >= 10;
              break;
            case 'visit-all':
              shouldComplete = visitedSections.length >= 4;
              break;
            case 'change-contrast':
              shouldComplete = contrastMode === 'low-contrast';
              break;
          }

          if (!quest.completed && shouldComplete) {
            console.log(`Quest ${quest.id} completed!`);
            return { ...quest, completed: true };
          }
          return quest;
        })
      );
    };

    checkQuests();
  }, [timeSpent, visitedSections, contrastMode]);

  useEffect(() => {
    const savedQuests = localStorage.getItem('quests');
    if (savedQuests) {
      const parsedQuests = JSON.parse(savedQuests);
      setQuests(parsedQuests);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quests', JSON.stringify(quests));
  }, [quests]);

  return quests;
}; 