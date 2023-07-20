import { _ as __vite_glob_0_0 } from './aleksei-smirnov.md.36450c21.mjs';
import { _ as __vite_glob_0_1 } from './alexander-semenov.md.67b0cb3b.mjs';
import { _ as __vite_glob_0_2 } from './dmitry-mytnikau.md.94a3af1b.mjs';
import { _ as __vite_glob_0_3 } from './elizaveta-obrezkova.md.1a270bd8.mjs';
import { _ as __vite_glob_0_4 } from './igor-teplostanski.md.7121f871.mjs';
import { _ as __vite_glob_0_5 } from './maria-kikot.md.395f5c0e.mjs';
import rss from '@astrojs/rss';
import { b as formatBlogPosts } from './404.astro.7757b8b8.mjs';
import 'kleur/colors';
import 'node:fs/promises';
import 'node:path';
import 'node:url';
import 'http-cache-semantics';
import 'node:os';
import 'image-size';
import 'magic-string';
import 'mime';
import 'node:stream';
import '../astro.f03c80ea.mjs';
import 'cookie';
import 'slash';
import 'path-to-regexp';
import 'html-escaper';
import 'string-width';
import 'react';
import 'react/jsx-runtime';
import 'firebase/firestore';
import 'firebase/app';
import 'svgo';
/* empty css                                     */
const postImportResult = /* #__PURE__ */ Object.assign({"./blog/aleksei-smirnov.md": __vite_glob_0_0,"./blog/alexander-semenov.md": __vite_glob_0_1,"./blog/dmitry-mytnikau.md": __vite_glob_0_2,"./blog/elizaveta-obrezkova.md": __vite_glob_0_3,"./blog/igor-teplostanski.md": __vite_glob_0_4,"./blog/maria-kikot.md": __vite_glob_0_5});
const posts = formatBlogPosts(Object.values(postImportResult));

const get = () =>
  rss({
    stylesheet: "/rss/styles.xsl",
    title: "My Astro Blog",
    description: "A humble Astronaut’s guide to the stars",
    site: "https://astro-technocats.netlify.app/",
    items: posts.map((post) => ({
      link: post.url,
      title: post.frontmatter.title,
      pubDate: post.frontmatter.date,
      description: post.frontmatter.description,
      customData: `
      <author>${post.frontmatter.author}</author>
    `,
    })),
  });

export { get };
