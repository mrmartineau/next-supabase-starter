'use client';

import { CONTENT, ROUTES } from '@/src/constants';
import { Gauge, RocketLaunch, UserCircle } from '@phosphor-icons/react';
import { useRef } from 'react';
import { useClickAway } from 'use-click-away';

import { useSidebar } from '../hooks/useSidebar';
import { DbMetaResponse } from '../utils/fetching/meta';
import { Flex } from './Flex';
import { Link } from './Link';
import LogoutButton from './LogoutButton';
import './Sidebar.css';
import { SidebarLink } from './SidebarLink';

interface SidebarProps {
  serverDbMeta: DbMetaResponse;
  version?: string;
  repo?: string;
}

export const Sidebar = ({ serverDbMeta, version, repo }: SidebarProps) => {
  const { handleCloseSidebar } = useSidebar();
  const dbMeta = serverDbMeta;

  const sidebarRef = useRef(null);
  useClickAway(sidebarRef, (event: Event) => {
    const navButton = document.querySelector('[data-testid="navButton"]');
    if (event.target !== navButton) {
      handleCloseSidebar();
    }
  });

  return (
    <div className="otter-sidebar-pane" ref={sidebarRef}>
      <div>
        <div className="sidebar-top">
          <Link href={ROUTES.HOME} variant="logo">
            {/* <img src="/otter-logo.svg" width="33" height="33" /> */}
            <div>{CONTENT.appName}</div>
          </Link>
        </div>
        <Flex gapY="3xs" direction="column">
          <SidebarLink href={ROUTES.DASHBOARD}>
            <Gauge aria-label="Dashboard" size={18} weight="duotone" />
            {CONTENT.dashboardNav}
          </SidebarLink>
        </Flex>
      </div>

      <Flex gapY="3xs" direction="column" className="mt-s">
        <SidebarLink href={ROUTES.SETTINGS_ACCOUNT} activePath="settings">
          <UserCircle aria-label="Settings" size={18} weight="duotone" />
          {CONTENT.settingsNav}
        </SidebarLink>
        <LogoutButton />
        <SidebarLink href={`${repo}/releases/tag/v${version}`}>
          <RocketLaunch aria-label="Trash" size={18} weight="duotone" />
          App {version}
        </SidebarLink>
      </Flex>
    </div>
  );
};
