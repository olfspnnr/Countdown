import * as React from "react";

export interface CountdownObject {
  bezeichnung: string;
  topic: string;
  startDatum: Date;
  endDatum: Date;
}

interface CountdownObjectProps extends CountdownObject {
  topic: string;
  bezeichnung: string;
  startDatum: Date;
  endDatum: Date;
}

interface CountdownObjectState {
  done: boolean;
}

export class CountdownItem extends React.Component<CountdownObjectProps, CountdownObjectState> {
  constructor(CountdownObjectProps: any, CountdownObjectState: any) {
    super(CountdownObjectProps, CountdownObjectState);
  }
  componentWillMount() {}

  componentDidMount() {}

  public render() {
    return (
      <div>
        <span id="bezeichnung">{this.props.bezeichnung}</span>
      </div>
    );
  }
}
