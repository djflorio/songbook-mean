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

export interface Block {
    chord: string;
    word: string;
}

export interface ParsedLine {
    blocks: Block[];
}

export interface ParsedSection {
    lines: ParsedLine[];
}

export interface ParsedSong {
    sections: ParsedSection[];
}