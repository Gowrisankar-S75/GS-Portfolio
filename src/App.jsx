import { MainLayout } from './layouts/MainLayout';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Github } from './components/Github';
import { Contact } from './components/Contact';

function App() {
  return (
    <MainLayout>
      <CustomCursor />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Github />
      <Contact />
    </MainLayout>
  );
}

export default App;
