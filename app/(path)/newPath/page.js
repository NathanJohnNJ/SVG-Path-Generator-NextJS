// This must contain the mongo db calls using async/await and then import any components that need the 'use client' header, but those individual files cannot contain async/await
import ChoosePath from "@/components/ui/choosePath";
import Title from "@/components/layouts/title";
import { getAllConfig } from "@/lib/mongodb/config/mongodb";

export default async function NewPath() {
  const config = await getAllConfig();

  return (
  <div>
    <Title title="New Path"/>
    <ChoosePath config={config}/>
  </div>
  );
}