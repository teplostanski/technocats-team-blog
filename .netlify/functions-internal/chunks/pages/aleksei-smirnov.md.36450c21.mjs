import 'kleur/colors';
import 'node:fs/promises';
import 'node:path';
import 'node:url';
import 'http-cache-semantics';
import 'node:os';
import 'image-size';
import 'magic-string';
import mime from 'mime';
import 'node:stream';
import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, b as addAttribute, d as renderComponent, _ as __astro_tag_component__, f as renderSlot, g as createVNode, F as Fragment$1 } from '../astro.f03c80ea.mjs';
import { s as slugify, f as formatDate, b as formatBlogPosts, g as getCustomFormatDate, a as $$MainLayout } from './404.astro.7757b8b8.mjs';
import React, { useCallback, useState, useEffect } from 'react';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

function isOutputFormat(value) {
  return ["avif", "jpeg", "jpg", "png", "webp", "svg"].includes(value);
}
function isOutputFormatSupportsAlpha(value) {
  return ["avif", "png", "webp"].includes(value);
}
function isAspectRatioString(value) {
  return /^\d*:\d*$/.test(value);
}
function parseAspectRatio(aspectRatio) {
  if (!aspectRatio) {
    return void 0;
  }
  if (typeof aspectRatio === "number") {
    return aspectRatio;
  } else {
    const [width, height] = aspectRatio.split(":");
    return parseInt(width) / parseInt(height);
  }
}
function isSSRService(service) {
  return "transform" in service;
}
class BaseSSRService {
  async getImageAttributes(transform) {
    const { width, height, src, format, quality, aspectRatio, ...rest } = transform;
    return {
      ...rest,
      width,
      height
    };
  }
  serializeTransform(transform) {
    const searchParams = new URLSearchParams();
    if (transform.quality) {
      searchParams.append("q", transform.quality.toString());
    }
    if (transform.format) {
      searchParams.append("f", transform.format);
    }
    if (transform.width) {
      searchParams.append("w", transform.width.toString());
    }
    if (transform.height) {
      searchParams.append("h", transform.height.toString());
    }
    if (transform.aspectRatio) {
      searchParams.append("ar", transform.aspectRatio.toString());
    }
    if (transform.fit) {
      searchParams.append("fit", transform.fit);
    }
    if (transform.background) {
      searchParams.append("bg", transform.background);
    }
    if (transform.position) {
      searchParams.append("p", encodeURI(transform.position));
    }
    searchParams.append("href", transform.src);
    return { searchParams };
  }
  parseTransform(searchParams) {
    if (!searchParams.has("href")) {
      return void 0;
    }
    let transform = { src: searchParams.get("href") };
    if (searchParams.has("q")) {
      transform.quality = parseInt(searchParams.get("q"));
    }
    if (searchParams.has("f")) {
      const format = searchParams.get("f");
      if (isOutputFormat(format)) {
        transform.format = format;
      }
    }
    if (searchParams.has("w")) {
      transform.width = parseInt(searchParams.get("w"));
    }
    if (searchParams.has("h")) {
      transform.height = parseInt(searchParams.get("h"));
    }
    if (searchParams.has("ar")) {
      const ratio = searchParams.get("ar");
      if (isAspectRatioString(ratio)) {
        transform.aspectRatio = ratio;
      } else {
        transform.aspectRatio = parseFloat(ratio);
      }
    }
    if (searchParams.has("fit")) {
      transform.fit = searchParams.get("fit");
    }
    if (searchParams.has("p")) {
      transform.position = decodeURI(searchParams.get("p"));
    }
    if (searchParams.has("bg")) {
      transform.background = searchParams.get("bg");
    }
    return transform;
  }
}

function isRemoteImage(src) {
  return /^(https?:)?\/\//.test(src);
}
function removeQueryString(src) {
  const index = src.lastIndexOf("?");
  return index > 0 ? src.substring(0, index) : src;
}
function extname(src) {
  const base = basename(src);
  const index = base.lastIndexOf(".");
  if (index <= 0) {
    return "";
  }
  return base.substring(index);
}
function basename(src) {
  return removeQueryString(src.replace(/^.*[\\\/]/, ""));
}

