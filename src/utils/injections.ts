export const injectExternalLink = ({
  url,
  label,
}: {
  url: string;
  label: string;
}) => {
  return `##EXTERNAL_LINK##${label}##${url}##`;
};

export const injectLocalLink = ({
  to,
  label,
}: {
  to: string;
  label: string;
}) => {
  return `##LOCAL_LINK##${label}##${to}##`;
};

export const extractLocalLink = (text: string) => {
  const regex = /##LOCAL_LINK##(.*?)##(.*?)##/g;
  const matches = [...text.matchAll(regex)];
  return matches.map((match) => ({
    label: match[1],
    to: match[2],
  }));
};

export const extractExternalLink = (text: string) => {
  const regex = /##EXTERNAL_LINK##(.*?)##(.*?)##/g;
  const matches = [...text.matchAll(regex)];
  return matches.map((match) => ({
    label: match[1],
    url: match[2],
  }));
};

export const hasLocalLink = (text: string) => {
  return text.includes('##LOCAL_LINK##');
};

export const hasExternalLink = (text: string) => {
  return text.includes('##EXTERNAL_LINK##');
};
