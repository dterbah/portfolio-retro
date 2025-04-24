interface LoadingScreenProps {
  progress: number;
}

export const LoadingScreen = ({ progress }: LoadingScreenProps) => {
  return (
    <div className="loading-screen">
      <div className="loading-text">Chargement...</div>
      <div className="loading-bar">
        <div
          className="loading-progress"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}; 