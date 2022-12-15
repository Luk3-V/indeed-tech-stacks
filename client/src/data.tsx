export const CATEGORIES = [
    {value: "frameworks", name: "🧱 Frameworks"},
    {value: "languages", name: "📖 Languages"},
    {value: "tools", name: "🛠️ Tools"},
    {value: "jobtitles", name: "💼 Job Titles"},
];
  
export const COUNTRIES = [
    {value: "us", name: "🇺🇸 US"},
    {value: "uk", name: "🇬🇧 UK"}
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