// =============================================================
//  COMMONPLACE BOOK — Script
// =============================================================

// =============================================================
//  ✏️  POSTS — Add your posts here!
//
//  Each post object has:
//    id       — unique number (increment for each new post)
//    title    — the post title shown on cards and the post page
//    date     — display date, e.g. "March 2026"
//    tags     — array of tag strings, e.g. ["reading", "philosophy"]
//    content  — full HTML content of the post (see examples below)
//
//  CONTENT TIPS:
//    • Use <p>…</p> for paragraphs (the first letter gets a drop cap automatically)
//    • Use <h2>…</h2> for section headings
//    • Use <h3>…</h3> for sub-headings
//    • Use <blockquote>…<cite>— Author</cite></blockquote> for pull quotes
//    • Use <hr> for a decorative section divider (renders as ✦ ✦ ✦)
//    • Write as much HTML as you like — long essays work great!
//
//  ADDING A NEW POST:
//    1. Copy the template below and paste it before the closing ] of the array
//    2. Give it the next id number
//    3. Fill in title, date, tags, and content
//    4. Save the file — done!
//
//  TEMPLATE:
//  {
//    id: 3,
//    title: "Your Title Here",
//    date: "March 2026",
//    tags: ["tag1", "tag2"],
//    content: `
//      <p>Your opening paragraph goes here. The first letter will automatically
//      get a large drop cap.</p>
//
//      <p>Continue with more paragraphs as needed.</p>
//
//      <h2>A Section Heading</h2>
//
//      <p>More text after the heading.</p>
//
//      <blockquote>
//        A memorable quote or passage worth preserving.
//        <cite>— Author Name</cite>
//      </blockquote>
//
//      <p>Closing thoughts.</p>
//    `
//  },
// =============================================================

const posts = [
  {
    id: 1,
    title: "On Keeping a Commonplace Book",
    date: "February 2026",
    tags: ["writing", "method"],
    content: `
      <p>The commonplace book is not a diary, but a method of attention. To write is not merely
      to record, but to notice. A good commonplace book captures ideas, quotes, and reflections
      that inspire thought — the fragments that catch the light as they pass through your mind.</p>

      <p>The practice stretches back centuries. Renaissance scholars kept them as intellectual
      scrapbooks, gathering passages from classical authors alongside their own marginal
      commentary. Francis Bacon kept one. John Milton kept one. The form was considered as
      essential to education as memory itself.</p>

      <h2>The Method</h2>

      <p>There are no strict rules, which is precisely what makes the commonplace book different
      from a journal or a research log. You are not obliged to write every day, to maintain
      continuity, or to argue a single thesis. The book is a holding space — a field where
      ideas wait to be harvested later.</p>

      <blockquote>
        What I write, I write to remember; what I remember, I become.
        <cite>— Attributed to various sources</cite>
      </blockquote>

      <p>The danger is passivity: transcribing without thinking, collecting without digesting.
      The antidote is commentary. Never copy a passage without adding at least a sentence of
      your own — a question it raises, a connection it suggests, a mild resistance you feel
      toward it. The annotation is where the book becomes yours.</p>

      <hr>

      <p>Begin with whatever arrests you. A sentence from a novel that made you pause. A
      statistic that seems impossible. An argument you half-agree with and cannot dismiss.
      The criterion is not importance but attention — if it held yours, it belongs here.</p>
    `
  },
  {
    id: 2,
    title: "Margins",
    date: "January 2026",
    tags: ["reading", "notes"],
    content: `
      <p>The most important work often happens in the margins — of texts, of days, of lives.
      Margins are where thoughts expand, where annotations illuminate meaning, where the
      secondary becomes primary.</p>

      <p>To read without annotating is to pass through a landscape without stopping. The marks
      you leave — underlines, asterisks, the single indignant question mark — are the
      record of a conversation between you and the text. Decades later, you can return and
      find yourself there, surprised by what you once found urgent.</p>

      <h2>The Ethics of Marking</h2>

      <p>There is a small guilt associated with writing in books. We are taught they are
      sacred objects, to be preserved in the state we received them. But a book unread is
      only paper. The marginalia <em>is</em> the reading — proof of encounter, evidence that
      a mind passed through and left something behind.</p>

      <p>The best-annotated books in libraries are not the pristine ones. They are the ones
      in which previous readers have left their responses, building up layers of
      conversation across time. To add your note beside theirs is to join a dialogue that
      may continue long after you are gone.</p>
    `
  },

  // ✏️ ADD YOUR NEW POSTS BELOW THIS LINE ✏️

];

// =============================================================
//  THEME TOGGLE
// =============================================================

function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  document.querySelectorAll("#themeToggle").forEach(btn => {
    btn.textContent = dark ? "☀︎" : "☾";
  });
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "dark");

document.querySelectorAll("#themeToggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    document.querySelectorAll("#themeToggle").forEach(b => {
      b.textContent = isDark ? "☀︎" : "☾";
    });
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});

// =============================================================
//  HELPERS
// =============================================================

function readingTime(htmlString) {
  const text = htmlString.replace(/<[^>]+>/g, " ");
  return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200));
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

// =============================================================
//  HOMEPAGE
// =============================================================

if (document.getElementById("posts")) {
  const postsEl  = document.getElementById("posts");
  const searchEl = document.getElementById("search");
  const tagEl    = document.getElementById("tagFilter");

  // Populate tag filter
  const allTags = [...new Set(posts.flatMap(p => p.tags))].sort();
  allTags.forEach(tag => {
    const opt = document.createElement("option");
    opt.value = tag;
    opt.textContent = tag;
    tagEl.appendChild(opt);
  });

  function render(list) {
    postsEl.innerHTML = "";
    if (!list.length) {
      postsEl.innerHTML = `<p class="empty">No posts found.</p>`;
      return;
    }
    list.forEach(p => {
      const plain  = stripHtml(p.content);
      const excerpt = plain.split(" ").slice(0, 35).join(" ") + "…";
      const mins   = readingTime(p.content);
      const card   = document.createElement("div");
      card.className = "post-card";
      card.innerHTML = `
        <h2>${p.title}</h2>
        <div class="meta">${p.date} · ${mins} min read</div>
        <div class="excerpt">${excerpt}</div>
        <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
      `;
      card.addEventListener("click", () => {
        window.location.href = `post.html?id=${p.id}`;
      });
      postsEl.appendChild(card);
    });
  }

  function filterPosts() {
    const q   = searchEl.value.toLowerCase();
    const tag = tagEl.value;
    render(posts.filter(p => {
      const text = (p.title + " " + stripHtml(p.content)).toLowerCase();
      return text.includes(q) && (tag === "" || p.tags.includes(tag));
    }));
  }

  render(posts);
  searchEl.addEventListener("input", filterPosts);
  tagEl.addEventListener("change", filterPosts);
}

// =============================================================
//  FULL POST PAGE
// =============================================================

if (document.getElementById("post-content")) {
  const params = new URLSearchParams(window.location.search);
  const post   = posts.find(p => p.id === parseInt(params.get("id")));

  if (!post) {
    document.getElementById("post-content").innerHTML = "<p>Post not found.</p>";
  } else {
    document.title = post.title + " — Commonplace Book";
    document.getElementById("post-title").textContent = post.title;
    document.getElementById("post-meta").textContent =
      `${post.date} · ${readingTime(post.content)} min read`;
    document.getElementById("post-tags").innerHTML =
      post.tags.map(t => `<span>${t}</span>`).join("");
    document.getElementById("post-content").innerHTML = post.content;
  }
}
