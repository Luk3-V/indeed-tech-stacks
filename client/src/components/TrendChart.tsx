import React, { useContext, useEffect, useRef, useState } from 'react'
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

const CustomDot = ({ cx, cy, stroke, payload, value }: any) => {
    return (
      <svg x={cx - 4} y={cy - 4} width={8} height={8} fill={stroke}>
        <g transform="translate(4 4)">
          <circle r="3" fill={stroke} />
        </g>
      </svg>
    );
};

export default function TrendChart(props: any) {
  const [data, setData] = useState<Data[]>([]);
  const theme = useContext(ThemeContext);
  // const interval = useRef(0);
  // const [test, setTest] = useState(0); // FIX RE-RENDER INTERVAL BUG

  // function handleResize() {
  //   if(window.innerWidth < 768 && interval.current===0) {
  //     interval.current = 1;
  //     setTest(1);
  //     console.log(window.innerWidth, (data.length * 64))
  //   }
  //   else if(window.innerWidth >= 768 && interval.current===1){
  //     interval.current = 0;
  //     setTest(0);
  //   }
  // }

  useEffect(() => {
    console.log("MOUNT"+props.data?.length);
    // handleResize();
    // window.addEventListener("resize", handleResize);

    // return () => window.removeEventListener("resize", handleResize);
  }, [])

  useEffect(() => {    
    if(props.data) {
      let formatted = props.data.map((obj: Data) => {
        let newObj : { [key: string]: any } = {
          date: new Date(obj.date).toLocaleDateString("en-US", {month: '2-digit', day: '2-digit'})
        };
        
        for(let w of obj[props.country as 'us' | 'uk'][props.category]) {
          newObj[w.name] = w.count;
        }

        return newObj;
      });

      //let filtered = getFilteredData(formatted);

      setData(formatted);
      console.log("FILTER");
    }
  }, [props.data, props.country]);
  
  return (
    <div className='w-full py-10 font-mono'>
        <h2 className='text-2xl font-semibold mb-3'>{props.title}:</h2>
        
        {props.loading && <BarLoader className="mx-auto" color="#3B82F6" width={200}/> }
        {(!props.loading && !props.data) && <p className='text-lg text-center'>😕 Uh oh, missing data...</p>}
        {props.data && 
        <ResponsiveContainer width='98%' height={320} debounce={20}>
          <LineChart margin={{ top: 5, right: 40, left: 5, bottom: 5 }}
              data={data}
          >
              <CartesianGrid stroke={theme ? "#334155" : '#e2e8f0'} />
              <XAxis dataKey="date" stroke={theme ? '#9ca3af' : '#6b7280'}  angle={-35} height={40} tickMargin={15}/>
              <YAxis stroke={theme ? '#9ca3af' : '#6b7280'} />
              <Tooltip cursor={{ fill: `${theme ? '#1f2937' : '#e5e7eb'}` }} content={<CustomTooltip/>} wrapperStyle={{ outline:'none', border:'none'}}/>
              <Legend verticalAlign="top" height={36}/>

              {props.selectedOptions.map((o: any, i: number) => <Line connectNulls type="linear" dataKey={o.name} stroke={COLORS[i]} strokeWidth={2} key={i} dot={false} animationDuration={1000}/>)}
          </LineChart >
        </ResponsiveContainer>}
    </div>
  )
}

// Average out data by interval
function getFilteredData(arr: Data[], num: number) {
  let weekly = []

  for(let i=0; i<arr.length; i++) {
    let averagedData

    while(arr[i]){

    }
  }
}