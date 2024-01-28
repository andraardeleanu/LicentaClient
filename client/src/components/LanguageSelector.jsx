import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';

export const LanguageSelector = () => {
  const { t: i18actions, i18n } = useTranslation('actions');
  const { t: i18languages } = useTranslation('languages');

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Menu placement='bottom'>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        <div className='flex items-center gap-2'>
          <Flag
            className='w-5 h-5'
            code={i18n.language === 'en' ? 'us' : i18n.language}
          />
          {i18actions('changeLanguage')}
        </div>
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            changeLanguage('us');
          }}
        >
          {i18languages('english')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeLanguage('ro');
          }}
        >
          {i18languages('romanian')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
