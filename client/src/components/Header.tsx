import fromnow from 'fromnow';
import React from 'react'
import Select from './Select'
import Toggle from './Toggle'

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

export default function Header(props: any) {
  return (
    <>
        <div className="pt-8 pb-5 flex justify-between">
            <h1 className="inline-block text-3xl font-bold self-center mr-1">Indeed Tech Stacks <span className='text-gray-400 dark:text-gray-500 text-2xl'>[v0.2]</span></h1>
            <Toggle onClick={props.toggleTheme}/>
        </div>

        <div className="mt-5">
            <div className="flex">
                <div>
                    <label htmlFor="Category" className="block mb-2 text-xl" >Select a Category</label>
                    <Select name="category" options={CATEGORIES} value={props.category} onChange={(v: any) => props.setCategory(v)} />
                </div>
                <div className="ml-5">
                    <label htmlFor="Country" className="block mb-2 text-xl" >Select a Country</label>
                    <Select name="country" options={COUNTRIES} value={props.country} onChange={(v: any) => props.setCountry(v)} />
                </div>
            </div>
        </div>
    </>
  )
}
