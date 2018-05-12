import { CountdownItem, CountdownObject, topicItem } from "./CountdownObject";
import { topic } from "./countdown";

const currentDate = new Date();
const currentDateString = currentDate.getFullYear() + "." + (currentDate.getMonth() + 1) + "." + currentDate.getDate();

export interface possibleTopic {
  bezeichnung: string;
  color: string;
}

export const possibleTopics = {
  Arbeit: {
    bezeichnung: "Arbeit",
    color: "red"
  } as possibleTopic,
  Prüfung: {
    bezeichnung: "Prüfung",
    color: "blue"
  } as possibleTopic,
  Zuhause: {
    bezeichnung: "Zuhause",
    color: "green"
  } as possibleTopic
} as any;

let countdownlist = [
  {
    bezeichnung: "Projektarbeit",
    endDatum: new Date("May 07, 2018 12:00:00"),
    topic: possibleTopics.Prüfung
  },
  {
    bezeichnung: "Feierabend",
    endDatum: new Date(currentDateString + " 17:50:00"),
    topic: possibleTopics.Arbeit
  },
  {
    bezeichnung: "Kenntnisprüfung",
    endDatum: new Date("Apr 25, 2018 07:45:00"),
    topic: possibleTopics.Prüfung
  },

  {
    bezeichnung: "Mündliche",
    endDatum: new Date("June 14, 2018 10:00:00"),
    topic: possibleTopics.Prüfung
  },
  {
    bezeichnung: "Countdown Code",
    endDatum: new Date("June 18, 2018 10:00:00"),
    topic: possibleTopics.Zuhause
  },
  {
    bezeichnung: "Bubu",
    endDatum: new Date(currentDateString + " 22:15:00"),
    topic: possibleTopics.Zuhause
  }
] as CountdownObject[];

export const getCountdownlist = (para?: topicItem) => {
  if (para) {
    let newCountDownList = [] as CountdownObject[];
    countdownlist.forEach(element => {
      if (element.topic === para) {
        newCountDownList.push(element);
      }
    });
    return newCountDownList;
  }
  return countdownlist;
};

export const getTopicList = (selectedTopic?: string) => {
  let topicArray = [] as topic[];
  if (!selectedTopic)
    for (const bezeichnung in possibleTopics) {
      let countdownListForBezeichnung = getCountdownlist(possibleTopics[bezeichnung]);
      topicArray.push({
        countdownList: countdownListForBezeichnung,
        bezeichnung: possibleTopics[bezeichnung].bezeichnung,
        color: possibleTopics[bezeichnung].color,
        done: 0
      });
    }
  else if (selectedTopic)
    for (const bezeichnung in possibleTopics) {
      if (possibleTopics[bezeichnung].bezeichnung === selectedTopic) {
        let countdownListForBezeichnung = getCountdownlist(possibleTopics[bezeichnung]);
        topicArray.push({
          countdownList: countdownListForBezeichnung,
          bezeichnung: possibleTopics[bezeichnung].bezeichnung,
          color: possibleTopics[bezeichnung].color,
          done: 0
        });
      }
    }
  return topicArray;
};

export const getTopicListDumb = () => {
  let topicArray = [];
  for (const bezeichnung in possibleTopics) {
    topicArray.push(possibleTopics[bezeichnung]);
  }
  return topicArray;
};
