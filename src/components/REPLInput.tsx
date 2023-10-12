import "../styles/main.css";
import { Dispatch, SetStateAction, isValidElement, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { data, searchdata } from "./MockData";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  commands: string[][][];
  brief: boolean;
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
  setBrief: Dispatch<SetStateAction<boolean>>;
  setHistory: Dispatch<SetStateAction<string[][][]>>;
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
    let outputArray: string[][];
    let viewFlag = false;
    let searchFlag = false;
    let searchRes: string[][] = [[]];
    let splitInput = commandString.split(" ", 3);
    setCount(count + 1);
    let output = "Output: ";
    switch (splitInput[0]) {
      case "mode": {
        props.setBrief(!props.brief);
        output += "mode switched!!!!!!!!";
        break;
      }
      case "load_file": {
        if (splitInput.length != 2) {
          output += "Error: bad filepath!";
        } else {
          //load_file
          // call the load function
          // load(splitInput[1])
          if (load(splitInput[1])) {
            output = output + "load_file of " + splitInput[1] + " successful!";
          } else {
            output = output + "Could not find " + splitInput[1];
          }
        }
        break;
      }
      case "view": {
        //call view
        if (splitInput.length != 1) {
          output += "Error: view only takes in 1 argument. take cs32 again!";
          // break;
        } else {
          if (props.file[0].length !== 0) {
            // check if we need the index
            viewFlag = true;
            output += "view your thing!";
          } else {
            output += "Error: You Suck! AKA, no files were loaded";
          }
        }
        break;
      }
      case "search": {
        if (splitInput.length != 3) {
          output += "Error: search needs three args";
        } else {
          if (props.file[0].length !== 0) {
            searchFlag = true;
            const searchTuple: [string, string] = [
              splitInput[1],
              splitInput[2],
            ];
            let quickRes = searchdata.get(searchTuple);
            if (quickRes !== undefined) {
              searchRes = quickRes;
            }
            output += "searching....... for your thing :)";
          } else {
            output += "Error: search requires a load";
          }
        }

        break;
      }
      default: {
        output =
          output +
          "Sorry, you suck. bad command.   " +
          commandString +
          " is not a real command";
        break;
      }
    }
    let newCommand = "Command: " + commandString;
    let newCommandTable = [newCommand.split(" ")];
    outputArray = newCommandTable;
    outputArray = outputArray.concat([output.split(" ")]);
    if (viewFlag) {
      outputArray = outputArray.concat(props.file);
    }
    if (searchFlag) {
      outputArray = outputArray.concat(searchRes);
    }
    if (props.brief) {
      props.setHistory([...props.commands, outputArray.slice(1)]);
    } else {
      props.setHistory([...props.commands, outputArray]);
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
