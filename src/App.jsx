import { BrowserRouter } from "react-router-dom";
import{About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas} from './components';
const App = () => {

  return (
   <div>
    <BrowserRouter>
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-norepeat bg-center">
      <Navbar/>
      <Hero/>
      </div>
    <About/>
    <Experience/>
    <Tech/>
    <Works/>
    <Contact/>
    <StarsCanvas/>
    </div>
    </BrowserRouter>
   </div>
  )
}

export default App
