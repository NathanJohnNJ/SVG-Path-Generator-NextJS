import { fullPath, absolutePath } from "@/lib/utils";
import { getPath } from "@/lib/mongodb/path/mongodb";
import { getConfig } from "@/lib/mongodb/config/mongodb";
import Title from "@/components/layouts/title";
import MainPanel from "@/components/ui/panels/MainPanel";
import Container from "@/components/layouts/Container";

const ViewPath = async () => {
  const path = await getPath();
  const stroke = await getConfig('stroke');
  const fill = await getConfig('fill');
  const control = await getConfig('control');
  const end = await getConfig('end');

  return (
    <Container className="flex flex-row justify-center items-center">
      <Title title="Path" />
      <MainPanel path={path} fill={fill} stroke={stroke} control={control} end={end} fullPath={fullPath}>
      <h2 className="text-[9.5px] hover:text-sm text-blue-600 bg-neutral-50 rounded-2xl p-1 border-slate-600 border-2 m-1">Full Relative Path: {fullPath}</h2>
      <h2 className="text-[9.5px] hover:text-sm  text-blue-600 bg-neutral-50 rounded-2xl p-1 border-slate-600 border-2 m-1">Full Absolute Path: {absolutePath}</h2>
      </MainPanel>
    </Container>
  );
};

export default ViewPath;