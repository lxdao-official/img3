/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import { ImageUploader3 } from "./ImageUploader3";

test("renders ImageUploader3", () => {
  render(<ImageUploader3 value="" error="" onFinish={() => {}} />);
});
