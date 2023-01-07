import { Img3 } from 'img3/src';
import { useState } from 'react';

export default function Web() {
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
        src={'ipfs://bafkreid67qrfaq2yqacnsvpvfnetjocgy7kiuwu4jw4v23tc3yqgfgis2e'}
      />
      <Img3
        style={{ height: 200, width: 200, border: '1px solid #99a00a' }}
        src={'ipfs://bafkreidpunfemg2foalobiurfob4v6rdb4i3fmujvj5lpnzahfo3a4mxmy'}
        gateway={'https://ipfs.io/ipfs/'}
        size={80}
        color={'#99a00a'}
        timeout={10000}
      />
      {show && (
        <Img3
          style={{ height: 200, width: 200, border: '1px solid #99a00a' }}
          src={'ipfs://bafkreidpunfemg2foalobiurfob4v6rdb4i3fmujvj5lpnzahfo3a4mxmy'}
          color={'#129af9'}
        />
      )}
    </div>
  );
}
