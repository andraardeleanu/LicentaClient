import { twMerge } from 'tailwind-merge';

export const Container = ({ children, size = 100 }) => {
  return (
    <div className='flex justify-center w-full'>
      <div
        className={twMerge(
          'px-4 lg:px-6 pt-20 lg:pt-20 w-full',
          size === 75
            ? 'lg:w-3/4'
            : size === 50
            ? 'lg:w-1/2'
            : size === 33
            ? 'lg:w-1/3'
            : ''
        )}
      >
        {children}
      </div>
    </div>
  );
};
