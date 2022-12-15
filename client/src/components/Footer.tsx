import React from 'react'

export default function Footer() {
  return (
    <>
        <div className='text-gray-600 dark:text-gray-400 text-md'>
            <div className='p-5 bg-gray-100 dark:bg-gray-900 border border-gray-400 dark:border-gray-600'>
              <p>This website ranks trending tech stacks & other keywords based on <a className='text-blue-700 dark:text-white hover:underline' href="https://www.indeed.com/" target="_blank">Indeed</a> job listings. (Currently US only)</p>
              <p>May not include all job listings that relate to the keywords.</p>
              <p>Updated daily @ 12 AM CST.</p>
              <br/>
              <p>Any suggestions? DM me on twitter! <a className='text-blue-700 dark:text-white hover:underline' href="https://twitter.com/lukevluke_" target="_blank">@lukevluke_</a></p>
              <br/>
              <h3 className='text-xl font-semibold'>Coming Soon:</h3>
              <p>🔷 Keyword trend graph.</p>
              <p>🔷 More categories & keywords.</p>
              <p>🔷 Other job boards</p>
            </div>
        </div>

        <div className="h-28"></div>
        <div className="flex mt-10 py-10 w-full absolute bottom-0">
            <a
              href="https://www.luke-v.com"
              target="_blank"
              className='text-blue-700 dark:text-white mx-auto font-semibold hover:underline'
            >
              Made by Luke V 😎
            </a>
        </div>
    </>
  )
}
