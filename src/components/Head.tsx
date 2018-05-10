import * as React from "react";

export interface HeadObject {
  done: number;
  due: number;
}

interface HeadProps extends HeadObject {}

interface HeadState {}

export const Head = (props: HeadProps) => {
  return (
    <div id="head" className="w-full h-16 border-b flex items-center justify-center">
      <span id="done" className="text-2xl px-3">
        Done: {props.done}
      </span>
      <span id="due" className="text-2xl px-3">
        Due: {props.due}
      </span>
    </div>
  );
};
