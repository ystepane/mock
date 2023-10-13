/*
  Demo: test ordinary Java/TypeScript
*/

import { Dispatch, SetStateAction, isValidElement, useState } from "react";
import { test, expect } from "@playwright/test";

// all exports from main will now be available as main.X
// import * as main from '../mock/src/main';
import * as main from "../src/main";
import * as input from "../src/components/REPLInput";

interface REPLInputPropsex {
  commands: string[][][];
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
  setHistory: Dispatch<SetStateAction<string[][][]>>;
}

const [history, setHistory] = useState<string[][][]>([[[]]]); // history that records everything as a table
const [file, setFile] = useState<string[][]>([[]]);

const props: REPLInputPropsex = {
  commands: history,
  file: file,
  setFile: setFile,
  setHistory: setHistory,
};

// Notice how you can test vanilla TS functions using Playwright as well!
test("inputHandler should return false on nonexistant data", () => {
  expect(input.handleLoad("Something", props)).toBe(false);
});

test.afterEach(() => {
  props.setFile([[]]);
  props.setHistory([[[]]]);
});
