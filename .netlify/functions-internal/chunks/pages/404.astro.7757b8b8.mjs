import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, d as renderComponent, u as unescapeHTML, F as Fragment, e as renderHead, m as maybeRenderHead, s as spreadAttributes, f as renderSlot } from '../astro.f03c80ea.mjs';
import { optimize } from 'svgo';
/* empty css                                     */
const title = "My Astro Blog";
const description = "My musings about the Astro framework";
const image = {
	src: "/images/image-default.jpg",
	alt: "My Astro Blog"
};
const siteData = {
	title: title,
	description: description,
	image: image
};

const slugify = (text) => {
  return text
    .toString()
    .toLocaleLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const formatDate = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join(".");
};

const getCustomFormatDate = (date) => {
  let today = new Date();
  let yesterday = new Date();
  let dateValue = new Date(date);

  const dropHMS = (date) => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0, 0);
  };

  yesterday.setDate(today.getDate() - 1);

  dropHMS(today);
  dropHMS(yesterday);
  dropHMS(dateValue);

  if (date) {
    if (today.getTime() === dateValue.getTime()) {
      return "Сегодня";
    } else if (yesterday.getTime() === dateValue.getTime()) {
      return "Вчера";
    } else {
      return formatDate(date);
    }
  }
};

function formatBlogPosts(
  posts,
  {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = false,
    sortById = true,
    limit = undefined,
  } = {}
) {
  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;
    // filterOutDrafts if true
    if (filterOutDrafts && draft) return acc;

    // filterOutFuturePosts if true
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    // add post to acc
    acc.push(post);

    return acc;
  }, []);

  // sotrByDate or randomize
  if (sortByDate) {
    filteredPosts.sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );
  } else if (sortById) {
    filteredPosts.sort((a, b) => a.frontmatter.id - b.frontmatter.id);
  } else {
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  // limit if number is passed
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;
}

function jsonLDGenerator({ type, post, url }) {
  if (type === "post") {
    return `<script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${url}"
        },
        "headline": "${post.title}",
        "description": "${post.description}",
        "image": "${post.image.src}",
        "author": {
          "@type": "Person",
          "name": "${post.author}",
          "url": "/author/${slugify(post.author)}"
        },
        "datePublished": "${post.date}"
      }
    </script>`;
  }
  return `<script type="application/ld+json">
      {
      "@context": "https://schema.org/",
      "@type": "WebSite",
      "name": "${siteData.title}",
      "url": "${"https://astro-technocats.netlify.app/"}"
      }
    </script>`;
}

const $$Astro$a = createAstro("https://astro-technocats.netlify.app/");
const $$Seo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Seo;
  const {
    title,
    description,
    url = Astro2.url,
    image,
    frontmatter,
    robots
  } = Astro2.props;
  const jsonLD = jsonLDGenerator({
    type: frontmatter ? "post" : "website",
    post: frontmatter,
    url
  });
  return renderTemplate`<!-- SEO --><link rel="canonical"${addAttribute(url, "href")}>

<!-- Open Graph -->
<meta property="og:site_name" content="My Astro Blog">
<meta property="og:title"${addAttribute(title, "content")}>
<meta property="og:description"${addAttribute(description, "content")}>
<meta property="og:url"${addAttribute(url, "content")}>
<meta property="og:image"${addAttribute(image?.src || siteData.image.src, "content")}>
<meta property="og:image:url"${addAttribute(image?.src || siteData.image.src, "content")}>
<meta property="og:image:secure_url"${addAttribute(image?.src || siteData.image.src, "content")}>
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="600">
<meta property="og:image:alt"${addAttribute(image?.alt || siteData.image.alt, "content")}>

<!-- Twitter -->
<meta name="twitter:title"${addAttribute(title, "content")}>
<meta name="twitter:description"${addAttribute(description, "content")}>
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image"${addAttribute(image?.src || siteData.image.src, "content")}>
<meta name="twitter:image:alt"${addAttribute(title, "content")}>
<meta name="twitter:domain"${addAttribute("https://astro-technocats.netlify.app/", "content")}>

${robots && renderTemplate`<meta name="robots" content="noindex, nofollow">`}

<!-- JSON LD -->
${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(jsonLD)}` })}`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/src/components/Seo.astro");

const $$Astro$9 = createAstro("https://astro-technocats.netlify.app/");
const $$MainHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$MainHead;
  const { title, description, image, frontmatter, robots } = Astro2.props;
  return renderTemplate`<head>
  <meta charset="utf-8">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta name="viewport" content="width=device-width">
  <meta name="generator"${addAttribute(Astro2.generator, "content")}>
  <title>${title}</title>
  <meta name="description"${addAttribute(description, "content")}>

  ${renderComponent($$result, "Seo", $$Seo, { "title": title, "description": description, "url": Astro2.url, "image": image, "frontmatter": frontmatter, "robots": robots })}

  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