function resolveSize(transform) {
  if (transform.width && transform.height) {
    return transform;
  }
  if (!transform.width && !transform.height) {
    throw new Error(`"width" and "height" cannot both be undefined`);
  }
  if (!transform.aspectRatio) {
    throw new Error(
      `"aspectRatio" must be included if only "${transform.width ? "width" : "height"}" is provided`
    );
  }
  let aspectRatio;
  if (typeof transform.aspectRatio === "number") {
    aspectRatio = transform.aspectRatio;
  } else {
    const [width, height] = transform.aspectRatio.split(":");
    aspectRatio = Number.parseInt(width) / Number.parseInt(height);
  }
  if (transform.width) {
    return {
      ...transform,
      width: transform.width,
      height: Math.round(transform.width / aspectRatio)
    };
  } else if (transform.height) {
    return {
      ...transform,
      width: Math.round(transform.height * aspectRatio),
      height: transform.height
    };
  }
  return transform;
}
async function resolveTransform(input) {
  if (typeof input.src === "string") {
    return resolveSize(input);
  }
  const metadata = "then" in input.src ? (await input.src).default : input.src;
  let { width, height, aspectRatio, background, format = metadata.format, ...rest } = input;
  if (!width && !height) {
    width = metadata.width;
    height = metadata.height;
  } else if (width) {
    let ratio = parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
    height = height || Math.round(width / ratio);
  } else if (height) {
    let ratio = parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
    width = width || Math.round(height * ratio);
  }
  return {
    ...rest,
    src: metadata.src,
    width,
    height,
    aspectRatio,
    format,
    background
  };
}
async function getImage(transform) {
  var _a, _b, _c;
  if (!transform.src) {
    throw new Error("[@astrojs/image] `src` is required");
  }
  let loader = (_a = globalThis.astroImage) == null ? void 0 : _a.loader;
  if (!loader) {
    const { default: mod } = await import('./endpoint.js.1e319fd8.mjs').then(n => n.s).catch(() => {
      throw new Error(
        "[@astrojs/image] Builtin image loader not found. (Did you remember to add the integration to your Astro config?)"
      );
    });
    loader = mod;
    globalThis.astroImage = globalThis.astroImage || {};
    globalThis.astroImage.loader = loader;
  }
  const resolved = await resolveTransform(transform);
  const attributes = await loader.getImageAttributes(resolved);
  const isDev = (_b = (Object.assign({"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true,"SSR":true,"SITE":"https://astro-technocats.netlify.app/","ASSETS_PREFIX":undefined},{_:process.env._,SSR:true,}))) == null ? void 0 : _b.DEV;
  const isLocalImage = !isRemoteImage(resolved.src);
  const _loader = isDev && isLocalImage ? globalThis.astroImage.defaultLoader : loader;
  if (!_loader) {
    throw new Error("@astrojs/image: loader not found!");
  }
  const { searchParams } = isSSRService(_loader) ? _loader.serializeTransform(resolved) : globalThis.astroImage.defaultLoader.serializeTransform(resolved);
  const imgSrc = !isLocalImage && resolved.src.startsWith("//") ? `https:${resolved.src}` : resolved.src;
  let src;
  if (/^[\/\\]?@astroimage/.test(imgSrc)) {
    src = `${imgSrc}?${searchParams.toString()}`;
  } else {
    searchParams.set("href", imgSrc);
    src = `/_image?${searchParams.toString()}`;
  }
  if ((_c = globalThis.astroImage) == null ? void 0 : _c.addStaticImage) {
    src = globalThis.astroImage.addStaticImage(resolved);
  }
  return {
    ...attributes,
    src
  };
}

async function resolveAspectRatio({ src, aspectRatio }) {
  if (typeof src === "string") {
    return parseAspectRatio(aspectRatio);
  } else {
    const metadata = "then" in src ? (await src).default : src;
    return parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
  }
}
async function resolveFormats({ src, formats }) {
  const unique = new Set(formats);
  if (typeof src === "string") {
    unique.add(extname(src).replace(".", ""));
  } else {
    const metadata = "then" in src ? (await src).default : src;
    unique.add(extname(metadata.src).replace(".", ""));
  }
  return Array.from(unique).filter(Boolean);
}
async function getPicture(params) {
  const { src, alt, widths, fit, position, background } = params;
  if (!src) {
    throw new Error("[@astrojs/image] `src` is required");
  }
  if (!widths || !Array.isArray(widths)) {
    throw new Error("[@astrojs/image] at least one `width` is required. ex: `widths={[100]}`");
  }
  const aspectRatio = await resolveAspectRatio(params);
  if (!aspectRatio) {
    throw new Error("`aspectRatio` must be provided for remote images");
  }
  const allFormats = await resolveFormats(params);
  const lastFormat = allFormats[allFormats.length - 1];
  const maxWidth = Math.max(...widths);
  let image;
  async function getSource(format) {
    const imgs = await Promise.all(
      widths.map(async (width) => {
        const img = await getImage({
          src,
          alt,
          format,
          width,
          fit,
          position,
          background,
          aspectRatio
        });
        if (format === lastFormat && width === maxWidth) {
          image = img;
        }
        return `${img.src} ${width}w`;
      })
    );
    return {
      type: mime.getType(format) || format,
      srcset: imgs.join(",")
    };
  }
  const sources = await Promise.all(allFormats.map((format) => getSource(format)));
  return {
    sources,
    // @ts-expect-error image will always be defined
    image
  };
}

const $$Astro$7 = createAstro("https://astro-technocats.netlify.app/");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Image;
  const { loading = "lazy", decoding = "async", ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    warnForMissingAlt();
  }
  const attrs = await getImage(props);
  return renderTemplate`${maybeRenderHead($$result)}<img${spreadAttributes(attrs)}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}>`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/node_modules/@astrojs/image/components/Image.astro");

const $$Astro$6 = createAstro("https://astro-technocats.netlify.app/");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Picture;
  const {
    src,
    alt,
    sizes,
    widths,
    aspectRatio,
    fit,
    background,
    position,
    formats = ["avif", "webp"],
    loading = "lazy",
    decoding = "async",
    ...attrs
  } = Astro2.props;
  if (alt === void 0 || alt === null) {
    warnForMissingAlt();
  }
  const { image, sources } = await getPicture({
    src,
    widths,
    formats,
    aspectRatio,
    fit,
    background,
    position,
    alt
  });
  delete image.width;
  delete image.height;
  return renderTemplate`${maybeRenderHead($$result)}<picture>
	${sources.map((attrs2) => renderTemplate`<source${spreadAttributes(attrs2)}${addAttribute(sizes, "sizes")}>`)}
	<img${spreadAttributes(image)}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}${spreadAttributes(attrs)}>
</picture>`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/node_modules/@astrojs/image/components/Picture.astro");

let altWarningShown = false;
function warnForMissingAlt() {
  if (altWarningShown === true) {
    return;
  }
  altWarningShown = true;
  console.warn(`
[@astrojs/image] "alt" text was not provided for an <Image> or <Picture> component.

A future release of @astrojs/image may throw a build error when "alt" text is missing.

The "alt" attribute holds a text description of the image, which isn't mandatory but is incredibly useful for accessibility. Set to an empty string (alt="") if the image is not a key part of the content (it's decoration or a tracking pixel).
`);
}

const $$Astro$5 = createAstro("https://astro-technocats.netlify.app/");
const $$PostHeader = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$PostHeader;
  const { title, date, category, author, image } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<header>
    <div class="container">
        <small>
            <a${addAttribute(`/category/${slugify(category)}/`, "href")} class="badge" }>${category}</a>
        </small>
        <h1 class="h2">${title}</h1>
        <p>by <a${addAttribute(`/author/${slugify(author)}/`, "href")}>${author}</a> - ${formatDate(date)} </p>
    </div>
    ${renderComponent($$result, "Image", $$Image, { "src": image.src, "alt": image.alt, "width": "1200", "height": "600", "format": "avif", "fit": "cover", "quality": 80, "aspectRatio": "5:2", "class": "hero-image" })}
</header>`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/src/components/PostHeader.astro");

const $$Astro$4 = createAstro("https://astro-technocats.netlify.app/");
const $$CategoryCloud = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$CategoryCloud;
  const allPosts = await Astro2.glob(/* #__PURE__ */ Object.assign({"../pages/blog/aleksei-smirnov.md": () => Promise.resolve().then(() => __vite_glob_0_0),"../pages/blog/alexander-semenov.md": () => import('./alexander-semenov.md.67b0cb3b.mjs').then(n => n._),"../pages/blog/dmitry-mytnikau.md": () => import('./dmitry-mytnikau.md.94a3af1b.mjs').then(n => n._),"../pages/blog/elizaveta-obrezkova.md": () => import('./elizaveta-obrezkova.md.1a270bd8.mjs').then(n => n._),"../pages/blog/igor-teplostanski.md": () => import('./igor-teplostanski.md.7121f871.mjs').then(n => n._),"../pages/blog/maria-kikot.md": () => import('./maria-kikot.md.395f5c0e.mjs').then(n => n._)}), () => "../pages/blog/*.md");
  const formattedPosts = formatBlogPosts(allPosts, {
    filterOutDrafts: false,
    filterOutFuturePosts: false,
    sortByDate: true,
    limit: 6
  });
  const allCategories = formattedPosts.map((cat) => cat.frontmatter.category.toLowerCase()).flat();
  const processedCats = allCategories.reduce((acc, category) => {
    const value = acc[category] || 0;
    return {
      ...acc,
      [category]: value + 1
    };
  }, {});
  const { showCount } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<ul class="categories">
  ${Object.entries(processedCats).map(([key, val]) => renderTemplate`<li>
        <a class="badge"${addAttribute(`/category/${slugify(key)}/`, "href")}>${key} ${showCount && `(${val})`}</a>
      </li>`)}
</ul>`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/src/components/CategoryCloud.astro");

const $$Astro$3 = createAstro("https://astro-technocats.netlify.app/");
const $$RelatedPosts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$RelatedPosts;
  const { relatedPosts } = Astro2.props;
  return renderTemplate`${relatedPosts.map((post) => renderTemplate`${maybeRenderHead($$result)}<div class="post">
      <h3 class="h4">
        <a${addAttribute(post.url, "href")}>${post.frontmatter.title}</a>
      </h3>
      <small>
        <a${addAttribute(`/author/${slugify(post.frontmatter.author)}/`, "href")}>
          ${post.frontmatter.author}
        </a>${" "}
        • ${formatDate(post.frontmatter.date)}
      </small>
    </div>`)}`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/src/components/RelatedPosts.astro");

const FormButton = ({
  children,
  className,
  disabled,
  ...props
}) => {
  return /* @__PURE__ */ jsx("button", {
    ...props,
    className,
    type: "submit",
    disabled,
    children
  });
};
__astro_tag_component__(FormButton, "@astrojs/react");

const FormInput = (props) => {
  return /* @__PURE__ */ jsx(props.tag, {
    ...props
  });
};
__astro_tag_component__(FormInput, "@astrojs/react");

function useFormWithValidation() {
  const [values, setValues] = React.useState({author: "", comment: ""});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {author: "", comment: ""}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, errors, isValid, resetForm };
}

const firebaseConfig = {
  apiKey: "AIzaSyD9nqE3bvUrZ1RBEJfZq-Q2gvhlVVWa588",
  authDomain: "blog-rating-22da6.firebaseapp.com",
  projectId: "blog-rating-22da6",
  storageBucket: "blog-rating-22da6.appspot.com",
  messagingSenderId: "341277539245",
  appId: "1:341277539245:web:65b6889ab30241b11abf24",
  measurementId: "G-1VZQ0CFXP1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function NewCommentForm({
  id
}) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm
  } = useFormWithValidation();
  const [isMessageSent, setIsMessageSent] = useState(false);
  const docRef = doc(db, "allComments", `post-${id}-${Date.now()}`);
  function showMessage() {
    setIsMessageSent(true);
    setTimeout(() => {
      setIsMessageSent(false);
    }, 8e3);
  }
  async function addComment() {
    if (!(values.author && values.comment)) {
      return;
    }
    const newComment = {
      id: Date.now(),
      postId: id,
      draft: true,
      author: values.author,
      comment: values.comment,
      date: formatDate(Date.now()),
      likes: 0,
      dislikes: 0
    };
    await setDoc(docRef, newComment);
    resetForm();
    showMessage();
  }
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx("div", {
      className: "comment-form",
      children: /* @__PURE__ */ jsxs("form", {
        name: "comment-form",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "input-container",
          children: [/* @__PURE__ */ jsx(FormInput, {
            tag: "input",
            value: values.author,
            onChange: handleChange,
            id: "name-author",
            name: "author",
            type: "text",
            placeholder: "Your name",
            required: true,
            minLength: "2",
            maxLength: "30",
            pattern: "^[А-Яа-яa-zA-ZёЁ][А-Яа-яa-zA-ZёЁ\\s\\-]+"
          }), /* @__PURE__ */ jsx("span", {
            id: "error-name-author",
            className: "error-message",
            children: errors.author
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "input-container",
          children: [/* @__PURE__ */ jsx(FormInput, {
            tag: "textarea",
            value: values.comment,
            onChange: handleChange,
            id: "comment-text",
            name: "comment",
            type: "text",
            placeholder: "Here you can leave your comment and share your impressions",
            required: true,
            minLength: "10",
            maxLength: "500"
          }), /* @__PURE__ */ jsx("span", {
            id: "error-comment-text",
            className: "error-message",
            children: errors.comment
          })]
        }), /* @__PURE__ */ jsx(FormButton, {
          onClick: (e) => {
            e.preventDefault();
            addComment();
          },
          disabled: isValid ? (
            // && isCaptchaSuccessful
            false
          ) : true,
          className: isValid ? (
            // && isCaptchaSuccessful
            "link secondary filled comment_button"
          ) : "link comment_button_inactive",
          children: /* @__PURE__ */ jsx("span", {
            children: "Add your Comment"
          })
        }), isMessageSent && /* @__PURE__ */ jsx("small", {
          children: "Your comment has been submitted for moderation. After review, it will appear on the website."
        })]
      })
    })
  });
}
__astro_tag_component__(NewCommentForm, "@astrojs/react");

