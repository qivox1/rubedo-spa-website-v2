import re, sys
ASSET = r'(?:img|audio|fonts|video|videos)/[^"\'()\s<>]+?\.[A-Za-z0-9]{2,5}|styles\.css|system\.css|app\.js|tweaks-panel\.jsx|favicon\.ico|llms\.txt'
PAGE = r'([A-Za-z0-9_\-]+)\.html((?:[?#][^"\'()\s<>]*)?)'
def page_repl(m):
    pre, dot, name, suf = m.group(1), m.group(2), m.group(3), m.group(4)
    path = '/' if name == 'index' else f'/{name}/'
    return f'{pre}{path}{suf}'
def transform(t):
    # interne Seitenlinks in Attributen / Strings / url()
    t = re.sub(r'(["\'(=]|&quot;)(\./)?' + PAGE + r'(?=["\')\s>]|&quot;)', page_repl, t)
    # Assets root-absolut
    t = re.sub(r'(["\'(]|&quot;)(?:\./)?(' + ASSET + r')', r'\1/\2', t)
    # weitere Einträge in srcset
    t = re.sub(r'(,\s*)(?:\./)?((?:img)/[^"\'()\s<>]+\s+\d)', r'\1/\2', t)
    return t
if __name__ == '__main__':
    src, dst = sys.argv[1], sys.argv[2]
    open(dst, 'w', encoding='utf-8').write(transform(open(src, encoding='utf-8').read()))
