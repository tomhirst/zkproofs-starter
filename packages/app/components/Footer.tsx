import Wrapper from './Wrapper';
import config from '@/site.config';

const Footer = () => (
  <footer className="py-12 bg-neutral-100">
    <Wrapper>
      &copy; {new Date().getFullYear()} {config.siteTitle}
    </Wrapper>
  </footer>
);

export default Footer;
