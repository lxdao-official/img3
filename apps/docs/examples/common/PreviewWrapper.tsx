export const PreviewWrapper = `
import React from 'react';

export const PreviewWrapper: React.FunctionComponent<React.PropsWithChildren> = (props) => {
  const { children, style, ...rest } = props;
  return (
    <div
      {...rest}
      style={{
        width: 200,
        height: 200 * 0.75, // 4:3
        backgroundColor: '#f2f4f6',
        color: '#333',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #fff',
        position: 'relative',
        marginRight: 10,
        marginBottom: 10,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
`;
