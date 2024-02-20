import { twMerge } from "tailwind-merge";

type BoxProp = React.HtmlHTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  className?: string;
};

interface BoxProps extends React.FC<BoxProp> {
  Body: React.FC<BoxProp>;
  Header: React.FC<BoxProp>;
  Title: React.FC<BoxProp>;
}

const HeaderBox = ({ children, className = "", ...args }: BoxProp) => {
  return (
    <div
      className={twMerge("flex justify-between items-center gap-2", className)}
      {...args}
    >
      {children}
    </div>
  );
};

const TitleBox = ({ children, className = "", ...args }: BoxProp) => {
  return (
    <div
      className={twMerge(
        "flex justify-center w-fit items-center gap-2",
        className
      )}
      {...args}
    >
      <span className="rounded-full w-1.5 h-1.5 md:w-2 md:h-2 transition-all bg-secondary-600 dark:bg-secondary-500" />
      <strong className="text-base md:text-lg xl:text-xl text-secondary-600 dark:text-secondary-500 transition-colors font-bold">
        {children}
      </strong>
    </div>
  );
};

const BodyBox = ({ children, className = "", ...args }: BoxProp) => {
  return (
    <div className={twMerge("w-full mt-4 lg:mt-7", className)} {...args}>
      {children}
    </div>
  );
};

const Box: BoxProps = ({ children, className, ...args }: BoxProp) => {
  return (
    <div
      className={twMerge(
        "px-5 py-4 w-full bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 transition-all duration-400 rounded-xl",
        className
      )}
      {...args}
    >
      {children}
    </div>
  );
};

Box.Body = BodyBox;
Box.Title = TitleBox;
Box.Header = HeaderBox;

export default Box;
