import { CountdownItem, CountdownObject, topicItem } from "./CountdownObject";
import { topic } from "./countdown";

export const getCountdownlist = (para?: topicItem) => {
  let currentDate = new Date();
  let countdownlist = [
    {
      bezeichnung: "Feierabend",
      endDatum: new Date(currentDate + " 17:50:00"),
      topic: possibleTopics.Arbeit
    },
    {
      bezeichnung: "Kenntnisprüfung",
      endDatum: new Date("Apr 25, 2018 07:45:00"),
      topic: possibleTopics.Prüfung
    },
    {
      bezeichnung: "Projektarbeit",
      endDatum: new Date("May 07, 2018 12:00:00"),
      topic: possibleTopics.Prüfung
    },
    {
      bezeichnung: "Mündliche",
      endDatum: new Date("June 14, 2018 10:00:00"),
      topic: possibleTopics.Prüfung
    }
  ] as CountdownObject[];

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

export const getTopicList = () => {
  let topicArray = [] as topic[];
  for (const bezeichnung in possibleTopics) {
    let countdownListForBezeichnung = getCountdownlist(possibleTopics[bezeichnung]);
    topicArray.push({
      countdownList: countdownListForBezeichnung,
      bezeichnung: possibleTopics[bezeichnung].bezeichnung,
      color: possibleTopics[bezeichnung].color
    });
  }
  return topicArray;
};
export const possibleTopics = {
  Arbeit: {
    bezeichnung: "Arbeit",
    color: "red"
  },
  Prüfung: {
    bezeichnung: "Prüfung",
    color: "blue"
  },
  Zuhause: {
    bezeichnung: "Zuhause",
    color: "green"
  }
} as any;
