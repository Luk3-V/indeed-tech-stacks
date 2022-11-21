import React, { useContext, useEffect, useState } from 'react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar, LabelList } from 'recharts';
import { ThemeContext } from '../App';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 rounded-sm text-white p-2 px-3 bg-opacity-70">
        <p>{label}</p>
        <p><span className='inline-block h-3 w-3 bg-blue-500 mr-2'></span>{`${payload[0].value} Jobs`}</p>
      </div>
    );
  }

  return null;
};

export default function RankingChart(props: any) {
  const [height, setHeight] = useState(0);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    
    console.log("MOUNT" + props.data?.length);
  }, []);

  useEffect(() => {
    if(props.data) {
      setHeight(40*props.data.length);

      props.data.sort((a: any, b: any) => b.count - a.count);
    }
    else
      setHeight(0);

    console.log("UPDATE"+ props.data?.length);
  }, [props]);

  return (
    <div className='w-full px-3 md:px-10 py-10 font-mono'>
        <h2 className='text-2xl font-semibold mb-3'>{props.title}:</h2>

        {props.data?.length === 0 ? 
        <p className='text-lg text-center'>Uh oh, missing data...</p> 
        :
        <ResponsiveContainer width='98%' height={height}>
          <BarChart layout='vertical' margin={{ top: 5, right: 40, left: 60, bottom: 5 }}
              data={props.data}
          >
              <XAxis type='number' stroke={theme ? '#9ca3af' : '#6b7280'} domain={[0, (dataMax: number) => Math.round((dataMax*1.10)/100) * 100]}/>
              <YAxis type='category' dataKey="name" stroke={theme ? '#9ca3af' : '#6b7280'} tick={{ fill: `${theme ? 'white' : 'black'}` }} tickMargin={5}/>
              <Tooltip cursor={{ fill: `${theme ? '#1f2937' : '#e5e7eb'}` }} content={<CustomTooltip />}/>
              <Bar dataKey="count" fill="#3b82f6" radius={[0, 3, 3, 0]}>
              <LabelList dataKey="count" position="right" fill={theme ? "#93c5fd" : "#1d4ed8"}/>
              </Bar>
          </BarChart>
        </ResponsiveContainer>
        }
    </div>
  )
}
