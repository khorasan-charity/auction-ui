import Box from "@/ui/Box";
import Brand from "@/ui/Brand";
import ToggleDarkMode from "@/ui/ToggleDarkMode";

interface SubjectHeaderProps {}

const SubjectHeader: React.FC<SubjectHeaderProps> = () => {
  return (
    <Box className="w-full sticky top-0 inset-y-0 z-50">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brand />

          <strong className="text-xl font-bold">
            موسسه حمایت از کودکان مبتال به سرطان خراسان
          </strong>
        </div>

        <ToggleDarkMode />
      </div>
    </Box>
  );
};

export default SubjectHeader;
