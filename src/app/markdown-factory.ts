import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';


export function MarkOptionsFactory(): MarkedOptions {
    const renderer = new MarkedRenderer();

    renderer.image = (href: string, title: string, text: string) => {
        return `<img class='ngx-markdown-image' src='${href}' ${title ? `title=${title}` : ''} alt='${text}'>`
    }

    renderer.paragraph = (text) => {
        let mock = document.createElement('html')
        mock.innerHTML = text
        let images = mock.getElementsByTagName('img')
        let descriptions = mock.getElementsByTagName('em')

        if (images.length == 1 && descriptions.length == 1) {
            return renderImageWithDescription(images[0], descriptions[0])
        }
        return `<p class='ngx-markdown-paragraph'>${text}</p>`
    }

    renderer.heading = (text: string, level) => {
        const h = `h${Math.min(level+1, 6)}`
        const id = text.toLowerCase().split(' ').join('-')
        return `<${h} id='${id}'>${text}</${h}>`
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

function renderImageWithDescription(image: HTMLImageElement, description: HTMLElement): string {
    const href = image.src;
    const title = image.title;
    const text = image.alt
    return `<div class='ngx-markdown-described-image'>
        <img class='ngx-markdown-image' src='${href}' ${title ? `title=${title}` : ''} alt='${text}'>
        <em class='ngx-markdown-description'>${description.innerHTML}</em>
    </div>
    `
}