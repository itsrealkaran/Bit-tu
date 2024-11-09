export const StickyWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="hidden lg:block w-[368px] sticky top-[20px] h-fit">
        {children}
      </div>
    );
  };