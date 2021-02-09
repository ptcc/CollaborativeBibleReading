import books from "../data/book_names.txt";
import { getBookContent } from "./getBookContent";
import { isEmpty } from "ramda";

export const bookNames = books
  .split("\n")
  .map((line) => {
    const result = /(?<id>\w{3})\s{2}(\w{3}\s{2}(?:(?!\s{2}).)+)\s{3,}(\w{3}\s{2}(?:(?!\s{2}).)+)\s{3,}(?<por>\w{3})\s{2}(?<portugues>(?:(?!\s{2}).)+)/.exec(
      line
    );
    const { id, por, portugues } = result?.groups || {};
    return {
      params: {
        id,
        abr: por,
        description: portugues
      }
    };
  })
  .filter((item) => item.params.id && item.params.description)
  .slice(1)
  .filter(({ params: { id } }) => !isEmpty(getBookContent(id)));
