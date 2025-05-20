import { AvatarProps, Group, GroupProps, Text, TextProps } from '@mantine/core';
import { Address } from 'viem';
import { useEns } from '../hooks/useEns';
import { AddressAvatar } from './AddressAvatar';

export const UserDisplay = (
  props: GroupProps & {
    address: Address;
    avatarProps?: AvatarProps;
    textProps?: TextProps;
  }
) => {
  const { address, avatarProps, textProps, ...rest } = props;
  const { name } = useEns({ avatar: true, address, name: true });

  return (
    <Group gap={'sm'} {...rest}>
      <AddressAvatar address={address} {...(avatarProps || {})} />
      <Text {...(textProps || {})}>{name}</Text>
    </Group>
  );
};
