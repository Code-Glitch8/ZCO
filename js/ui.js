// Redesigned dashboard + lesson flow (Lesson -> Next -> Question with ChatGPT PYQ prompt)
S.qs=S.qs||{};
const mkPrompt=(c,L)=>`You are an expert ZCO (Zonal Computing Olympiad, India) coach and problem setter.
Topic: ${c.n}  |  Level ${L+1}: ${LEVELS[L]}

Give me ONE practice question on this topic. It should PREFERABLY be a real previous-year question (PYQ) from ZCO, INOI or the IARCS archive (name the year and problem title). If you cannot recall a genuine PYQ on this topic, say so clearly and give the closest PYQ-style question instead.

Format:
1. Source (year / contest / problem name, or "PYQ-style")
2. Problem statement in your own words (do not copy the official text)
3. Input format, output format, constraints, one sample
4. Subtasks (as in ZCO partial marking)
5. Hint (hidden until I ask)
6. Full solution idea + C++ code + complexity

Difficulty: ${LEVELS[L]} level for a student preparing for ZCO.`;
const sec=a=>a.map(x=>`<div class=sec><h3>${x[0]}</h3>${x[1]}</div>`).join('');
V.dash=()=>{const nx=CHAPTERS.find(c=>done(c.id)<6);H(`<div class=hero><h1>ZCO Prep Studio</h1><p class=mu>Learn. Practise. Compete. ZCO-2027: 12 Dec 2026, 2–5 pm (IARCS).</p>${nx?`<a href="#path/${nx.id}/${done(nx.id)}"><button class=p>Continue: ${nx.n} · Level ${done(nx.id)+1}</button></a>`:'<p class=ok>All chapters done. Do mocks.</p>'}</div><div class=grid><div class=card><div class=mu>Syllabus progress</div><div class=stat>${pct()}%</div><div class=bar><i style="width:${pct()}%"></i></div></div><div class=card><div class=mu>PYQs solved</div><div class=stat>${Object.values(S.pq).filter(p=>p.s).length}/${PYQ.length}</div></div></div><h2>Chapters</h2><div class=grid>${CHAPTERS.map(c=>`<a href="#path/${c.id}/${Math.min(done(c.id),5)}" style="text-decoration:none;color:inherit"><div class=card><b>${c.n}</b><div class=mu style="font-size:.85rem">${HOURS[c.id]}h suggested · ${done(c.id)}/6 levels</div><div class=bar><i style="width:${done(c.id)/6*100}%"></i></div></div></a>`).join('')}</div>`)};
const oldPath=V.path;
V.path=(a,l,ph)=>{const c=CHAPTERS.find(x=>x.id==a);if(!c)return oldPath(a,l);const L=+(l||0);if(L>done(c.id))return H('<div class=card>🔒 Locked. Finish earlier levels first. <a href="#path">Back</a></div>');
const d=window.DEEP&&DEEP[c.id],k=c.id+'-'+L,steps=`<div class=steps><span class="${ph?'':'on'}">1 · Lesson</span><span class="${ph?'on':''}">2 · Question</span></div>`;
if(!ph)return H(`<p><a href="#path">← Learning path</a></p><h1>${c.n}</h1><p class=mu>Level ${L+1} of 6 · ${LEVELS[L]}</p>${steps}<div class=card><p><b>${c.note}</b></p>${d?`<p>${d.intro}</p>`:''}</div>${d?`<div class=card>${sec(d.s)}</div>`:lessonHTML(c.id)}<p>Official lesson: <a target=_blank href="${c.u}">IARCS ${c.n}</a></p><div class=row><button class=p onclick="location.hash='path/${c.id}/${L}/q'">Next → Question</button></div>`);
const p=mkPrompt(c,L),sv=S.qs[k]||'';
H(`<p><a href="#path/${c.id}/${L}">← Back to lesson</a></p><h1>Practice Question</h1><p class=mu>${c.n} · Level ${L+1}: ${LEVELS[L]}</p>${steps}<div class=card><h3 style="margin-top:0">Step A · Copy this prompt into ChatGPT</h3><div class=promptbox id=pp>${esc(p)}</div><div class=row><button class=p onclick="navigator.clipboard.writeText($('#pp').textContent);this.textContent='Copied ✓'">Copy prompt</button></div></div><div class=card><h3 style="margin-top:0">Step B · Paste ChatGPT's question here</h3><textarea style="width:100%;min-height:200px" placeholder="Paste the question here. It is saved in this browser." onchange="S.qs['${k}']=this.value;save()">${esc(sv)}</textarea><div class=row><button class=p onclick="if(done('${c.id}')==${L}){S.lv['${c.id}']=${L+1};}save();location.hash='path/${c.id}/${Math.min(L+1,5)}'">Mark complete → next level</button></div></div>`)};
route();
