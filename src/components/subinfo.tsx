import * as React from "react";

export interface subinfoObject {
  topicBezeichnung: string;
  amountOfDone: number;
  amountOfDue: number;
  color: string;
}

interface subinfoProps {
  subInfoArray: subinfoObject[];
}

const SubinfoObject = (props: subinfoObject) => (
  <div
    id="subinfoObject"
    className={"h-6 flex flex-1 items-center justify-center text-xs bg-" + props.color + "-light"}
  >
    <span id="topic" className="px-2">
      {props.topicBezeichnung}
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
    <div id="subInfo" className="w-full min-w-2 flex flex-wrap flex-row items-stretch justify-center">
      {props.subInfoArray.map((e: subinfoObject) => (
        <SubinfoObject
          amountOfDone={e.amountOfDone}
          amountOfDue={e.amountOfDue}
          topicBezeichnung={e.topicBezeichnung}
          key={e.topicBezeichnung}
          color={e.color}
        />
      ))}
    </div>
  );
};
