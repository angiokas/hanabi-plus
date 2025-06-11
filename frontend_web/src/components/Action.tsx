const Action: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}> = ({ icon, label, onClick, disabled = false, className = "" }) => {
  return (
    <button
      className={`action-button ${disabled ? "action-disabled" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="action-icon">{icon}</div>
      <span className="action-label">{label}</span>
    </button>
  );
};

export default Action;
