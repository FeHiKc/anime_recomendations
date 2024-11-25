export default async function fetchAnimeByName(query) {
    const queryBody = `
    query ($search: String) {
        Page(perPage: 10) {
            media(search: $search, type: ANIME) {
                id
                title {
                    english
                    romaji
                    native
                }
                averageScore
                coverImage {
                    medium
                }
            }
        }
    }`;

    const variables = { search: query };

    try {
        const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: queryBody, variables }),
        });

        const data = await response.json();
        return data.data.Page.media.map((anime) => ({
            id: anime.id,
            title: anime.title,
            averageScore: anime.averageScore,
            coverImage: anime.coverImage.medium,
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}
