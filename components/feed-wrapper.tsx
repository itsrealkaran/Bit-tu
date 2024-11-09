export const FeedWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex-1 max-w-[688px]">
        {children}
      </div>
    );
  };