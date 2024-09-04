'use client';
import InputPath from "@/components/forms/InputPath";
import Title from "@/components/layouts/title";
import { path } from "@/lib/store";
import { useSnapshot, subscribe } from "valtio";
import { useState } from "react";
import localforage from "localforage";
export default function EditPath() {
  const snap = useSnapshot(path.commands);
  const [sub, setSub] = useState();
subscribe(path, ()=>{
  localforage.setItem("path", snap);
  console.log('path updated: ', path)
});

  return (
    <div className="flex flex-col items-center h-[64vh]">
      <Title title="Edit Path" />
      <div className=" flex flex-row items-center p-4">
        {}
        <InputPath />
      </div>
    </div>
  );
}