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
  visibleTopicList: topic[];
  invisibleTopicList: topic[];
  sideBarTopicList: topicItem[];
  headVisible: boolean;
  subinfoVisible: boolean;
  sidebarVisible: boolean;
  loading: boolean;
  currentDate: Date;
  subinfoArray: subinfoObject[];
}

export class Countdown extends React.Component<countDownProps, countDownState> {
  constructor(countDownProps: any, countDownState: any) {
    super(countDownProps, countDownState);
    this.state = {
      countDownsDone: 0,
      countDownsDue: 0,
      visibleTopicList: getTopicList(),
      invisibleTopicList: getTopicList(),
      sideBarTopicList: getTopicListDumb(),
      headVisible: true,
      subinfoVisible: true,
      sidebarVisible: true,
      loading: true,
      currentDate: new Date(),
      subinfoArray: []
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.resetDone();
  }

  private switchToView = (e: string) => {
    this.setState(
      {
        visibleTopicList: []
      },
      () => {
        this.setState({
          visibleTopicList: getTopicList(e)
        });
      }
    );
  };

  private switchToDefaultView = () => {
    this.setState(
      {
        visibleTopicList: []
      },
      () => {
        this.setState({
          visibleTopicList: getTopicList()
        });
      }
    );
  };

  private getSubInfoArray = () => {
    let newSubInfoArray = [] as subinfoObject[];
    const visibleTopicList = this.state.invisibleTopicList;
    visibleTopicList.forEach((topic, index) => {
      newSubInfoArray.push({
        amountOfDone: visibleTopicList[index].done,
        amountOfDue: visibleTopicList.length - visibleTopicList[index].done,
        color: visibleTopicList[index].color,
        topicBezeichnung: visibleTopicList[index].bezeichnung
      });
    });
    this.setState({
      subinfoArray: newSubInfoArray
    });
  };

  public resetDone = () => {
    let newTopicArray = this.state.visibleTopicList;
    let newBackupTopicArray = this.state.invisibleTopicList;
    newTopicArray.forEach(e => {
      e.done = 0;
    });
  };

  private countDoneUp = (topicToBeUpped: string) => {
    let newBackupTopicArray = this.state.visibleTopicList;
    newBackupTopicArray.forEach(e => {
      if (e.bezeichnung == topicToBeUpped) {
        e.done++;
      }
    });
    this.setState(
      {
        invisibleTopicList: newBackupTopicArray
      },
      () => {
        this.getSubInfoArray();
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
            {this.state.subinfoVisible && <Subinfo subInfoArray={this.state.subinfoArray} />}
            <div id="main" className="flex flex-1 h-full">
              {this.state.sidebarVisible && (
                <SideBar
                  switchToDefaultView={() => this.switchToDefaultView()}
                  switchToView={e => this.switchToView(e)}
                  topicList={this.state.sideBarTopicList}
                />
              )}
              <div id="countDowns" className="w-3/4 h-full overflow-auto">
                {this.state.visibleTopicList &&
                  this.state.visibleTopicList.map((e: topic) =>
                    e.countdownList.map((t: CountdownObject, index) => (
                      <CountdownItem
                        countDoneUp={e => {
                          this.countDoneUp(e);
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
