import { Dispatch } from "react";
import React, { Component } from "react";
import "../styles/main.css";
import TableComponent from "./TableComponent";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  commands: string[];
  file: string[][];
  brief: boolean;
}

export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {props.commands.map((command, index) => (
        <p>
          {command} {index} and here is the file {props.file}
        </p>
      ))}
      <TableComponent data={props.file} />
    </div>
  );
}
