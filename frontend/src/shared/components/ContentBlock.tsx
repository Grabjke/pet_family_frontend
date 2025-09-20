import type { Props } from "./RootLayout";

export const ContentBlock = (props: Props) => {
  return (
    <div
      className="w-full bg-white rounded-xl flex-1 
                    shadow-lg shadow-amber-100/50 
                    border border-amber-100 
                    transition-all duration-300 
                    hover:shadow-xl hover:shadow-amber-200/40"
    >
      {props.children}
    </div>
  );
};
