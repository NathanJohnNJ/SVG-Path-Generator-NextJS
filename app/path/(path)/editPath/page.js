import InputPath from "@/components/forms/InputPath";
import Title from "@/components/layouts/title";
export default function EditPath() {
  return (
    <div className="flex flex-col items-center h-[64vh]">
      <Title title="Edit Path" />
      <InputPath />
    </div>
  );
}