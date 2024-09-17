'use client';
import { useEffect } from 'react';
import MainPanel from "@/components/ui/panels/MainPanel";
import { setPath, setStartX, setStartY } from "@/lib/store";
const ViewPath = () => {

  useEffect(() => {
    let storedValue = localStorage.getItem('path');
    if (storedValue) {
      storedValue = JSON.parse(storedValue) || {}
      const startPoint = storedValue.startPoint || {}
      const commands = storedValue.commands || []
      setPath(commands);
      setStartX(startPoint.x);
      setStartY(startPoint.y);
    }
  }, [])
  return (     
      <MainPanel />
  );
};

export default ViewPath;