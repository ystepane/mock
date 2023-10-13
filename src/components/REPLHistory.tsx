import { Dispatch } from "react";
import React, { Component } from "react";
import "../styles/main.css";
import TableComponent from "./TableComponent";

interface REPLHistoryProps {
  commands: string[][][];
}

export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.commands.map((command, index) => (
        <TableComponent data={command} />
      ))}
    </div>
  );
}
