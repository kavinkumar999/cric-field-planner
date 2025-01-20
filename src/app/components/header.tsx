'use client';

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ButtonSkeleton />;
  }

  return (
    <button 
      className="border p-2.5 rounded-lg text-foreground/60 transition-colors duration-200 ease-in-out"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {resolvedTheme === 'dark' ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </button>
  );
};

const ButtonSkeleton = () => (
  <div className="h-9 w-9 rounded-lg border p-2.5">
    <div className="animate-pulse h-4 w-4 bg-gray-200 dark:bg-gray-800 rounded" />
  </div>
);

function Header() {
  return (
    <div className='w-full h-16 flex justify-between items-center px-14'>
      <h2 className='text-2xl font-bold'>Cricket Field Planner 🏏</h2>
      <ThemeButton />
    </div>
  )
}

export default Header;