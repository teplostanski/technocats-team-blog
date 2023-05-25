import { g as createVNode, s as spreadAttributes, F as Fragment } from '../astro.f03c80ea.mjs';
import { $ as $$BlogPostLayout } from './aleksei-smirnov.md.3366715d.mjs';

const images = {
					
				};

				function updateImageReferences(html) {
					return html.replaceAll(
						/__ASTRO_IMAGE_="(.+)"/gm,
						(full, imagePath) => spreadAttributes({src: images[imagePath].src, ...images[imagePath].attributes})
					);
				}

				const html = updateImageReferences("<p>Hello!</p>\n<p>My name is Maria or Masha. I am a Front-end developer with a background in digital marketing, design and usability (10+ years).</p>\n<p>I thought for a long time what I wanted to do. In 2022, I made a conscious decision to become a web-developer. So in January 2023 I completed from the Yandex “Web-developer” course. During my studying, the thought that I had found what I wanted to do did not leave me. Now I’m looking for my first job as a web-developer.</p>\n<p>As developer I have such skills as:</p>\n<ul>\n<li>HTML, CSS</li>\n<li>JavaScript, React.js</li>\n<li>Visual Studio Code, Figma, Photoshop</li>\n<li>Git, Webpack</li>\n</ul>\n<p>Now I live in US and looking for a job as a junior programmer here. My superpower is perfectionism and organization skills.</p>");

				const frontmatter = {"id":5,"layout":"../../layouts/BlogPostLayout.astro","title":"Maria Kikot. Changing the career in IT.","date":"2023-05-09T00:00:00.000Z","author":"Maria Kikot","image":{"src":"/images/maria-kikot.jpg","alt":"Maria's photo"},"description":"How to live when you are perfectionist?","draft":false,"category":"Changing the career"};
				const file = "D:/webWork/intern/projects/birka/src/pages/blog/maria-kikot.md";
				const url = "/blog/maria-kikot";
				function rawContent() {
					return "\r\nHello!\r\n\r\nMy name is Maria or Masha. I am a Front-end developer with a background in digital marketing, design and usability (10+ years).\r\n\r\nI thought for a long time what I wanted to do. In 2022, I made a conscious decision to become a web-developer. So in January 2023 I completed from the Yandex “Web-developer” course. During my studying, the thought that I had found what I wanted to do did not leave me. Now I’m looking for my first job as a web-developer.\r\n\r\nAs developer I have such skills as:\r\n\r\n- HTML, CSS\r\n- JavaScript, React.js\r\n- Visual Studio Code, Figma, Photoshop\r\n- Git, Webpack\r\n\r\nNow I live in US and looking for a job as a junior programmer here. My superpower is perfectionism and organization skills.\r\n";
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
