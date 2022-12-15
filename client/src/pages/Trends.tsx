import fromnow from 'fromnow';
import React, { useEffect, useState } from 'react'
import MultiSelect from '../components/MultiSelect';
import TrendChart from '../components/TrendChart'

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

export default function Trends(props: any) {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Data[]>();
    const [options, setOptions] = useState<Keyword[]>([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dataUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(dataUrl)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setData(data);
            setLoading(false);
            console.log("DATA DATE: "+new Date(data[data.length-1].date).toUTCString());
          })
          .catch(() => setLoading(false));
    }, [])

    useEffect(() => {
        setSelectedOptions([]);
        setOptions(getOptions());
    }, [data, props.category])

    function getOptions() {
        if(data) {
            switch(props.category) {
                case "frameworks":
                    console.log("frames");
                    return data[0].us.frameworks;
                case "languages":
                    return data[0].us.languages;
                case "tools":
                    return data[0].us.tools;
                case "jobtitles":
                    return data[0].us.jobtitles;
                default:
                    return data[0].us.frameworks;
            } 
        }
        console.log("nope");
        return [];
    }

    return (
        <>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-md">{`✨ Updated ${data ? fromnow(data[data.length-1].date, {and:true, suffix:true}) : ''}.`}</p>

            <div className='mt-6'>
                <label className="block mb-2 text-lg" >Select Keywords (up to 3)</label>
                <MultiSelect options={options} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} loading={loading}/>
            </div>

            <div className="flex max-w-5xl mx-auto">
                {props.category==="frameworks" && <TrendChart title="Framework Trends" data={data} loading={loading} country={props.country} category={props.category} selectedOptions={selectedOptions}/>}
                {props.category==="languages" && <TrendChart title="Language Trends" data={data} loading={loading} country={props.country} category={props.category} selectedOptions={selectedOptions}/>}
                {props.category==="tools" && <TrendChart title="Tool Trends" data={data} loading={loading} country={props.country} category={props.category} selectedOptions={selectedOptions}/>}
                {props.category==="jobtitles" && <TrendChart title="Job Title Trends" data={data} loading={loading} country={props.country} category={props.category} selectedOptions={selectedOptions}/>}
            </div>

        </>
    )
}