function PersonIcon() {
  return /* @__PURE__ */ jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "30",
    height: "30",
    fill: "#3945c6",
    className: "bi bi-person",
    viewBox: "0 0 16 16",
    children: [" ", /* @__PURE__ */ jsx("path", {
      d: "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
    }), " "]
  });
}
__astro_tag_component__(PersonIcon, "@astrojs/react");

function HandThumbsUpIcon() {
  return /* @__PURE__ */ jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    fill: "currentColor",
    className: "hand-thumbs hand-thumbs-up",
    viewBox: "0 0 16 16",
    children: [" ", /* @__PURE__ */ jsx("path", {
      d: "M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"
    }), " "]
  });
}
__astro_tag_component__(HandThumbsUpIcon, "@astrojs/react");

function HandThumbsDownIcon() {
  return /* @__PURE__ */ jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    fill: "currentColor",
    className: "hand-thumbs hand-thumbs-down",
    viewBox: "0 0 16 16",
    children: [" ", /* @__PURE__ */ jsx("path", {
      d: "M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"
    }), " "]
  });
}
__astro_tag_component__(HandThumbsDownIcon, "@astrojs/react");

function CommentReactionButtons({
  children,
  reaction
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "comment__like_wrapper",
    children: [/* @__PURE__ */ jsx("div", {
      className: "comment__like_icon",
      children
    }), /* @__PURE__ */ jsx("span", {
      children: reaction
    })]
  });
}
__astro_tag_component__(CommentReactionButtons, "@astrojs/react");

