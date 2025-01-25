'use client';

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface HeaderProps {
  devMode: boolean
  onDevModeChange: (checked: boolean) => void
}

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

function Header({ devMode, onDevModeChange }: HeaderProps) {
  return (
    <div className='w-full h-16 flex justify-between items-center px-14'>
      <h2 className='text-2xl font-bold'>Cricket Field Planner 🏏</h2>
     
      <div className='flex items-center gap-3'>
        {process.env.NODE_ENV === 'development' && (
            <div className="flex items-center gap-3">
              <Label htmlFor="devMode" className="text-sm font-medium">
                Developer Mode
              </Label>
              <Switch
                id="devMode"
                checked={devMode}
                onCheckedChange={onDevModeChange}
              />
            </div>
          )}
           <ThemeButton />
      </div>
    </div>
  )
}
export default Header;
