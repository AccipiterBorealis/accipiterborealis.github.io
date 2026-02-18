// ----- POSTS DATA -----
const posts = [
  {
    id: 1,
    title: "On Keeping a Commonplace Book",
    date: "February 2026",
    tags: ["writing", "academia"],
    content: "The commonplace book is not a diary, but a method of attention. To write is not merely to record, but to notice."
  },
  {
    id: 2,
    title: "Margins",
    date: "January 2026",
    tags: ["reading", "notes"],
    content: "The most important work often happens in the margins—of texts, of days, of lives."
  }
];

// ----- THEME TOGGLE -----
const toggleBtns = document.querySelectorAll("#themeToggle");
toggleBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// ----- HELPER -----
function readingTime(text) {
  return Math.ceil(text.split(" ").length / 200);
}

// ----- HOMEPAGE -----
if (document.getElementById("posts")) {
  const postsEl = document.getElementById("posts");
  const search = document.getElementById("search");

  function render(list) {
    postsEl.innerHTML = "";
    list.forEach(p => {
      const div = document.createElement("div");
      div.className = "post-card";
      const excerpt = p.content.split(" ").slice(0, 30).join(" ") + "...";
      div.innerHTML = `
        <h2>${p.title}</h2>
        <div class="meta">${p.date} · ${readingTime(p.content)} min read</div>
        <div class="excerpt">${excerpt}</div>
        <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
      `;
      div.addEventListener("click", () => {
        window.location.href = `post.html?id=${p.id}`;
      });
      postsEl.appendChild(div);
    });
  }

  render(posts);

  search.oninput = () => {
    const q = search.value.toLowerCase();
    render(posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
    ));
  };
}

// ----- FULL POST PAGE -----
if (document.getElementById("post-content")) {
  const params = new URLSearchParams(window.location.search);
  const postId = parseInt(params.get("id"));
  const post = posts.find(p => p.id === postId);

  if (!post) {
    document.getElementById("post-content").innerHTML = "<p>Post not found.</p>";
  } else {
    document.getElementById("post-title").textContent = post.title;
    document.getElementById("post-meta").textContent = post.date + ` · ${readingTime(post.content)} min read`;
    document.getElementById("post-tags").innerHTML = post.tags.map(t => `<span>${t}</span>`).join("");
    document.getElementById("post-content").innerHTML = `<p>${post.content}</p>`;
  }
}
