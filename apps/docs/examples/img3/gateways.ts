const App = `
import { Img3 } from '@lxdao/img3';

export default function App() {
  return (
    <div style={{padding: 10}}>
      <Img3
        src="ipfs://bafkreifrusdcwh3w7d5uzehf3vvm6fzsrg7xdabvbzbfe6wt4jiy5y6kfy"
        gateways={['https://ipfs.io/ipfs/']}
        style={{ height: 200, width: 200, borderRadius: 5, backgroundColor: '#f2f4f6' }}
        timeout={5000}
        icon={{
          size: 50,
          color: '#000',
          errorColor: '#f00',
          errorSize: 50
        }}
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
