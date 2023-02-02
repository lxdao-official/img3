import React from 'react';

export const PreviewWrapper: React.FC<React.PropsWithChildren> = (props) => {
  const { children, ...rest } = props;
  return (
    <div
      {...rest}
      style={{
        width: 160,
        height: 120, // 4:3
        backgroundColor: '#dcdcdc',
        color: '#333',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #fff',
        position: 'relative',
        marginRight: 10,
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );
};
