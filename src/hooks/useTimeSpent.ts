import { useState, useEffect } from 'react';

export const useTimeSpent = (isLoading: boolean, isPowered: boolean) => {
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isLoading && isPowered) {
        setTimeSpent(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading, isPowered]);

  useEffect(() => {
    const savedTime = localStorage.getItem('timeSpent');
    if (savedTime) {
      setTimeSpent(parseInt(savedTime));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timeSpent', timeSpent.toString());
  }, [timeSpent]);

  return timeSpent;
}; 