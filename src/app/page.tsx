'use client';

import { useState } from 'react';
import Header from './components/header';
import Main from './components/main';

export default function Home() {
  const [devMode, setDevMode] = useState(false);

  return (
    <>
      <Header 
        devMode={devMode} 
        onDevModeChange={(checked) => setDevMode(checked)} 
      />
      <Main devMode={devMode} />
    </>
  )
}
