import React from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

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

export default function TrendChart(props: any) {
  return (
    <div className='w-full px-10 py-10 font-mono'>
        <h2 className='text-2xl text-white font-semibold mb-3'>{props.title}:</h2>
        <ResponsiveContainer width='99%'>
          {props.data.length > 0 ? 
          <LineChart layout='vertical' margin={{ top: 5, right: 5, left: 40, bottom: 5 }}
              data={props.data}
          >
              <XAxis type='number' stroke='#9ca3af'/>
              <YAxis type='category' dataKey="name" stroke='#9ca3af' tickMargin={5}/>
              <Tooltip cursor={{ fill: '#374151' }} content={<CustomTooltip />}/>
              <Line />
          </LineChart> :
          <p className='text-lg text-white text-center'>Uh oh, missing data...</p>
          }
        </ResponsiveContainer>
    </div>
  )
}
