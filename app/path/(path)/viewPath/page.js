'use client'
import MainPanel from "@/components/ui/panels/MainPanel";
import { useSearchParams } from "next/navigation";

const ViewPath = () => {
  function SearchBar() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    return <>Search: {search}</>
  }
  return (     
      <MainPanel>
        <SearchBar />
      </MainPanel>
  );
};

export default ViewPath;