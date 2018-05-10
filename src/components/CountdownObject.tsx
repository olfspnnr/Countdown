import * as React from "react";

export interface CountdownObject {
  bezeichnung: string;
  topic: topicItem;
  endDatum: Date;
}

export interface topicItem {
  bezeichnung: string;
  color: string;
}

interface CountdownObjectProps extends CountdownObject {}

interface CountdownObjectState {
  distanceTime: string;
  done: boolean;
}

export class CountdownItem extends React.Component<CountdownObjectProps, CountdownObjectState> {
  constructor(CountdownObjectProps: any, CountdownObjectState: any) {
    super(CountdownObjectProps, CountdownObjectState);
    this.state = {
      distanceTime: null,
      done: false
    };
  }
  componentWillMount() {}

  componentDidMount() {
    const countdownDate = this.props.endDatum.getTime();
    const logic = setInterval(() => {
      const currentDate = new Date().getTime();
      const distance = countdownDate - currentDate;
      const countdownTime = this.getDistance(distance);
      if (distance > 0)
        this.setState({
          distanceTime: countdownTime.days + "d " + countdownTime.hours + "h " + countdownTime.minutes + "m "
        });
      else
        this.setState({
          distanceTime: "DONE",
          done: true
        });
    }, 1000);
  }

  private getDistance = (distance: number) => {
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  };

  public render() {
    return (
      <div
        className={
          "w-full flex justify-center items-center flex-col h-24 border-b-2 border-" +
          this.props.topic.color +
          " bg-" +
          this.props.topic.color +
          "-lightest"
        }
      >
        <span id="bezeichnung" className="text-md w-full flex justify-center items-center pb-2">
          {this.props.bezeichnung}
        </span>
        {this.state.distanceTime !== null && (
          <span id="countdowntime" className="w-full text-2xl flex justify-center items-center">
            {this.state.distanceTime}
          </span>
        )}
      </div>
    );
  }
}
