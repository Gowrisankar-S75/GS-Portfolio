import { useEffect } from 'react';
import { Howl } from 'howler';
import { MainLayout } from './layouts/MainLayout';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Github } from './components/Github';
import { Contact } from './components/Contact';
import { ThemeProvider } from './context/ThemeContext';
import { CinematicThemeTransition } from './components/CinematicThemeTransition';

function App() {
  useEffect(() => {
    // Preload a sharper pop sound and set volume to maximum
    const clickSound = new Howl({
      src: ['https://actions.google.com/sounds/v1/cartoon/pop.ogg'],
      volume: 1.0, // Increased to maximum volume
      html5: true, // Use HTML5 Audio to prevent some browser blocking issues
    });

    const handleGlobalClick = (e) => {
      // Only play sound if clicking on a button, link, or explicitly interactive element
      if (e.target.closest('button, a, [role="button"]')) {
        clickSound.play();
      }
    };

    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return (
    <ThemeProvider>
      <MainLayout>
        <CustomCursor />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Github />
        <Contact />
      </MainLayout>
      <CinematicThemeTransition />
    </ThemeProvider>
  );
}

export default App;
