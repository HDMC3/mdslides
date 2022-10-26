import { MarpThemeData } from '../types/marp-theme-data';

const marpDefaultDarkThemeColors = [
    '#c9d1d9',
    '#0d1117',
    '#30363d',
    '#246',
    'rgba(102, 102, 102, 0.75)'
];

const marpDefaultDarkTheme = /* css */`
/* stylelint-disable no-descending-specificity -- https://github.com/stylelint/stylelint/issues/5065 */
/*!
 * Marp default theme.
 *
 * @theme default
 * @author Yuki Hattori
 *
 * @auto-scaling true
 * @size 16:9 1280px 720px
 * @size 4:3 960px 720px
 */
/*Github markdown css*/
.markdown-body, section {
    --color-prettylights-syntax-comment: #8b949e;
    --color-prettylights-syntax-constant: #79c0ff;
    --color-prettylights-syntax-entity: #d2a8ff;
    --color-prettylights-syntax-storage-modifier-import: #c9d1d9;
    --color-prettylights-syntax-entity-tag: #7ee787;
    --color-prettylights-syntax-keyword: #ff7b72;
    --color-prettylights-syntax-string: #a5d6ff;
    --color-prettylights-syntax-variable: #ffa657;
    --color-prettylights-syntax-markup-list: #f2cc60;
    --color-prettylights-syntax-markup-heading: #1f6feb;
    --color-prettylights-syntax-markup-italic: #c9d1d9;
    --color-prettylights-syntax-markup-bold: #c9d1d9;
    --color-prettylights-syntax-markup-deleted-text: #ffdcd7;
    --color-prettylights-syntax-markup-deleted-bg: #67060c;
    --color-prettylights-syntax-markup-inserted-text: #aff5b4;
    --color-prettylights-syntax-markup-inserted-bg: #033a16;
    --color-fg-default: #c9d1d9;
    --color-canvas-default: #0d1117;
    --color-border-default: #30363d;
  }
  
  .markdown-body, section {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    margin: 0;
    color: var(--color-fg-default);
    background-color: var(--color-canvas-default);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
  }
  
  /*HIGHLIGHT JS GITHUB*/
  /*!
    Theme: GitHub
    Description: Light theme as seen on github.com
    Author: github.com
    Maintainer: @Hirse
    Updated: 2021-05-15
  
    Outdated base version: https://github.com/primer/github-syntax-light
    Current colors taken from GitHub's CSS
  */
  .hljs {
    color: #24292e;
    background: #ffffff;
  }
  
  .hljs-doctag,
  .hljs-keyword,
  .hljs-meta .hljs-keyword,
  .hljs-template-tag,
  .hljs-template-variable,
  .hljs-type,
  .hljs-variable.language_ {
    /* prettylights-syntax-keyword */
    color: #d73a49;
  }
  
  .hljs-title,
  .hljs-title.class_,
  .hljs-title.class_.inherited__,
  .hljs-title.function_ {
    /* prettylights-syntax-entity */
    color: #6f42c1;
  }
  
  .hljs-attr,
  .hljs-attribute,
  .hljs-literal,
  .hljs-meta,
  .hljs-number,
  .hljs-operator,
  .hljs-variable,
  .hljs-selector-attr,
  .hljs-selector-class,
  .hljs-selector-id {
    /* prettylights-syntax-constant */
    color: #005cc5;
  }
  
  .hljs-regexp,
  .hljs-string,
  .hljs-meta .hljs-string {
    /* prettylights-syntax-string */
    color: #032f62;
  }
  
  .hljs-built_in,
  .hljs-symbol {
    /* prettylights-syntax-variable */
    color: #e36209;
  }
  
  .hljs-comment,
  .hljs-code,
  .hljs-formula {
    /* prettylights-syntax-comment */
    color: #6a737d;
  }
  
  .hljs-name,
  .hljs-quote,
  .hljs-selector-tag,
  .hljs-selector-pseudo {
    /* prettylights-syntax-entity-tag */
    color: #22863a;
  }
  
  .hljs-subst {
    /* prettylights-syntax-storage-modifier-import */
    color: #24292e;
  }
  
  .hljs-section {
    /* prettylights-syntax-markup-heading */
    color: #005cc5;
    font-weight: bold;
  }
  
  .hljs-bullet {
    /* prettylights-syntax-markup-list */
    color: #735c0f;
  }
  
  .hljs-emphasis {
    /* prettylights-syntax-markup-italic */
    color: #24292e;
    font-style: italic;
  }
  
  .hljs-strong {
    /* prettylights-syntax-markup-bold */
    color: #24292e;
    font-weight: bold;
  }
  
  .hljs-addition {
    /* prettylights-syntax-markup-inserted */
    color: #22863a;
    background-color: #f0fff4;
  }
  
  .hljs-deletion {
    /* prettylights-syntax-markup-deleted */
    color: #b31d28;
    background-color: #ffeef0;
  }
  
  .hljs-char.escape_,
  .hljs-link,
  .hljs-params,
  .hljs-property,
  .hljs-punctuation,
  .hljs-tag {
    /* purposely ignored */
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-block-end: 0;
  }

  h1 {
    border-bottom: none;
    color: var(--h1-color);
    font-size: 2.25em;
  }
  
  h2 {
    border-bottom: none;
    font-size: 1.9em;
  }
  
  h3 {
    font-size: 1.7em;
  }
  
  h4 {
    font-size: 1.5em;
  }
  
  h5 {
    font-size: 1.4em;
  }
  
  h6 {
    font-size: 1.3em;
  }
  
  h1 strong,
  h2 strong,
  h3 strong,
  h4 strong,
  h5 strong,
  h6 strong {
    font-weight: inherit;
    color: var(--heading-strong-color);
  }
  h1::part(auto-scaling),
  h2::part(auto-scaling),
  h3::part(auto-scaling),
  h4::part(auto-scaling),
  h5::part(auto-scaling),
  h6::part(auto-scaling) {
    max-height: 563px;
  }
  
  hr {
    height: 0;
    padding-top: 0.25em;
  }
  
  pre {
    border: 2px solid var(--color-border-default);
    line-height: 1.15;
    overflow: visible;
    padding: 0.75em;
    border-radius: 0.25em;
    margin: 0;
    background-color: #242424;
    /* stylelint-disable selector-class-pattern */
    /* stylelint-enable selector-class-pattern */
  }
  pre::part(auto-scaling) {
    max-height: 529px;
  }
  pre :where(.hljs) {
    color: var(--color-prettylights-syntax-storage-modifier-import);
  }
  pre :where(.hljs-doctag),
  pre :where(.hljs-keyword),
  pre :where(.hljs-meta .hljs-keyword),
  pre :where(.hljs-template-tag),
  pre :where(.hljs-template-variable),
  pre :where(.hljs-type),
  pre :where(.hljs-variable.language_) {
    color: var(--color-prettylights-syntax-keyword);
  }
  pre :where(.hljs-title),
  pre :where(.hljs-title.class_),
  pre :where(.hljs-title.class_.inherited__),
  pre :where(.hljs-title.function_) {
    color: var(--color-prettylights-syntax-entity);
  }
  pre :where(.hljs-attr),
  pre :where(.hljs-attribute),
  pre :where(.hljs-literal),
  pre :where(.hljs-meta),
  pre :where(.hljs-number),
  pre :where(.hljs-operator),
  pre :where(.hljs-selector-attr),
  pre :where(.hljs-selector-class),
  pre :where(.hljs-selector-id),
  pre :where(.hljs-variable) {
    color: var(--color-prettylights-syntax-constant);
  }
  pre :where(.hljs-string),
  pre :where(.hljs-meta .hljs-string),
  pre :where(.hljs-regexp) {
    color: var(--color-prettylights-syntax-string);
  }
  pre :where(.hljs-built_in),
  pre :where(.hljs-symbol) {
    color: var(--color-prettylights-syntax-variable);
  }
  pre :where(.hljs-code),
  pre :where(.hljs-comment),
  pre :where(.hljs-formula) {
    color: var(--color-prettylights-syntax-comment);
  }
  pre :where(.hljs-name),
  pre :where(.hljs-quote),
  pre :where(.hljs-selector-pseudo),
  pre :where(.hljs-selector-tag) {
    color: var(--color-prettylights-syntax-entity-tag);
  }
  pre :where(.hljs-subst) {
    color: var(--color-prettylights-syntax-storage-modifier-import);
  }
  pre :where(.hljs-section) {
    font-weight: bold;
    color: var(--color-prettylights-syntax-markup-heading);
  }
  pre :where(.hljs-bullet) {
    color: var(--color-prettylights-syntax-markup-list);
  }
  pre :where(.hljs-emphasis) {
    font-style: italic;
    color: var(--color-prettylights-syntax-markup-italic);
  }
  pre :where(.hljs-strong) {
    font-weight: bold;
    color: var(--color-prettylights-syntax-markup-bold);
  }
  pre :where(.hljs-addition) {
    color: var(--color-prettylights-syntax-markup-inserted-text);
    background-color: var(--color-prettylights-syntax-markup-inserted-bg);
  }
  pre :where(.hljs-deletion) {
    color: var(--color-prettylights-syntax-markup-deleted-text);
    background-color: var(--color-prettylights-syntax-markup-deleted-bg);
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  table thead {
    background-color: #242424;
  }
  table tbody {
    background-color: #343434;
  }
  
  table th,
  table td {
    padding: 0.2em 0.5em;
    border-width: 3px;
  }

  table thead tr th:first-child {
    border-radius: 0.25em 0 0 0;
  }

  table thead tr th:last-child {
    border-radius: 0 0.25em 0 0;
  }

  table tbody tr:last-child td:first-child {
    border-radius: 0 0 0 0.25em;
  }

  table tbody tr:last-child td:last-child {
    border-radius: 0 0 0.25em 0;
  }
  
  header,
  footer {
    margin: 0;
    position: absolute;
    left: 30px;
    color: var(--header-footer-color);
    font-size: 18px;
  }
  
  header {
    top: 21px;
  }
  
  footer {
    bottom: 21px;
  }
  
  section {
    /* stylelint-disable-next-line scss/at-extend-no-missing-placeholder */
    --h1-color: #cee7ff;
    --header-footer-color: rgba(153, 153, 153, 0.75);
    --heading-strong-color: #7bf;
    --paginate-color: #999;
    align-items: stretch;
    display: flex;
    flex-flow: column nowrap;
    font-size: 29px;
    height: 720px;
    justify-content: center;
    padding: 78.5px;
    width: 1280px;
  }
  section > *:last-child, section[data-footer] > :nth-last-child(2) {
    margin-bottom: 0;
  }
  section > *:first-child,
  section > header:first-child + * {
    margin-top: 0;
  }
  section::after {
    position: absolute;
    padding: 0;
    right: 30px;
    bottom: 21px;
    font-size: 24px;
    color: var(--paginate-color);
  }
  section[data-color] h1,
  section[data-color] h2,
  section[data-color] h3,
  section[data-color] h4,
  section[data-color] h5,
  section[data-color] h6 {
    color: currentcolor;
  }
  
  /*# sourceMappingURL=default-dark.css.map */
  
`;


export const MARP_DEFAULT_DARK_THEME: MarpThemeData = {
    name: 'Default Dark',
    theme: marpDefaultDarkTheme,
    colors: marpDefaultDarkThemeColors
};
