import * as React from "react";
import { CountdownObject, CountdownItem, topicItem } from "./CountdownObject";
import { Head } from "./Head";
import { Subinfo, subinfoObject } from "./subinfo";
import { SideBar } from "./sidebar";
import { getCountdownlist, getTopicList } from "./controller";

interface countDownProps {}

export interface topic {
  bezeichnung: string;
  color: string;
  countdownList: CountdownObject[];
}

interface countDownState {
  countDownsDone: number;
  countDownsDue: number;
  topicList: topic[];
  headVisible: boolean;
  subinfoVisible: boolean;
  sidebarVisible: boolean;
  loading: boolean;
  currentDate: Date;
}

export class Countdown extends React.Component<countDownProps, countDownState> {
  constructor(countDownProps: any, countDownState: any) {
    super(countDownProps, countDownState);
    this.state = {
      countDownsDone: 0,
      countDownsDue: 0,
      topicList: getTopicList(),
      headVisible: true,
      subinfoVisible: true,
      sidebarVisible: true,
      loading: true,
      currentDate: new Date()
    };
  }

  private getSubInfo = () => {};
  componentWillMount() {}

  componentDidMount() {
    console.log(this.state);
  }

  public render() {
    return (
      <div className="w-full h-full">
        {!this.state ? (
          <div>Datenstruktur wird geladen...</div>
        ) : (
          <div className="h-full flex flex-col">
            {this.state.headVisible && <Head done={this.state.countDownsDone} due={this.state.countDownsDue} />}
            {this.state.subinfoVisible && (
              <Subinfo subInfoArray={[{ amountOfDone: 0, amountOfDue: 0, topic: "Test", color: "red" }]} />
            )}
            <div id="main" className="flex flex-1 h-full">
              {this.state.sidebarVisible && <SideBar topicList={this.state.topicList} />}
              <div id="countDowns" className="w-3/4 h-full flex-col flex">
                {this.state.topicList &&
                  this.state.topicList.map((e: topic) =>
                    e.countdownList.map((t: CountdownObject) => (
                      <CountdownItem bezeichnung={t.bezeichnung} endDatum={t.endDatum} topic={e} key={t.bezeichnung} />
                    ))
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
