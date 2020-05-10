export interface TableOfContents {
    sections: string[],
    details: { [sectionTitle: string]: ContentInfo }
}

export interface ContentInfo {
    title: string;
    url: string;
    sectionIds: string[];
}