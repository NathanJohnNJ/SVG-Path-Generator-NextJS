'use client'
import MainPanel from "@/components/ui/panels/MainPanel";
import { useSearchParams } from "next/navigation";
import { path } from "@/lib/store";
import { useSnapshot, subscribe } from "valtio";
const ViewPath = () => {
  const snap = useSnapshot(path)
  function SearchBar() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    return <p>Search: {search}</p>
  }
  return (     
      <MainPanel>
        <SearchBar className="bg-black w-full h-full" />
      </MainPanel>
  );
};

export default ViewPath;