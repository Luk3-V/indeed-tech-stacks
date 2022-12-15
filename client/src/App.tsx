import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import ReactGA from 'react-ga4';
import Rankings from './pages/Rankings';
import Trends from './pages/Trends';
import Header from './components/Header';
import Footer from './components/Footer';
import Nav from './components/Nav';

export const ThemeContext = createContext(false);

//ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_CODE);

function App() {
  const [category, setCategory] = useState({value: "frameworks", name: "🧱 Frameworks"});
  const [country, setCountry] = useState({value: "us", name: "🇺🇸 US"});
  const [theme, setTheme] = useState<boolean>(!localStorage.getItem("light") ? true : false);

  function toggleTheme() {
    document.body.classList.toggle('dark');
    if(!theme)
      localStorage.removeItem("light");
    else
      localStorage.setItem("light", "true");
    setTheme(!theme);    
  }

  useEffect(() => {
    //ReactGA.send("pageview");

    if(!localStorage.getItem("light"))
      document.body.classList.add('dark');
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <BrowserRouter>
        <div className="min-h-screen relative px-3 md:px-10 max-w-5xl mx-auto">
          <Header category={category} setCategory={setCategory} country={country} setCountry={setCountry} toggleTheme={toggleTheme}/>

          <Nav />

          <Routes>
            <Route path='/' element={<Rankings category={category.value} country={country.value} />} />
            <Route path='/trends' element={<Trends category={category.value} country={country.value} />} />
            <Route path='*' element={<>404 NOT FOUND</>} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;