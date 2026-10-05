"""Check static HTML links, fragments, assets and metadata without network calls."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,unquote
import sys
ROOT=Path(__file__).resolve().parent.parent
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.ids=set();self.title=False;self.lang=False;self.viewport=False
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.add(a['id'])
  if tag=='title':self.title=True
  if tag=='html' and a.get('lang'):self.lang=True
  if tag=='meta' and a.get('name')=='viewport':self.viewport=True
  for field in ['href','src']:
   if field in a:self.links.append(a[field])
def check():
 pages={};errors=[]
 for p in ROOT.rglob('*.html'):
  if '.git' in p.parts:continue
  parsed=Page();parsed.feed(p.read_text());pages[p.resolve()]=parsed
 for p,page in pages.items():
  label=p.relative_to(ROOT)
  for attr in ['title','lang','viewport']:
   if not getattr(page,attr):errors.append(f'{label}: missing {attr}')
  for link in page.links:
   u=urlsplit(link)
   if u.scheme or u.netloc or not link or link.startswith('data:'):continue
   target=(ROOT/unquote(u.path).lstrip('/')) if u.path.startswith('/') else (p.parent/unquote(u.path)) if u.path else p
   target=target.resolve()
   if target.is_dir():target/= 'index.html'
   if not target.exists():errors.append(f'{label}: missing local target {link}');continue
   if u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids:errors.append(f'{label}: missing fragment {link}')
 return len(pages),errors
if __name__=='__main__':
 count,errors=check()
 for e in errors:print(e)
 print(f'Checked {count} HTML pages; {len(errors)} errors. External delivery and browser behavior are not tested.')
 sys.exit(bool(errors))
