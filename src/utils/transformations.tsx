import { Link } from 'react-router-dom';
import { extractLocalLink, hasLocalLink } from './injections';

type TextContent = string | JSX.Element | (string | JSX.Element)[];

export const handleInjectedLink = (content: TextContent): TextContent => {
  // Handle arrays recursively
  if (Array.isArray(content)) {
    return content.map((item) => handleInjectedLink(item)) as TextContent;
  }

  // Skip JSX elements
  if (typeof content !== 'string') {
    return content;
  }

  const text = content;
  if (!hasLocalLink(text)) {
    return text;
  }

  const links = extractLocalLink(text);
  let processedText = text;

  // Replace all link placeholders with unique identifiers
  links.forEach((link, index) => {
    const placeholder = `##LOCAL_LINK##${link.label}##${link.to}##`;
    const uniqueId = `__LOCAL_LINK_${index}__`;
    processedText = processedText.replace(placeholder, uniqueId);
  });

  // Split text by unique identifiers
  const parts = processedText.split(/(__LOCAL_LINK_\d+__)/);

  // Map parts to text or Link components
  return parts.map((part, index) => {
    const linkMatch = part.match(/__LOCAL_LINK_(\d+)__/);
    if (linkMatch) {
      const linkIndex = parseInt(linkMatch[1], 10);
      const link = links[linkIndex];
      return (
        <Link
          key={`local-link-${index}`}
          to={link.to}
          style={{ textDecoration: 'underline' }}
        >
          {link.label}
        </Link>
      );
    }
    return part;
  });
};

export const applyTextTransformations = (
  text: string,
  transformations: ((content: TextContent) => TextContent)[]
) => {
  return transformations.reduce((content, transformation) => {
    return transformation(content);
  }, text as TextContent);
};
