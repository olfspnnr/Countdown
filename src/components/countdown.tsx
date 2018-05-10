import * as React from "react";
import { CountdownObject, CountdownItem } from "./CountdownObject";
import { Head } from "./Head";
import { Subinfo } from "./subinfo";
import { SideBar } from "./sidebar";

interface countDownProps {}

interface countDownState {
  countDownsDone: number;
  countDownsDue: number;
  countDownList: CountdownObject[];
  headVisible: boolean;
  subinfoVisible: boolean;
  sidebarVisible: boolean;
  loading: boolean;
}

export class Countdown extends React.Component<countDownProps, countDownState> {
  constructor(countDownProps: any, countDownState: any) {
    super(countDownProps, countDownState);
    this.state = {
      countDownsDone: 0,
      countDownsDue: 0,
      countDownList: [{ bezeichnung: "test", endDatum: new Date(), startDatum: new Date(), topic: "test" }],
      headVisible: true,
      subinfoVisible: true,
      sidebarVisible: true,
      loading: true
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  public render() {
    return (
      <div>
        {!this.state ? (
          <div>Datenstruktur wird geladen...</div>
        ) : (
          <div>
            {this.state.headVisible && <Head done={this.state.countDownsDone} due={this.state.countDownsDue} />}
            {this.state.subinfoVisible && (
              <Subinfo subInfoArray={[{ amountOfDone: 0, amountOfDue: 0, topic: "Test" }]} />
            )}
            <div id="main" className="flex">
              {this.state.sidebarVisible && <SideBar />}
              <div id="countDowns" className="w-3/4">
                {this.state.countDownList &&
                  this.state.countDownList.map((e: CountdownObject) => (
                    <CountdownItem
                      bezeichnung={e.bezeichnung}
                      startDatum={e.startDatum}
                      endDatum={e.endDatum}
                      topic={e.topic}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
