const App = `
import { Img3 } from '@lxdao/img3';

export default function App() {
  return (
    <div style={{padding: 10}}>
      <Img3
        src="https://bafkreifrusdcwh3w7d5uzehf3vvm6fzsrg7xdabvbzbfe6wt4jiy5y6kfy.ipfs.nftstorage.link/"
        style={{ height: 200, width: 200, borderRadius: 5 }}
      />
    </div>
  )
};
`;

const react = {
  '/App.js': App.trim(),
};

export default {
  ...react,
};
