import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from './components/Slider/Slider';
import ContentDisplayer from './components/ContentDisplayer/ContentDisplayer';
import About from './components/About/About';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <div className="App">
      <Slider />
      <ContentDisplayer />
      <About />
      <Footer />
    </div>
  );
}

export default App;