${renderHead($$result)}</head>`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/src/layouts/MainHead.astro");

const __vite_glob_1_0 = "<svg id=\"Layer_1\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\">\n    <title>pawprint4-glyph</title>\n    <path\n        d=\"M59,325.39c5.93,21.09-2,41.76-17.77,46.22S7.91,362.57,2,341.47s2-41.78,17.77-46.22S53.08,304.28,59,325.39Z\"\n        fill=\"#5b5b5f\" />\n    <path\n        d=\"M98.72,257c5.83,20.66-1.74,40.84-16.9,45.15s-32.19-9-38-29.65,1.77-40.83,16.93-45.13S92.89,236.42,98.72,257Z\"\n        fill=\"#5b5b5f\" />\n    <path\n        d=\"M168.85,245.89c5.93,21.09-1.37,41.62-16.35,45.84s-31.9-9.47-37.89-30.53S116,219.61,131,215.36,162.89,224.81,168.85,245.89Z\"\n        fill=\"#5b5b5f\" />\n    <path\n        d=\"M236.9,291.43c5.62,20-2.56,39.76-18.27,44.19s-33-8.16-38.68-28.11,2.53-39.76,18.27-44.2S231.26,271.46,236.9,291.43Z\"\n        fill=\"#5b5b5f\" />\n    <path\n        d=\"M97.58,447.24s-49,15-46.33-48A179.93,179.93,0,0,1,76.65,357.8s13.58-21.75,16-29.58c0,0,16.19-41.5,53.79-11.57,0,0,31.56,30.39,43.66,33.64,0,0,41.05,25,20.67,62.26,0,0-20,22.66-38,13C172.78,425.54,128.33,405.36,97.58,447.24Z\"\n        fill=\"#5b5b5f\" />\n    <path\n        d=\"M336.91,150.43c-4.11,21.52-20.49,36.48-36.6,33.38s-25.73-23-21.62-44.53,20.49-36.45,36.57-33.37S341,128.92,336.91,150.43Z\"\n        fill=\"#5b5b5f\" />\n    <path\n        d=\"M403,107.1c-4,21.08-19.85,35.75-35.33,32.79S342.9,117.44,347,96.37s19.83-35.75,35.3-32.8S407,86,403,107.1Z\"\n        fill=\"#5b5b5f\" />\n    <path\n        d=\"M470.7,128.54c-4.14,21.5-19.85,36.57-35.15,33.64s-24.31-22.74-20.17-44.24,19.83-36.61,35.12-33.68S474.81,107,470.7,128.54Z\"\n        fill=\"#5b5b5f\" />\n    <path\n        d=\"M511.15,199.67c-3.9,20.41-20,34.42-36.12,31.36S449.13,209,453,188.56s20.09-34.39,36.15-31.32S515,179.32,511.15,199.67Z\"\n        fill=\"#5b5b5f\" />\n    <path\n        d=\"M316.82,276.66s-50.47-8.48-19.93-63.65a179.79,179.79,0,0,1,41.26-25.71S360,173.94,365.73,168c0,0,33-29.85,53.29,13.74,0,0,14.61,41.32,24,49.65,0,0,25.5,40.75-9.39,64.93,0,0-28.05,11.3-39.84-5.4C393.79,290.92,363,253,316.82,276.66Z\"\n        fill=\"#5b5b5f\" />\n</svg>";

const SPRITESHEET_NAMESPACE = `astroicon`;

const baseURL = "https://api.astroicon.dev/v1/";
const requests = /* @__PURE__ */ new Map();
const fetchCache = /* @__PURE__ */ new Map();
async function get(pack, name) {
  const url = new URL(`./${pack}/${name}`, baseURL).toString();
  if (requests.has(url)) {
    return await requests.get(url);
  }
  if (fetchCache.has(url)) {
    return fetchCache.get(url);
  }
  let request = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const contentType = res.headers.get("Content-Type");
    if (!contentType.includes("svg")) {
      throw new Error(`[astro-icon] Unable to load "${name}" because it did not resolve to an SVG!

