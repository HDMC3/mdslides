import { EditorView } from '@codemirror/view';

const tooltipBackground = '#353a42';

const textBasicColor = 'var(--text-basic-color)';
const textHintColor = 'var(--text-hint-color)';
const backgroundBasicColor1 = 'var(--background-basic-color-1)';
const backgroundBasicColor2 = 'var(--background-basic-color-2)';
const backgroundBasicColor4 = 'var(--background-basic-color-4)';
const colorBasic800 = 'var(--color-basic-800)';
const colorBasicTransparent600 = 'var(--color-basic-transparent-600)';
const colorControlDefault = 'var(--color-control-default)';
const colorControlActive = 'var(--color-control-active)';
const colorControlHover = 'var(--color-control-hover)';

export const oneDarkTheme = EditorView.theme({
    '&': {
        color: textBasicColor,
        backgroundColor: backgroundBasicColor1
    },

    '.cm-content': {
        caretColor: textHintColor
    },

    '.cm-cursor, .cm-dropCursor': { borderLeftColor: textHintColor },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: colorBasicTransparent600 },

    '.cm-panels': { backgroundColor: backgroundBasicColor4, color: textBasicColor },
    '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
    '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },

    '.cm-button': { border: 'none', backgroundImage: 'none', background: colorControlDefault, color: colorBasic800 },
    '.cm-button:active': { border: 'none', backgroundImage: 'none', background: colorControlActive },
    '.cm-button:hover': { border: 'none', backgroundImage: 'none', background: colorControlHover },
    '.cm-textfield': { color: colorBasic800 },

    '.cm-panel button[name=close]': { color: textBasicColor },

    '.cm-searchMatch': {
        backgroundColor: '#72a1ff59',
        outline: '1px solid #457dff'
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
        backgroundColor: '#6199ff2f'
    },

    '.cm-activeLine': { backgroundColor: '#6699ff0b' },
    '.cm-selectionMatch': { backgroundColor: '#aafe661a' },

    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
        backgroundColor: '#bad0f847',
        outline: '1px solid #515a6b'
    },

    '.cm-gutters': {
        backgroundColor: backgroundBasicColor2,
        color: textHintColor,
        border: 'none'
    },

    '.cm-activeLineGutter': {
        backgroundColor: backgroundBasicColor4
    },

    '.cm-foldPlaceholder': {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#ddd'
    },

    '.cm-tooltip': {
        border: 'none',
        backgroundColor: backgroundBasicColor4
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent'
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
        borderTopColor: tooltipBackground,
        borderBottomColor: tooltipBackground
    },
    '.cm-tooltip-autocomplete': {
        '& > ul > li[aria-selected]': {
            backgroundColor: colorBasicTransparent600,
            color: textBasicColor
        }
    },
    '.ͼb': { color: 'var(--text-primary-focus-color)' },
    '.ͼc': {
        color: textHintColor
    },
    '.ͼd': { color: 'var(--text-warning-focus-color)' },
    '.ͼe': { color: 'var(--text-danger-focus-color)' },
    '.ͼf': { color: 'var(--text-danger-hover-color)' },
    '.ͼg': { color: '#940' },
    '.ͼh': { color: '#708' },
    '.ͼi': { color: 'var(--text-warning-color)' },
    '.ͼj': { color: 'var(--text-success-color)' },
    '.ͼk': { color: 'var(--text-success-focus-color)' },
    '.ͼl': { color: 'var(--text-info-color)' },
    '.ͼm': { color: 'var(--text-primary-color)' },
    '.ͼn': { color: 'var(--text-danger-color)' }
}, { dark: false });
