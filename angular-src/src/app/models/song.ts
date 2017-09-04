export interface Song {
    title: string;
    artist: string;
    user: string;
    sections: [
        {
            lines: [
                {
                    chords: string,
                    words: string
                }
            ]
        }
    ];
    keywords: string[];
}