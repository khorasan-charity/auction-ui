import Image from "next/image";

interface LogoProps {}

const Brand: React.FC<LogoProps> = () => {
  return (
    <div className="w-12 h-12">
      <Image
        src="/logo.png"
        alt="logo"
        title="logo"
        className="w-full h-full object-cover"
        width={100}
        height={100}
        priority
      />
    </div>
  );
};

export default Brand;
