// terminal.js — interactive terminal widget.
// all user input is treated as untrusted. nothing gets eval'd or set as innerHTML
// unless it comes from the known-good COMMANDS map below.

(function () {
  'use strict';

  const termOutput   = document.getElementById('termOutput');
  const termInput    = document.getElementById('termInput');
  const terminalEl   = document.getElementById('terminal');

  if (!termOutput || !termInput || !terminalEl) return;

  // ── helpers ──────────────────────────────────────────────────────────────

  // escape anything that might be user-supplied before touching innerHTML.
  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // build a plain text line
  function txt(cls, text) {
    return { type: 'text', cls, text };
  }

  // build a pre-composed HTML line (only called with static strings from COMMANDS — never user data)
  function html(markup) {
    return { type: 'html', markup };
  }

  function cmdLine(cmd, desc) {
    return html(`<span class="t-key">${cmd.padEnd(20)}</span><span class="t-dim">${desc}</span>`);
  }

  function kvLine(k, v) {
    // v comes from COMMANDS, not user input — safe to embed directly
    return html(`<span class="t-key">${(k + ':').padEnd(12)}</span><span class="t-val">${v}</span>`);
  }

  function appendLines(lines) {
    const frag = document.createDocumentFragment();
    lines.forEach(line => {
      const el = document.createElement('span');
      el.className = 'term-line';
      if (line.type === 'html') {
        // only ever called with static strings from COMMANDS — not user input
        el.className = 'term-line';
        el.innerHTML = line.markup;
      } else {
        el.classList.add(line.cls || '');
        el.textContent = line.text; // textContent — no XSS possible
      }
      frag.appendChild(el);
    });
    termOutput.appendChild(frag);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  function appendPromptLine(rawUserInput) {
    const el = document.createElement('span');
    el.className = 'term-line';
    // the prompt label is static; the user input is escaped
    el.innerHTML =
      '<span class="t-prompt">isaiah@portfolio:~$ </span>' +
      '<span class="t-cmd">' + esc(rawUserInput) + '</span>';
    termOutput.appendChild(el);
  }

  // ── command definitions ───────────────────────────────────────────────────
  // all values here are static strings — no user data ever flows in

  const COMMANDS = {
    help: () => [
      txt('t-head', 'available commands'),
      txt('t-dim',  '─────────────────────────────────────'),
      cmdLine('whoami',      'who is this'),
      cmdLine('ls',          'list sections'),
      cmdLine('ls projects', 'show all projects'),
      cmdLine('cat skills',  'show technical skills'),
      cmdLine('cat certs',   'show certifications'),
      cmdLine('cat stack',   'show full tool stack'),
      cmdLine('contact',     'get contact info'),
      cmdLine('goal',        'career objective'),
      cmdLine('clear',       'clear terminal'),
      txt('t-dim', ''),
      txt('t-dim', 'tip: press ↑ / ↓ to cycle command history'),
    ],

    whoami: () => [
      txt('t-val', 'Isaiah Bernal'),
      txt('t-dim', 'Los Angeles, CA'),
      txt('t-dim', ''),
      txt('t-dim', 'B.S. CIT @ CSUN  →  M.S. InfoSec @ Cal Poly Pomona'),
      txt('t-dim', 'A.S. Cybersecurity, LA Mission College (2023)'),
      txt('t-dim', ''),
      txt('t-dim', 'Career path:'),
      txt('t-val', '  SOC L1  →  Detection Engineering  →  Purple Team'),
    ],

    ls: () => [
      txt('t-key', 'experience/   skills/   projects/   trajectory/   contact/'),
    ],

    'ls projects': () => [
      txt('t-key', '01  malware-analysis-lab'),
      txt('t-key', '02  sysmon-detection-lab'),
      txt('t-key', '03  threat-intel-enricher'),
      txt('t-key', '04  aes-keylogger-flask-c2'),
      txt('t-key', '05  file-integrity-monitor-c'),
      txt('t-key', '06  linux-privesc-lab'),
      txt('t-dim', ''),
      txt('t-dim', 'github.com/ibernal1815'),
    ],

    'cat skills': () => [
      txt('t-head', 'technical skills'),
      txt('t-dim',  '─────────────────────────────────────'),
      kvLine('SIEM',       'Splunk/SPL, Elastic/KQL, Wazuh, Sysmon'),
      kvLine('Detection',  'Sigma, Suricata, MITRE ATT&CK, Threat Hunting'),
      kvLine('DFIR',       'Volatility, Autopsy, Memory Forensics, IOC Extraction'),
      kvLine('Offensive',  'Priv Esc, C2, YARA, Malware Analysis, Nmap'),
      kvLine('Scripting',  'Python, Bash, PowerShell, C, SQL, Flask'),
      kvLine('Network',    'Wireshark, Suricata, TCP/IP, IDS/IPS, Packet Analysis'),
      kvLine('Frameworks', 'MITRE ATT&CK, NIST CSF, Cyber Kill Chain, PCI DSS'),
    ],

    'cat certs': () => [
      txt('t-head', 'certifications'),
      txt('t-dim',  '─────────────────────────────────────'),
      txt('t-val',  '  ✓  CompTIA Security+          2024'),
      txt('t-val',  '  ✓  CompTIA CySA+              2024'),
      txt('t-val',  '  ✓  ISC2 Certified in Cyber    2025'),
      txt('t-dim',  '  ●  HTB CDSA                   in progress (2026)'),
    ],

    'cat stack': () => [
      txt('t-head', 'full tool stack'),
      txt('t-dim',  '─────────────────────────────────────'),
      kvLine('siem',   'Splunk, Elastic, Wazuh'),
      kvLine('lang',   'Python, Bash, PowerShell, C, SQL'),
      kvLine('dfir',   'Volatility, Autopsy'),
      kvLine('detect', 'Sigma, Suricata, Sysmon'),
      kvLine('offsec', 'YARA, Nmap, Priv Esc, C2'),
      kvLine('fw',     'Flask'),
      kvLine('os',     'Linux, Windows Server'),
    ],

    contact: () => [
      txt('t-head', 'contact'),
      txt('t-dim',  '─────────────────────────────────────'),
      kvLine('email',    'isaiahbernal750@outlook.com'),
      kvLine('linkedin', 'linkedin.com/in/isaiah-bernal-707576218'),
      kvLine('github',   'github.com/ibernal1815'),
      kvLine('location', 'Los Angeles, CA'),
    ],

    goal: () => [
      txt('t-dim', ''),
      txt('t-val', 'Career objective:'),
      txt('t-dim', ''),
      txt('t-dim', 'SOC L1 Analyst  →  Detection Engineer  →  Purple Team'),
      txt('t-dim', ''),
      txt('t-dim', 'Each step is being built deliberately.'),
      txt('t-dim', 'The research practice, the certifications, the tooling:'),
      txt('t-dim', 'all of it points toward writing the detection logic,'),
      txt('t-dim', 'not just working the alerts.'),
      txt('t-dim', ''),
      txt('t-dim', 'Fork after detection engineering: DFIR or malware reversing.'),
      txt('t-dim', 'The work makes that call.'),
    ],
  };

  // ── rate limiting — prevents terminal spam ────────────────────────────────
  // max 20 commands per 10-second window. resets automatically.
  let cmdCount = 0;
  let cmdWindowStart = Date.now();
  const CMD_LIMIT = 20;
  const CMD_WINDOW_MS = 10000;

  function isRateLimited() {
    const now = Date.now();
    if (now - cmdWindowStart > CMD_WINDOW_MS) {
      cmdCount = 0;
      cmdWindowStart = now;
    }
    cmdCount++;
    return cmdCount > CMD_LIMIT;
  }

  // ── command history ───────────────────────────────────────────────────────
  const cmdHistory = [];
  let histIdx = -1;
  const MAX_HISTORY = 50;

  // ── boot ──────────────────────────────────────────────────────────────────
  appendLines([
    txt('t-dim', "Isaiah Bernal's portfolio terminal v1.0"),
    txt('t-dim', 'Type  help  to get started.'),
    txt('t-dim', ''),
  ]);

  // ── input handler ─────────────────────────────────────────────────────────
  termInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const raw = termInput.value.trim();
      termInput.value = '';
      histIdx = -1;
      if (!raw) return;

      // cap history size
      cmdHistory.unshift(raw);
      if (cmdHistory.length > MAX_HISTORY) cmdHistory.pop();

      // rate limit check — logged to console for observability
      if (isRateLimited()) {
        appendPromptLine(raw);
        appendLines([
          txt('t-err', 'rate limit: slow down.'),
          txt('t-dim', ''),
        ]);
        return;
      }

      const cmd = raw.toLowerCase();
      appendPromptLine(raw);

      if (cmd === 'clear') {
        termOutput.innerHTML = '';
        return;
      }

      const fn = COMMANDS[cmd];
      if (fn) {
        appendLines([txt('', '')]);
        appendLines(fn());
        appendLines([txt('', '')]);
      } else {
        // user input reflected only via textContent — safe
        appendLines([
          txt('t-err', 'command not found: ' + raw),
          txt('t-dim', 'type  help  for available commands.'),
          txt('', ''),
        ]);
      }

      termOutput.scrollTop = termOutput.scrollHeight;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < cmdHistory.length - 1) histIdx++;
      termInput.value = cmdHistory[histIdx] || '';
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) {
        histIdx--;
        termInput.value = cmdHistory[histIdx] || '';
      } else {
        histIdx = -1;
        termInput.value = '';
      }
    }
  });

  // focus on click anywhere inside the terminal widget
  terminalEl.addEventListener('click', function () {
    termInput.focus();
  });

})();
