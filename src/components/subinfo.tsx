import * as React from "react";

export interface subinfoObject {
  topic: string;
  amountOfDone: number;
  amountOfDue: number;
}

interface subinfoProps {
  subInfoArray: subinfoObject[];
}

const SubinfoObject = (props: subinfoObject) => (
  <div id="subinfoObject" className="h-6 flex flex-1 items-center justify-center text-sm text-white bg-red-lighter">
    <span id="topic" className="px-2">
      {props.topic}
    </span>
    <span id="topicDone" className="px-2">
      {props.amountOfDone}
    </span>
    <span>/</span>
    <span id="topicDue" className="px-2">
      {props.amountOfDue}
    </span>
  </div>
);

export const Subinfo = (props: subinfoProps) => {
  return (
    <div
      id="subInfo"
      className="w-full min-w-2 flex flex-wrap border-b border-black flex-row items-stretch justify-center"
    >
      {props.subInfoArray.map((e: subinfoObject) => (
        <SubinfoObject amountOfDone={e.amountOfDone} amountOfDue={e.amountOfDue} topic={e.topic} key={e.topic} />
      ))}
    </div>
  );
};
