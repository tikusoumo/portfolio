# Content Management Guide

All portfolio content lives in the `content/` directory as JSON files. You can update any content by editing these files — **no code changes required**.

## Files Overview

| File | What it controls |
|---|---|
| `hero.json` | Hero section: greeting, title variants, subtitle, CTA buttons |
| `about.json` | About section: heading, paragraphs, profile image path |
| `skills.json` | Skills section: categories and skill lists |
| `projects.json` | Projects section: all project cards with details |
| `experience.json` | Experience section: timeline entries |
| `contact.json` | Contact section: info cards and form title |
| `social.json` | Social links used in hero, footer, and contact |
| `meta.json` | Site-wide metadata: name, title, description, SEO |
| `blog.json` | Blog posts listing |

## How to Update

1. Open the relevant JSON file in `content/`
2. Edit values (keep the JSON structure intact)
3. Save the file
4. Run `npm run build` or commit to trigger a rebuild

## Examples

### Add a new project
Open `content/projects.json` and add an entry to the `projects` array:
```json
{
  "title": "My New Project",
  "description": "Short description",
  "longDescription": "Detailed description...",
  "image": "./my-project.png",
  "technologies": ["React", "Node.js"],
  "features": ["Feature 1", "Feature 2"],
  "demoUrl": "https://example.com",
  "githubUrl": "https://github.com/user/repo",
  "status": "Completed",
  "category": "Web App"
}
```

### Add a new skill category
Open `content/skills.json` and add to the `categories` array:
```json
{
  "title": "AI & ML",
  "icon": "🤖",
  "skills": ["TensorFlow", "PyTorch", "OpenAI API"]
}
```

### Update social links
Open `content/social.json` and modify the `links` array. Available icons: `Mail`, `Linkedin`, `Github`, `Instagram`.

### Update site metadata
Open `content/meta.json` to change your name, title, SEO description, or URL.
