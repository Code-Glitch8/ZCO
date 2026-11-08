// Lesson-by-lesson flow: Lesson -> Next -> Question (ChatGPT PYQ prompt)
S.qs=S.qs||{};
const unent=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
const lessonsOf=c=>{if(COURSE[c.id])return COURSE[c.id];const l=LESSONS[c.id]||{};return[{t:'Overview',e:`<p>${c.note}</p><p>${l.explain||''}</p><p><b>Example.</b> ${l.ex||''}</p>`,code:unent(l.code||'// full lesson coming soon'),inp:'',out:'',qk:'one problem on this topic at the right difficulty',qf:c.n}]};
const tot=c=>lessonsOf(c).length,dn=c=>Math.min(done(c.id),tot(c));
const ovr=()=>{const t=CHAPTERS.reduce((a,c)=>a+tot(c),0);return Math.round(CHAPTERS.reduce((a,c)=>a+dn(c),0)/t*100)};
const mkPrompt=(c,ls,i)=>`You are an expert ZCO (Zonal Computing Olympiad, India) coach and problem setter.

Chapter: ${c.n}
Lesson ${i+1} of ${tot(c)}: ${ls.t}
Question type: ${ls.qk}
Focus: ${ls.qf}

Give me ONE practice question for a student who has just learned exactly this lesson. It should PREFERABLY be a real previous-year question (PYQ) from ZCO, INOI or the IARCS archive; name the year and problem. If you cannot recall a genuine PYQ, say so and give the closest PYQ-style question.

Format:
1. Source (year / contest / problem, or "PYQ-style")
2. Problem statement in your own words (do not copy official text)
3. Input format, output format, constraints, one sample with output
4. Subtasks (ZCO partial marking)
5. Hint (I will ask when needed)
6. Solution idea, C++ code, complexity

Keep the difficulty suited to this lesson, not harder.`;
const nextU=(c,i)=>i+1<tot(c)?`path/${c.id}/${i+1}`:'path';
V.dash=()=>{const nx=CHAPTERS.find(c=>dn(c)<tot(c)),p=ovr();H(`<div class=hero><h1>ZCO Prep Studio</h1><p class=mu>Learn. Practise. Compete. ZCO-2027: 12 Dec 2026, 2–5 pm (IARCS).</p>${nx?`<a href="#path/${nx.id}/${dn(nx)}"><button class=p>Continue: ${nx.n} · Lesson ${dn(nx)+1}</button></a>`:'<p class=ok>All lessons done. Do mocks.</p>'}</div><div class=grid><div class=card><div class=mu>Lesson progress</div><div class=stat>${p}%</div><div class=bar><i style="width:${p}%"></i></div></div><div class=card><div class=mu>PYQs solved</div><div class=stat>${Object.values(S.pq).filter(x=>x.s).length}/${PYQ.length}</div></div></div><h2>Chapters</h2><div class=grid>${CHAPTERS.map(c=>`<a href="#path/${c.id}" style="text-decoration:none;color:inherit"><div class=card><b>${c.n}</b><div class=mu style="font-size:.85rem">${dn(c)}/${tot(c)} lessons</div><div class=bar><i style="width:${dn(c)/tot(c)*100}%"></i></div></div></a>`).join('')}</div>`)};
V.path=(a,l,ph)=>{const c=CHAPTERS.find(x=>x.id==a);
if(!c)return H(`<h1>Learning Path</h1><p class=mu>Easier topics have fewer lessons, harder topics have more. Finish each lesson's question to unlock the next.</p>${CHAPTERS.map(c=>`<div class=card><b>${c.n}</b> <span class=mu>· ${tot(c)} lesson${tot(c)>1?'s':''}</span><br>${lessonsOf(c).map((x,i)=>`<a class="lv ${i<dn(c)?'done':i>dn(c)?'lock':''}" href="#path/${c.id}/${i}">${i+1}. ${esc(x.t)}</a>`).join('')}</div>`).join('')}`);
const ls=lessonsOf(c),i=l===undefined?Math.min(dn(c),tot(c)-1):+l,x=ls[i];
if(!x)return H('<div class=card>Lesson not found. <a href="#path">Back</a></div>');
if(i>dn(c))return H('<div class=card>🔒 Finish the earlier lessons first. <a href="#path">Back</a></div>');
const steps=`<div class=steps><span class="${ph?'':'on'}">1 · Lesson</span><span class="${ph?'on':''}">2 · Question</span></div>`,head=`<p><a href="#path">← Learning path</a> · ${c.n}</p>`;
if(!ph)return H(`${head}<h1>${i+1}. ${esc(x.t)}</h1><p class=mu>Lesson ${i+1} of ${ls.length}</p>${steps}<div class=card>${x.e}</div><div class=card><h3 style="margin-top:0">Example code</h3><pre>${esc(x.code)}</pre>${x.inp?`<h3>Input</h3><pre>${esc(x.inp)}</pre>`:''}${x.out?`<h3>Output</h3><pre>${esc(x.out)}</pre>`:''}</div><div class=card><b>▶ Video:</b> <a target=_blank rel=noopener href="${videoURL(c,x)}">Watch videos on “${esc(x.t)}”</a><div class=mu style="font-size:.85rem">Opens a YouTube search for this exact topic.</div></div><p class=mu>More: <a target=_blank href="${c.u}">official IARCS ${c.n}</a></p><div class=row><button class=p onclick="location.hash='path/${c.id}/${i}/q'">Next → Question</button></div>`);
const k=c.id+'-'+i,p=mkPrompt(c,x,i);
H(`${head}<h1>Question · ${esc(x.t)}</h1>${steps}<div class=card><h3 style="margin-top:0">Step A · Copy this prompt into ChatGPT</h3><div class=promptbox id=pp>${esc(p)}</div><div class=row><button class=p onclick="navigator.clipboard.writeText($('#pp').textContent);this.textContent='Copied ✓'">Copy prompt</button></div></div><div class=card><h3 style="margin-top:0">Step B · Paste ChatGPT's question here</h3><textarea style="width:100%;min-height:200px" placeholder="Paste the question here (saved in this browser)." onchange="S.qs['${k}']=this.value;save()">${esc(S.qs[k]||'')}</textarea><div class=row><button class=p onclick="if(done('${c.id}')==${i})S.lv['${c.id}']=${i+1};save();location.hash='${nextU(c,i)}'">${i+1<ls.length?'Mark complete → next lesson':'Mark complete → finish chapter'}</button></div></div>`)};
route();
