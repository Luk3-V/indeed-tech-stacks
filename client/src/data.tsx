export const CATEGORIES = [
    {value: "frameworks", name: "π§± Frameworks"},
    {value: "languages", name: "π Languages"},
    {value: "tools", name: "π οΈ Tools"},
    {value: "jobtitles", name: "πΌ Job Titles"},
];
  
export const COUNTRIES = [
    {value: "us", name: "πΊπΈ US"},
    {value: "uk", name: "π¬π§ UK"}
];

export interface Keyword {
    name: string,
    count: number
}
export interface Data {
    date: Date,
    'us': {
      [key: string]: Keyword[]
    },
    'uk': {
      [key: string]: Keyword[]
    }
}