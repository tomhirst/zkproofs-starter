import Wrapper from '@/components/Wrapper';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <main className="bg-white dark:bg-black dark:text-white py-12">
    <Wrapper>{children}</Wrapper>
  </main>
);

export default PageWrapper;
