# how to run demo

pnmp install
npx lerna run build

change your token in remixapp/routes/index.tsx

npx lerna run dev

# how to use

npm instal img3 image-uploader3 connector

```javascript
import { ImageUploader3 } from "image-uploader3";
import { connector } from "connector";
import { Img3 } from "img3";


<ImageUploader3
style={{
          overflow: "hidden",
          width: "250px",
          height: "250px",
          position: "relative",
          cursor: "pointer",
          border: "2px solid #ccc",
          borderColor: "#ccc",
        }}
connector={connector}
options={options}
/>

<div>Img3</div>

      <Img3
        style={{
          width: 180,
          height: 180,
        }}
        src="ipfs://xxxxxxxxxxx"
      />
```
