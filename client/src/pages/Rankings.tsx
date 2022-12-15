import fromnow from 'fromnow';
import React, { useEffect, useState } from 'react'
import RankingChart from '../components/RankingChart'
import { Data } from '../data';

export default function Rankings(props: any) {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Data>();
    const dataUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
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
    }, [])

    return (
        <>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-md">{`✨ ${data ? 'Updated '+fromnow(data.date, {and:true, suffix:true}) : 'Updating..'}.`}</p>

            <div className="flex max-w-5xl mx-auto">
                {props.category==="frameworks" && <RankingChart title="# of Job Postings" data={props.country === 'us' ? data?.us.frameworks : data?.uk.frameworks} loading={loading}/>}
                {props.category==="languages" && <RankingChart title="# of Job Postings" data={props.country === 'us' ? data?.us.languages : data?.uk.languages} loading={loading}/>}
                {props.category==="tools" && <RankingChart title="# of Job Postings" data={props.country === 'us' ? data?.us.tools : data?.uk.tools} loading={loading}/>}
                {props.category==="jobtitles" && <RankingChart title="# of Job Postings" data={props.country === 'us' ? data?.us.jobtitles : data?.uk.jobtitles} loading={loading}/>}
            </div>
        </>
    )
}
