// This must contain the mongo db calls using async/await and then import any components that need the 'use client' header, but those individual files cannot contain async/await
import ChoosePath from "@/components/ui/choosePath";
import Title from "@/components/layouts/title";
import { fill, stroke, control, end } from '@/lib/store'


export default async function NewPath() {

  return (
  <div>
    <Title title="New Path"/>
    <ChoosePath stroke={stroke} fill={fill} control={control} end={end}/>
  </div>
  );
}