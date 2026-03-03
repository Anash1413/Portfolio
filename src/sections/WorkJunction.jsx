import projects from "../data/projects";

// Eager-import all images from /assets/projects with common extensions
const imageModules = import.meta.glob("../assets/projects/*.{png,jpg,jpeg,webp}", {
  eager: true,
});

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function resolveImage(p) {
  // 1) If explicit filename is provided: projects[i].img = "custom-name.png"
  if (p.img) {
    const key = `../assets/projects/${p.img}`;
    if (imageModules[key] && imageModules[key].default) return imageModules[key].default;
  }

  // 2) Auto-match by title → kebab-case
  const base = slugify(p.title);
  const exts = [".webp", ".png", ".jpg", ".jpeg"];
  for (const ext of exts) {
    const key = `../assets/projects/${base}${ext}`;
    if (imageModules[key] && imageModules[key].default) return imageModules[key].default;
  }

  // 3) Not found → null (use placeholder)
  return null;
}

export default function WorkJunction() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Section Title */}
      <div className="flex items-center gap-4 justify-center mb-10">
        <div className="h-px flex-1 bg-emerald-500/20" />
        <span className="rounded-full bg-emerald-600 text-white px-5 py-2.5 font-semibold shadow-[0_0_0_1px_rgba(16,185,129,0.35),0_8px_20px_rgba(16,185,129,0.35)]">
          My Work
        </span>
        <div className="h-px flex-1 bg-emerald-500/20" />
      </div>

      {/* Project Blocks */}
      <div className="space-y-20">
        {projects.map((p, index) => {
          const imgSrc = resolveImage(p);
          const isOdd = index % 2 !== 0; // 0-based: even row (0) image left, odd row (1) image right

          // Grid areas: image/text swap on large screens
          return (
            <div
              key={p.title}
              className="grid lg:grid-cols-2 gap-10 items-center"
            >
              {/* IMAGE */}
              <div className={isOdd ? "lg:order-2" : "lg:order-1"}>
                <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-gradient-to-br from-emerald-500/10 to-cyan-500/10">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-400">
                      Project Screenshot
                    </div>
                  )}
                </div>
              </div>

              {/* TEXT */}
              <div className={isOdd ? "lg:order-1" : "lg:order-2"}>
                <h3 className="text-3xl font-bold mb-4">{p.title}</h3>
                <p className="text-neutral-300 leading-7 mb-6">{autoDescribe(p.title)}</p>

                <div className="flex gap-4">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 font-semibold shadow-[0_0_0_1px_rgba(16,185,129,0.35),0_8px_20px_rgba(16,185,129,0.35)]"
                  >
                    Visit
                  </a>

                  {/* Optional GitHub per project (add `github` in projects.js if you want) */}
                  <a
                    href={p.github || "https://github.com/Anash1413"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 text-emerald-300 px-6 py-2.5 font-semibold hover:bg-emerald-400/10"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Auto descriptions depending on title
function autoDescribe(title) {
  const t = title.toLowerCase();
  if (t.includes("razorpay")) return "Payment UI clone focusing on layout precision and hover micro-interactions.";
  if (t.includes("studysync")) return "Education landing page with clean grid layout and responsive scaling.";
  if (t.includes("figma")) return "Pixel-perfect UI converted from Figma to real web layout.";
  if (t.includes("weather")) return "Weather app displaying live climate info through API integration.";
  if (t.includes("password")) return "Secure password generator with customization controls.";
  if (t.includes("tic")) return "Classic Tic-Tac-Toe game built with interactive win logic.";
  if (t.includes("paste")) return "Paste storing app to save and share snippets quickly.";
  if (t.includes("crypto")) return "Full-stack app built with PHP, JS and MySQL for project tracking.";

if (t.includes("calculator")) return "Calculator app built with React for seamless user experience.";
   return "Responsive project with clean UI and reusable components.";
}