const CommentRatingButtons = ({
  comment,
  postId,
  comId
}) => {
  const commentRef = doc(db, "allComments", `${comId}`);
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);
  const handleLikeClick = async () => {
    const comment2 = await getDoc(commentRef);
    const lastVote = localStorage.getItem(`${comId}-lastVote`);
    if (!lastVote) {
      localStorage.setItem(`${comId}-lastVote`, "liked");
      const newRating = {
        likes: ++comment2.data().likes
      };
      setLikes(newRating.likes);
      await updateDoc(commentRef, newRating);
    } else if (lastVote === "liked") {
      return;
    } else if (lastVote === "disliked") {
      localStorage.removeItem(`${comId}-lastVote`);
      localStorage.setItem(`${comId}-lastVote`, "liked");
      const newRating = {
        likes: ++comment2.data().likes,
        dislikes: --comment2.data().dislikes
      };
      setLikes(newRating.likes);
      setDislikes(newRating.dislikes);
      await updateDoc(commentRef, newRating);
    }
  };
  const handleDislikeClick = async () => {
    const comment2 = await getDoc(commentRef);
    const lastVote = localStorage.getItem(`${comId}-lastVote`);
    if (!lastVote) {
      localStorage.setItem(`${comId}-lastVote`, "disliked");
      const newRating = {
        dislikes: ++comment2.data().dislikes
      };
      setDislikes(newRating.dislikes);
      await updateDoc(commentRef, newRating);
    } else if (lastVote === "disliked") {
      return;
    } else if (lastVote === "liked") {
      localStorage.removeItem(`${comId}-lastVote`);
      localStorage.setItem(`${comId}-lastVote`, "disliked");
      const newRating = {
        likes: --comment2.data().likes,
        dislikes: ++comment2.data().dislikes
      };
      setLikes(newRating.likes);
      setDislikes(newRating.dislikes);
      await updateDoc(commentRef, newRating);
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "comment__like",
    children: [/* @__PURE__ */ jsx("button", {
      onClick: handleLikeClick,
      type: "button",
      "aria-label": "Полезно",
      children: /* @__PURE__ */ jsx(CommentReactionButtons, {
        reaction: likes,
        children: /* @__PURE__ */ jsx(HandThumbsUpIcon, {})
      })
    }), /* @__PURE__ */ jsx("button", {
      onClick: handleDislikeClick,
      type: "button",
      "aria-label": "Бесполезно",
      children: /* @__PURE__ */ jsx(CommentReactionButtons, {
        reaction: dislikes,
        children: /* @__PURE__ */ jsx(HandThumbsDownIcon, {})
      })
    })]
  });
};
__astro_tag_component__(CommentRatingButtons, "@astrojs/react");

