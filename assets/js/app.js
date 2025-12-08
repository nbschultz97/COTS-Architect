// Ceradon Architect SPA
// - Hash-based routes: home, workflow, tools, mission, demos, docs
// - Theme tokens live in assets/css/styles.css
// - Add new tools/demos by editing the data blocks below

const toolData = [
  {
    name: 'Mission Architect',
    type: 'Mission composition',
    description: 'Mission-first entry point for phases, AO geometry, and constraints that drive the rest of the stack.',
    status: 'Live demo',
    badges: ['Mission composition', 'JSON export'],
    link: 'https://nbschultz97.github.io/Mission-Architect/'
  },
  {
    name: 'Node Architect',
    type: 'Planning tool',
    description: 'Define sensing nodes, payload stacks, power envelopes, and deployment conditions.',
    status: 'Live demo',
    badges: ['Node planning', 'Payload design'],
    link: 'https://nbschultz97.github.io/Ceradon-Node-Architect/web/index.html'
  },
  {
    name: 'UxS Architect',
    type: 'Planning tool',
    description: 'Pair nodes to UxS platforms (air/ground/surface) with loadouts and sortie timing.',
    status: 'Live demo',
    badges: ['Platform design', 'Loadouts'],
    link: 'https://nbschultz97.github.io/Ceradon-UxS-Architect/web/'
  },
  {
    name: 'Mesh Architect',
    type: 'RF tool',
    description: 'Shape RF meshes, relays, and gateways for contested environments.',
    status: 'Live demo',
    badges: ['Mesh / RF', 'Coverage'],
    link: 'https://nbschultz97.github.io/Ceradon-Mesh-Architect/'
  },
  {
    name: 'KitSmith',
    type: 'Planning tool',
    description: 'Build kits, spares, and sustainment loads aligned to mission phases and roles.',
    status: 'Live demo',
    badges: ['Kits & sustainment', 'Resupply'],
    link: 'https://nbschultz97.github.io/Ceradon-KitSmith/'
  }
];

const workflowModes = [
  {
    name: 'Mission-first',
    primary: ['Mission Architect'],
    secondary: ['Node Architect', 'UxS Architect', 'Mesh Architect', 'KitSmith'],
    description: 'Start with AO, phases, and constraints. Push node packages, platform pairings, meshes, and kits from mission exports.',
    scenario: 'Recon-in-force across two phases with RF denied windows.',
    action: { label: 'Open Mission Architect', link: 'https://nbschultz97.github.io/Mission-Architect/' }
  },
  {
    name: 'Inventory-first',
    primary: ['Node Architect', 'UxS Architect'],
    secondary: ['Mesh Architect', 'KitSmith', 'Mission Architect'],
    description: 'Start from what you have on hand: payloads, radios, and platforms. Back-map to missions and sustainment.',
    scenario: 'Inventory of five quads and mixed RF payloads, mapping to ISR tasks.',
    action: { label: 'Highlight tools', link: '#/tools', highlight: ['Node Architect', 'UxS Architect'] }
  },
  {
    name: 'Constraint-first',
    primary: ['KitSmith'],
    secondary: ['Mission Architect', 'Node Architect', 'UxS Architect', 'Mesh Architect'],
    description: 'Lead with sustainment limits, team roles, and resupply cadence. Size missions and nodes to fit.',
    scenario: '72-hour small team with cold weather sustainment and limited resupply.',
    action: { label: 'Open KitSmith', link: 'https://nbschultz97.github.io/Ceradon-KitSmith/' }
  },
  {
    name: 'RF-environment-first',
    primary: ['Mesh Architect'],
    secondary: ['Mission Architect', 'Node Architect', 'UxS Architect', 'KitSmith'],
    description: 'Anchor on spectrum, terrain, and denial threats. Fit mission, platforms, and kits to viable RF paths.',
    scenario: 'Dense urban block with limited LOS and heavy multipath.',
    action: { label: 'Open Mesh Architect', link: 'https://nbschultz97.github.io/Ceradon-Mesh-Architect/' }
  }
];

const demoStories = [
  {
    name: 'Cold-weather recon lane',
    entry: 'Mission-first',
    flow: 'Mission Architect → Node Architect → UxS Architect → Mesh Architect → KitSmith',
    outputs: 'Mission phases with cold-weather sustainment, nodes with heaters, quad sorties, urban mesh, winter kits.',
    links: {
      mission: 'https://nbschultz97.github.io/Mission-Architect/',
      tools: [
        'https://nbschultz97.github.io/Ceradon-Node-Architect/web/index.html',
        'https://nbschultz97.github.io/Ceradon-UxS-Architect/web/',
        'https://nbschultz97.github.io/Ceradon-Mesh-Architect/',
        'https://nbschultz97.github.io/Ceradon-KitSmith/'
      ]
    }
  },
  {
    name: 'Urban mesh in dense city block',
    entry: 'RF-environment-first',
    flow: 'Mesh Architect → Mission Architect → Node Architect → UxS Architect → KitSmith',
    outputs: 'RF survey-driven relays, mission phases constrained to coverage pockets, small quad loadouts, lean kits.',
    links: {
      mission: 'https://nbschultz97.github.io/Mission-Architect/',
      tools: [
        'https://nbschultz97.github.io/Ceradon-Mesh-Architect/',
        'https://nbschultz97.github.io/Mission-Architect/',
        'https://nbschultz97.github.io/Ceradon-Node-Architect/web/index.html',
        'https://nbschultz97.github.io/Ceradon-UxS-Architect/web/',
        'https://nbschultz97.github.io/Ceradon-KitSmith/'
      ]
    }
  },
  {
    name: 'Inventory-driven kit refresh',
    entry: 'Inventory-first',
    flow: 'Node Architect → UxS Architect → Mission Architect → KitSmith → Mesh Architect',
    outputs: 'Start with inventory, approve platforms, capture mission framing, right-size sustainment, then check RF links.',
    links: {
      mission: 'https://nbschultz97.github.io/Mission-Architect/',
      tools: [
        'https://nbschultz97.github.io/Ceradon-Node-Architect/web/index.html',
        'https://nbschultz97.github.io/Ceradon-UxS-Architect/web/',
        'https://nbschultz97.github.io/Mission-Architect/',
        'https://nbschultz97.github.io/Ceradon-KitSmith/',
        'https://nbschultz97.github.io/Ceradon-Mesh-Architect/'
      ]
    }
  }
];

