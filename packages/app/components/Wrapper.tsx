const Wrapper = ({
  children,
  withJustifyBetween,
  withItemsCenter,
}: {
  children: React.ReactNode;
  withJustifyBetween?: boolean;
  withItemsCenter?: boolean;
}) => (
  <div className={`max-w-6xl mx-auto h-full w-full px-4 ${withJustifyBetween ? `flex` : ``}`}>
    {withJustifyBetween ? (
      <div
        className={`h-full w-full flex justify-between ${withItemsCenter ? `items-center` : ``}`}
      >
        {children}
      </div>
    ) : (
      <>{children}</>
    )}
  </div>
);

export default Wrapper;
