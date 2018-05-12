import * as React from "react";
import { topic } from "./countdown";
import { topicItem } from "./CountdownObject";

export interface sideBarItemProps extends topicItem {
  switchToView: (topic: string) => any;
  addNewTopic?: (pb: string, pc: string) => any;
}

interface sideBarProps {
  switchToView: (topic: string) => any;
  switchToDefaultView: () => any;
  topicList: topicItem[];
  addNewTopic?: (pb: string, pc: string) => any;
}

export const SideBarItem = (props: sideBarItemProps) => {
  return (
    <div
      onClick={e => {
        if (props.addNewTopic) {
          console.log("test");
          props.addNewTopic("test", "red");
          props.switchToView("Alle");
          return;
        }
        props.switchToView(props.bezeichnung);
      }}
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
    <div id="sideBar" className="w-1/4 flex flex-col items-center">
      <SideBarItem
        switchToView={() => {
          props.switchToDefaultView();
        }}
        bezeichnung={"Alle"}
        color={"grey"}
        key={"Default"}
      />
      {props.topicList.map((e, index) => (
        <SideBarItem
          switchToView={e => props.switchToView(e)}
          bezeichnung={e.bezeichnung}
          color={e.color}
          key={index}
        />
      ))}
      <SideBarItem
        switchToView={() => {
          props.switchToDefaultView();
        }}
        bezeichnung={"+"}
        color={"grey"}
        key={"add"}
        addNewTopic={() => props.addNewTopic("test", "red")}
      />
    </div>
  );
};
