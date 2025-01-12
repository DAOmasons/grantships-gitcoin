import { Box, Button, Group, Text } from '@mantine/core';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '../components/ConnectButton';

export const HorizontalNav = () => {
  const location = useLocation();

  const navItems = [
    {
      label: 'Elections',
      url: '/elections',
    },
    {
      label: 'Applications',
      url: '/applications',
    },
    {
      label: 'Reviews',
      url: '/reviews',
    },
    {
      label: 'Dashboard',
      url: '/dashboard',
    },
  ];

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
            fw={location.pathname === item.url ? 600 : 500}
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
