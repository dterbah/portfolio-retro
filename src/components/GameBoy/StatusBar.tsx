interface StatusBarProps {
  batteryLevel: number;
  currentTime: Date;
}

export const StatusBar = ({ batteryLevel, currentTime }: StatusBarProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="status-bar">
      <div className="battery">
        <div className="battery-icon">
          <div className="battery-level" style={{ width: `${batteryLevel}%` }} />
        </div>
        <span>{batteryLevel}%</span>
      </div>
      <div className="time">{formatTime(currentTime)}</div>
      <div className="date">{formatDate(currentTime)}</div>
    </div>
  );
}; 