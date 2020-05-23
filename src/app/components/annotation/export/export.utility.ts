import { TagInfo } from 'src/app/domain/tag-info.domain'

export const positionalTagOptions = ['None', 'BILOU Tagging', 'BIOU Tagging', 'BIO Tagging', 'BIEOS Tagging']

export function getPositionalTagMap(additionalTagginType: string) {
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

export function getPositionalTagFormat(entity: TagInfo, start: number, end: number, taggingType: string) {
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