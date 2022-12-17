import fromnow from 'fromnow';
import React, { useEffect, useState } from 'react'
import MultiSelect from '../components/MultiSelect';
import TrendChart from '../components/TrendChart'
import { Data, Keyword } from '../data';

export default function Trends(props: any) {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Data[]>();
    const [options, setOptions] = useState<Keyword[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<Keyword[]>([]);
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
    }, [data, props.category]);

    function getOptions() {
        if(data) {
            switch(props.category) {
                case "frameworks":
                    console.log("frames");
                    return data[data.length-1].us.frameworks;
                case "languages":
                    return data[data.length-1].us.languages;
                case "tools":
                    return data[data.length-1].us.tools;
                case "jobtitles":
                    return data[data.length-1].us.jobtitles;
                default:
                    return data[data.length-1].us.frameworks;
            } 
        }
        console.log("nope");
        return [];
    }

    return (
        <>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-md">{`✨ ${data ? 'Updated '+fromnow(data[data.length-1].date, {and:true, suffix:true}) : 'Updating..'}.`}</p>

            <div className='mt-6'>
                <label className="block mb-2 text-lg" >Select Keywords (up to 3)</label>
                <MultiSelect options={options} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} loading={loading}/>
            </div>

            <div className="flex max-w-5xl mx-auto">
                {props.category==="frameworks" && <TrendChart title="Framework Trends (all-time)" data={data} loading={loading} country={props.country} category={props.category} selectedOptions={selectedOptions}/>}
                {props.category==="languages" && <TrendChart title="Language Trends (all-time)" data={data} loading={loading} country={props.country} category={props.category} selectedOptions={selectedOptions}/>}
                {props.category==="tools" && <TrendChart title="Tool Trends (all-time)" data={data} loading={loading} country={props.country} category={props.category} selectedOptions={selectedOptions}/>}
                {props.category==="jobtitles" && <TrendChart title="Job Title Trends (all-time)" data={data} loading={loading} country={props.country} category={props.category} selectedOptions={selectedOptions}/>}
            </div>

        </>
    )
}
