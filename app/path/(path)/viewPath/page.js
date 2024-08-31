import { fullPath } from "@/lib/utils";
import MainPanel from "@/components/ui/panels/MainPanel";
import { path } from "@/lib/store";

const ViewPath = () => {
  return (     
      <MainPanel path={path.commands} fullPath={fullPath}>
      </MainPanel>
  );
};

export default ViewPath;