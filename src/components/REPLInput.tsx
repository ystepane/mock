import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { data } from "./MockData";
import path from "path";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  commands: string[];
  brief: boolean;
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
  setBrief: Dispatch<SetStateAction<boolean>>;
  setHistory: Dispatch<SetStateAction<string[]>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState(Number);
  // const [mode, setMode] = useState<boolean>(true);
  // TODO WITH TA: build a handleSubmit function called in button onClick
  function handleSubmit(commandString: string) {
    let splitInput = commandString.split(" ", 3);
    setCount(count + 1);
    let output = "";
    switch (splitInput[0]) {
      case "mode": {
        props.setBrief(!props.brief);
        output = "mode switched!!!!!!!!";
        break;
      }
      case "load_file": {
        if (splitInput.length != 2) {
          output = "Error: bad filepath!";
        } else {
          //load_file
          // call the load function
          // load(splitInput[1])
          if (load(splitInput[1])) {
            output = "load_file of " + splitInput[1] + " successful!";
          } else {
            output = "Could not find " + splitInput[1];
          }
        }

        break;
      }
      case "view": {
        //call view
        output = "view your thing!";
        break;
      }
      case "search": {
        // call search
        output = "searching....... for your thing :)";
        break;
      }
      default: {
        output =
          "Sorry, you suck. bad command.   " +
          commandString +
          " is not a real command";
        break;
      }
    }
    if (props.brief) {
      props.setHistory([...props.commands, output]);
    } else {
      props.setHistory([
        ...props.commands,
        "Command: " + commandString,
        "Output: " + output,
      ]);
    }
    setCommandString("");
  }

  function load(pathFile: string): boolean {
    let file = data.get(pathFile);
    if (file !== undefined) {
      props.setFile(file);
      return true;
    }
    return false;
  }
  // TODO: Once it increments, try to make it push commands... Note that you can use the `...` spread syntax to copy what was there before
  // add to it with new commands.
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={() => handleSubmit(commandString)}>
        Submit {count} times
      </button>
    </div>
  );
}
