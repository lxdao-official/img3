import { ImageUploader3 } from "image-uploader3";
import { connector } from "image-uploader3-connector";
import { Img3 } from "img3";

export default function Index() {
  //your nft.storage token
  const token = "";
  const options = { token };
  return (
    <>
      <div>ImageUploader3</div>
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
          display: "block",
          width: 180,
          height: 180,
          border: "1px solid gray",
        }}
        src="ipfs://bafkreidpunfemg2foalobiurfob4v6rdb4i3fmujvj5lpnzahfo3a4mxmy"
      />
    </>
  );
}
