interface ControlButtonsProps {
  onPowerToggle: () => void;
  onContrastChange: () => void;
  onQuestClick: () => void;
}

export const ControlButtons = ({ onPowerToggle, onContrastChange, onQuestClick }: ControlButtonsProps) => {
  return (
    <>
      <div className="power-section">
        <div className="power-led" />
        <span className="power-text">POWER</span>
        <div className="power-button" onClick={onPowerToggle} />
      </div>
      <div className="contrast-button" onClick={onContrastChange}>
        <div className="contrast-icon" />
      </div>
      <div className="quest-button" onClick={onQuestClick}>
        <div className="quest-icon">!</div>
      </div>
    </>
  );
}; 