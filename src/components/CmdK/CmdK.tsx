'use client';

import { Button } from '@/src/components/Button';
import { useToggle } from '@/src/hooks/useToggle';
import { Tweet } from '@/src/types/db';
import { DbMetaResponse } from '@/src/utils/fetching/meta';
import {
  ArrowElbowDownLeft,
  Gauge,
  Gear,
  ListBullets,
  MagnifyingGlass,
  PlusCircle,
} from '@phosphor-icons/react';
import { Command } from 'cmdk';
import throttle from 'lodash.throttle';
import {
  DispatchWithoutAction,
  createContext,
  useEffect,
  useState,
} from 'react';

import { ROUTES } from '../../constants';
import { ApiResponse } from '../../types/api';
import { Flex } from '../Flex';
import './CmdK.css';
import { AccessoryModel, Item } from './Item';

export type TweetSearchResponse = ApiResponse<Tweet[]>;

export interface CmdKContextInterface {
  toggleOpen: DispatchWithoutAction;
}
export const CmdKContext = createContext<CmdKContextInterface>(
  {} as CmdKContextInterface,
);

const sharedAccessories: AccessoryModel[] = [
  {
    Icon: <ArrowElbowDownLeft aria-label="Go" className="actionIcon" />,
  },
];

interface CmdKProps {
  serverDbMeta: DbMetaResponse;
}
export const CmdK = ({ serverDbMeta }: CmdKProps) => {
  const [open, toggleOpen, setOpen] = useToggle(false);
  const [searchTerm, setSearchTerm] = useState('');

  const throttledMutate = throttle(async (value: string) => {
    console.log('searching', value);
    // await fetchSearch(value).then((data) => {
    //   console.log('search results', data);
    // });
  }, 1000);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        toggleOpen();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggleOpen]);

  useEffect(() => {
    if (!open) {
      setSearchTerm('');
    }
  }, [open]);

  return (
    <>
      <Button
        variant="cmdk"
        aria-label="Search Otter"
        onClick={toggleOpen}
        className="h-10"
      >
        <MagnifyingGlass weight="duotone" size="25" />
        Search
        <Flex align="center" justify="center" className="cmdk-button-label">
          CMD+K
        </Flex>
      </Button>
      <Command.Dialog
        className="cmdk-dialog"
        open={open}
        onOpenChange={setOpen}
        label="Search"
        onKeyDown={(event) => {
          // Escape clears searchTerm if there
          if (event.key === 'Escape' && searchTerm.length) {
            event.preventDefault();
            setSearchTerm('');
          }
        }}
      >
        <Command.Input
          className="cmdk-input"
          value={searchTerm}
          onValueChange={(value) => {
            setSearchTerm(value);
            throttledMutate(value);
          }}
          placeholder="What do you need?"
        />
        <CmdKContext.Provider value={{ toggleOpen }}>
          <Command.List className="cmdk-list">
            <Command.Empty className="cmdk-empty">
              🙁 No results found.
            </Command.Empty>

            {/* Navigation */}
            <Command.Group className="cmdk-group" heading="Navigation">
              <Item
                to={ROUTES.NEW}
                value="Add new bookmark"
                image={<PlusCircle weight="duotone" aria-label="New" />}
                accessories={sharedAccessories}
              >
                Add new item
              </Item>
              <Item
                to={ROUTES.DASHBOARD}
                value="Dashboard"
                image={<Gauge weight="duotone" aria-label="Dashboard" />}
                accessories={sharedAccessories}
              >
                Dashboard
              </Item>
              <Item
                to={ROUTES.FEED}
                value="All"
                image={<ListBullets weight="duotone" aria-label="All" />}
                accessories={sharedAccessories}
              >
                All items
              </Item>
              <Item
                to={ROUTES.SETTINGS_ACCOUNT}
                value="Settings"
                image={<Gear weight="duotone" aria-label="Settings" />}
                accessories={sharedAccessories}
              >
                Settings
              </Item>
            </Command.Group>
          </Command.List>
        </CmdKContext.Provider>
      </Command.Dialog>
    </>
  );
};
