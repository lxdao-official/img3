/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import { Img3 } from "./Img3";

test("renders the Img3", () => {
  render(
    <Img3 src="ipfs://bafkreid67qrfaq2yqacnsvpvfnetjocgy7kiuwu4jw4v23tc3yqgfgis2e" />
  );
});
