import { bookNames } from "../../lib/books";
import { getBookContent } from "../../lib/getBookContent";
import styles from "./book.module.scss";
import classNames from "classnames";
import { useState } from "react";
import { append, contains, ifElse, without } from "ramda";

const toggle = (value, list) =>
  ifElse(contains(value), without([value]), append(value))(list);

const BookContent = ({ abr, id, description, content }) => {
  const [selected, setSelected] = useState([]);
  return (
    <div className={styles.bookContainer}>
      <h1>{description}</h1>
      <div className={styles.selectedVerses}>
        {selected.map((s) => s.split(":").map(Number).join(":")).join(",")}
      </div>
      {Object.entries(content).map(([chapter, verses]) => (
        <div>
          <h2>{+chapter}</h2>
          <hr />
          {verses.map(({ chapter, verse, text }) => (
            <div
              key={`${chapter}:${verse}`}
              className={classNames(styles.verseContainer, {
                [styles["verseContainer--selected"]]: selected.includes(
                  `${chapter}:${verse}`
                )
              })}
              onClick={() =>
                setSelected(toggle(`${chapter}:${verse}`, selected))
              }
            >
              <span className={styles.verseRef}>{+verse}</span>
              <span className={styles.verseText}>{text}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BookContent;

export async function getStaticPaths() {
  const paths = bookNames;

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params: { abr } }) {
  const book = bookNames.find((book) => book.params.abr === abr)?.params;
  const content = getBookContent(book.id);
  console.log({ content });
  return {
    props: {
      ...book,
      content
    }
  };
}