Recieved the following "Content-Type":
${contentType}`);
    }
    const svg = await res.text();
    fetchCache.set(url, svg);
    requests.delete(url);
    return svg;
  };
  let promise = request();
  requests.set(url, promise);
  return await promise;
}

const splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim;
const domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;
const splitAttrs = (str) => {
  let res = {};
  let token;
  if (str) {
    splitAttrsTokenizer.lastIndex = 0;
    str = " " + (str || "") + " ";
    while (token = splitAttrsTokenizer.exec(str)) {
      res[token[1]] = token[3];
    }
  }
  return res;
};
function optimizeSvg(contents, name, options) {
  return optimize(contents, {
    plugins: [
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeXMLNS",
      "removeEditorsNSData",
      "cleanupAttrs",
      "minifyStyles",
      "convertStyleToAttrs",
      {
        name: "cleanupIDs",
        params: { prefix: `${SPRITESHEET_NAMESPACE}:${name}` }
      },
      "removeRasterImages",
      "removeUselessDefs",
      "cleanupNumericValues",
      "cleanupListOfValues",
      "convertColors",
      "removeUnknownsAndDefaults",
      "removeNonInheritableGroupAttrs",
      "removeUselessStrokeAndFill",
      "removeViewBox",
      "cleanupEnableBackground",
      "removeHiddenElems",
      "removeEmptyText",
      "convertShapeToPath",
      "moveElemsAttrsToGroup",
      "moveGroupAttrsToElems",
      "collapseGroups",
      "convertPathData",
      "convertTransform",
      "removeEmptyAttrs",
      "removeEmptyContainers",
      "mergePaths",
      "removeUnusedNS",
      "sortAttrs",
      "removeTitle",
      "removeDesc",
      "removeDimensions",
      "removeStyleElement",
      "removeScriptElement"
    ]
  }).data;
}
const preprocessCache = /* @__PURE__ */ new Map();
function preprocess(contents, name, { optimize }) {
  if (preprocessCache.has(contents)) {
    return preprocessCache.get(contents);
  }
  if (optimize) {
    contents = optimizeSvg(contents, name);
  }
  domParserTokenizer.lastIndex = 0;
  let result = contents;
  let token;
  if (contents) {
    while (token = domParserTokenizer.exec(contents)) {
      const tag = token[2];
      if (tag === "svg") {
        const attrs = splitAttrs(token[3]);
        result = contents.slice(domParserTokenizer.lastIndex).replace(/<\/svg>/gim, "").trim();
        const value = { innerHTML: result, defaultProps: attrs };
        preprocessCache.set(contents, value);
        return value;
      }
    }
  }
}
function normalizeProps(inputProps) {
  const size = inputProps.size;
  delete inputProps.size;
  const w = inputProps.width ?? size;
  const h = inputProps.height ?? size;
  const width = w ? toAttributeSize(w) : void 0;
  const height = h ? toAttributeSize(h) : void 0;
  return { ...inputProps, width, height };
}
const toAttributeSize = (size) => String(size).replace(/(?<=[0-9])x$/, "em");
async function load(name, inputProps, optimize) {
  const key = name;
  if (!name) {
    throw new Error("<Icon> requires a name!");
  }
  let svg = "";
  let filepath = "";
  if (name.includes(":")) {
    const [pack, ..._name] = name.split(":");
    name = _name.join(":");
    filepath = `/src/icons/${pack}`;
    let get$1;
    try {
      const files = /* #__PURE__ */ Object.assign({

});
      const keys = Object.fromEntries(
        Object.keys(files).map((key2) => [key2.replace(/\.[cm]?[jt]s$/, ""), key2])
      );
      if (!(filepath in keys)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const mod = files[keys[filepath]];
      if (typeof mod.default !== "function") {
        throw new Error(
          `[astro-icon] "${filepath}" did not export a default function!`
        );
      }
      get$1 = mod.default;
    } catch (e) {
    }
    if (typeof get$1 === "undefined") {
      get$1 = get.bind(null, pack);
    }
    const contents = await get$1(name, inputProps);
    if (!contents) {
      throw new Error(
        `<Icon pack="${pack}" name="${name}" /> did not return an icon!`
      );
    }
    if (!/<svg/gim.test(contents)) {
      throw new Error(
        `Unable to process "<Icon pack="${pack}" name="${name}" />" because an SVG string was not returned!

