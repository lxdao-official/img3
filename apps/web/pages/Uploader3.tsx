import * as React from 'react';
import { Uploader3 } from 'uploader3';

export default function App() {
  return (
    <div style={{ padding: 40 }}>
      <Uploader3>
        <div
          style={{
            borderRadius: 5,
            padding: '20px',
            display: 'inline-block',
            boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.8) inset',
            backgroundColor: '#0987ff',
            color: '#fff',
          }}
        >
          Drop files or Click to select files
        </div>
      </Uploader3>
    </div>
  );
}
