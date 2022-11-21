import fromnow from 'fromnow';
import React, { createContext, useEffect, useState } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, LabelList } from 'recharts';
import RankingChart from './components/RankingChart';
import Button from './components/Button';
import Select from './components/Select';
import Toggle from './components/Toggle';

interface Keyword {
  name: string,
  count: number
}
interface Data {
  date: Date,
  frameworks: Keyword[],
  languages: Keyword[],
  tools: Keyword[],
  jobtitles: Keyword[],
}

const CATEGORIES = [
  {value: "frameworks", name: "🧱 Frameworks"},
  {value: "languages", name: "📖 Languages"},
  {value: "tools", name: "🛠️ Tools"},
  {value: "jobtitles", name: "💼 Job Titles"},
];

export const ThemeContext = createContext(false);

function App() {
  const [data, setData] = useState<Data>();
  const [category, setCategory] = useState<String>("frameworks");
  const [theme, setTheme] = useState<boolean>(!localStorage.getItem("light") ? true : false);
  //const dataUrl = 'indeed/';
  const dataUrl = 'https://indeed-tech-stacks-api-production.up.railway.app/indeed/';

  function toggleTheme() {
    document.body.classList.toggle('dark');
    if(!theme)
      localStorage.removeItem("light");
    else
      localStorage.setItem("light", "true");
    setTheme(!theme);    
  }

  useEffect(() => {
    fetch(dataUrl+'newest')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });

    if(!localStorage.getItem("light"))
      document.body.classList.add('dark');
  }, [])

  return (
    <ThemeContext.Provider value={theme}>
      <div className="min-h-screen relative">
        <div className="max-w-5xl px-3 md:px-10 pt-8 pb-5 mx-auto flex justify-between">
          <h1 className="inline-block text-3xl font-bold self-center mr-1">Indeed Tech Stacks <span className='text-gray-400 dark:text-gray-500'>[beta]</span></h1>
          <Toggle onClick={toggleTheme}/>
        </div>

        <div className="max-w-5xl px-3 md:px-10 mx-auto mt-5">
          <label htmlFor="Category" className="block mb-2 text-xl" >Select a Category</label>
          <Select name="category" options={CATEGORIES} onChange={(e: any) => setCategory(e.target.value)} />
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-md">{`✨ Updated ${data ? fromnow(data.date, {and:true, suffix:true}) : ''}.`}</p>
        </div>

        <div className="flex max-w-5xl mx-auto">
          {category==="frameworks" && <RankingChart title="# of Job Postings" data={data?.frameworks }/>}
          {category==="languages" && <RankingChart title="# of Job Postings" data={data?.languages }/>}
          {category==="tools" && <RankingChart title="# of Job Postings" data={data?.tools }/>}
          {category==="jobtitles" && <RankingChart title="# of Job Postings" data={data?.jobtitles }/>}
        </div>
        
        <div className='px-3 md:px-10 max-w-5xl mx-auto text-gray-600 dark:text-gray-400 text-md'>
          <div className='p-5 bg-gray-100 dark:bg-gray-900 border border-gray-400 dark:border-gray-600'>
            <p>Data gathered based on keywords using <a className='text-blue-700 dark:text-white hover:underline' href="https://www.indeed.com/" target="_blank">Indeed's</a> built-in search. (Currently US only)</p>
            <p>May not include all job listings that use the keywords.</p>
            <p>Updated daily @ 1:00AM CST.</p>
            <br/>
            <p>Any suggestions? Feel free to DM me on twitter! <a className='text-blue-700 dark:text-white hover:underline' href="https://twitter.com/lukevluke_" target="_blank">@lukevluke_</a></p>
            <br/>
            <h3 className='text-xl font-semibold'>Coming Soon:</h3>
            <p>🔷 Add more countries.</p>
            <p>🔷 Add keyword trend graph.</p>
            <p>🔷 Add more categories.</p>
            <p>🔷 Add more job boards</p>
          </div>
        </div>
        <div className='px-3 md:px-10 mt-5 max-w-5xl mx-auto text-gray-700 dark:text-gray-300 text-md'>

          </div>
        <div className="h-28"></div>
        <div className="flex mt-10 py-10 w-full absolute bottom-0">
          <a className='text-blue-700 dark:text-white mx-auto font-semibold hover:underline' href='https://www.luke-v.com/' target="_blank">Made by Luke V 😎</a>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;