const LASTFM_API_KEY = "a25ada10d1834fff0fd3ad7b8d5489b3";

export async function fetchSong(query) {
    // Expect "Track Artist"
    const [track, ...artistParts] = query.split(" ");
    const artist = artistParts.join(" ");

    const url = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(track)}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Last.fm request failed");
    }

    const data = await response.json();
    const result = data.results?.trackmatches?.track?.[0];
    if (!result) return null;

    return {
        id: `${result.artist}-${result.name}`,
        title: result.name,
        subtitle: result.artist,
        image: result.image?.pop()?.["#text"] ?? "",
        external_url: result.url,
        source: "Last.fm",
        meta: ""
    };
}
