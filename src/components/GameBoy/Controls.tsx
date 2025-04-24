interface ControlsProps {
  onKeyPress: (key: string) => void;
}

export const Controls = ({ onKeyPress }: ControlsProps) => {
  return (
    <div className="controls">
      <div className="dpad">
        <div className="dpad-button up" onClick={() => onKeyPress('up')}>↑</div>
        <div className="dpad-button right" onClick={() => onKeyPress('right')}>→</div>
        <div className="dpad-button down" onClick={() => onKeyPress('down')}>↓</div>
        <div className="dpad-button left" onClick={() => onKeyPress('left')}>←</div>
      </div>
      <div className="action-buttons">
        <div className="action-button" onClick={() => onKeyPress('b')}>B</div>
        <div className="action-button" onClick={() => onKeyPress('a')}>A</div>
      </div>
    </div>
  );
}; 