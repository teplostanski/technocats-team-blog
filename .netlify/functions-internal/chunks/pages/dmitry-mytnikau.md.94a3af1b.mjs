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

				const html = updateImageReferences("<p>Hi, there 👋!</p>\n<p>My name is Dmitry Mytnikau. I worked as a HTML layout designer for over than three years. Since last year switched to the stack of React, Redux Toolkit, TypeScript, and Tailwind. Deepening my knowledge in TypeScript and the features of Tailwind. Recently became interested in SSR. I want to keep up with modern development practices and write multifunctional typed code.</p>\n<p>Fun fact about me: medical professionals forbid me from coding.</p>");

				const frontmatter = {"id":6,"layout":"../../layouts/BlogPostLayout.astro","title":"Dmitry Mytnikau - \"Embracing Change - Inspiring Stories of Successful Career Shifts\"","date":"2023-05-09T00:00:00.000Z","author":"Dmitry Mytnikau","image":{"src":"/images/dmitry_mytnikau.jpg","alt":"Dmitry Mytnikau's photo"},"description":"From HTML layout designer to Web-developer.","draft":false,"category":"Astro"};
				const file = "/home/user/Desktop/pet-projects/technocats-team-blog/src/pages/blog/dmitry-mytnikau.md";
				const url = "/blog/dmitry-mytnikau";
				function rawContent() {
					return "\nHi, there 👋!\n\nMy name is Dmitry Mytnikau. I worked as a HTML layout designer for over than three years. Since last year switched to the stack of React, Redux Toolkit, TypeScript, and Tailwind. Deepening my knowledge in TypeScript and the features of Tailwind. Recently became interested in SSR. I want to keep up with modern development practices and write multifunctional typed code.\n\nFun fact about me: medical professionals forbid me from coding.\n";
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

const __vite_glob_0_2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

export { __vite_glob_0_2 as _ };
