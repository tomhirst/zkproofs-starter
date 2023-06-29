import Link from 'next/link';
import config from '@/site.config';

const Logo = () => (
  <Link href="/">
    <div className="text-2xl font-bold">{config.siteTitle}</div>
  </Link>
);

export default Logo;
