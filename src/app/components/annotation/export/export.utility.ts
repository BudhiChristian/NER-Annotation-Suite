export const positionalTagOptions = ['None', 'BILOU Tagging', 'BIOU Tagging', 'BIO Tagging', 'BIEOS Tagging']

export function getAdditionalTagMap(additionalTagginType: string) {
    switch(additionalTagginType) {
        case 'BIO Tagging':
            return {
                'B': 'B',
                'I': 'I',
                'L': 'I',
                'O': 'O',
                'U': 'B'
            }
        case 'BIOU Tagging':
            return {
                'B': 'B',
                'I': 'I',
                'L': 'I',
                'O': 'O',
                'U': 'U'
            } 
        case 'BIEOS Tagging':
            return {
                'B': 'B',
                'I': 'I',
                'L': 'E',
                'O': 'O',
                'U': 'S'
            } 
        default:
            return {
                'B': 'B',
                'I': 'I',
                'L': 'L',
                'O': 'O',
                'U': 'U'
            }
    }
}