const App = `
import React from 'react';
import { Img3 } from '@lxdao/img3';

export default function App() {
  return (
    <div style={{padding: 10}}>
      <Img3
        src="ipfs://bafkreifrusdcwh3w7d5uzehf3vvm6fzsrg7xdabvbzbfe6wt4jiy5y6kfy"
        style={{ height: 200, width: 200, borderRadius: 5, background: '#f2f4f6' }}
      />
    </div>
  )
};
`;

const react = {
  '/App.tsx': App.trim(),
};

export default {
  ...react,
};
