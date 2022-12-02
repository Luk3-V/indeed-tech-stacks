import fromnow from 'fromnow';
import React, { createContext, useEffect, useState } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, LabelList } from 'recharts';
import RankingChart from './components/RankingChart';
import Button from './components/Button';
import Select from './components/Select';
import Toggle from './components/Toggle';
import ReactGA from 'react-ga4';

interface Keyword {
  name: string,
  count: number
}
interface Data {
  date: Date,
  'us': {
    frameworks: Keyword[],
    languages: Keyword[],
    tools: Keyword[],
    jobtitles: Keyword[],
  },
  'uk': {
    frameworks: Keyword[],
    languages: Keyword[],
    tools: Keyword[],
    jobtitles: Keyword[],
  }
}

const CATEGORIES = [
  {value: "frameworks", name: "🧱 Frameworks"},
  {value: "languages", name: "📖 Languages"},
  {value: "tools", name: "🛠️ Tools"},
  {value: "jobtitles", name: "💼 Job Titles"},
];

const COUNTRIES = [
  {value: "us", name: "🇺🇸 US"},
  {value: "uk", name: "🇬🇧 UK"}
];

export const ThemeContext = createContext(false);

ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_CODE);

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data>();
  const [category, setCategory] = useState<String>("frameworks");
  const [country, setCountry] = useState<String>("us");
  const [theme, setTheme] = useState<boolean>(!localStorage.getItem("light") ? true : false);
  const dataUrl = import.meta.env.VITE_API_URL;

  function toggleTheme() {
    document.body.classList.toggle('dark');
    if(!theme)
      localStorage.removeItem("light");
    else
      localStorage.setItem("light", "true");
    setTheme(!theme);    
  }

  useEffect(() => {
    ReactGA.send("pageview");

    fetch(dataUrl+'newest')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log("DATA DATE: "+new Date(data.date).toUTCString());
      })
      .catch(() => setLoading(false));

    if(!localStorage.getItem("light"))
      document.body.classList.add('dark');
  }, [])

  useEffect(() => {}, [country]);

  return (
    <ThemeContext.Provider value={theme}>
      <div className="min-h-screen relative">
        <div className="max-w-5xl px-3 md:px-10 pt-8 pb-5 mx-auto flex justify-between">
          <h1 className="inline-block text-3xl font-bold self-center mr-1">Indeed Tech Stacks <span className='text-gray-400 dark:text-gray-500 text-2xl'>[v0.2]</span></h1>
          <Toggle onClick={toggleTheme}/>
        </div>

        <div className="max-w-5xl px-3 md:px-10 mx-auto mt-5">
          <div className="flex">
            <div>
              <label htmlFor="Category" className="block mb-2 text-xl" >Select a Category</label>
              <Select name="category" options={CATEGORIES} onChange={(e: any) => setCategory(e.target.value)} />
            </div>
            <div className="ml-5">
              <label htmlFor="Country" className="block mb-2 text-xl" >Select a Country</label>
              <Select name="country" options={COUNTRIES} onChange={(e: any) => setCountry(e.target.value)} />
            </div>
          </div>
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-md">{`✨ Updated ${data ? fromnow(data.date, {and:true, suffix:true}) : ''}.`}</p>
        </div>

        <div className="flex max-w-5xl mx-auto">
          {category==="frameworks" && <RankingChart title="# of Job Postings" data={country === 'us' ? data?.us.frameworks : data?.uk.frameworks} loading={loading}/>}
          {category==="languages" && <RankingChart title="# of Job Postings" data={country === 'us' ? data?.us.languages : data?.uk.languages} loading={loading}/>}
          {category==="tools" && <RankingChart title="# of Job Postings" data={country === 'us' ? data?.us.tools : data?.uk.tools} loading={loading}/>}
          {category==="jobtitles" && <RankingChart title="# of Job Postings" data={country === 'us' ? data?.us.jobtitles : data?.uk.jobtitles} loading={loading}/>}
        </div>
        
        <div className='px-3 md:px-10 max-w-5xl mx-auto text-gray-600 dark:text-gray-400 text-md'>
          <div className='p-5 bg-gray-100 dark:bg-gray-900 border border-gray-400 dark:border-gray-600'>
            <p>This website ranks trending tech stacks & other keywords based on <a className='text-blue-700 dark:text-white hover:underline' href="https://www.indeed.com/" target="_blank">Indeed</a> job listings. (Currently US only)</p>
            <p>May not include all job listings that relate to the keywords.</p>
            <p>Updated daily @ 12 AM CST.</p>
            <br/>
            <p>Any suggestions? DM me on twitter! <a className='text-blue-700 dark:text-white hover:underline' href="https://twitter.com/lukevluke_" target="_blank">@lukevluke_</a></p>
            <br/>
            <h3 className='text-xl font-semibold'>Coming Soon:</h3>
            <p>🔷 Keyword trend graph.</p>
            <p>🔷 More categories & keywords.</p>
            <p>🔷 Other job boards</p>
          </div>
        </div>
        <div className='px-3 md:px-10 mt-5 max-w-5xl mx-auto text-gray-700 dark:text-gray-300 text-md'>

          </div>
        <div className="h-28"></div>
        <div className="flex mt-10 py-10 w-full absolute bottom-0">
          
          <a
            href="https://www.luke-v.com"
            target="_blank"
            className='text-blue-700 dark:text-white mx-auto font-semibold hover:underline'
          >
            Made by Luke V 😎
          </a>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;