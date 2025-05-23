import {
  Box,
  Burger,
  Drawer,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ConnectButton } from '../components/ConnectButton';
import { useUserData } from '../hooks/useUserData';
import { useAccount } from 'wagmi';
import { useLaptop, useTablet } from '../hooks/useBreakpoints';
import { useDisclosure } from '@mantine/hooks';
import fxClasses from '../style/effects.module.css';

const publicItems = [
  {
    label: 'Ships',
    url: '/ships',
  },
  {
    label: 'Applications',
    url: '/applications',
  },
  {
    label: 'Vote',
    url: '/vote',
  },
];

export const Nav = () => {
  const location = useLocation();
  const { userData } = useUserData();
  const { address } = useAccount();
  const isLaptop = useLaptop();
  const isTablet = useTablet();
  const { colors } = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  const { isJudge, isAdmin, hasApplications } = userData || {};
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

  return isTablet ? (
    <Group mx="md" mt={16}>
      <Link to="/">
        <Text fz={28} variant="label" mr={10}>
          GrantShips
        </Text>
      </Link>
      <Box ml="auto">
        <Burger color={colors.kelp[6]} opened={opened} onClick={toggle} />
      </Box>
      <Drawer opened={opened} onClose={toggle}>
        <Stack gap={0}>
          <Box
            className={fxClasses.hoverCard}
            px={'sm'}
            py={'sm'}
            onClick={() => {
              navigate('/');
              toggle();
            }}
          >
            <Link to="/">
              <Text fz={28} variant="label" mr={10}>
                GrantShips
              </Text>
            </Link>
          </Box>
          {navItems.map((item) => (
            <Box
              key={item.url}
              className={fxClasses.hoverCard}
              px={'sm'}
              py={'sm'}
              onClick={() => {
                navigate(item.url);
                toggle();
              }}
            >
              <Text
                fw={500}
                c={location.pathname === item.url ? undefined : 'subtle'}
              >
                {item.label}
              </Text>
            </Box>
          ))}
          <Box mt="xl">
            <ConnectButton w="100%" />
          </Box>
        </Stack>
      </Drawer>
    </Group>
  ) : (
    <Group ml={40} mt={36} gap={isLaptop ? 'lg' : 'xl'}>
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
