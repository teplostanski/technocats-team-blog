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

				const html = updateImageReferences("<p>My name is Alexander Semenov. I have basic knowledge acquired through the Yandex Practicum Web Developer course. I try to expand the boundaries of what I have learned step by step, discovering new things while not forgetting the old. Currently, I work in aviation.</p>\n<p>Fun fact about me: I can identify what type of airplane is starting its engines just by the sound.</p>");

				const frontmatter = {"id":2,"layout":"../../layouts/BlogPostLayout.astro","title":"Alexander Semenov - \"Navigating Career Transitions - A Guide for Switching Paths Successfully\"","date":"2023-05-10T00:00:00.000Z","author":"Alexander Semenov","image":{"src":"/images/alexander-semenov.jpg","alt":"Alexander Semenov's photo"},"description":"Airman in IT. True or false?","draft":false,"category":"Changing the career"};
				const file = "/home/user/Desktop/pet-projects/technocats-team-blog/src/pages/blog/alexander-semenov.md";
				const url = "/blog/alexander-semenov";
				function rawContent() {
					return "\nMy name is Alexander Semenov. I have basic knowledge acquired through the Yandex Practicum Web Developer course. I try to expand the boundaries of what I have learned step by step, discovering new things while not forgetting the old. Currently, I work in aviation.\n\nFun fact about me: I can identify what type of airplane is starting its engines just by the sound.\n";
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

const __vite_glob_0_1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

export { __vite_glob_0_1 as _ };
