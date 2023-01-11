// @ts-ignore
import { Img3 } from 'img3';
import { useState } from 'react';

export default function Demo() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <h1>Web</h1>
      <div>
        <button
          onClick={() => {
            setShow(!show);
          }}
        >
          Next Img3 by IPFS cache
        </button>
      </div>
      <Img3
        style={{ height: 200, width: 200, border: '1px solid #99a00a' }}
        src={'ipfs://bafybeictqys5i7t7u275hqileaa534xwbdglbfq66rxwyn2vv26xrbxqe4'}
      />
      <Img3
        style={{ height: 200, width: 200, border: '1px solid #99a00a' }}
        src={'ipfs://bafybeihwciyrbfwqswejxpf6w7xo64sd6nw7yys5eybfxo3xx44qp6fz3u'}
      />
      <Img3
        style={{ height: 200, width: 200, border: '1px solid #99a00a' }}
        src={'ipfs://bafkreidpunfemg2foalobiurfob4v6rdb4i3fmujvj5lpnzahfo3a4mxmy'}
        gateway={'https://ipfs.io/ipfs/'}
        size={80}
        color={'#a8cbff'}
        timeout={3000}
      />
      {show && (
        <Img3
          style={{ height: 200, width: 200, border: '1px solid #99a00a' }}
          src={'ipfs://bafkreihbphdkrjs36sif752qz6quhwnvupxtgrhfxjswyg3q6tjdttpmo4'}
          color={'#129af9'}
        />
      )}
    </div>
  );
}
