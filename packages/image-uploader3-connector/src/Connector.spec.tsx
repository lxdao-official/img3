/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import { Connector } from "./Connector";

test("renders Connector", () => {
  render(<ImageUploader3 value="" error="" onFinish={() => {}} />);
});
