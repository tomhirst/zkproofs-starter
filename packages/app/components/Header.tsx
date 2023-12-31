import Logo from '@/components/Logo';
import Wrapper from '@/components/Wrapper';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => (
  <header className="bg-black text-white h-20 border-b">
    <Wrapper withJustifyBetween withItemsCenter>
      <Logo />
      <ConnectButton />
    </Wrapper>
  </header>
);

export default Header;
