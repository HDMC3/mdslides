import { MarpThemeData } from '../types/marp-theme-data';

const marpGaiaThemeColors = [
    '#fff8e1',
    'rgba(69, 90, 100, 0.1)',
    '#455a64',
    '#6a7a7d',
    '#0288d1'
];

const marpGaiaTheme = /* css */`
@charset "UTF-8";
/*!
 * Marp / Marpit Gaia theme.
 *
 * @theme gaia
 * @author Yuki Hattori
 *
 * @auto-scaling true
 * @size 16:9 1280px 720px
 * @size 4:3 960px 720px
 */
@import 'https://fonts.bunny.net/css?family=Lato:400,900|Roboto+Mono:400,700&display=swap';

/* SUNBURST STYLES */

/*

Sunburst-like style (c) Vasily Polovnyov <vast@whiteants.net>

*/

.hljs {
    background: #000;
    color: #f8f8f8;
  }
  
  .hljs-comment,
  .hljs-quote {
    color: #aeaeae;
    font-style: italic;
  }
  
  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-type {
    color: #e28964;
  }
  
  .hljs-string {
    color: #65b042;
  }
  
  .hljs-subst {
    color: #daefa3;
  }
  
  .hljs-regexp,
  .hljs-link {
    color: #e9c062;
  }
  
  .hljs-title,
  .hljs-section,
  .hljs-tag,
  .hljs-name {
    color: #89bdff;
  }
  
  .hljs-title.class_,
  .hljs-class .hljs-title,
  .hljs-doctag {
    text-decoration: underline;
  }
  
  .hljs-symbol,
  .hljs-bullet,
  .hljs-number {
    color: #3387cc;
  }
  
  .hljs-params,
  .hljs-variable,
  .hljs-template-variable {
    color: #3e87e3;
  }
  
  .hljs-attribute {
    color: #cda869;
  }
  
  .hljs-meta {
    color: #8996a8;
  }
  
  .hljs-formula {
    background-color: #0e2231;
    color: #f8f8f8;
    font-style: italic;
  }
  
  .hljs-addition {
    background-color: #253b22;
    color: #f8f8f8;
  }
  
  .hljs-deletion {
    background-color: #420e09;
    color: #f8f8f8;
  }
  
  .hljs-selector-class {
    color: #9b703f;
  }
  
  .hljs-selector-id {
    color: #8b98ab;
  }
  
  .hljs-emphasis {
    font-style: italic;
  }
  
  .hljs-strong {
    font-weight: bold;
  }




/* GAIA THEME */

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0.5em 0 0;
}
h1 strong,
h2 strong,
h3 strong,
h4 strong,
h5 strong,
h6 strong {
  font-weight: inherit;
}
h1::part(auto-scaling),
h2::part(auto-scaling),
h3::part(auto-scaling),
h4::part(auto-scaling),
h5::part(auto-scaling),
h6::part(auto-scaling) {
  max-height: 580px;
}

h1 {
  font-size: 1.8em;
}

h2 {
  font-size: 1.5em;
}

h3 {
  font-size: 1.3em;
}

h4 {
  font-size: 1.1em;
}

h5 {
  font-size: 1em;
}

h6 {
  font-size: 0.9em;
}

p,
blockquote {
  margin: 1em 0 0;
}

ul > li,
ol > li {
  margin: 0.3em 0 0;
}
ul > li > p,
ol > li > p {
  margin: 0.6em 0 0;
}

code {
  display: inline-block;
  font-family: "Roboto Mono", monospace;
  font-size: 0.8em;
  letter-spacing: 0;
  margin: -0.1em 0.15em;
  padding: 0.1em 0.2em;
  vertical-align: baseline;
}

pre {
  display: block;
  margin: 1em 0 0;
  overflow: visible;
}
pre code {
  box-sizing: border-box;
  margin: 0;
  min-width: 100%;
  padding: 0.5em;
  font-size: 0.7em;
}
pre::part(auto-scaling) {
  max-height: calc(580px - 1em);
}

blockquote {
  margin: 1em 0 0;
  padding: 0 1em;
  position: relative;
}
blockquote::after, blockquote::before {
  content: "“";
  display: block;
  font-family: "Times New Roman", serif;
  font-weight: bold;
  position: absolute;
}
blockquote::before {
  top: 0;
  left: 0;
}
blockquote::after {
  right: 0;
  bottom: 0;
  transform: rotate(180deg);
}
blockquote > *:first-child {
  margin-top: 0;
}

mark {
  background: transparent;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
  margin: 1em 0 0;
}
table th,
table td {
  padding: 0.2em 0.4em;
  border-width: 1px;
  border-style: solid;
}

header,
footer,
section::after {
  box-sizing: border-box;
  font-size: 66%;
  height: 70px;
  line-height: 50px;
  overflow: hidden;
  padding: 10px 25px;
  position: absolute;
}

header {
  left: 0;
  right: 0;
  top: 0;
}

footer {
  left: 0;
  right: 0;
  bottom: 0;
}

section {
  background-color: var(--color-background);
  background-image: linear-gradient(135deg, rgba(136, 136, 136, 0), rgba(136, 136, 136, 0.02) 50%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.05));
  color: var(--color-foreground);
  font-size: 35px;
  font-family: Lato, "Avenir Next", Avenir, "Trebuchet MS", "Segoe UI", sans-serif;
  height: 720px;
  line-height: 1.35;
  letter-spacing: 1.25px;
  padding: 70px;
  width: 1280px;
  word-wrap: break-word;
  --color-background: #fff8e1;
  --color-background-stripe: rgba(69, 90, 100, 0.1);
  --color-foreground: #455a64;
  --color-dimmed: #6a7a7d;
  --color-highlight: #0288d1;
}
section::after {
  right: 0;
  bottom: 0;
  font-size: 80%;
}
section a,
section mark {
  color: var(--color-highlight);
}
section code {
  background: var(--color-dimmed);
  color: var(--color-background);
}
section h1 strong,
section h2 strong,
section h3 strong,
section h4 strong,
section h5 strong,
section h6 strong {
  color: var(--color-highlight);
}
section pre {
  background: var(--color-foreground);
}
section pre > code {
  background: transparent;
}
section header,
section footer,
section section::after,
section blockquote::before,
section blockquote::after {
  color: var(--color-dimmed);
}
section table th,
section table td {
  border-color: var(--color-foreground);
}
section table thead th {
  background: var(--color-foreground);
  color: var(--color-background);
}
section table tbody > tr:nth-child(odd) td,
section table tbody > tr:nth-child(odd) th {
  background: var(--color-background-stripe, transparent);
}
section > *:first-child,
section > header:first-child + * {
  margin-top: 0;
}
section:where(.invert) {
  --color-background: #455a64;
  --color-background-stripe: rgba(255, 248, 225, 0.1);
  --color-foreground: #fff8e1;
  --color-dimmed: #dad8c8;
  --color-highlight: #81d4fa;
}
section:where(.gaia) {
  --color-background: #0288d1;
  --color-background-stripe: rgba(255, 248, 225, 0.1);
  --color-foreground: #fff8e1;
  --color-dimmed: #cce2de;
  --color-highlight: #81d4fa;
}
section:where(.lead) {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  /* stylelint-disable-next-line no-descending-specificity */
}
section:where(.lead) h1,
section:where(.lead) h2,
section:where(.lead) h3,
section:where(.lead) h4,
section:where(.lead) h5,
section:where(.lead) h6 {
  text-align: center;
}
section:where(.lead) p {
  text-align: center;
}
section:where(.lead) blockquote > h1,
section:where(.lead) blockquote > h2,
section:where(.lead) blockquote > h3,
section:where(.lead) blockquote > h4,
section:where(.lead) blockquote > h5,
section:where(.lead) blockquote > h6,
section:where(.lead) blockquote > p {
  text-align: left;
}
section:where(.lead) ul > li > p,
section:where(.lead) ol > li > p {
  text-align: left;
}
section:where(.lead) table {
  margin-left: auto;
  margin-right: auto;
}

/*# sourceMappingURL=gaia.css.map */

`;

export const MARP_GAIA_THEME: MarpThemeData = {
    name: 'Gaia',
    theme: marpGaiaTheme,
    colors: marpGaiaThemeColors
};
