import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../react-tabs.css';

export default function Nav() {
    const navigate = useNavigate();

    return (
        <div className='mt-10'>
            <Tabs defaultIndex={location.pathname==='/' ? 0 : 1} onSelect={(i) => i===0 ? navigate('/') : navigate('/trends')}>
                <TabList>
                    <Tab><span className="text-2xl mx-1"><span className='text-xl'>🏆</span> Rankings</span></Tab>
                    <Tab><span className="text-2xl mx-1"><span className='text-xl'>⌛</span> Trends</span></Tab>
                </TabList>
            </Tabs>
        </div>
    )
}
