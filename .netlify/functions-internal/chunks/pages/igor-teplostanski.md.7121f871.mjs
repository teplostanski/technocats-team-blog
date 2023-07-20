import { g as createVNode, s as spreadAttributes, F as Fragment } from '../astro.f03c80ea.mjs';
import { $ as $$BlogPostLayout } from './aleksei-smirnov.md.36450c21.mjs';

const images = {
					
				};

				function updateImageReferences(html) {
					return html.replaceAll(
						/__ASTRO_IMAGE_="(.+)"/gm,
						(full, imagePath) => spreadAttributes({src: images[imagePath].src, ...images[imagePath].attributes})
					);
				}

				const html = updateImageReferences("<p>Hello!</p>\n<p>My name is Igor Teplostanski. I am a beginner frontend developer. I’ve always liked internet art, especially net-art. And the desire to create something similar led me into Web development. That is why I strive for professional growth and development in the Front-end field.</p>\n<p>In my free time I like to customize GNU/Linux and study terminal utilities.\nI am ready to spend more than one day studying the problem until I solve it.</p>\n<p>As developer I have such skills as:</p>\n<ul>\n<li>HTML, CSS, SCSS</li>\n<li>Responsive design</li>\n<li>basic knowledge of Bootstrap</li>\n<li>JavaScript</li>\n<li>TypeScript</li>\n<li>MobX</li>\n<li>React.js</li>\n<li>Node.js, Express.js</li>\n<li>Figma</li>\n<li>Git</li>\n</ul>\n<p>My Portfolio website - <a href=\"https://teplostanski.dev\">teplostanski.dev</a></p>\n<p>My Github profile - <a href=\"https://github.com/teplostanski\">github.com/teplostanski</a></p>");

				const frontmatter = {"id":3,"layout":"../../layouts/BlogPostLayout.astro","title":"Igor Teplostanski - \"Unleashing Your Potential - Reinventing Yourself in a New Career\"","date":"2023-05-20T00:00:00.000Z","author":"Igor Teplostanski","image":{"src":"/images/igor-teplostanski.jpg","alt":"Igor Teplostanski's photo"},"description":"1 + 1 = 11","draft":false,"category":"Changing the career"};
				const file = "/home/user/Desktop/pet-projects/technocats-team-blog/src/pages/blog/igor-teplostanski.md";
				const url = "/blog/igor-teplostanski";
				function rawContent() {
					return "\nHello!\n\nMy name is Igor Teplostanski. I am a beginner frontend developer. I've always liked internet art, especially net-art. And the desire to create something similar led me into Web development. That is why I strive for professional growth and development in the Front-end field.\n\nIn my free time I like to customize GNU/Linux and study terminal utilities.\nI am ready to spend more than one day studying the problem until I solve it.\n\nAs developer I have such skills as:\n\n- HTML, CSS, SCSS\n- Responsive design\n- basic knowledge of Bootstrap\n- JavaScript\n- TypeScript\n- MobX\n- React.js\n- Node.js, Express.js\n- Figma\n- Git\n\nMy Portfolio website - [teplostanski.dev](https://teplostanski.dev)\n\nMy Github profile - [github.com/teplostanski](https://github.com/teplostanski)\n";
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
					const contentFragment = createVNode(Fragment, { 'set:html': html });
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

const __vite_glob_0_4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

export { __vite_glob_0_4 as _ };
