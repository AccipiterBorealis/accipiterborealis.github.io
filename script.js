const postsEl = document.getElementById("posts");
const toggleBtn = document.getElementById("themeToggle");
const newPostBtn = document.getElementById("newPost");
const search = document.getElementById("search");

// ----- THEME -----
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

toggleBtn.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
};

// ----- POSTS -----
let posts = [
  {
    title: "On Keeping a Commonplace Book",
    date: "February 2026",
    tags: ["writing", "academia"],
    content: "The commonplace book is not a diary, but a method of attention. To write is not merely to record, but to notice."
  },
  {
    title: "Margins",
    date: "January 2026",
    tags: ["reading", "notes"],
    content: "The most important work often happens in the margins—of texts, of days, of lives."
  }
];

function readingTime(text) {
  return Math.ceil(text.split(" ").length / 200);
}

function render(list) {
  postsEl.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <h2>${p.title}</h2>
      <div class="meta">${p.date} · ${readingTime(p.content)} min read</div>
      <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
      <p>${p.content}</p>
    `;
    postsEl.appendChild(div);
  });
}

render(posts);

// ----- SEARCH -----
search.oninput = () => {
  const q = search.value.toLowerCase();
  render(posts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.content.toLowerCase().includes(q)
  ));
};

// ----- NEW POST -----
newPostBtn.onclick = () => {
  const title = prompt("Title");
  const content = prompt("Content");
  const tags = prompt("Tags (comma separated)");

  if (!title || !content) return;

  posts.unshift({
    title,
    content,
    tags: tags ? tags.split(",") : [],
    date: new Date().toDateString()
  });

  render(posts);
};
