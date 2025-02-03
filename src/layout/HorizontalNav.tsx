import { Box, Group, Text } from '@mantine/core';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '../components/ConnectButton';
import { useUserData } from '../hooks/useUserData';
import { useAccount } from 'wagmi';

const publicItems = [
  {
    label: 'Ships',
    url: '/ships',
  },
  {
    label: 'Applications',
    url: '/applications',
  },
  // {
  //   label: 'Elections',
  //   url: '/elections',
  // },
  {
    label: 'Reviews',
    url: '/reviews',
  },
];

export const HorizontalNav = () => {
  const location = useLocation();
  const { userData } = useUserData();
  const { address } = useAccount();

  const { isJudge, isAdmin, hasApplications } = userData || {};
  console.log('isJudge', isJudge);
  console.log('isAdmin', isAdmin);
  console.log('hasApplications', hasApplications);
  const navItems = useMemo(() => {
    let items = [...publicItems];
    if (isAdmin) {
      items.push({ label: 'Dashboard', url: '/admin-dashboard' });
    }

    if (isJudge) {
      items.push({ label: 'Dashboard', url: '/judge-dashboard ' });
    }

    if (hasApplications) {
      items.push({
        label: 'My Application',
        url: `/my-applications/${address}`,
      });
    }

    return items;
  }, [isJudge, isAdmin, hasApplications]);

  return (
    <Group ml={40} mt={36} gap="xl">
      <Link to="/">
        <Text fz={28} variant="label" mr={10}>
          GrantShips
        </Text>
      </Link>
      {navItems.map((item) => (
        <Link key={item.label} to={item.url}>
          <Text
            variant="label"
            fw={location.pathname === item.url ? 600 : 600}
            c={location.pathname === item.url ? undefined : 'subtle'}
          >
            {item.label}
          </Text>
        </Link>
      ))}
      <Box ml="auto" mr="xl">
        <ConnectButton />
      </Box>
    </Group>
  );
};
