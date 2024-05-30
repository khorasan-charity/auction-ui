import Box from "@/ui/Box";
import Brand from "@/ui/Brand";
import ToggleDarkMode from "@/ui/ToggleDarkMode";

interface SubjectHeaderProps {}

const SubjectHeader: React.FC<SubjectHeaderProps> = () => {
  return (
    <Box>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brand />

          <strong className="text-lg lg:text-xl font-bold truncate line-clamp-1">
            موسسه حمایت از کودکان مبتلا به سرطان خراسان
          </strong>
        </div>

        <ToggleDarkMode />
      </div>
    </Box>
  );
};

export default SubjectHeader;
