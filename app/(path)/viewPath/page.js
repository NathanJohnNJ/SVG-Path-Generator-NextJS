import { fullPath, absolutePath } from "@/lib/utils";
import { getPath } from "@/lib/mongodb/path/mongodb";
import { getConfig } from "@/lib/mongodb/config/mongodb";
import MainPanel from "@/components/ui/panels/MainPanel";
import Container from "@/components/layouts/Container";
import Link from "next/link";
import { RainbowButton } from "@/components/ui/panels/RainbowPanel";

const path = await getPath();
  const stroke = await getConfig('stroke');
  const fill = await getConfig('fill');
  const control = await getConfig('control');
  const end = await getConfig('end');
  const ViewPath = () => {
  
  return (
  // path.length<1?
  // <div>
  //   <p className="text-center">
  //     You need to create a path first before you can view it. Use the buttons below to either create a new path, or edit an existing one.
  //   </p>
  //   <div className="flex w-full flex items-center justify-center">
  //     <RainbowButton>
  //       <Link
  //       href='newPath'
  //       className="rounded-lg border border-transparent px-5 transition-colors text-center pl-0"
  //       >

  //       <p className="text-center h-0 flex">
  //         New
  //       </p>
  //       </Link>
  //     </RainbowButton>
  //     <RainbowButton className="flex items-center justify-center">
  //       <Link
  //       href='editPath'
  //       className="rounded-lg border border-transparent px-5 transition-colors text-center pl-0 "
  //       >
  //         <p className="text-center h-0 flex justify-self-center self-center">
  //         edit
  //       </p>
  //       </Link>
  //     </RainbowButton>
  //   </div>
  // </div>
  // :
    <Container className="flex flex-row justify-center items-center">
      <MainPanel path={path} fill={fill} stroke={stroke} control={control} end={end} fullPath={fullPath}>
      <h2 className="text-[9.5px] hover:text-sm text-blue-600 bg-neutral-50 rounded-2xl p-1 border-slate-600 border-2 m-1">Full Relative Path: {fullPath}</h2>
      <h2 className="text-[9.5px] hover:text-sm  text-blue-600 bg-neutral-50 rounded-2xl p-1 border-slate-600 border-2 m-1">Full Absolute Path: {absolutePath}</h2>
      </MainPanel>
    </Container>
  );
};

export default ViewPath;