Recieved the following content:
${contents}`
      );
    }
    svg = contents;
  } else {
    filepath = `/src/icons/${name}.svg`;
    try {
      const files = /* #__PURE__ */ Object.assign({"/src/icons/logomark.svg": __vite_glob_1_0});
      if (!(filepath in files)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const contents = files[filepath];
      if (!/<svg/gim.test(contents)) {
        throw new Error(
          `Unable to process "${filepath}" because it is not an SVG!

Recieved the following content:
${contents}`
        );
      }
      svg = contents;
    } catch (e) {
      throw new Error(
        `[astro-icon] Unable to load "${filepath}". Does the file exist?`
      );
    }
  }
  const { innerHTML, defaultProps } = preprocess(svg, key, { optimize });
  if (!innerHTML.trim()) {
    throw new Error(`Unable to parse "${filepath}"!`);
  }
  return {
    innerHTML,
    props: { ...defaultProps, ...normalizeProps(inputProps) }
  };
}

const $$Astro$8 = createAstro("https://astro-technocats.netlify.app/");
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Icon;
  let { name, pack, title, optimize = true, class: className, ...inputProps } = Astro2.props;
  let props = {};
  if (pack) {
    name = `${pack}:${name}`;
  }
  let innerHTML = "";
  try {
    const svg = await load(name, { ...inputProps, class: className }, optimize);
    innerHTML = svg.innerHTML;
    props = svg.props;
  } catch (e) {
    {
      throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
    }
  }
  return renderTemplate`${maybeRenderHead($$result)}<svg${spreadAttributes(props)}${addAttribute(name, "astro-icon")}>${unescapeHTML((title ? `<title>${title}</title>` : "") + innerHTML)}</svg>`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/node_modules/astro-icon/lib/Icon.astro");

const sprites = /* @__PURE__ */ new WeakMap();
function trackSprite(request, name) {
  let currentSet = sprites.get(request);
  if (!currentSet) {
    currentSet = /* @__PURE__ */ new Set([name]);
  } else {
    currentSet.add(name);
  }
  sprites.set(request, currentSet);
}
const warned = /* @__PURE__ */ new Set();
async function getUsedSprites(request) {
  const currentSet = sprites.get(request);
  if (currentSet) {
    return Array.from(currentSet);
  }
  if (!warned.has(request)) {
    const { pathname } = new URL(request.url);
    console.log(`[astro-icon] No sprites found while rendering "${pathname}"`);
    warned.add(request);
  }
  return [];
}

const $$Astro$7 = createAstro("https://astro-technocats.netlify.app/");
const $$Spritesheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Spritesheet;
  const { optimize = true, style, ...props } = Astro2.props;
  const names = await getUsedSprites(Astro2.request);
  const icons = await Promise.all(names.map((name) => {
    return load(name, {}, optimize).then((res) => ({ ...res, name })).catch((e) => {
      {
        throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
      }
    });
  }));
  return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(`position: absolute; width: 0; height: 0; overflow: hidden; ${style ?? ""}`.trim(), "style")}${spreadAttributes({ "aria-hidden": true, ...props })} astro-icon-spritesheet>
    ${icons.map((icon) => renderTemplate`<symbol${spreadAttributes(icon.props)}${addAttribute(`${SPRITESHEET_NAMESPACE}:${icon.name}`, "id")}>${unescapeHTML(icon.innerHTML)}</symbol>`)}
</svg>`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/node_modules/astro-icon/lib/Spritesheet.astro");

const $$Astro$6 = createAstro("https://astro-technocats.netlify.app/");
const $$SpriteProvider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$SpriteProvider;
  const content = await Astro2.slots.render("default");
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}
${renderComponent($$result, "Spritesheet", $$Spritesheet, {})}`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/node_modules/astro-icon/lib/SpriteProvider.astro");

const $$Astro$5 = createAstro("https://astro-technocats.netlify.app/");
const $$Sprite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Sprite;
  let { name, pack, title, class: className, x, y, ...inputProps } = Astro2.props;
  const props = normalizeProps(inputProps);
  if (pack) {
    name = `${pack}:${name}`;
  }
  const href = `#${SPRITESHEET_NAMESPACE}:${name}`;
  trackSprite(Astro2.request, name);
  return renderTemplate`${maybeRenderHead($$result)}<svg${spreadAttributes(props)}${addAttribute(className, "class")}${addAttribute(name, "astro-icon")}>
    ${title ? renderTemplate`<title>${title}</title>` : ""}
    <use${spreadAttributes({ "xlink:href": href, width: props.width, height: props.height, x, y })}></use>
</svg>`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/node_modules/astro-icon/lib/Sprite.astro");

