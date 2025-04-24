import { MenuItem } from '../../types/quest';

interface MainMenuProps {
  menuItems: MenuItem[];
  selectedIndex: number;
  onItemSelect: (index: number, id: string) => void;
}

export const MainMenu = ({ menuItems, selectedIndex, onItemSelect }: MainMenuProps) => {
  return (
    <div className="menu">
      {menuItems.map((item, index) => (
        <div
          key={item.id}
          className={`menu-item ${index === selectedIndex ? 'selected' : ''}`}
          onClick={() => onItemSelect(index, item.id)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}; 