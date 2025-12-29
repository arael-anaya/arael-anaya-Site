const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";

let cachedToken = null;
let tokenExpiresAt = 0;

async function getSpotifyToken() {
    const now = Date.now();
    if (cachedToken && now < tokenExpiresAt) {
        return cachedToken;
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
        },
        body: "grant_type=client_credentials"
    });

    const data = await response.json();
    cachedToken = data.access_token;
    tokenExpiresAt = now + data.expires_in * 1000;
    return cachedToken;
}


export async function fetchSong(query) {
    const token = await getSpotifyToken();

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`;

    const response = await fetch(url, {
        headers: {
        "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Spotify search failed");
    }

    const data = await response.json();
    const track = data.tracks.items[0];
    if (!track) return null;

    return {
        id: track.id,
        title: track.name,
        subtitle: track.artists.map(a => a.name).join(", "),
        image: track.album.images[0]?.url ?? "",
        external_url: track.external_urls.spotify,
        source: "Spotify",
        meta: track.album.release_date?.slice(0, 4) ?? ""
    };
}

