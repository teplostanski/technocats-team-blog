import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../astro.f03c80ea.mjs';
import { $ as $$Link, a as $$MainLayout } from './404.astro.7757b8b8.mjs';
import 'cookie';
import 'kleur/colors';
import 'slash';
import 'path-to-regexp';
import 'mime';
import 'html-escaper';
import 'string-width';
import 'svgo';
/* empty css                                     */
const $$Astro = createAstro("https://astro-technocats.netlify.app/");
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "About TechnoCats", "description": "This page provides information about TechnoCats" }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead($$result2)}<section class="container about" aria-label="About TechnoCats">
    <img src="/images/technoCats.jpg" alt="TechnoCats" width="200" height="330">
    <div class="content">
      <h1 class="h1">TechnoCats</h1>
      <p>
        Once upon a time, there was a group of six friends who shared a passion
        for technology and cats. They called themselves the "TechnoCats". Each of
        them had a unique set of skills and expertise in different areas of
        technology, but they all shared a deep love for felines.
      </p>
      <p>
        One day, the TechnoCats decided to use their skills to create an app that
        would help stray cats find homes. They worked tirelessly, coding day and
        night, designing user interfaces, and brainstorming new ideas. After
        several weeks of hard work, their app was ready for launch.
      </p>
      <p>
        The app was an instant success, and within weeks, hundreds of stray cats
        found loving homes with the help of TechnoCats. But the success of the
        app wasn't enough for the TechnoCats; they wanted to do more for cats in
        need.
      </p>
      <p>
        They decided to start a non-profit organization dedicated to rescuing
        and caring for stray cats. They pooled their resources and rented a
        small office where they could work together on their mission.
      </p>
      <p>
        Over time, the TechnoCats' organization grew, and they began to receive
        donations from cat lovers all around the world. They used the donations
        to rescue and care for more and more cats, and their efforts were
        recognized by local media outlets.
      </p>
      <p>
        The TechnoCats continued to work tirelessly, day in and day out, to
        improve the lives of stray cats. They never lost sight of their mission,
        and their passion for technology and felines only grew stronger with
        each passing day.
      </p>
      <p>
        In the end, the TechnoCats' legacy lived on, and their organization
        continued to help cats in need for years to come. Their story serves as
        a reminder that when people come together with a shared passion and
        purpose, anything is possible.
      </p>
      ${renderComponent($$result2, "Link", $$Link, { "href": "/blog/", "text": "Cats", "style": "primary" })}
    </div>
  </section>
` })}`;
}, "/home/user/Desktop/pet-projects/technocats-team-blog/src/pages/about.astro");

const $$file = "/home/user/Desktop/pet-projects/technocats-team-blog/src/pages/about.astro";
const $$url = "/about";

export { $$About as default, $$file as file, $$url as url };
