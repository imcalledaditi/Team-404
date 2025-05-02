import React from 'react';

function ThemeToggle() {
  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      🌙 Toggle Dark Mode
    </button>
  );
}

export default ThemeToggle;
