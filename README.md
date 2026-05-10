# Uro Documentation Project — Website

Free static website hosted on GitHub Pages.

## File structure

```
uro-website/
├── index.html          ← main homepage
├── team.html           ← team page
├── team.json           ← team member data (names + photo URLs)
├── css/
│   ├── style.css       ← main styles
│   └── team.css        ← team page styles
├── js/
│   └── main.js         ← interactions, modals, catalogue
├── resources/          ← put your PDF files here
│   ├── uro-english-dictionary.pdf
│   ├── flashcards-body.pdf
│   ├── flashcards-landscape.pdf
│   ├── flashcards-household.pdf
│   ├── flashcards-animals.pdf
│   ├── story-1.pdf ... story-6.pdf
│   ├── game-1.pdf
│   └── game-2.pdf
└── assets/
    └── team/           ← optional: local team photos (not needed if using Drive URLs)
```

## Deploy to GitHub Pages

1. Create a public repo at github.com/new  
2. Upload all files (keep folder structure)  
3. Settings → Pages → Deploy from branch → main → / (root) → Save  
4. Live at: https://Irawomitan.github.io/uro-project/

## Updating the team

Edit `team.json` to add/remove members.
Photos load directly from Google Drive thumbnail URLs — no upload needed.
Make sure each Drive photo is shared as "Anyone with the link can view."

## Adding PDFs

Drop PDF files into the `resources/` folder with the exact filenames listed above.

© 2025 Uro Documentation Project
