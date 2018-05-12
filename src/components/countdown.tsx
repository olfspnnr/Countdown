import * as React from "react";
import { CountdownObject, CountdownItem, topicItem } from "./CountdownObject";
import { Head } from "./Head";
import { Subinfo, subinfoObject } from "./subinfo";
import { SideBar } from "./sidebar";
import { getCountdownlist, getTopicList, possibleTopics, getTopicListDumb, possibleTopic } from "./controller";

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

const newTopicDialog = () => {
  //
};

export const AddCountdown = () => {
  return (
    <div
      className={
        "w-full flex justify-center items-center flex-col min-h-12 h-12 border-b border-t pt-1 border-grey bg-grey-lightest hover:bg-grey-lighter cursor-pointer"
      }
    >
      <span id="bezeichnung" className="text-md w-full flex justify-center items-center pb-2">
        Neuer Countdown
      </span>
    </div>
  );
};

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

  componentDidMount() {}

  private addNewTopic = (pBezeichnung: string, pColor: string) => {
    let newTopic = {
      bezeichnung: pBezeichnung,
      color: pColor,
      done: 0,
      countdownList: []
    } as topic;
    const newBackupTopicList = this.state.invisibleTopicList;
    const newTopicList = this.state.visibleTopicList;
    newBackupTopicList.push(newTopic);
    newTopicList.push(newTopic);
    let newPossibleTopic = {
      bezeichnung: pBezeichnung,
      color: pColor
    } as possibleTopic;
    const newSideBarTopicList = this.state.sideBarTopicList;
    newSideBarTopicList.push(newPossibleTopic);
    this.setState(
      {
        visibleTopicList: newTopicList,
        invisibleTopicList: newBackupTopicList,
        sideBarTopicList: newSideBarTopicList
      },
      () => {
        console.log(this.state);
      }
    );
  };

  private switchToView = (e: string) => {
    this.setState(
      {
        visibleTopicList: []
      },
      () => {
        this.setState(
          {
            visibleTopicList: getTopicList(e)
          },
          () => {
            this.resetDone();
          }
        );
      }
    );
  };

  private switchToDefaultView = () => {
    this.setState(
      {
        visibleTopicList: []
      },
      () => {
        this.setState(
          {
            visibleTopicList: getTopicList()
          },
          () => {
            this.resetDone();
          }
        );
      }
    );
  };

  private getAllDoneDue = () => {
    let allDoneDue = {
      allDone: 0,
      allDue: 0
    };
    this.state.invisibleTopicList.forEach(element => {
      element.countdownList.forEach(countdownElement => {
        if (countdownElement.endDatum < new Date()) allDoneDue.allDone++;
      });
      allDoneDue.allDue += element.countdownList.length;
    });
    allDoneDue.allDue -= allDoneDue.allDone;
    return allDoneDue;
  };

  private setAllDoneDue = () => {
    let allDoneDue = this.getAllDoneDue();
    this.setState({
      countDownsDone: allDoneDue.allDone,
      countDownsDue: allDoneDue.allDue
    });
  };

  private getSubInfoArray = () => {
    let newSubInfoArray = [] as subinfoObject[];
    const visibleTopicList = this.state.invisibleTopicList;
    visibleTopicList.forEach((topic, index) => {
      let doneCount = 0;
      topic.countdownList.forEach(element => {
        if (element.endDatum < new Date()) doneCount++;
      });
      newSubInfoArray.push({
        amountOfDone: doneCount,
        amountOfDue: visibleTopicList[index].countdownList.length - doneCount,
        color: visibleTopicList[index].color,
        topicBezeichnung: visibleTopicList[index].bezeichnung
      });
    });
    this.setState(
      {
        subinfoArray: newSubInfoArray
      },
      () => {
        this.setAllDoneDue();
      }
    );
  };

  public resetDone = () => {
    let newTopicArray = this.state.visibleTopicList;
    let newBackupTopicArray = this.state.invisibleTopicList;
    newTopicArray.forEach(e => {
      e.done = 0;
    });
    newBackupTopicArray.forEach(e => {
      e.done = 0;
    });
    this.setState({
      visibleTopicList: newTopicArray,
      invisibleTopicList: newBackupTopicArray
    });
  };

  private countDoneUp = (topicToBeUpped: string) => {
    let newTopicArray = this.state.invisibleTopicList;
    newTopicArray.forEach(e => {
      if (e.bezeichnung == topicToBeUpped) {
        e.done++;
      }
    });
    this.setState(
      {
        invisibleTopicList: newTopicArray
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
                  addNewTopic={(pb: string, pc: string) => this.addNewTopic(pb, pc)}
                />
              )}
              <div id="countDowns" className="w-3/4 h-full overflow-auto">
                {this.state.visibleTopicList &&
                  this.state.visibleTopicList.map((e: topic) =>
                    e.countdownList.map((t: CountdownObject, index) => (
                      <CountdownItem
                        countDoneUp={(e: any) => {
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
