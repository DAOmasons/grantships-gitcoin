import { Avatar, AvatarProps } from '@mantine/core';
import { Address } from 'viem';

export const AddressAvatar = (props: AvatarProps & { address: Address }) => {
  return <Avatar {...props} src={`https://effigy.im/a/${props.address}.svg`} />;
};
