import Link from "next/link";
import { bookNames } from "../lib/books";

export default function IndexPage() {
  return (
    <div>
      <h1>Livros</h1>
      {bookNames.map((book) => (
        <div key={book.params.id}>
          <Link href={`/book/${book.params.abr}`}>
            <a>{book.params.description}</a>
          </Link>
        </div>
      ))}
    </div>
  );
}
