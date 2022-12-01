import { useContext, useState } from "react";
import { ThemeContext } from "../App";

export default function Toggle(props: any) {
    const theme = useContext(ThemeContext);

    return (
        <div className="relative flex flex-col items-center justify-center">
            <div className="flex items-center">
                <span className="mr-2 text-sm font-medium">
                    {theme ? "Dark" : "Light"} Mode
                </span>
                <div className="inline-flex relative items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={theme}
                        readOnly
                    />
                    <div
                        onClick={() => {
                            props.onClick();
                        }}
                        className="w-14 h-7 border rounded-full border-gray-600 dark:border-gray-400 bg-gray-100 peer peer-focus:ring-gray-300 peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] dark:after:bg-white after:bg-gray-600 peer-checked:bg-slate-800 after:rounded-full after:h-5 after:w-5 after:transition-all "
                    ></div>
                </div>
            </div>
        </div>
    );
}