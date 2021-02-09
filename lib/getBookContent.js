import text from "../data/almeida2020_.txt";
import { groupBy, prop } from "ramda";

export const getBookContent = (id) =>
  groupBy(
    prop("chapter"),
    text
      .split("\n")
      .filter((line) => line.startsWith(`${id} `))
      .map(
        (line) =>
          /\w{3}\s(?<chapter>\d{3}):(?<verse>\d{3})\s(?<text>.*)/.exec(line)
            ?.groups
      )
  );
