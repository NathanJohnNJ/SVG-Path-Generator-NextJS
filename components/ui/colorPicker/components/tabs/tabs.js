'use client';
import { motion } from "framer-motion";

const Tabs = (props) => {
  const { tabs, selectedTab, setSelectedTab } = props;
  return(
    <div className="flex gap-2">
      {tabs.map((tab,i) => {
        return(
        <div key={i} className="relative h-5 w-full flex justify-center items-center">
          <button onClick={() => setSelectedTab(tab)} className={`text-xs transition-colors ${selectedTab === tab ? 'text-slate-100' : 'text-slate-600'}`}>
            {tab}
          </button>
          {selectedTab === tab && (
            <motion.div
            transition={{ type: 'spring', duration: 0.3, bounce: 0.2 }}
            layoutId="underline"
            className="absolute top-0 left-0 h-full w-full border border-slate-700 bg-slate-800 -z-10 rounded-lg" />
          )}
        </div>)
      })}
    </div>
  )
};
export default Tabs;