import { MarpThemeData } from '../types/marp-theme-data';

const marpUncoverThemeColors = [
    '#fdfcff',
    '#009dd5',
    '#202228',
    'rgba(32, 34, 40, 0.4)',
    '#f2f1f4',
    'rgba(32, 34, 40, 0.05)',
    '#087eaa',
    '#33b1dd',
    'rgba(253, 252, 255, 0.8)'
];

const marpUncoverTheme = /* css */`
@charset "UTF-8";
/*!
 * Marp / Marpit Uncover theme
 *
 * @theme uncover
 * @author Yuki Hattori
 *
 * @auto-scaling true
 * @size 16:9 1280px 720px
 * @size 4:3 960px 720px
 */
section {
  background: var(--color-background);
  color: var(--color-foreground);
  display: flex;
  flex-flow: column nowrap;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 40px;
  height: 720px;
  justify-content: center;
  letter-spacing: 3px;
  line-height: 1.4;
  padding: 30px 70px;
  position: relative;
  text-align: center;
  width: 1280px;
  word-wrap: break-word;
  z-index: 0;
  --color-background: #fdfcff;
  --color-highlight: #009dd5;
  --color-foreground: #202228;
  --color-header: rgba(32, 34, 40, 0.4);
  --color-background-code: #f2f1f4;
  --color-background-paginate: rgba(32, 34, 40, 0.05);
  --color-highlight-hover: #087eaa;
  --color-highlight-heading: #33b1dd;
  --color-header-shadow: rgba(253, 252, 255, 0.8);
}
section::after {
  align-items: flex-end;
  background: linear-gradient(-45deg, var(--color-background-paginate) 50%, transparent 50%);
  background-size: cover;
  color: var(--color-foreground);
  display: flex;
  font-size: 0.6em;
  height: 80px;
  justify-content: flex-end;
  padding: 30px;
  text-align: right;
  text-shadow: 0 0 5px var(--color-background);
  width: 80px;
}
section:where(:not(.invert)) {
  /*@import '~highlight.js/styles/color-brewer';*/
  /*

  Colorbrewer theme
  Original: https://github.com/mbostock/colorbrewer-theme (c) Mike Bostock <mike@ocks.org>
  Ported by Fabrício Tavares de Oliveira

  */

  .hljs {
    color: #000;
    background: #fff;
  }

  .hljs-subst {
    /* default */
  }

  .hljs-string,
  .hljs-meta,
  .hljs-symbol,
  .hljs-template-tag,
  .hljs-template-variable,
  .hljs-addition {
    color: #756bb1;
  }

  .hljs-comment,
  .hljs-quote {
    color: #636363;
  }

  .hljs-number,
  .hljs-regexp,
  .hljs-literal,
  .hljs-bullet,
  .hljs-link {
    color: #31a354;
  }

  .hljs-deletion,
  .hljs-variable {
    color: #88f;
  }



  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-title,
  .hljs-section,
  .hljs-built_in,
  .hljs-doctag,
  .hljs-type,
  .hljs-tag,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class,
  .hljs-strong {
    color: #3182bd;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-attribute {
    color: #e6550d;
  }
}
section:where(:not(.invert)) .hljs {
  color: #000;
  background: #fff;
}
section:where(:not(.invert)) .hljs-subst {
  /* default */
}
section:where(:not(.invert)) .hljs-string,
section:where(:not(.invert)) .hljs-meta,
section:where(:not(.invert)) .hljs-symbol,
section:where(:not(.invert)) .hljs-template-tag,
section:where(:not(.invert)) .hljs-template-variable,
section:where(:not(.invert)) .hljs-addition {
  color: #756bb1;
}
section:where(:not(.invert)) .hljs-comment,
section:where(:not(.invert)) .hljs-quote {
  color: #636363;
}
section:where(:not(.invert)) .hljs-number,
section:where(:not(.invert)) .hljs-regexp,
section:where(:not(.invert)) .hljs-literal,
section:where(:not(.invert)) .hljs-bullet,
section:where(:not(.invert)) .hljs-link {
  color: #31a354;
}
section:where(:not(.invert)) .hljs-deletion,
section:where(:not(.invert)) .hljs-variable {
  color: #88f;
}
section:where(:not(.invert)) .hljs-keyword,
section:where(:not(.invert)) .hljs-selector-tag,
section:where(:not(.invert)) .hljs-title,
section:where(:not(.invert)) .hljs-section,
section:where(:not(.invert)) .hljs-built_in,
section:where(:not(.invert)) .hljs-doctag,
section:where(:not(.invert)) .hljs-type,
section:where(:not(.invert)) .hljs-tag,
section:where(:not(.invert)) .hljs-name,
section:where(:not(.invert)) .hljs-selector-id,
section:where(:not(.invert)) .hljs-selector-class,
section:where(:not(.invert)) .hljs-strong {
  color: #3182bd;
}
section:where(:not(.invert)) .hljs-emphasis {
  font-style: italic;
}
section:where(:not(.invert)) .hljs-attribute {
  color: #e6550d;
}
section:where(.invert) {
  --color-background: #202228;
  --color-background-code: #2b2d33;
  --color-background-paginate: rgba(255, 255, 255, 0.05);
  --color-foreground: #fff;
  --color-highlight: #60d0f0;
  --color-highlight-hover: #88dcf4;
  --color-highlight-heading: #80d9f3;
  --color-header: rgba(255, 255, 255, 0.4);
  --color-header-shadow: rgba(32, 34, 40, 0.8);
  /*@import '~highlight.js/styles/codepen-embed';*/
  /*
    codepen.io Embed Theme
    Author: Justin Perry <http://github.com/ourmaninamsterdam>
    Original theme - https://github.com/chriskempson/tomorrow-theme
  */
  .hljs {
    background: #222;
    color: #fff;
  }

  .hljs-comment,
  .hljs-quote {
    color: #777;
  }

  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag,
  .hljs-regexp,
  .hljs-meta,
  .hljs-number,
  .hljs-built_in,
  .hljs-literal,
  .hljs-params,
  .hljs-symbol,
  .hljs-bullet,
  .hljs-link,
  .hljs-deletion {
    color: #ab875d;
  }

  .hljs-section,
  .hljs-title,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class,
  .hljs-type,
  .hljs-attribute {
    color: #9b869b;
  }

  .hljs-string,
  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-addition {
    color: #8f9c6c;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }
}
section:where(.invert) .hljs {
  background: #222;
  color: #fff;
}
section:where(.invert) .hljs-comment,
section:where(.invert) .hljs-quote {
  color: #777;
}
section:where(.invert) .hljs-variable,
section:where(.invert) .hljs-template-variable,
section:where(.invert) .hljs-tag,
section:where(.invert) .hljs-regexp,
section:where(.invert) .hljs-meta,
section:where(.invert) .hljs-number,
section:where(.invert) .hljs-built_in,
section:where(.invert) .hljs-literal,
section:where(.invert) .hljs-params,
section:where(.invert) .hljs-symbol,
section:where(.invert) .hljs-bullet,
section:where(.invert) .hljs-link,
section:where(.invert) .hljs-deletion {
  color: #ab875d;
}
section:where(.invert) .hljs-section,
section:where(.invert) .hljs-title,
section:where(.invert) .hljs-name,
section:where(.invert) .hljs-selector-id,
section:where(.invert) .hljs-selector-class,
section:where(.invert) .hljs-type,
section:where(.invert) .hljs-attribute {
  color: #9b869b;
}
section:where(.invert) .hljs-string,
section:where(.invert) .hljs-keyword,
section:where(.invert) .hljs-selector-tag,
section:where(.invert) .hljs-addition {
  color: #8f9c6c;
}
section:where(.invert) .hljs-emphasis {
  font-style: italic;
}
section:where(.invert) .hljs-strong {
  font-weight: bold;
}
section > *:first-child, section[data-header] > :nth-child(2) {
  margin-top: 0;
}
section > *:last-child, section[data-footer] > :nth-last-child(2) {
  margin-bottom: 0;
}
section p,
section blockquote {
  margin: 0 0 15px;
}
section h1,
section h2,
section h3,
section h4,
section h5,
section h6 {
  margin: 15px 0 30px;
}
section h1 strong,
section h2 strong,
section h3 strong,
section h4 strong,
section h5 strong,
section h6 strong {
  color: var(--color-highlight-heading);
  font-weight: inherit;
}
section h1::part(auto-scaling),
section h2::part(auto-scaling),
section h3::part(auto-scaling),
section h4::part(auto-scaling),
section h5::part(auto-scaling),
section h6::part(auto-scaling) {
  max-height: 660px;
}
section h1 {
  font-size: 2em;
}
section h2 {
  font-size: 1.7em;
}
section h3 {
  font-size: 1.4em;
  letter-spacing: 2px;
}
section h4 {
  font-size: 1.2em;
  letter-spacing: 2px;
}
section h5 {
  font-size: 1em;
  letter-spacing: 1px;
}
section h6 {
  font-size: 0.8em;
  letter-spacing: 1px;
}
section header,
section footer {
  color: var(--color-header);
  font-size: 0.45em;
  left: 70px;
  letter-spacing: 1px;
  position: absolute;
  right: 70px;
  text-shadow: 0 1px 0 var(--color-header-shadow);
  z-index: 1;
}
section header {
  top: 30px;
}
section footer {
  bottom: 30px;
}
section a {
  color: var(--color-highlight);
  text-decoration: none;
}
section a:hover {
  color: var(--color-highlight-hover);
  text-decoration: underline;
}
section ul,
section ol {
  margin: 0 auto;
  text-align: left;
}
section > ul,
section > ol {
  margin-bottom: 15px;
}
section code {
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace;
  letter-spacing: 0;
}
section > code,
section *:not(pre) > code {
  background: var(--color-background-code);
  color: var(--color-foreground);
  margin: -0.2em 0.2em 0.2em;
  padding: 0.2em;
}
section pre {
  --preserve-aspect-ratio: xMidYMid meet;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.2));
  font-size: 70%;
  line-height: 1.15;
  margin: 15px 0 30px;
  text-align: left;
}
section pre::part(auto-scaling) {
  max-height: 570px;
}
section pre > code {
  background: var(--color-background-code);
  box-sizing: content-box;
  color: var(--color-foreground);
  display: block;
  margin: 0 auto;
  min-width: 456px;
  padding: 0.4em 0.6em;
}
section[data-size="4:3"] pre > code {
  min-width: 328px;
}
section table {
  border-collapse: collapse;
  margin: 0 auto 15px;
}
section table > thead > tr > td,
section table > thead > tr > th,
section table > tbody > tr > td,
section table > tbody > tr > th {
  padding: 0.15em 0.5em;
}
section table > thead > tr > td,
section table > thead > tr > th {
  border-bottom: 3px solid currentcolor;
}
section table > tbody > tr:not(:last-child) > td,
section table > tbody > tr:not(:last-child) > th {
  border-bottom: 1px solid currentcolor;
}
section blockquote {
  font-size: 90%;
  line-height: 1.3;
  padding: 0 2em;
  position: relative;
  z-index: 0;
}
section blockquote::before, section blockquote::after {
  content: url("./assets/uncover-quote.svg");
  height: auto;
  pointer-events: none;
  position: absolute;
  width: 1em;
  z-index: -1;
}
section blockquote::before {
  left: 0;
  top: 0;
}
section blockquote::after {
  bottom: 0;
  right: 0;
  transform: rotate(180deg);
}
section blockquote > *:last-child {
  margin-bottom: 0;
}
section mark {
  color: var(--color-highlight);
  background: transparent;
}

/*# sourceMappingURL=uncover.css.map */

`;

export const MARP_UNCOVER_THEME: MarpThemeData = {
    name: 'Uncover',
    theme: marpUncoverTheme,
    colors: marpUncoverThemeColors
};
