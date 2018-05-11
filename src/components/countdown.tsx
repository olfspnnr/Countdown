import * as React from "react";
import { CountdownObject, CountdownItem, topicItem } from "./CountdownObject";
import { Head } from "./Head";
import { Subinfo, subinfoObject } from "./subinfo";
import { SideBar } from "./sidebar";
import { getCountdownlist, getTopicList, possibleTopics, getTopicListDumb } from "./controller";

interface countDownProps {}

export interface topic {
  bezeichnung: string;
  color: string;
  done: number;
  countdownList: CountdownObject[];
}

interface countDownState {
  countDownsDone: number;
  countDownsDue: number;
  topicList: topic[];
  sideBarTopicList: topicItem[];
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
      sideBarTopicList: getTopicListDumb(),
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

  private switchToView = (e: string) => {
    this.setState(
      {
        topicList: []
      },
      () => {
        this.setState({
          topicList: getTopicList(e)
        });
      }
    );
  };

  private switchToDefaultView = () => {
    this.setState(
      {
        topicList: []
      },
      () => {
        this.setState({
          topicList: getTopicList()
        });
      }
    );
  };

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
              {this.state.sidebarVisible && (
                <SideBar
                  switchToDefaultView={() => this.switchToDefaultView()}
                  switchToView={e => this.switchToView(e)}
                  topicList={this.state.sideBarTopicList}
                />
              )}
              <div id="countDowns" className="w-3/4 h-full overflow-auto">
                {this.state.topicList &&
                  this.state.topicList.map((e: topic) =>
                    e.countdownList.map((t: CountdownObject, index) => (
                      <CountdownItem
                        countDoneUp={() => {
                          // ######
                          // Done Count und Due Count
                          // ######
                          console.log("coundownitem");
                        }}
                        bezeichnung={t.bezeichnung}
                        endDatum={t.endDatum}
                        topic={e}
                        key={index}
                      />
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
