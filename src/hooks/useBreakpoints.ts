import { useMediaQuery } from '@mantine/hooks';

export enum BreakPoint {
  Xs = '22em',
  Sm = '32em',
  Md = '58em',
  Lg = '78em',
  UpperRange = '78.0001em',
  Xl = '94em',
}

export const useBreakpoint = (bp: BreakPoint) =>
  useMediaQuery(
    `(${bp === BreakPoint.UpperRange ? 'min-width' : 'max-width'}: ${bp})`
  );

export const useThin = () => useBreakpoint(BreakPoint.Xs);
export const useMobile = () => useBreakpoint(BreakPoint.Sm);
export const useTablet = () => useBreakpoint(BreakPoint.Md);
export const useLaptop = () => useBreakpoint(BreakPoint.Lg);
export const useDesktop = () => useBreakpoint(BreakPoint.UpperRange);

type BreakpointsProps = {
  singleBreakpoint?: boolean;
};

export const useBreakpoints = (props?: BreakpointsProps) => {
  const { singleBreakpoint } = props || {};
  const isThin = useThin();
  const isMobile = useMobile();
  const isTablet = useTablet();
  const isLaptop = useLaptop();
  const isDesktop = useDesktop();

  if (!singleBreakpoint) {
    return {
      isThin,
      isMobile,
      isTablet,
      isLaptop,
      isDesktop,
    };
  }

  return {
    isThin: isThin,
    isMobile: isMobile && !isThin,
    isTablet: isTablet && !isMobile,
    isLaptop: isLaptop && !isTablet,
    isDesktop,
  };
};