const routes = ['home', 'workflow', 'tools', 'mission', 'demos', 'docs'];
let highlightedTools = [];

function setActiveRoute(route) {
  const target = routes.includes(route) ? route : 'home';

  document.querySelectorAll('.view').forEach(section => {
    section.hidden = section.id !== target;
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    const isActive = link.dataset.route === target;
    link.classList.toggle('active', isActive);
  });
}

function handleHashChange() {
  const hash = window.location.hash.replace('#/', '') || 'home';
  setActiveRoute(hash);
}

function buildTools() {
  const grid = document.getElementById('toolGrid');
  grid.innerHTML = '';

  toolData.forEach(tool => {
    const card = document.createElement('article');
    card.className = 'tool-card';
    if (highlightedTools.includes(tool.name)) {
      card.classList.add('highlight');
    }
    card.innerHTML = `
      <div class="status ${tool.status.toLowerCase().replace(' ', '')}">${tool.status}</div>
      <h3>${tool.name}</h3>
      <p class="small">${tool.type}</p>
      <p>${tool.description}</p>
      <div class="badges">${tool.badges.map(b => `<span class="badge">${b}</span>`).join('')}</div>
      <a class="btn primary" href="${tool.link}" target="_blank" rel="noopener">Open in new tab</a>
    `;
    grid.appendChild(card);
  });
}

function buildWorkflows() {
  const grid = document.getElementById('workflowModes');
  grid.innerHTML = '';

  workflowModes.forEach(mode => {
    const card = document.createElement('div');
    card.className = 'workflow-card';
    card.innerHTML = `
      <h3>${mode.name}</h3>
      <p>${mode.description}</p>
      <p class="small"><strong>Primary:</strong> ${mode.primary.join(', ')}</p>
      <p class="small"><strong>Secondary:</strong> ${mode.secondary.join(', ')}</p>
      <p class="small"><strong>Example:</strong> ${mode.scenario}</p>
    `;
    const action = document.createElement('a');
    action.className = 'btn ghost';
    action.textContent = mode.action.label;
    action.href = mode.action.link;
    if (!mode.action.link.startsWith('http')) {
      action.addEventListener('click', (e) => {
        e.preventDefault();
        highlightedTools = mode.action.highlight || [];
        buildTools();
        window.location.hash = mode.action.link;
      });
    } else {
      action.target = '_blank';
      action.rel = 'noopener';
    }
    card.appendChild(action);
    grid.appendChild(card);
  });
}

function buildDemos() {
  const grid = document.getElementById('demoGrid');
  grid.innerHTML = '';

  demoStories.forEach(demo => {
    const card = document.createElement('div');
    card.className = 'demo-card';
    card.innerHTML = `
      <h3>${demo.name}</h3>
      <p class="small"><strong>Entry:</strong> ${demo.entry}</p>
      <p class="small"><strong>Flow:</strong> ${demo.flow}</p>
      <p>${demo.outputs}</p>
    `;

    const actions = document.createElement('div');
    actions.className = 'demo-actions';

    const openMission = document.createElement('a');
    openMission.className = 'btn ghost';
    openMission.textContent = 'Open Mission Architect';
    openMission.href = demo.links.mission;
    openMission.target = '_blank';
    openMission.rel = 'noopener';
    actions.appendChild(openMission);

    const openTools = document.createElement('a');
    openTools.className = 'btn subtle';
    openTools.textContent = 'Open relevant tools';
    openTools.href = '#';
    openTools.addEventListener('click', (e) => {
      e.preventDefault();
      demo.links.tools.forEach(url => window.open(url, '_blank', 'noopener'));
    });

    actions.appendChild(openTools);
    card.appendChild(actions);
    grid.appendChild(card);
  });
}

function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('ceradon-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
  toggle.textContent = document.documentElement.getAttribute('data-theme') === 'light' ? '☀️' : '🌙';

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ceradon-theme', next);
    toggle.textContent = next === 'light' ? '☀️' : '🌙';
  });
}

function initApp() {
  buildTools();
  buildWorkflows();
  buildDemos();
  initThemeToggle();
  handleHashChange();
  window.addEventListener('hashchange', handleHashChange);
}

document.addEventListener('DOMContentLoaded', initApp);
