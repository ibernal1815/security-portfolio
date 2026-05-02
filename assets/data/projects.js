// projects.js — single source of truth for all project data.
// update here and it propagates everywhere automatically.

const PROJECTS = [
  {
    title: 'Malware Analysis Lab',
    summary: 'FLARE-VM + REMnux static/dynamic analysis environment with YARA rules and Sigma detections integrated into Wazuh SIEM.',
    tags: ['DFIR', 'YARA', 'Sigma', 'Wazuh', 'FLARE-VM', 'REMnux'],
    github: 'https://github.com/ibernal1815/malware-analysis-lab',
    body: `
      <p>FLARE-VM and REMnux configured as a dual-environment static and dynamic malware analysis lab.
      The lab handles the full analysis lifecycle: PE header inspection, string extraction, behavioral
      sandbox execution, and memory forensics on captured samples.</p>
      <hr class="modal-divider">
      <p><strong>What it produces:</strong> Every analyzed sample gets a structured IOC report with indicators
      mapped to MITRE ATT&amp;CK techniques. YARA rules and Sigma detections are written from those indicators
      and integrated directly into Wazuh SIEM, so the analysis output becomes operational detection logic,
      not just a report that sits in a folder.</p>
      <hr class="modal-divider">
      <p><strong>Why it exists:</strong> Most malware analysis labs stop at the analysis. This one closes
      the loop from sample to production-ready detection in the same workflow.</p>
    `
  },
  {
    title: 'Sysmon Detection Lab',
    summary: 'Simulated credential dumping, persistence, and lateral movement in VMware. Sigma rules, Wazuh + Elastic SIEM correlation.',
    tags: ['Detection Engineering', 'Sysmon', 'Sigma', 'Wazuh', 'Elastic', 'VMware'],
    github: 'https://github.com/ibernal1815/sysmon-sysinternals-detection-lab',
    body: `
      <p>A two-VM VMware lab that simulates realistic adversary behavior: credential dumping, persistence
      mechanisms, and lateral movement techniques drawn from real-world attack chains. Each technique is
      executed, captured in Sysmon event logs, and used to write detection logic for that exact behavior.</p>
      <hr class="modal-divider">
      <p><strong>Stack:</strong> Sysmon for host telemetry, Sigma rules for portable detection logic,
      Wazuh and Elastic SIEM for alert correlation and rule tuning. The detection rules go through
      iterative refinement — run the attack, see what fires, reduce noise, repeat.</p>
      <hr class="modal-divider">
      <p><strong>The point:</strong> Detection engineering is not guesswork. Simulating the attack first
      makes the rule writing significantly less theoretical and the tuning significantly more precise.</p>
    `
  },
  {
    title: 'Threat Intel Enricher',
    summary: 'CLI tool that enriches IOCs against VirusTotal and AbuseIPDB. Removes the manual lookup step from triage workflows.',
    tags: ['Python', 'OSINT', 'VirusTotal', 'AbuseIPDB', 'CLI', 'Pipeline'],
    github: 'https://github.com/ibernal1815',
    body: `
      <p>A Python CLI tool that takes raw IOCs — IPs, domains, hashes — and enriches them against
      VirusTotal and AbuseIPDB in a single command. Designed to slot into an existing triage workflow
      as a pipeline stage rather than a standalone tool that requires a context switch.</p>
      <hr class="modal-divider">
      <p><strong>Design principle:</strong> The manual lookup step is where triage slows down. An analyst
      triaging 40 alerts does not want to open a browser, paste a hash, read a report, close the tab,
      and repeat. The enricher handles that lookup and returns structured output that can be parsed downstream.</p>
      <hr class="modal-divider">
      <p>Works in pipeline with the log-normalizer tool. Both follow the same code style: modular Python,
      lowercase conversational inline comments, no over-engineering.</p>
    `
  },
  {
    title: 'AES Keylogger + Flask C2',
    summary: 'AES-encrypted keylogger with Flask command and control. Built to understand the full attack chain from initial access through exfiltration.',
    tags: ['Python', 'Flask', 'AES Encryption', 'C2', 'Offensive', 'Red Team'],
    github: 'https://github.com/ibernal1815',
    body: `
      <p>An AES-encrypted keylogger paired with a Flask command and control server. The keylogger captures
      and encrypts keystrokes on the target, exfiltrates them to the C2 over HTTP, and the server decrypts
      and logs the data for review.</p>
      <hr class="modal-divider">
      <p><strong>Why build this:</strong> Writing detection rules for keyloggers and C2 communication is
      considerably less abstract when you have built one yourself. You know exactly which process names,
      which network patterns, which registry keys, and which event log entries the attack generates —
      because you generated them.</p>
      <hr class="modal-divider">
      <p>The project produced both the tooling and a set of Sigma rules and network signatures written
      specifically to detect the behavior patterns it implements.</p>
    `
  },
  {
    title: 'File Integrity Monitor in C',
    summary: 'Low-level FIM written in C. Monitors filesystem state and flags unauthorized changes at the system call level.',
    tags: ['C', 'Systems Programming', 'Defense', 'Filesystem', 'Low-Level'],
    github: 'https://github.com/ibernal1815',
    body: `
      <p>A file integrity monitor written in C. The tool hashes a defined set of files at baseline,
      then monitors for modifications, additions, and deletions — flagging any deviation from the
      known good state.</p>
      <hr class="modal-divider">
      <p><strong>Why C:</strong> Python FIMs exist. The point was to work at the level where inotify
      and system calls are the primitive, not a library wrapper. Understanding how the OS exposes
      filesystem events at the C level changes how you reason about what a FIM can and cannot see.</p>
      <hr class="modal-divider">
      <p>This project also served as the first serious C project — chosen specifically because it is
      security-relevant, not just a toy program. Learning the language through something that matters
      to the actual career path.</p>
    `
  },
  {
    title: 'Linux PrivEsc Lab',
    summary: 'Two-VM lab covering SUID, systemd abuse, sudo misconfig, and capability escalation. Every vector documented with detection counterparts.',
    tags: ['Linux', 'Privilege Escalation', 'Bash', 'SUID', 'systemd', 'sudo'],
    github: 'https://github.com/ibernal1815',
    body: `
      <p>A two-VM lab built to systematically work through Linux privilege escalation techniques:
      SUID binary abuse, systemd service exploitation, sudo misconfiguration, and capability-based
      escalation. Each vector is implemented on a deliberately vulnerable target VM.</p>
      <hr class="modal-divider">
      <p><strong>Structure:</strong> Every technique is documented with the attack command, what it
      exploits, what telemetry it generates, and the detection logic for catching the same behavior
      in a production Linux environment. Attack and defense documented in the same place.</p>
      <hr class="modal-divider">
      <p>The lab also served as preparation for real-world CTF-style exercises and as a reference
      for understanding what legitimately suspicious sudo and SUID activity looks like when it
      appears in log triage.</p>
    `
  }
];
