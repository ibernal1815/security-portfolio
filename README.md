# isaiah bernal — portfolio

personal portfolio site. static HTML, CSS, and vanilla JS. no frameworks, no build step, no dependencies.

---

## structure

```
portfolio/
├── index.html
├── _headers                netlify headers config
├── nginx.conf              nginx config for self-hosted
├── .htaccess               apache / shared hosting config
└── assets/
    ├── css/style.css
    ├── js/
    │   ├── terminal.js
    │   ├── radar.js
    │   └── main.js
    └── data/projects.js
```

---

## updating content

**projects** — edit `assets/data/projects.js`. that file is the single source of truth for all project cards and modal content. nothing else needs to change.

**contact info** — two places: the contact section in `index.html`, and the `contact` command inside `assets/js/terminal.js`.

**terminal commands** — open `assets/js/terminal.js` and find the `COMMANDS` object. add an entry that returns an array of line objects. follow the pattern of the existing ones.

**skills radar** — the six axis labels and scores are at the top of `assets/js/radar.js`.

---

## deployment

**netlify** — drag the folder into netlify drop or connect the repo. `_headers` is picked up automatically.

**github pages** — push to a repo, enable pages in settings. works out of the box.

**nginx** — copy files to the server root, use `nginx.conf` as a starting point. replace `yourdomain.com` and point certbot at it.

**shared hosting / apache** — upload files, `.htaccess` handles the rest.

---

## running locally

no build step needed. open `index.html` directly in a browser, or serve it with anything:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

opening via `file://` works for most things but the terminal commands require a local server due to how browsers handle script loading from the filesystem.
