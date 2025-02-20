import { Tooltip, useMantineTheme } from '@mantine/core';
import {
  IconGavel,
  IconProps,
  IconRocket,
  IconShieldHalf,
} from '@tabler/icons-react';
import { Role } from '../constants/enum';

const roleCopy = {
  ship: 'Ship Operator.',
  judge: 'GG23 Judge',
  admin: 'GG23 Admin',
};

export const JudgeIcon = (props: IconProps) => {
  const { colors } = useMantineTheme();
  return (
    <Tooltip label={roleCopy.judge}>
      <IconGavel color={colors.kelp[6]} stroke={1.2} size={24} {...props} />;
    </Tooltip>
  );
};

export const AdminIcon = (props: IconProps) => {
  const { colors } = useMantineTheme();
  return (
    <Tooltip label={roleCopy.admin}>
      <IconShieldHalf
        color={colors.pink[6]}
        stroke={1.2}
        size={24}
        {...props}
      />
    </Tooltip>
  );
};

export const ShipIcon = (props: IconProps) => {
  const { colors } = useMantineTheme();
  return (
    <Tooltip label={roleCopy.ship}>
      <IconRocket color={colors.purple[6]} stroke={1.2} size={24} {...props} />
    </Tooltip>
  );
};

export const RoleIcon = (props: IconProps & { iconRole: Role }) => {
  if (Role.Admin === props.iconRole) {
    return <AdminIcon {...props} />;
  }
  if (Role.Judge === props.iconRole) {
    return <JudgeIcon {...props} />;
  }
  if (Role.Operator === props.iconRole) {
    return <ShipIcon {...props} />;
  }
  return null;
};
