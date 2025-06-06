# Derek's Home on the Internet 🏡

I didn’t want to build just another portfolio site that reads like a resumé with a coat of paint. When you meet someone new, you don’t start by rattling off your job history; you ask where they’re from, what they’re into, what movies they like. That’s the kind of energy I wanted to bring here. I wanted something a bit more fun — something that actually feels like me, and expresses my personality.

### Inspiration
The design is inspired by a mix of things I enjoy: the clean, minimal aesthetic of [Dieter Rams](https://www.vitsoe.com/us/about/good-design#ten-principles-for-good-design) (especially the FS-80 TV), and the more futuristic side of things — sci-fi interfaces from Minority Report, Tron, The Matrix etc. I went down a bit of a rabbit hole on [r/FUI](https://www.reddit.com/r/FUI/), and that led me to artists like [GMUNK](https://gmunk.com/Everything), whose work really stuck with me. This site is my attempt to mash those ideas together — nostalgic and futuristic at the same time.

<img src="https://github.com/user-attachments/assets/4a4e6a0f-37aa-4561-b7aa-52df799380b8" width="250" alt="Image of the Braun FS-80 Television, designed by Deiter Rams" />

### Tech
I built it using [SvelteKit](https://svelte.dev/) mostly because I was curious about it. I really enjoyed the developer experience, it's intuitive and reminded me of Vue, which I’ve used a lot. It has its own thoughtful approach to data flows and state management, which I really appreciated.

I also added a little AI chatbot powered by Gemini [(gemini-2.0-flash-lite)](https://developers.googleblog.com/en/gemini-2-family-expands/) — it pulls from a custom prompt I wrote about myself, so you can actually ask D.A.R.I.C. (Derek's AI for Response, Insight, and Conversation) 🤖 questions about me.

### Future
There’s definitely a lot of animation happening (maybe too much?), and I’m still tweaking things to find that sweet spot between “cool” and “actually usable.” Eventually I’d like to add some accessibility settings for reducing motion and maybe a few sound effects for interactions too.

It’s still very much a work in progress, but honestly, that’s part of the fun.

---

```bash
Develop:
pnpm dev

Build:
pnpm build
```
