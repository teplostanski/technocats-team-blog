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

				const html = updateImageReferences("<p>Hello!</p>\n<p>My name is Elizaveta Obrezkova. I’m a beginner web-developer now, but I have a very long story.\nI was born on the 16th of January, 1996 in Saint-Petersburg. This city is the best city in the world, where I lived almost all my life. I graduated from high school in 2013 and entered Saint-Petersburg University of Economics. I completed my bachelor’s degree in economics and received a diploma with distinction. Then I completed my master’s degree in accounting. Moreover, my piggy bank was replenished with another diploma with honors. Studying at the university, I was looking for myself. At that time, I received two more educations: a primary school teacher and a fitness trainer. Each of them was important to me, but none of them suited me.</p>\n<p>I thought for a long time what I wanted to do. In 2022, I made a conscious decision to become a web-developer. So in January 2023 I completed from the Yandex “Web-developer” course. During my studying, the thought that I had found what I wanted to do did not leave me. Now I’m looking for my first job as a web-developer.</p>\n<p>As developer I have such skills as:</p>\n<ul>\n<li>HTML, CSS</li>\n<li>Responsive design</li>\n<li>basic knowledge of Bootstrap</li>\n<li>JavaScript</li>\n<li>React.js</li>\n<li>Node.js, Express.js</li>\n<li>Figma, Photoshop</li>\n<li>Git</li>\n</ul>\n<p>Also I have the background I’ve learned on previous jobs:</p>\n<ul>\n<li>teamwork</li>\n<li>Strong numeracy skills</li>\n<li>Strong creative ability</li>\n<li>Attention to detail</li>\n<li>Strong communication skills</li>\n<li>Excellent problem-solving skills</li>\n<li>A logical approach to work</li>\n<li>The ability to explain technical matters clearly</li>\n</ul>\n<p>Now I live in Bali and do two internships. I already have several portfolio projects that you can see here: <a href=\"https://github.com/Elizaveta-Obrezkova\">https://github.com/Elizaveta-Obrezkova</a> . Also in the process of development is a site for my friends. I really hope to be able to share it soon.</p>");

				const frontmatter = {"id":4,"layout":"../../layouts/BlogPostLayout.astro","title":"Elizaveta Obrezkova - \"From Dreaming to Doing - How to Make a Career Change a Reality\"","date":"2023-05-09T00:00:00.000Z","author":"Elizaveta Obrezkova","image":{"src":"/images/elizaveta-obrezkova.jpg","alt":"Elizaveta Obrezkova's photo"},"description":"Is it possible to code when you are living in Bali?","draft":false,"category":"Changing the career"};
				const file = "/home/user/Desktop/pet-projects/technocats-team-blog/src/pages/blog/elizaveta-obrezkova.md";
				const url = "/blog/elizaveta-obrezkova";
				function rawContent() {
					return "\nHello!\n\nMy name is Elizaveta Obrezkova. I’m a beginner web-developer now, but I have a very long story.\nI was born on the 16th of January, 1996 in Saint-Petersburg. This city is the best city in the world, where I lived almost all my life. I graduated from high school in 2013 and entered Saint-Petersburg University of Economics. I completed my bachelor's degree in economics and received a diploma with distinction. Then I completed my master's degree in accounting. Moreover, my piggy bank was replenished with another diploma with honors. Studying at the university, I was looking for myself. At that time, I received two more educations: a primary school teacher and a fitness trainer. Each of them was important to me, but none of them suited me.\n\nI thought for a long time what I wanted to do. In 2022, I made a conscious decision to become a web-developer. So in January 2023 I completed from the Yandex “Web-developer” course. During my studying, the thought that I had found what I wanted to do did not leave me. Now I’m looking for my first job as a web-developer.\n\nAs developer I have such skills as:\n\n- HTML, CSS\n- Responsive design\n- basic knowledge of Bootstrap\n- JavaScript\n- React.js\n- Node.js, Express.js\n- Figma, Photoshop\n- Git\n\nAlso I have the background I’ve learned on previous jobs:\n\n- teamwork\n- Strong numeracy skills\n- Strong creative ability\n- Attention to detail\n- Strong communication skills\n- Excellent problem-solving skills\n- A logical approach to work\n- The ability to explain technical matters clearly\n\nNow I live in Bali and do two internships. I already have several portfolio projects that you can see here: https://github.com/Elizaveta-Obrezkova . Also in the process of development is a site for my friends. I really hope to be able to share it soon.\n";
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

const __vite_glob_0_3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

export { __vite_glob_0_3 as _ };
