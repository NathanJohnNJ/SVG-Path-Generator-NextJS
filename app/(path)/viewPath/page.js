import { fullPath } from "@/lib/utils";
import { getPath } from "@/lib/mongodb/path/mongodb";
import { getConfig } from "@/lib/mongodb/config/mongodb";
import MainPanel from "@/components/ui/panels/MainPanel";

const path = await getPath();
const stroke = await getConfig('stroke');
const fill = await getConfig('fill');
const control = await getConfig('control');
const end = await getConfig('end');

const ViewPath = () => {
  return (     
      <MainPanel path={path} fill={fill} stroke={stroke} control={control} end={end} fullPath={fullPath}>
      </MainPanel>
  );
};

export default ViewPath;