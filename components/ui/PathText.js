import { fullPath, absolutePath } from "@/lib/utils";

const PathText = () => {
  return (
    <div className="flex flex-column text-left">
      <h2 className="text-[9.5px] hover:text-sm text-blue-600 bg-neutral-50 rounded-2xl p-1 border-slate-600 border-2 m-1">Full Relative Path: {fullPath}</h2>
      <h2 className="text-[9.5px] hover:text-sm  text-blue-600 bg-neutral-50 rounded-2xl p-1 border-slate-600 border-2 m-1">Full Absolute Path: {absolutePath}</h2>
    </div>
  )
}