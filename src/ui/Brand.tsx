interface LogoProps {}

const Brand: React.FC<LogoProps> = () => {
  return (
    <div className="w-12 h-12">
      <img
        src="/logo.png"
        alt="logo"
        title="logo"
        className="w-full h-full object-cover"
        width={100}
        height={100}
      />
    </div>
  );
};

export default Brand;
