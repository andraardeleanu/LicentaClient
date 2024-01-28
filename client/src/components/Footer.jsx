import { AppLogo } from './AppLogo';
import { LanguageSelector } from './LanguageSelector';

export const Footer = () => {
  return (
    <footer className='w-full h-36 p-6 flex items-center justify-between bg-zinc-50'>
      <div>
        <AppLogo />
      </div>
      <div>
        <LanguageSelector />
      </div>
    </footer>
  );
};
