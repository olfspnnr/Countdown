import * as React from "react";
import { topic } from "./countdown";
import { topicItem } from "./CountdownObject";

export interface sideBarItemProps extends topicItem {}

interface sideBarProps {
  topicList: topic[];
}

export const SideBarItem = (props: sideBarItemProps) => {
  return (
    <div
      className={
        "w-full flex h-12 flex-col text-md text-black justify-center items-center  cursor-pointer border-r-4" +
        " border-" +
        props.color +
        " bg-" +
        props.color +
        "-lightest" +
        " hover:bg-" +
        props.color +
        "-lighter"
      }
    >
      {props.bezeichnung}
    </div>
  );
};

export const SideBar = (props: sideBarProps) => {
  return (
    <div id="sideBar" className="w-1/4 flex flex-col items-center border-r">
      {props.topicList.map(e => <SideBarItem bezeichnung={e.bezeichnung} color={e.color} key={e.bezeichnung} />)}
    </div>
  );
};
