import React from 'react';

const hiddenStyles = {
  display: 'inline-block',
  position: 'absolute',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  height: 1,
  width: 1,
  margin: -1,
  padding: 0,
  border: 0,
} as React.CSSProperties;

export const VisuallyHidden = ({ children, ...delegated }: {children: React.ReactNode}) => {
  const [forceShow, setForceShow] = React.useState(false);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Alt') {
          setForceShow(true);
        }
      };
      const handleKeyUp = (ev: KeyboardEvent) => {
        if (ev.key === 'Alt') {
          setForceShow(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return children as JSX.Element;
  }

  return (
    <span style={hiddenStyles} {...delegated}>
      {children}
    </span>
  ) as JSX.Element;
};

// CREDIT WHERE CREDIT IS DUE - LIFTED FROM JOSH COMEAU : https://www.joshwcomeau.com/snippets/react-components/visually-hidden/
