import React, { useContext, useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ThemeContext } from '../App';
import { Data } from '../data';

const COLORS = ["#3b82f6", "#ef4444", "#22c55e"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 rounded-sm text-white p-2 px-3 bg-opacity-70 backdrop-blur-sm">
        <p>{label}</p>
        {payload.map((e: any, i: number) => <p key={i}><span className='inline-block h-3 w-3 mr-2' style={{backgroundColor: COLORS[i]}}></span>{`${e.name}: ${e.value} Jobs`}</p>)}
      </div>
    );
  }

  return null;
};

export default function TrendChart(props: any) {
  const [data, setData] = useState<Data[]>([]);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    console.log("MOUNT"+props.data?.length);
  }, [])

  useEffect(() => {    
    if(props.data) {
      const filtered = props.data.map((obj: Data) => {
        let newObj : { [key: string]: any } = {
          date: new Date(obj.date).toLocaleDateString("en-US", {month: 'numeric', day: 'numeric'})
        };
        
        for(let w of obj[props.country as 'us' | 'uk'][props.category]) {
          newObj[w.name] = w.count;
        }

        return newObj;
      });
      setData(filtered);
      console.log("FILTER");
    }
  }, [props.data, props.country]);
  
  return (
    <div className='w-full py-10 font-mono'>
        <h2 className='text-2xl font-semibold mb-3'>{props.title}:</h2>
        
        {props.loading && <BarLoader className="mx-auto" color="#3B82F6" width={200}/> }
        {(!props.loading && !props.data) && <p className='text-lg text-center'>😕 Uh oh, missing data...</p>}
        {props.data && 
        <ResponsiveContainer width='98%' height={300} >
          <LineChart margin={{ top: 5, right: 40, left: 60, bottom: 5 }}
              data={data}
          >
              <CartesianGrid stroke={theme ? "#334155" : '#e2e8f0'} />
              <XAxis dataKey="date" stroke={theme ? '#9ca3af' : '#6b7280'} interval={1}/>
              <YAxis stroke={theme ? '#9ca3af' : '#6b7280'} />
              <Tooltip cursor={{ fill: `${theme ? '#1f2937' : '#e5e7eb'}` }} content={<CustomTooltip/>}/>
              <Legend verticalAlign="top" height={36}/>

              {props.selectedOptions.map((o: any, i: number) => <Line type="monotone" dataKey={o.name} stroke={COLORS[i]} strokeWidth={2} key={i}/>)}
          </LineChart >
        </ResponsiveContainer>}
    </div>
  )
}
