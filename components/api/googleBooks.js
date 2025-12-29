export async function fetchBook(query) {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Google Books request failed");
    }

    const data = await response.json();
    const book = data.items?.[0];
    if (!book) return null;

    const info = book.volumeInfo;

    return {
        id: book.id,
        title: info.title,
        subtitle: info.authors?.[0] ?? "",
        image: info.imageLinks?.thumbnail ?? "",
        external_url: info.infoLink,
        source: "Google Books",
        meta: info.publishedDate?.slice(0, 4) ?? ""
    };
}