Object.assign($$Sprite, { Provider: $$SpriteProvider });

const $$Astro$4 = createAstro("https://astro-technocats.netlify.app/");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead($$result)}<footer>
  <div>
    <small>
      Copyright &copy; <span id="copyright"></span> | All rights reserved
    </small>
    <small>
      <a href="/rss.xml">
        Subscribe to RSS
        ${renderComponent($$result, "Icon", $$Icon, { "name": "tabler:rss", "width": "20", "height": "20" })}
      </a>
    </small>
  </div>
</footer>`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/src/components/Footer.astro");

const $$Astro$3 = createAstro("https://astro-technocats.netlify.app/");
const $$Link = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Link;
  const {
    text,
    href,
    style,
    icon,
    isFilled = true,
    borderVisible = false,
    classes,
    ...rest
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")}${addAttribute([
    "link",
    classes,
    style,
    { filled: isFilled, bordered: borderVisible }
  ], "class:list")}${spreadAttributes(rest)}>
  ${icon && icon.side === "left" && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon.name, "height": "24", "width": "24" })}`}

  <span>${text}</span>

  ${icon && icon.side === "right" && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon.name, "height": "24", "width": "24" })}`}
</a>`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/src/components/Link.astro");

const navData = [
    {
        name: "About",
        path: "/about/",
        icon: "ic:outline-info",
    },
    {
        name: "Blog",
        path: "/blog/",
        icon: "emojione-v1:pages",
    },
];

const $$Astro$2 = createAstro("https://astro-technocats.netlify.app/");
const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Nav;
  return renderTemplate`${maybeRenderHead($$result)}<nav aria-label="Primary">
  <div class="navbar">
    <a href="/" class="logomark" aria-label="Go home">
      ${renderComponent($$result, "Icon", $$Icon, { "name": "logomark", "width": "60" })}
    </a>
    <ul>
      ${navData.map((item) => renderTemplate`<li>
            ${renderComponent($$result, "Link", $$Link, { "href": item.path, "text": item.name, "style": "primary", "isFilled": false, "icon": {
    name: item.icon,
    side: "right"
  } })}
          </li>`)}
    </ul>
  </div>
</nav>`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/src/components/Nav.astro");

const $$Astro$1 = createAstro("https://astro-technocats.netlify.app/");
const $$MainLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const {
    title = "Birka internship",
    description = "Learning the basics of Astro",
    image,
    frontmatter,
    robots
  } = Astro2.props;
  return renderTemplate`<html lang="en">
  ${renderComponent($$result, "MainHead", $$MainHead, { "title": title, "description": description, "image": image, "frontmatter": frontmatter, "robots": robots })}
  ${maybeRenderHead($$result)}<body>
    ${renderComponent($$result, "Nav", $$Nav, {})}
    <main>
      ${renderSlot($$result, $$slots["default"], renderTemplate`Default`)}
    </main>
    ${renderComponent($$result, "Footer", $$Footer, {})}
  </body></html>`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/src/layouts/MainLayout.astro");

const $$Astro = createAstro("https://astro-technocats.netlify.app/");
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Page Not Found", "description": "This page not found" }, { "default": ($$result2) => renderTemplate`
    ${maybeRenderHead($$result2)}<div class="container"${addAttribute({
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    gap: "var(--space-sm)"
  }, "style")}>
        <div>
            <h1 class="h1">Welp, this is awkward!</h1>
            <p>We seem to have misplaced something...</p>
        </div>
        ${renderComponent($$result2, "Link", $$Link, { "href": "/", "style": "secondary", "text": "Go Home", "icon": {
    name: "ic:outline-other-houses",
    side: "left"
  } })}
    </div>
` })}`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/src/pages/404.astro");

const $$file = "/home/user/Desktop/pet-projects/technocats-team-blog/src/pages/404.astro";
const $$url = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Link as $, _404 as _, $$MainLayout as a, formatBlogPosts as b, formatDate as f, getCustomFormatDate as g, slugify as s };
