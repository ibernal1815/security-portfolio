# isaiah bernal — portfolio

static personal portfolio. zero frameworks, zero dependencies, zero build step.

---

## file structure

```
portfolio/
├── index.html                  main markup — no inline scripts, no inline styles
├── _headers                    netlify security headers (deploy here automatically)
├── nginx.conf                  nginx config for self-hosted deployments
├── .htaccess                   apache config for shared hosting
├── README.md                   this file
└── assets/
    ├── css/
    │   └── style.css           all styles
    ├── js/
    │   ├── terminal.js         interactive terminal widget (self-contained)
    │   ├── radar.js            canvas radar chart (self-contained)
    │   └── main.js             scroll observers, modal, nav, parallax
    └── data/
        └── projects.js         project data — edit here to update everything
```

---

## updating content

**to add or change a project:** edit `assets/data/projects.js` only. the modal and the project rows both pull from that file. no other file needs to change.

**to change contact info:** search `index.html` for your email/linkedin/github. also update the `contact` command in `assets/js/terminal.js`.

**to add a terminal command:** open `assets/js/terminal.js`, find the `COMMANDS` object, and add an entry. each command returns an array of line objects — see the existing ones for the pattern.

---

## deployment

### netlify (recommended)
1. drag the `portfolio/` folder into netlify drop, or connect the github repo
2. `_headers` is read automatically — all security headers apply on first deploy
3. done

### github pages
1. push to a repo, enable pages from the repo settings
2. the `<meta http-equiv>` tags in `index.html` act as fallback security headers
3. note: github pages can't set real http headers, so the meta fallbacks are the only layer

### self-hosted (nginx)
1. copy files to your server root
2. point nginx at the directory using the config in `nginx.conf`
3. replace `yourdomain.com` with your actual domain
4. get a cert from let's encrypt: `certbot --nginx -d yourdomain.com`

### shared hosting (apache / cpanel)
1. upload files via ftp or file manager
2. `.htaccess` handles headers, https redirect, and directory listing

---

## security measures

**content security policy**
the strictest practical csp for a static portfolio:
- `default-src 'none'` — deny everything not explicitly listed
- `script-src 'self'` — only js from this origin. no inline scripts, no eval
- `style-src 'self' fonts.googleapis.com` — stylesheet + google fonts
- `font-src fonts.gstatic.com` — font files only from google's cdn
- `img-src 'self' data:` — local images + the inline svg grain texture
- `connect-src 'none'` — no fetch/xhr calls from the browser at all
- `frame-src 'none'` — no iframes
- `object-src 'none'` — no flash or plugins
- `base-uri 'self'` — blocks base tag hijacking
- `form-action 'none'` — no form submissions

**other headers**
- `X-Content-Type-Options: nosniff` — prevents mime sniffing
- `X-Frame-Options: DENY` — clickjacking protection (redundant with csp but belt-and-suspenders)
- `Referrer-Policy: no-referrer` — no referrer header sent on any outbound navigation
- `Permissions-Policy` — disables camera, mic, geolocation, payment, usb, floc
- `Strict-Transport-Security` — https only, 1 year, preload eligible

**terminal input sanitization**
all user input in the terminal widget goes through `esc()` before touching the dom.
the `appendPromptLine` function uses textContent for user input — never innerHTML.
only static strings from the `COMMANDS` map are ever set as innerHTML.
rate limiting caps commands at 20 per 10-second window.

**no eval, no dynamic imports, no external scripts**
every js file is local. there is no cdn-loaded script, no analytics, no tracking pixel.

**outbound links**
all external links use `rel="noopener noreferrer"` to prevent tab-napping and referrer leakage.

---

## scoring this against securityheaders.io

deploy to netlify with the `_headers` file and this site should score an A or A+.
the only potential deduction is google fonts requiring `style-src https://fonts.googleapis.com`,
which is an external style source. if you want a perfect score, self-host the fonts instead.
