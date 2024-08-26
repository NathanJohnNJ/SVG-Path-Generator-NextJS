// This must contain the mongo db calls using async/await and then import any components that need the 'use client' header, but those individual files cannot contain async/await
import ChoosePath from "@/components/ui/choosePath";
import Title from "@/components/layouts/title";
import { getConfig } from "@/lib/mongodb/config/mongodb";
import { deletePath } from "@/lib/mongodb/path/mongodb";

export default async function NewPath() {
  await deletePath()
  const stroke = await getConfig('stroke');
  const fill = await getConfig('fill');
  const control = await getConfig('control');
  const end = await getConfig('end');

  return (
  <div>
    <Title title="New Path"/>
    <ChoosePath stroke={stroke} fill={fill} control={control} end={end}/>
  </div>
  );
}