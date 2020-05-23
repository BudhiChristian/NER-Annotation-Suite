import { TagInfo } from 'src/app/domain/tag-info.domain'
import { TaggedData } from 'src/app/domain/tagged-data.domain'

export const positionalTagOptions = ['None', 'BILOU Tagging', 'BIOU Tagging', 'BIO Tagging', 'BIEOS Tagging']

export function matchTokenToTag(data: TaggedData, taggingType: string) {
    let entities = [];
    let startIndex = 0;
    for(let token of data.sentence.split(' ')) {
        let endIndex = startIndex + token.length;
        let ents = data.entities.filter(entity => entity.start <= startIndex && entity.end >= endIndex);
        entities.push({
            id: entities.length,
            text: token,
            label: getPositionalTagFormat(ents.length>0 && ents[0], startIndex, endIndex, taggingType),
            start: startIndex,
            end: endIndex
        })
        startIndex += (token.length + 1)
    }
    return entities
}

function getPositionalTagMap(additionalTagginType: string) {
    switch (additionalTagginType) {
        case 'BIO Tagging':
            return {
                'B': 'B-',
                'I': 'I-',
                'L': 'I-',
                'O': 'O',
                'U': 'B-'
            }
        case 'BILOU Tagging':
            return {
                'B': 'B-',
                'I': 'I-',
                'L': 'L-',
                'O': 'O',
                'U': 'U-'
            }
        case 'BIOU Tagging':
            return {
                'B': 'B-',
                'I': 'I-',
                'L': 'I-',
                'O': 'O',
                'U': 'U-'
            }
        case 'BIEOS Tagging':
            return {
                'B': 'B-',
                'I': 'I-',
                'L': 'E-',
                'O': 'O',
                'U': 'S-'
            }
        default:
            return {
                'B': '',
                'I': '',
                'L': '',
                'O': '',
                'U': ''
            }
    }
}

function getPositionalTagFormat(entity: TagInfo, start: number, end: number, taggingType: string) {
    let tagMap = getPositionalTagMap(taggingType)
    if (entity) {
        if (entity.start == start && entity.end == end) {
            return `${tagMap['U']}${entity.tag.name}`;
        } else if (entity.start == start) {
            return `${tagMap['B']}${entity.tag.name}`;
        } else if (entity.end == end) {
            return `${tagMap['L']}${entity.tag.name}`;
        } else {
            return `${tagMap['I']}${entity.tag.name}`;
        }
    } else {
        return tagMap['O']
    }
}