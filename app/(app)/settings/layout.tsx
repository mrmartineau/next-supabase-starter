import { Flex } from '@/src/components/Flex';
import { headingVariants } from '@/src/components/Heading';
import { SidebarLink } from '@/src/components/SidebarLink';
import { CONTENT } from '@/src/constants';
import { Gear, UserCircle } from '@phosphor-icons/react/dist/ssr';
import { ReactNode } from 'react';

export interface SettingsLayoutProps {
  children: ReactNode;
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  return (
    <>
      <h3 className={headingVariants({ variant: 'feedTitle' })}>
        <Flex align="center" gap="xs">
          <Gear weight="duotone" size={24} />
          {CONTENT.accountSettingsTitle}
        </Flex>
      </h3>

      <Flex align="center" gapX="2xs" className="my-s">
        <SidebarLink href="/settings/account">
          <UserCircle weight="duotone" size={18} />
          Account
        </SidebarLink>
      </Flex>
      {children}
    </>
  );
}