const $$Astro$2 = createAstro("https://astro-technocats.netlify.app/");
const $$CommentsSSR = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CommentsSSR;
  const { id } = Astro2.props;
  doc(db, "allComments", `post-${id}-${Date.now()}`);
  const commentsCollection = collection(db, "allComments");
  let comments = [];
  const commentsByFirestone = await getDocs(commentsCollection);
  commentsByFirestone.forEach((comment) => {
    comments.push({
      id: comment.id,
      data: comment.data()
    });
  });
  const filtredByPostCommens = comments.filter(
    (comment) => comment.data.postId === id
  );
  const filtredByPostAndDraftComments = filtredByPostCommens.filter(
    (comment) => comment.data.draft === "false"
  );
  const renderCustomDate = (date) => {
    const arr = date.split("");
    [arr[0], arr[3]] = [arr[3], arr[0]];
    [arr[1], arr[4]] = [arr[4], arr[1]];
    const usaFormatDate = arr.join("");
    const ms = Date.parse(usaFormatDate);
    return getCustomFormatDate(ms);
  };
  return renderTemplate`${filtredByPostAndDraftComments.sort((a, b) => a.data.id - b.data.id).map((comment) => renderTemplate`${maybeRenderHead($$result)}<div class="comment">
        <div class="info-about-comment">
          ${renderComponent($$result, "PersonIcon", PersonIcon, {})}
          <div class="info-about-comment__wrapper">
            <h4 class="comment-author">${comment.data.author}</h4>
            <p>${renderCustomDate(comment.data.date)}</p>
          </div>
        </div>
        <p class="comment__text">${comment.data.comment}</p>
        ${renderComponent($$result, "CommentRatingButtons", CommentRatingButtons, { "comment": comment.data, "postId": id, "comId": comment.id, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/user/Desktop/pet-projects/technocats-team-blog/src/components/CommentRatingButtons.jsx", "client:component-export": "default" })}
      </div>`)}`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/src/components/CommentsSSR.astro");

const $$Astro$1 = createAstro("https://astro-technocats.netlify.app/");
const $$Comments = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Comments;
  const { id } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<section style="width: 90%; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; grid-row: 3 / 4;">
  <h2 class="h3">Comments</h2>
  <section class="comments" style="display: flex; flex-direction: column; gap: 5px; ">
    ${renderComponent($$result, "CommentsSSR", $$CommentsSSR, { "id": id })}
    ${renderComponent($$result, "NewCommentForm", NewCommentForm, { "id": id, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/user/Desktop/pet-projects/technocats-team-blog/src/components/NewCommentForm", "client:component-export": "NewCommentForm" })}
  </section>
</section>`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/src/components/Comments.astro");

function Buttons({
  id
}) {
  const [rating, setRating] = useState({
    likes: 0,
    dislikes: 0
  });
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const docRef = doc(db, "rating", `post-${id}`);
  useEffect(() => {
    getRating();
  }, []);
  useEffect(() => {
    if (localStorage.getItem(`post-${id}-lastVote`) === "liked") {
      setIsLiked(true);
      setIsDisliked(false);
    } else if (localStorage.getItem(`post-${id}-lastVote`) === "disliked") {
      setIsLiked(false);
      setIsDisliked(true);
    } else {
      return;
    }
  }, []);
  async function getRating() {
    const rating2 = await getDoc(docRef);
    if (rating2.exists()) {
      setRating({
        likes: rating2.data().likes,
        dislikes: rating2.data().dislikes
      });
    } else {
      const newRating = {
        likes: 0,
        dislikes: 0
      };
      await setDoc(docRef, newRating);
    }
  }
  async function clickLike() {
    const lastVote = localStorage.getItem(`post-${id}-lastVote`);
    if (!lastVote) {
      localStorage.setItem(`post-${id}-lastVote`, "liked");
      setRating({
        likes: ++rating.likes,
        dislikes: rating.dislikes
      });
      setIsLiked(true);
      setIsDisliked(false);
      await updateDoc(docRef, rating);
    } else if (lastVote === "liked") {
      return;
    } else if (lastVote === "disliked") {
      localStorage.removeItem(`post-${id}-lastVote`);
      localStorage.setItem(`post-${id}-lastVote`, "liked");
      setRating({
        likes: ++rating.likes,
        dislikes: --rating.dislikes
      });
      setIsLiked(true);
      setIsDisliked(false);
      await updateDoc(docRef, rating);
    } else {
      console.log("Vote type is not correct");
      return;
    }
  }
  async function clickDislike() {
    const lastVote = localStorage.getItem(`post-${id}-lastVote`);
    if (!lastVote) {
      localStorage.setItem(`post-${id}-lastVote`, "disliked");
      setRating({
        likes: rating.likes,
        dislikes: ++rating.dislikes
      });
      setIsLiked(false);
      setIsDisliked(true);
      await updateDoc(docRef, rating);
    } else if (lastVote === "liked") {
      localStorage.removeItem(`post-${id}-lastVote`);
      localStorage.setItem(`post-${id}-lastVote`, "disliked");
      setRating({
        likes: --rating.likes,
        dislikes: ++rating.dislikes
      });
      setIsLiked(false);
      setIsDisliked(true);
      await updateDoc(docRef, rating);
    } else if (lastVote === "disliked") {
      return;
    } else {
      console.log("Vote type is not correct");
      return;
    }
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "button__container",
    children: [/* @__PURE__ */ jsxs("button", {
      className: `button button-like ${isLiked ? "button__selected" : null}`,
      id: "like",
      onClick: () => clickLike(),
      children: [/* @__PURE__ */ jsx("img", {
        src: "https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/svg/1f44d.svg",
        width: "30",
        height: "30",
        alt: "Кнопка нравится"
      }), /* @__PURE__ */ jsx("span", {
        className: "app-reaction-emoji-count-like",
        children: rating.likes
      })]
    }), /* @__PURE__ */ jsxs("button", {
      className: `button button-dislike ${isDisliked ? "button__selected" : null}`,
      id: "dislike",
      onClick: () => clickDislike(),
      children: [/* @__PURE__ */ jsx("img", {
        src: "https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/svg/1f44e.svg",
        width: "30",
        height: "30",
        alt: "Кнопка не нравится"
      }), /* @__PURE__ */ jsx("span", {
        className: "app-reaction-emoji-count-dislike",
        children: rating.dislikes
      })]
    })]
  });
}
__astro_tag_component__(Buttons, "@astrojs/react");

const $$Astro = createAstro("https://astro-technocats.netlify.app/");
const $$BlogPostLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogPostLayout;
  const { frontmatter } = Astro2.props;
  const { id, title, description, date, category, author, image } = frontmatter;
  const allPosts = await Astro2.glob(/* #__PURE__ */ Object.assign({"../pages/blog/aleksei-smirnov.md": () => Promise.resolve().then(() => __vite_glob_0_0),"../pages/blog/alexander-semenov.md": () => import('./alexander-semenov.md.67b0cb3b.mjs').then(n => n._),"../pages/blog/dmitry-mytnikau.md": () => import('./dmitry-mytnikau.md.94a3af1b.mjs').then(n => n._),"../pages/blog/elizaveta-obrezkova.md": () => import('./elizaveta-obrezkova.md.1a270bd8.mjs').then(n => n._),"../pages/blog/igor-teplostanski.md": () => import('./igor-teplostanski.md.7121f871.mjs').then(n => n._),"../pages/blog/maria-kikot.md": () => import('./maria-kikot.md.395f5c0e.mjs').then(n => n._)}), () => "../pages/blog/*.md");
  const formattedPosts = formatBlogPosts(allPosts, {
    sortByDate: false
  });
  const relatedPosts = formattedPosts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category.toLowerCase() && post.frontmatter.title !== title
  ).slice(0, 3);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description, "image": frontmatter.image, "frontmatter": frontmatter, "robots": frontmatter.robots }, { "default": ($$result2) => renderTemplate`
  ${renderComponent($$result2, "PostHeader", $$PostHeader, { "id": id, "title": title, "description": description, "date": date, "category": category, "image": image, "author": author })}
  ${maybeRenderHead($$result2)}<div class="post-content">
    <div class="content">
      ${renderSlot($$result2, $$slots["default"])}
    </div>
    <div class="sidebar">
      <aside class="container" aria-label="Blog categories">
        <h2 class="h3">Blog Categories</h2>
        ${renderComponent($$result2, "CategoryCloud", $$CategoryCloud, {})}
      </aside>
      ${relatedPosts.length > 0 && renderTemplate`<aside class="container" aria-label="Related posts">
            <h2 class="h3">Related Posts</h2>
            ${renderComponent($$result2, "RelatedPosts", $$RelatedPosts, { "relatedPosts": relatedPosts })}
          </aside>`}
    </div>
    ${renderComponent($$result2, "Buttons", Buttons, { "id": id, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/user/Desktop/pet-projects/technocats-team-blog/src/components/Buttons", "client:component-export": "default" })}
    ${renderComponent($$result2, "Comments", $$Comments, { "id": id })}
  </div>
` })}`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/src/layouts/BlogPostLayout.astro");

const images = {
					
				};

				function updateImageReferences(html) {
					return html.replaceAll(
						/__ASTRO_IMAGE_="(.+)"/gm,
						(full, imagePath) => spreadAttributes({src: images[imagePath].src, ...images[imagePath].attributes})
					);
				}

				const html = updateImageReferences("<p>My name is Aleksei Smirnov. I’m a beginner web-developer. Currently I’m looking for my first job as a frontend developer. I want to find a team with life values which are close to mine.</p>\n<p>I’ve been working for more than 10 years in the field of Power Supply. After graduating from university in 2010 I’ve been working for 4 years as an engineer for an electrical company. Then I’ve realized I want to do something on my own. That’s why I’ve started to work as a self-employed electrician.</p>\n<p>Years go by and now I want to move forward. I’ve always been interested in IT, but something always stopped me from changing my career. 1,5 years ago I made up my mind to do the first steps in programming. And so in January 2023 I graduated from the Yandex “Web-developer” course.</p>\n<p>These days I am working on commercial and pet projects in the field of web-development. As developer I have such skills as:</p>\n<ul>\n<li>basic knowledge of Frontend development,</li>\n<li>basic knowledge of HTML, CSS, JavaScript,</li>\n<li>basic knowledge of React, Redux,</li>\n<li>basic knowledge of Node.js, Express,</li>\n<li>basic knowledge of Figma, Photoshop,</li>\n<li>understanding of principles of web-development,</li>\n<li>understanding of basics of version control systems (Git),</li>\n<li>addiction to learn something new.</li>\n</ul>\n<p>Also I have the background I’ve learned on previous jobs:</p>\n<ul>\n<li>teamwork</li>\n<li>a bit of SMM,</li>\n<li>responsible way of living,</li>\n<li>communication is the key to solve problems</li>\n</ul>\n<p>As you can see I already have a background but my eyes are still wide open to explore this world. Here is some projects of mine:</p>\n<ol>\n<li>\n<p>Georgian alphabet trainer. App which helps to memorize Georgian letters.\n<a href=\"https://sibusky.github.io/georgian-alphabet/\">https://sibusky.github.io/georgian-alphabet/</a></p>\n</li>\n<li>\n<p>Multi Page site layout. Commercial project.\n<a href=\"https://sibusky.github.io/sea-breeze-main/\">https://sibusky.github.io/sea-breeze-main/</a></p>\n</li>\n<li>\n<p>Pet project to learn Redux. Sorting, filtering, adding editing employees in the list.\n<a href=\"https://sibusky.github.io/employees/\">https://sibusky.github.io/employees/</a></p>\n</li>\n</ol>\n<p>Currently working on SPA for an electrical company.</p>\n<p>My contacts are:</p>\n<ul>\n<li>Telegram: @sibusky</li>\n<li>Phone RU: +7 900 552 72 29 (Telegram, WhatsApp only)</li>\n<li>Phone GEO: +995 599 077 481</li>\n<li>GitHub: <a href=\"https://github.com/Sibusky\">https://github.com/Sibusky</a></li>\n<li>email: <a href=\"mailto:5325388@gmail.com\">5325388@gmail.com</a></li>\n</ul>");

				const frontmatter = {"id":1,"layout":"../../layouts/BlogPostLayout.astro","title":"Aleksei Smirnov - \"Finding Your True Calling - Exploring Career Change Options\"","date":"2023-05-08T00:00:00.000Z","author":"Aleksei Smirnov","image":{"src":"/images/aleksei-smirnov.jpg","alt":"Aleksei Smornov's photo"},"description":"Way from electrician to developer!","draft":false,"category":"Astro"};
				const file = "/home/user/Desktop/pet-projects/technocats-team-blog/src/pages/blog/aleksei-smirnov.md";
				const url = "/blog/aleksei-smirnov";
				function rawContent() {
					return "\nMy name is Aleksei Smirnov. I’m a beginner web-developer. Currently I’m looking for my first job as a frontend developer. I want to find a team with life values which are close to mine.\n\nI’ve been working for more than 10 years in the field of Power Supply. After graduating from university in 2010 I’ve been working for 4 years as an engineer for an electrical company. Then I’ve realized I want to do something on my own. That’s why I’ve started to work as a self-employed electrician.\n\nYears go by and now I want to move forward. I’ve always been interested in IT, but something always stopped me from changing my career. 1,5 years ago I made up my mind to do the first steps in programming. And so in January 2023 I graduated from the Yandex “Web-developer” course.\n\nThese days I am working on commercial and pet projects in the field of web-development. As developer I have such skills as:\n\n- basic knowledge of Frontend development,\n- basic knowledge of HTML, CSS, JavaScript,\n- basic knowledge of React, Redux,\n- basic knowledge of Node.js, Express,\n- basic knowledge of Figma, Photoshop,\n- understanding of principles of web-development,\n- understanding of basics of version control systems (Git),\n- addiction to learn something new.\n\nAlso I have the background I’ve learned on previous jobs:\n\n- teamwork\n- a bit of SMM,\n- responsible way of living,\n- communication is the key to solve problems\n\nAs you can see I already have a background but my eyes are still wide open to explore this world. Here is some projects of mine:\n\n1. Georgian alphabet trainer. App which helps to memorize Georgian letters.\n   https://sibusky.github.io/georgian-alphabet/\n\n2. Multi Page site layout. Commercial project.\n   https://sibusky.github.io/sea-breeze-main/\n\n3. Pet project to learn Redux. Sorting, filtering, adding editing employees in the list.\n   https://sibusky.github.io/employees/\n\nCurrently working on SPA for an electrical company.\n\nMy contacts are:\n\n- Telegram: @sibusky\n- Phone RU: +7 900 552 72 29 (Telegram, WhatsApp only)\n- Phone GEO: +995 599 077 481 \n- GitHub: https://github.com/Sibusky\n- email: 5325388@gmail.com\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}
				async function Content() {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;
					const contentFragment = createVNode(Fragment$1, { 'set:html': html });
					return createVNode($$BlogPostLayout, {
									file,
									url,
									content,
									frontmatter: content,
									headings: getHeadings(),
									rawContent,
									compiledContent,
									'server:root': true,
									children: contentFragment
								});
				}
				Content[Symbol.for('astro.needsHeadRendering')] = false;

const __vite_glob_0_0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content,
  compiledContent,
  default: Content,
  file,
  frontmatter,
  getHeadings,
  images,
  rawContent,
  url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$BlogPostLayout as $, BaseSSRService as B, __vite_glob_0_0 as _, isRemoteImage as a, $$Image as b, $$CategoryCloud as c, isOutputFormatSupportsAlpha as i };
