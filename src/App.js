import './App.css';
import WaqayahHero from './components/WaqayahHero';
import CameraSection from './components/CameraSection';
import Header from './components/Header';
import HowItWorksSection from './components/HowItWorksSection';

function App() {
  return (
    <div>
      <Header/>
      <WaqayahHero />
      <CameraSection />
      <HowItWorksSection />
    </div>
  );
}

export default App;