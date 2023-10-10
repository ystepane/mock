import { Dispatch } from "react";
import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  commands: string[];
  brief: boolean;
}

export function REPLHistory(props: REPLHistoryProps) {
  // if (props.brief) {
  //   return (
  //     <div className="repl-history">
  //       {/* This is where command history will go */}
  //       {/* TODO: To go through all the pushed commands... try the .map() function! */}
  //       {props.commands.map((command, index) => (
  //         <p>{command}</p>
  //       ))}
  //       {/* {props.testing.map((testing, index) => (
  //         <p>
  //           {testing.toString()} at testing mode {index}
  //         </p>
  //       ))} */}
  //     </div>
  //   );
  // }
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {props.commands.map((command, index) => (
        <p>
          {command} at index {index}
        </p>
      ))}
      {/* {props.testing.map((testing, index) => (
        <p>
          {testing.toString()} at testing mode {index}
        </p>
      ))} */}
    </div>
  );
}
