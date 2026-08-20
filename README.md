# Snehangsu's Portfolio

A clean, minimalist personal portfolio home page designed with Google's modern aesthetics.

## Features
- **Modern Typography**: Styled using Google Font "Outfit", capturing the geometry and clarity of Google's custom typefaces.
- **Hovering Background Images**: Dynamic, slow-panning background slideshow that automatically switches every 10 seconds.
- **Google Accent Bar**: Subtle top border containing the signature Google colors.
- **Responsive Layout**: Designed to look beautiful on desktops, tablets, and mobile devices.
- **Micro-interactions**: Subtle hover state transitions on the card and buttons, plus an active pulsing status dot.

## Project Structure
```text
snehangsu-portfolio/
├── assets/
│   ├── image1.jpg  (Generated landscape)
│   ├── image2.jpg  (Generated abstract geometric shapes)
│   └── image3.jpg  (Generated floral/nature art)
├── index.html      (Page structure & Content)
├── styles.css      (Animations & Google aesthetics)
├── script.js       (Background slide interval controller)
└── README.md       (Instructions & Docs)
```

---

## 🚀 How to Host on GitHub Pages (Free Hosting)

Since this is a static website, you can host it for free using **GitHub Pages**. Here is how to set it up:

### Step 1: Initialize Git & Commit Files
Open your terminal (PowerShell, Command Prompt, or Git Bash), navigate to this folder, and run:
```bash
git init
git add .
git commit -m "Initial commit: Basic Google aesthetic portfolio page"
```

### Step 2: Create a GitHub Repository
1. Go to [GitHub](https://github.com) and log in.
2. Click the **New** repository button.
3. Name your repository (e.g., `portfolio` or `snehangsu.github.io`).
4. Keep the repository **Public** (required for free GitHub Pages).
5. Do **NOT** initialize it with a README, `.gitignore`, or License (since we already have our files ready).
6. Click **Create repository**.

### Step 3: Link & Push Your Local Files
Copy the commands shown under "...or push an existing repository from the command line" on GitHub:
```bash
# Rename the default branch to main
git branch -M main

# Link your local folder to GitHub (replace with your actual GitHub username and repo name)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push your code
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository page on GitHub.
2. Click on the **Settings** tab.
3. Under the left-hand sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**, change the Source to **Deploy from a branch**.
5. Under **Branch**, select `main` (and `/ (root)` folder) and click **Save**.
6. Wait 1-2 minutes. GitHub will generate a URL for your site (usually `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`).

---

## 🖼️ How to Change Background Images

To use your own photos/artwork instead of the default placeholders:
1. Choose 3 images you want to use.
2. Convert them to `.jpg` format.
3. Rename them to `image1.jpg`, `image2.jpg`, and `image3.jpg`.
4. Replace the existing files in the `assets/` folder with your new images.
5. Commit and push the changes:
   ```bash
   git add assets/
   git commit -m "Update background images"
   git push
   ```
   GitHub Pages will update your live site automatically in a few seconds!
