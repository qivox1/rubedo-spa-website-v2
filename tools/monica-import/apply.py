# Import von Monicas statischem Export nach v2.
# Aufruf (im Repo-Root): python3 tools/monica-import/apply.py <export-ordner>
# Wendet alle v2-Anpassungen an (Links/Assets root-absolut, Fonts self-hosted,
# Tweaks-Panel raus, Nav-CTA-Fix in styles.css). Löscht nichts; robots.txt,
# _headers, favicon, fonts/ und 404 bleiben unangetastet.
import re, os, shutil, sys
sys.path.insert(0, os.path.dirname(__file__))
from port import transform
SRC = sys.argv[1]  # Monicas Export-Ordner (z. B. github-export/rubedo-spa)
V2 = os.path.abspath(sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(__file__), '..', '..'))
EXCLUDE = {'lab-prinzipien.html', 'luxury-kompass.html', 'sitemap.html'}  # Monicas interne Werkzeuge (.htaccess sperrt sie)
FONT_LINK = '<link rel="stylesheet" href="/fonts/fonts.css">'
VS_JS = """<script>
/* Design-Defaults + Entrance + Reveal — vormals Teil des React/Babel-Tweaks-Panels
   (Dev-Werkzeug, entfernt 2026-07-14). Verhalten identisch: Cream · Aura an · Glow 80 %. */
document.body.setAttribute('data-bg', 'cream');
document.body.setAttribute('data-aura', 'on');
document.body.style.setProperty('--vs-glow', '0.8');
"""
def fonts(t, name):
    t = re.sub(r'[ \t]*<link rel="preconnect" href="https://fonts\.(googleapis|gstatic)\.com"[^>]*>\n?', '', t)
    t, n = re.subn(r'<link href="https://fonts\.googleapis\.com/css2\?[^"]*" rel="stylesheet">', FONT_LINK, t)
    t, n2 = re.subn(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com/css2\?[^"]*">', FONT_LINK, t)
    assert n + n2 == 1, (name, n, n2)
    assert 'fonts.g' not in t, name
    return t
def tweaks(t, name):
    if name == 'anwendungen.html':
        t, n = re.subn(r'\n<!-- ===== Tweaks ===== -->\n.*?</script>\n(?=</body>)', '\n', t, flags=re.S); assert n == 1
    elif name == 'genomis.html':
        t, n = re.subn(r'\n<div id="tweaks-root"></div>\n\n<!-- ══════════ TWEAKS.*?</script>\n(?=</body>)', '\n', t, flags=re.S); assert n == 1
    elif name == 'vier-schichten.html':
        t, n = re.subn(r'<div id="tweak-root"></div>\n', '', t); assert n == 1
        t, n = re.subn(r'<script src="https://unpkg\.com/react@.*?ReactDOM\.createRoot\(document\.getElementById\(\'tweak-root\'\)\)\.render\(<App />\);\n', VS_JS, t, flags=re.S); assert n == 1
    assert 'unpkg' not in t and 'text/babel' not in t, name
    return t
pages = sorted(f for f in os.listdir(SRC) if f.endswith('.html') and f not in EXCLUDE)
new_routes = []
for f in pages:
    t = open(os.path.join(SRC, f), encoding='utf-8').read()
    t = transform(t); t = fonts(t, f); t = tweaks(t, f)
    open(os.path.join(V2, 'src/monica', f), 'w', encoding='utf-8').write(t)
    slug = f[:-5]; route = os.path.join(V2, 'src/pages', slug + '.astro')
    if not os.path.exists(route):
        open(route, 'w').write(f"---\nimport html from '../monica/{f}?raw';\n---\n<Fragment set:html={{html}} />\n"); new_routes.append(slug)
print(len(pages), 'Seiten übernommen; neue Routen:', new_routes)
# Assets
for d in ('img', 'audio'):
    for fn in os.listdir(os.path.join(SRC, d)):
        shutil.copy2(os.path.join(SRC, d, fn), os.path.join(V2, 'public', d, fn))
for fn in ('system.css', 'app.js', 'llms.txt'):
    shutil.copy2(os.path.join(SRC, fn), os.path.join(V2, 'public', fn))
css = open(os.path.join(SRC, 'styles.css'), encoding='utf-8').read()
anchor = '.nav-cta:hover { background: var(--gold-l); }\n'
assert css.count(anchor) == 1
fix = anchor + """/* ── FIX v2-Portierung (2026-07-14, erneut 2026-10-19) ─────────────
   .nav-cta wurde von ».nav-links a { padding-bottom: 2px }« per Spezifität
   überstimmt und blieb display:inline → Button wirkte vertikal abgeschnitten.
   Steht bewusst VOR den Media-Queries, damit Monicas Mobil-Regeln greifen. */
.nav-links a.nav-cta { display: inline-flex; align-items: center; padding: 10px 22px; }
"""
open(os.path.join(V2, 'public/styles.css'), 'w', encoding='utf-8').write(css.replace(anchor, fix))
print('Assets kopiert')
