import { ReactNode } from 'react';
import { Button as ButtonChakra, ButtonProps } from '@chakra-ui/react';

type ButtonT = ButtonProps & {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};

const Button: React.FC<ButtonT> = ({ variant = 'primary', children, ...props }) => {
  const variantProps: ButtonProps =
    variant === 'primary'
      ? {
          bg: 'brand.medium',
          color: 'white',
          _hover: {
            bg: 'brand.light',
            color: 'white',
          },
          _active: {
            boxShadow: 'none',
          },
          _focus: {
            boxShadow: 'none',
          },
        }
      : {};

  return (
    <ButtonChakra
      width="170px"
      height="48px"
      padding="12px 46px"
      borderRadius="24px"
      boxShadow="none"
      {...variantProps}
      {...props}
    >
      {children}
    </ButtonChakra>
  );
};

export default Button;
