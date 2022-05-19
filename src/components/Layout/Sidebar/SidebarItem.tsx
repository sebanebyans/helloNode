import Link from 'next/link';
import React, { FC, ReactText } from 'react';
import { Flex, Icon, FlexProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type SidebarItemT = FlexProps & {
  icon: IconType;
  children: ReactText;
  href: string;
  active: boolean;
};

const SidebarItem: FC<SidebarItemT> = ({ icon, children, href, active, ...rest }) => {
  return (
    // eslint-disable-next-line @next/next/link-passhref
    <Link href={href}>
      <Flex
        align="center"
        p="4"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'brand.medium',
          color: 'white',
        }}
        sx={{
          '&.active': {
            bg: 'brand.medium',
            color: 'white',
          },
        }}
        className={active ? 'active' : ''}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default SidebarItem;
