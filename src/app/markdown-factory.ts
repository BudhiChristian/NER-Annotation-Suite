import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';


export function MarkOptionsFactory(): MarkedOptions {
    const renderer = new MarkedRenderer();

    renderer.image = (href, title, text) => {
        return `<img class='ngx-markdown-image' src='${href}' ${title ? `title=${title}` : ''} alt='${text}'>`
    }

    renderer.paragraph = (text) => {
        return `<p class='ngx-markdown-paragraph'>${text}</p>`
    }

    return {
        renderer: renderer,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
    };
}