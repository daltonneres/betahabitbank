// ── STATE ──────────────────────────────────────────────────────
const st = {
    pts: 1240, saldo: 3420.00, ent: 4600.00, sai: 2180.00, tipo: 'e',
    txs: [
        { d: 'Salário Março', c: '&#128188; Salário', v: 4000.00, t: 'e', dt: '22/03/2026', ct: 'Conta corrente' },
        { d: 'Supermercado BH', c: '&#127828; Alimentação', v: 280.00, t: 's', dt: '21/03/2026', ct: 'Cartão de crédito' },
        { d: 'Freelance - Logo', c: '&#128187; Freelance', v: 600.00, t: 'e', dt: '20/03/2026', ct: 'PIX' },
        { d: 'Uber', c: '&#128663; Transporte', v: 45.00, t: 's', dt: '19/03/2026', ct: 'Cartão de crédito' },
        { d: 'Restaurante', c: '&#127828; Alimentação', v: 120.00, t: 's', dt: '18/03/2026', ct: 'Dinheiro' },
        { d: 'Netflix+Spotify', c: '&#127918; Lazer', v: 65.00, t: 's', dt: '17/03/2026', ct: 'Cartão de crédito' },
        { d: 'Farmácia', c: '&#128138; Saúde', v: 90.00, t: 's', dt: '15/03/2026', ct: 'Dinheiro' },
        { d: 'Aluguel', c: '&#127968; Moradia', v: 950.00, t: 's', dt: '05/03/2026', ct: 'Conta corrente' },
    ],
    pe: [
        { d: 'Registrou movimentação', t: 'e', v: 20.00, dt: '23/03/2026', i: '&#128221;' },
        { d: 'Sequência diária (dia 7)', t: 'e', v: 10.00, dt: '23/03/2026', i: '&#128293;' },
        { d: 'Bônus de Onboarding', t: 'b', v: 200.00, dt: '22/03/2026', i: '&#127873;' },
        { d: 'Registrou movimentação', t: 'e', v: 20.00, dt: '22/03/2026', i: '&#128221;' },
        { d: 'Completou desafio semanal', t: 'e', v: 100.00, dt: '21/03/2026', i: '&#127941;' },
        { d: 'Resgatou Cashback 5%', t: 'u', v: -500.00, dt: '20/03/2026', i: '&#128184;' },
        { d: 'Registrou movimentação', t: 'e', v: 20.00, dt: '20/03/2026', i: '&#128221;' },
        { d: 'Meta parcial atingida 50%', t: 'e', v: 50.00, dt: '19/03/2026', i: '&#127919;' },
    ]
};
let curStep = 1;

// ── SCREENS ────────────────────────────────────────────────────
function showScr(id) { document.querySelectorAll('.scr').forEach(s => s.classList.remove('on')); document.getElementById(id).classList.add('on') }
function goLogin() { showScr('sl') }
function goLanding() { showScr('sla') }
function enterApp() {
    showScr('sa');
    setTimeout(() => {
        renDTx(); renStreak(); renBar(); renPE(); updPts(); updBal();
        const d = document.getElementById('fdt'); if (d) d.value = new Date().toISOString().split('T')[0];
    }, 60);
}
function doLogin() {
    const e = document.getElementById('le').value, p = document.getElementById('lp').value;
    if (!e || !p) { toast('Preencha e-mail e senha!'); return }
    toast('Autenticando...'); setTimeout(() => enterApp(), 700);
}
function swTab(btn, fid) {
    document.querySelectorAll('.ltab').forEach(t => t.classList.remove('on')); btn.classList.add('on');
    ['s1f', 's2f'].forEach(id => { const el = document.getElementById(id); if (el) el.classList.toggle('hi', id !== fid) });
}

// ── REGISTER ──────────────────────────────────────────────────
let rStep = 1, rUso = '', rLang = 'pt-BR';
function rNext(n) {
    if (n === 2 && !valR1()) return;
    if (n === 3 && !rUso) { toast('Selecione o tipo de uso!'); return }
    const cur = document.getElementById('rs' + rStep); if (cur) cur.classList.remove('on');
    rStep = n;
    const nxt = document.getElementById('rs' + n); if (nxt) nxt.classList.add('on');
    updRBar(n);
    if (n === 4) {
        const ph = document.getElementById('rph').value || '(00) 00000-0000';
        const ddi = document.getElementById('rddi').value || '+55';
        const el = document.getElementById('r4ph'); if (el) el.textContent = ddi + ' ' + ph;
    }
}
function valR1() {
    const nm = document.getElementById('rn').value.trim();
    const em = document.getElementById('re').value.trim();
    const ph = document.getElementById('rph').value.trim();
    const s1 = document.getElementById('rpw').value;
    const s2 = document.getElementById('rpw2').value;
    if (!nm) { toast('Informe seu nome!'); return false }
    if (!em || !em.includes('@')) { toast('Informe um e-mail válido!'); return false }
    if (!ph || ph.replace(/\D/g, '').length < 8) { toast('Informe seu telefone!'); return false }
    if (!s1 || s1.length < 8) { toast('A senha deve ter pelo menos 8 caracteres!'); return false }
    if (s1 !== s2) { toast('As senhas não coincidem!'); return false }
    return true;
}
function updRBar(n) {
    for (let i = 1; i <= 5; i++) {
        const d = document.getElementById('rd' + i); if (!d) continue;
        d.classList.remove('dn', 'cu');
        if (i < n) d.classList.add('dn'); else if (i === n) d.classList.add('cu');
    }
    for (let i = 1; i <= 4; i++) {
        const l = document.getElementById('rl' + i); if (!l) continue;
        l.classList.toggle('dn', i < n);
    }
}
function selUso(btn, tipo) {
    document.querySelectorAll('.uso-o').forEach(b => b.classList.remove('on'));
    btn.classList.add('on'); rUso = tipo;
    document.querySelectorAll('.xf').forEach(x => x.classList.remove('on'));
    if (tipo === 'cas') document.getElementById('xf-cas').classList.add('on');
    if (tipo === 'rep') document.getElementById('xf-rep').classList.add('on');
    if (tipo === 'pme' || tipo === 'mme') document.getElementById('xf-emp').classList.add('on');
}
function selLg(btn, lang) {
    document.querySelectorAll('#reg-lg .lg-o').forEach(b => b.classList.remove('on'));
    btn.classList.add('on'); rLang = lang;
}
function setLgCfg(btn, lang) {
    document.querySelectorAll('#cfg-lg .lg-o').forEach(b => b.classList.remove('on'));
    btn.classList.add('on'); rLang = lang;
    toast('Idioma atualizado! &#127760;', true);
}
function fmtCNPJ(el) {
    let v = el.value.replace(/\D/g, ''); if (v.length > 14) v = v.slice(0, 14);
    v = v.replace(/^(\d{2})(\d)/, '$1.$2');
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
    v = v.replace(/(\d{4})(\d)/, '$1-$2');
    el.value = v;
}
function pinFwd(el, idx) {
    el.value = el.value.replace(/\D/g, '');
    const pins = document.querySelectorAll('.pin-i');
    if (el.value && idx < 5) pins[idx + 1].focus();
}

// ── ONBOARDING ────────────────────────────────────────────────
function nxStep(n) {
    document.getElementById('m' + curStep).classList.remove('on');
    curStep = n; document.getElementById('m' + n).classList.add('on');
}
function closeOv() {
    document.getElementById('ov').classList.add('hi');
    st.pts += 200; updPts(); toast('Bem-vindo! +200 Pointspay &#127881;', true);
}
function selPop(btn) { document.querySelectorAll('.pop-o').forEach(b => b.classList.remove('on')); btn.classList.add('on') }

// ── NAVIGATION ────────────────────────────────────────────────
const pgm = { d: 'pd', r: 'pr', e: 'pe', m: 'pm', j: 'pj', fam: 'pfam', score: 'pscore', bol: 'pbol', p: 'pp', ia: 'pia', cfg: 'pcfg', so: 'pso', co: 'pco' };
const pnm = { d: 'Dashboard', r: 'Nova Movimentação', e: 'Extrato', m: 'Metas', j: 'HB Júnior', fam: 'Pasta Compartilhada', score: 'Score de Crédito', bol: 'Boletos & Custos Fixos', p: 'Pointspay', ia: 'IA Financeira', cfg: 'Configurações', so: 'Sobre nós', co: 'Contato' };
function goPage(id, btn) {
    document.querySelectorAll('.pg').forEach(p => p.classList.remove('on'));
    document.querySelectorAll('.ni').forEach(b => b.classList.remove('on'));
    const pg = document.getElementById(pgm[id]); if (pg) pg.classList.add('on');
    if (btn && btn.classList.contains('ni')) btn.classList.add('on');
    const t = document.getElementById('tbtl'); if (t) t.textContent = pnm[id] || id;
    if (id === 'e') renExt();
    if (id === 'fam') { if (typeof initFam === 'function') initFam(); }
    if (id === 'bol') { if (typeof renBol === 'function') renBol(); }
}
function updMob(id) {
    document.querySelectorAll('.mbn').forEach(b => b.classList.remove('on'));
    const el = document.getElementById('mb-' + id); if (el) el.classList.add('on');
}
function goSP(id, btn) {
    document.querySelectorAll('.sp').forEach(p => p.classList.remove('on'));
    document.querySelectorAll('.stab').forEach(b => b.classList.remove('on'));
    const sp = document.getElementById('sp-' + id); if (sp) sp.classList.add('on');
    if (btn) btn.classList.add('on');
}
function togBtn(b) { b.classList.toggle('on'); toast(b.classList.contains('on') ? 'Ativado ✅' : 'Desativado', b.classList.contains('on')) }

// ── TX TYPE ───────────────────────────────────────────────────
function setTp(t) {
    st.tipo = t;
    document.getElementById('bte').classList.toggle('on', t === 'e');
    document.getElementById('bte').classList.toggle('e', t === 'e');
    document.getElementById('bts2').classList.toggle('on', t === 's');
    document.getElementById('bts2').classList.toggle('s', t === 's');
}

// ── REGISTER TX ───────────────────────────────────────────────
function regTx() {
    const desc = document.getElementById('fdsc').value.trim();
    const val = parseFloat(document.getElementById('fvl').value);
    const cat = getSelCat();
    const dt = document.getElementById('fdt').value;
    const ct = document.getElementById('fct2').value;
    if (!desc || !val || val <= 0) { toast('Preencha descrição e valor!'); return }
    const d = dt ? new Date(dt + 'T00:00:00') : new Date();
    const df = String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
    st.txs.unshift({ d: desc, c: cat, v: val, t: st.tipo, dt: df, ct: ct });
    st.pts += 20;
    if (st.tipo === 'e') { st.ent += val; st.saldo += val } else { st.sai += val; st.saldo -= val }
    st.pe.unshift({ d: 'Registrou movimentação', t: 'e', v: 20, dt: df, i: '&#128221;' });
    updPts(); updBal(); renDTx(); renPE();
    document.getElementById('fdsc').value = ''; document.getElementById('fvl').value = '';
    toast('+20 Pointspay! Movimentação registrada ✅', true);
}

// ── RESGATAR ─────────────────────────────────────────────────
function resgatar(nm, pts) {
    if (st.pts < pts) { toast('Pontos insuficientes!'); return }
    st.pts -= pts;
    const d = new Date();
    const df = String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
    st.pe.unshift({ d: 'Resgatou ' + nm, t: 'u', v: -pts, dt: df, i: '&#127873;' });
    updPts(); renPE(); toast(nm + ' resgatado! &#127873;', true);
}

// ── UI UPDATES ────────────────────────────────────────────────
function updPts() {
    const f = n => n.toLocaleString('pt-BR');
    ['ptsd', 'pmob'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = f(st.pts) + ' pts' });
    ['mpts', 'phv'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = f(st.pts) });
    const p = Math.min(100, Math.round((st.pts - 500) / 15));
    const pb = document.getElementById('ppbar'); if (pb) pb.style.width = p + '%';
    const pl = document.getElementById('pplbl'); if (pl) pl.textContent = f(st.pts) + ' / 2.000 pts';
    const pf = document.getElementById('ppflt'); if (pf) pf.textContent = f(Math.max(0, 2000 - st.pts));
}
function updBal() {
    const fmt = v => 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    const hs = document.getElementById('hsal'); if (hs) hs.textContent = fmt(st.saldo);
    const he = document.getElementById('hent'); if (he) he.textContent = '+ R$ ' + st.ent.toLocaleString('pt-BR');
    const hsa = document.getElementById('hsai'); if (hsa) hsa.textContent = '- R$ ' + st.sai.toLocaleString('pt-BR');
    const mg = document.getElementById('mgas'); if (mg) mg.textContent = 'R$ ' + st.sai.toLocaleString('pt-BR');
}

// ── RENDER TRANSACTIONS ───────────────────────────────────────
const imap = { '&#128188; Salário': 'g', '&#128187; Freelance': 'g', '&#127828; Alimentação': 'r', '&#127968; Moradia': 'a', '&#128663; Transporte': 'b', '&#128138; Saúde': 'a', '&#127918; Lazer': 'r', '&#128084; Vestuário': 'b', '&#128218; Educação': 'b', '&#128230; Outros': 'a' };
function txH(tx) {
    const cl = imap[tx.c] || 'b', sg = tx.t === 'e' ? '+' : '-', vc = tx.t === 'e' ? 'p' : 'm', em = tx.c.split(' ')[0];
    return '<div class="txi"><div class="txl"><div class="txico ' + cl + '">' + em + '</div><div><div class="txn">' + tx.d + '</div><div class="txc">' + tx.c.replace(/^\S+\s/, '') + '&middot;' + tx.ct + '</div></div></div><div class="txr"><div class="txv ' + vc + '">' + sg + ' R$ ' + tx.v.toLocaleString('pt-BR') + '</div><div class="txd">' + tx.dt + '</div></div></div>';
}
function renDTx() { const el = document.getElementById('dtxl'); if (el) el.innerHTML = st.txs.slice(0, 5).map(txH).join('') }
function renExt() {
    const ft = document.getElementById('ftp').value, fc = document.getElementById('fct3').value;
    const ls = st.txs.filter(t => { if (ft && t.t !== ft) return false; if (fc && !t.c.includes(fc.replace(/^\S+\s/, ''))) return false; return true });
    const el = document.getElementById('extl'); if (!el) return;
    if (!ls.length) { el.innerHTML = '<div style="text-align:center;color:var(--mu);padding:2rem;font-size:14px">Nenhuma movimentação encontrada.</div>'; return }
    el.innerHTML = ls.map(txH).join('');
}
function renPE() {
    const el = document.getElementById('pext'); if (!el) return;
    el.innerHTML = st.pe.map(x => {
        const cl = x.t === 'u' ? 'u' : (x.t === 'b' ? 'b' : 'e'), vc = x.t === 'u' ? 'u' : 'e', sg = x.v > 0 ? '+' : '';
        return '<div class="pei"><div class="pel"><div class="peic ' + cl + '">' + x.i + '</div><div><div class="pen">' + x.d + '</div><div class="ped">' + x.dt + '</div></div></div><div class="pev ' + vc + '">' + sg + x.v + ' pts</div></div>';
    }).join('');
}

// ── STREAK ───────────────────────────────────────────────────
function renStreak() {
    const g = document.getElementById('strk'); if (!g) return;
    const days = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D', 'S', 'T'];
    g.innerHTML = days.map((d, i) => { let c = i < 20 ? 'dn' : (i === 22 ? 'td' : (i === 21 ? 'ms' : '')); return '<div class="sd ' + c + '">' + d + '</div>' }).join('');
}

// ── BAR CHART ────────────────────────────────────────────────
function renBar() {
    const c = document.getElementById('bch'); if (!c) return;
    const wks = [{ l: 'S1', r: 1400, d: 820 }, { l: 'S2', r: 1200, d: 680 }, { l: 'S3', r: 1600, d: 540 }, { l: 'S4', r: 400, d: 140 }];
    const mx = Math.max(...wks.flatMap(w => [w.r, w.d]));
    c.innerHTML = wks.map(w => '<div class="bw" style="gap:0;flex-direction:column;justify-content:flex-end;align-items:center"><div style="display:flex;gap:4px;align-items:flex-end;height:90px"><div class="bar g" style="width:22px;height:' + Math.round((w.r / mx) * 90) + 'px"></div><div class="bar r" style="width:22px;height:' + Math.round((w.d / mx) * 90) + 'px"></div></div><div class="blb" style="margin-top:6px">' + w.l + '</div></div>').join('');
}

// ── JUNIOR ───────────────────────────────────────────────────
function selKid(el) { document.querySelectorAll('.kc').forEach(c => c.classList.remove('sel')); el.classList.add('sel') }
function sendJr() {
    const inp = document.getElementById('jci'); const txt = inp.value.trim(); if (!txt) return;
    const ms = document.getElementById('jms');
    ms.innerHTML += '<div class="jmg usr"><div class="jmgs" style="color:rgba(255,255,255,.8)">Pedro</div>' + txt + '</div>';
    inp.value = ''; ms.scrollTop = ms.scrollHeight;
    const rs = ['Ótima pergunta! &#127775; Guardar dinheiro é um super poder!', 'Muito bem! Continue assim e bata sua meta! &#127919;', 'Sabia que R$ 1,00 por dia vira R$ 365,00 no ano? &#129327;', 'Sua sequência está ótima! &#128293;', 'Cada centavo guardado e um passo rumo ao Nintendo Switch! &#127918;'];
    setTimeout(() => { ms.innerHTML += '<div class="jmg bot"><div class="jmgs" style="color:var(--jrd)">HB Júnior</div>' + rs[Math.floor(Math.random() * rs.length)] + '</div>'; ms.scrollTop = ms.scrollHeight }, 800);
}


// ── CATEGORIES ───────────────────────────────────────────────
const subcats = {
    ali: ['Restaurante', 'Mercado', 'Delivery', 'Padaria', 'Lanchonete', 'Cafeteria', 'Bar', 'Feira'],
    mor: ['Aluguel', 'Condomínio', 'IPTU', 'Luz', 'Água', 'Gás', 'Internet', 'Manutenção'],
    tra: ['Uber/99', 'Combustível', 'Ônibus/Metro', 'Pedágio', 'Estacionamento', 'Manutenção auto', 'Avião'],
    sau: ['Farmácia', 'Consulta médica', 'Plano de saúde', 'Exames', 'Academia', 'Psicologia', 'Dentista'],
    laz: ['Streaming', 'Cinema', 'Shows', 'Viagem', 'Jogos', 'Esporte', 'Hobby', 'Restaurante'],
    ves: ['Roupas', 'Calçados', 'Acessórios', 'Bolsa', 'Joias'],
    edu: ['Curso', 'Livros', 'Faculdade', 'Escola', 'Idiomas', 'Material escolar'],
    sal: ['Salário', '13º salário', 'Férias', 'Bônus', 'PLR'],
    fre: ['Projeto', 'Consultoria', 'Design', 'Programação', 'Redação', 'Outros'],
    inv: ['Ações', 'Fundos', 'CDB', 'Poupança', 'Cripto', 'Imóvel'],
    pet: ['Ração', 'Veterinário', 'Pet shop', 'Vacina', 'Brinquedo'],
    out: ['Presente', 'Doação', 'Impostos', 'Outros'],
};
let selCatId = '';
function selCat(btn, catId) {
    document.querySelectorAll('.cat-card').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    selCatId = catId;
    const area = document.getElementById('subcat-area');
    const btnsEl = document.getElementById('subcat-btns');
    const lblEl = document.getElementById('subcat-label');
    const subs = subcats[catId] || [];
    if (subs.length) {
        area.style.display = 'block';
        lblEl.textContent = btn.querySelector('.cat-nm').textContent + ' — Subcategoria';
        btnsEl.innerHTML = subs.map(s => '<button class="subcat-btn" onclick="selSubcat(this)">' + s + '</button>').join('');
    } else {
        area.style.display = 'none';
    }
}
function selSubcat(btn) {
    document.querySelectorAll('.subcat-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
}
function getSelCat() {
    const cc = document.querySelector('.cat-card.on .cat-nm');
    const sc = document.querySelector('.subcat-btn.on');
    if (!cc) return '&#128230; Outros';
    const em = document.querySelector('.cat-card.on .cat-ico').textContent;
    return em + ' ' + cc.textContent + (sc ? ' / ' + sc.textContent : '');
}

// ── LAYOUT ───────────────────────────────────────────────────
let curLayout = 'grid';
function setLayout(mode) {
    curLayout = mode;
    const dash = document.getElementById('pd');
    dash.classList.remove('dash-compact', 'dash-list');
    if (mode === 'compact') dash.classList.add('dash-compact');
    if (mode === 'list') dash.classList.add('dash-list');
    ['grid', 'compact', 'list'].forEach(m => {
        const b = document.getElementById('ly-' + m);
        if (b) b.classList.toggle('on', m === mode);
    });
    // sync cfg panel
    ['grid', 'compact', 'list'].forEach(m => {
        const b = document.getElementById('lyt-' + m);
        if (b) b.classList.toggle('on', m === mode);
    });
}
function setLayoutCfg(mode, btn) {
    setLayout(mode);
    toast('Layout alterado para ' + mode + ' ✅', true);
}

// ── PROFILE THEME ────────────────────────────────────────────
function setProfile(btn, pid, ico, nm, color, light) {
    document.querySelectorAll('.pth-card').forEach(b => { b.classList.remove('on'); b.style.borderColor = ''; });
    btn.classList.add('on');
    btn.style.borderColor = color;
    const el = document.getElementById('curr-profile');
    if (el) el.innerHTML = ico + ' ' + nm;
    // Apply accent color to shell
    const shell = document.querySelector('.shell');
    if (shell) { shell.style.setProperty('--g-custom', color); shell.style.setProperty('--gl-custom', light); }
    toast('Perfil alterado para ' + nm + '! ✅', true);
}


// ── ACCESSIBILITY ────────────────────────────────────────────
function toggleLargeText() {
    document.body.classList.toggle('lt');
    const btn = document.getElementById('btn-lt');
    if (btn) btn.classList.toggle('on', document.body.classList.contains('lt'));
    toast(document.body.classList.contains('lt') ? 'Texto grande ativado ✅' : 'Texto normal restaurado', true);
}
function toggleHighContrast() {
    document.body.classList.toggle('hc');
    const btn = document.getElementById('btn-hc');
    if (btn) btn.classList.toggle('on', document.body.classList.contains('hc'));
    toast(document.body.classList.contains('hc') ? 'Alto contraste ativado ✅' : 'Contraste normal restaurado', true);
}

// ── LOGOUT / DELETE ──────────────────────────────────────────
function showLogout() { document.getElementById('cm-lo').classList.remove('hi') }
function doLogout() { document.getElementById('cm-lo').classList.add('hi'); goLogin(); toast('Você saiu com segurança &#128274;') }
function showDelete() { document.getElementById('cm-del').classList.remove('hi') }
function doDelete() {
    const pass = document.getElementById('dp').value;
    const conf = document.getElementById('dc').value;
    if (!pass) { toast('Confirme sua senha!'); return }
    if (conf.trim().toUpperCase() !== 'EXCLUIR') { toast('Digite EXCLUIR para confirmar!'); return }
    document.getElementById('cm-del').classList.add('hi');
    document.getElementById('cm-done').classList.remove('hi');
}

function toast(msg, green = false) {
    const t = document.getElementById('tst'); t.innerHTML = msg;
    t.className = 'tst' + (green ? ' gt' : '') + ' on';
    setTimeout(() => t.classList.remove('on'), 3000);
}

// ── INIT ─────────────────────────────────────────────────────
renDTx(); renStreak(); renBar(); renPE(); updPts(); updBal();
const fdt = document.getElementById('fdt'); if (fdt) fdt.value = new Date().toISOString().split('T')[0];

// ═══════════════════════════════════════════
// PASTA COMPARTILHADA
// ═══════════════════════════════════════════
let shHasGroup = true; // demo: grupo já existe
let shType = 'casal';

function initFam() {
    const setup = document.getElementById('sh-setup-area');
    const active = document.getElementById('sh-active');
    if (shHasGroup) {
        if (setup) setup.style.display = 'none';
        if (active) active.style.display = 'block';
    } else {
        if (setup) setup.style.display = 'block';
        if (active) active.style.display = 'none';
    }
}

function shSelType(btn, tipo) {
    document.querySelectorAll('.sh-type').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    shType = tipo;
    const area = document.getElementById('sh-invite-area');
    const lbl = document.getElementById('sh-inv-lbl');
    const m2w = document.getElementById('sh-m2w');
    if (area) area.style.display = 'block';
    const labels = { casal: 'Convidar parceiro(a)', republica: 'Convidar moradores', familia: 'Convidar membros da família', amigos: 'Convidar participantes' };
    if (lbl) lbl.textContent = labels[tipo] || 'Convidar membros';
    if (m2w) m2w.style.display = (tipo === 'republica' || tipo === 'familia' || tipo === 'amigos') ? 'block' : 'none';
}

function shCreate() {
    const m1 = document.getElementById('sh-m1');
    if (!m1 || !m1.value.trim()) { toast('Informe o e-mail do primeiro membro!'); return; }
    shHasGroup = true;
    initFam();
    const nms = { casal: 'Casal', republica: 'República', familia: 'Família', amigos: 'Grupo' };
    const lbl = document.getElementById('sh-type-lbl');
    if (lbl) lbl.textContent = nms[shType] || 'Grupo';
    toast('Grupo criado! Convites enviados por e-mail ✅', true);
}

function shTab(id, btn) {
    document.querySelectorAll('.sh-panel').forEach(p => p.classList.remove('on'));
    document.querySelectorAll('.sh-tb').forEach(b => b.classList.remove('on'));
    const panel = document.getElementById('shp-' + id);
    if (panel) panel.classList.add('on');
    if (btn && btn.classList) btn.classList.add('on');
    else if (typeof btn === 'object' && btn) btn.classList.add('on');
}

// ═══════════════════════════════════════════
// SCORE DE CRÉDITO
// ═══════════════════════════════════════════
let scoreLoaded = false;

function showScore() {
    const consultArea = document.getElementById('score-consult-area');
    const resultArea = document.getElementById('score-result');
    if (!consultArea || !resultArea) return;
    // Simulate loading
    consultArea.innerHTML = '<div style="text-align:center;padding:3rem"><div style="font-size:48px;margin-bottom:1rem">&#128202;</div><div style="font-family:var(--fd);font-size:18px;font-weight:700;margin-bottom:.5rem">Consultando seu CPF...</div><div style="font-size:13px;color:var(--mu)">Aguarde, isso leva alguns segundos</div><div style="margin-top:1.5rem;width:100%;height:6px;background:var(--s2);border-radius:999px;overflow:hidden"><div style="height:100%;background:var(--g);border-radius:999px;animation:scoreLoad 2s ease forwards" id="score-bar"></div></div></div>';
    // Add keyframe animation inline
    if (!document.getElementById('score-anim')) {
        const st = document.createElement('style');
        st.id = 'score-anim';
        st.textContent = '@keyframes scoreLoad{from{width:0}to{width:100%}}';
        document.head.appendChild(st);
    }
    setTimeout(() => {
        consultArea.style.display = 'none';
        resultArea.style.display = 'block';
        scoreLoaded = true;
    }, 2200);
}

// ═══════════════════════════════════════════
// BOLETOS & CUSTOS FIXOS
// ═══════════════════════════════════════════
let boletos = [
    { id: 1, nm: 'Aluguel', vl: 1200, dt: '2026-04-05', cat: '🏠 Moradia', status: 'pendente', recur: 'Mensal', comp: 'grupo', conta: 'Conta corrente' },
    { id: 2, nm: 'Conta de luz', vl: 180, dt: '2026-04-17', cat: '⚡ Energia / Água / Gás', status: 'pendente', recur: 'Mensal', comp: 'grupo', conta: 'Conta corrente' },
    { id: 3, nm: 'Internet Vivo', vl: 120, dt: '2026-04-11', cat: '💻 Internet / TV', status: 'pendente', recur: 'Mensal', comp: 'eu', conta: 'Cartão de crédito' },
    { id: 4, nm: 'Netflix', vl: 55, dt: '2026-04-25', cat: '🎬 Streaming', status: 'pendente', recur: 'Mensal', comp: 'grupo', conta: 'Cartão de crédito' },
    { id: 5, nm: 'Plano de Saúde', vl: 380, dt: '2026-04-10', cat: '💊 Saúde / Plano', status: 'pendente', recur: 'Mensal', comp: 'eu', conta: 'Conta corrente' },
    { id: 6, nm: 'Água / Condomínio', vl: 290, dt: '2026-04-20', cat: '💧 Energia / Água / Gás', status: 'pendente', recur: 'Mensal', comp: 'grupo', conta: 'Conta corrente' },
    { id: 7, nm: 'IPTU 2026', vl: 620, dt: '2026-03-31', cat: '🏠 Moradia', status: 'vencido', recur: 'Anual', comp: 'eu', conta: 'Conta corrente' },
];
let bolFiltro = 'todos';
let bolRecurSel = 'Único';

function renBol() {
    const el = document.getElementById('bol-list');
    if (!el) return;
    const today = new Date();
    const in7 = new Date(today); in7.setDate(today.getDate() + 7);

    let list = [...boletos];
    if (bolFiltro === 'pendente') list = list.filter(b => b.status === 'pendente');
    else if (bolFiltro === 'pago') list = list.filter(b => b.status === 'pago');
    else if (bolFiltro === 'vencido') list = list.filter(b => b.status === 'vencido');
    else if (bolFiltro === 'vencendo') list = list.filter(b => {
        const d = new Date(b.dt + 'T00:00:00');
        return b.status === 'pendente' && d <= in7 && d >= today;
    });

    if (!list.length) {
        el.innerHTML = '<div style="text-align:center;color:var(--mu);padding:2rem;font-size:14px">Nenhum boleto encontrado.</div>';
        return;
    }

    const catIco = { 'Moradia': '🏠', 'Energia': '⚡', 'Água': '💧', 'Internet': '💻', 'Saúde': '💊', 'Streaming': '🎬', 'Cartão': '💳', 'Seguro': '🛡️', 'Educação': '📚', 'Transporte': '🚗', 'Outros': '📦' };

    el.innerHTML = list.map(b => {
        const d = new Date(b.dt + 'T00:00:00');
        const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24));
        let statusLbl, statusClass, dtTxt;
        if (b.status === 'pago') { statusLbl = '✓ Pago'; statusClass = 'pago'; dtTxt = 'Pago em ' + d.toLocaleDateString('pt-BR'); }
        else if (b.status === 'vencido') { statusLbl = '⚠ Vencido'; statusClass = 'vencido'; dtTxt = 'Venceu em ' + d.toLocaleDateString('pt-BR'); }
        else if (diff === 0) { statusLbl = '🔴 Hoje'; statusClass = 'hoje'; dtTxt = 'Vence hoje'; }
        else if (diff <= 7) { statusLbl = '⚠ ' + diff + ' dias'; statusClass = 'pendente'; dtTxt = 'Vence em ' + diff + ' dias'; }
        else { statusLbl = diff + ' dias'; statusClass = 'pendente'; dtTxt = 'Vence ' + d.toLocaleDateString('pt-BR'); }

        const ico = b.cat.split(' ')[0];
        const bgMap = { pendente: 'var(--al)', pago: 'var(--gl)', vencido: 'var(--rl)', hoje: 'var(--rl)' };
        const pagarBtn = b.status !== 'pago' ? '<button class="bol-action-btn pagar" onclick="bolPagar(' + b.id + ')">Marcar pago</button>' : '';

        return '<div class="bol-item">'
            + '<div class="bol-ico" style="background:' + bgMap[b.status] + '">' + ico + '</div>'
            + '<div class="bol-info">'
            + '<div class="bol-nm">' + b.nm + '</div>'
            + '<div class="bol-sub">' + dtTxt + ' · ' + b.recur + (b.comp === 'grupo' ? ' · <span style="font-size:11px;background:var(--jrl);color:var(--jrd);padding:1px 6px;border-radius:999px">Compartilhado</span>' : '') + '</div>'
            + '</div>'
            + '<div class="bol-right">'
            + '<div class="bol-val" style="color:' + (b.status === 'pago' ? 'var(--g)' : b.status === 'vencido' ? 'var(--re)' : 'var(--tx)') + '">R$ ' + b.vl.toLocaleString('pt-BR') + '</div>'
            + '<div><span class="bol-status ' + b.status + '">' + statusLbl + '</span></div>'
            + (pagarBtn ? '<div style="margin-top:4px">' + pagarBtn + '</div>' : '')
            + '</div>'
            + '</div>';
    }).join('');
}

function bolFilter(btn, filtro) {
    document.querySelectorAll('.bol-filter').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    bolFiltro = filtro;
    renBol();
}

function bolPagar(id) {
    const b = boletos.find(x => x.id === id);
    if (!b) return;
    b.status = 'pago';
    renBol();
    // Add to transactions
    const today = new Date();
    const df = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
    if (typeof st !== 'undefined') {
        st.txs.unshift({ d: b.nm, c: b.cat, v: b.vl, t: 's', dt: df, ct: b.conta });
        st.sai += b.vl; st.saldo -= b.vl;
        updBal();
    }
    toast(b.nm + ' Marcado como pago! ✅', true);
}

function bolOpenForm() {
    const f = document.getElementById('bol-form-card');
    const l = document.getElementById('bol-list-card');
    if (f) f.style.display = 'block';
    if (l) l.style.display = 'none';
    const dt = document.getElementById('bol-dt');
    if (dt) dt.value = new Date().toISOString().split('T')[0];
    f.scrollIntoView({ behavior: 'smooth' });
}

function bolCloseForm() {
    const f = document.getElementById('bol-form-card');
    const l = document.getElementById('bol-list-card');
    if (f) f.style.display = 'none';
    if (l) l.style.display = 'block';
}

function bolRecur(btn) {
    document.querySelectorAll('.bol-recur-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    bolRecurSel = btn.textContent.trim();
}

function bolSave() {
    const nm = document.getElementById('bol-nm').value.trim();
    const vl = parseFloat(document.getElementById('bol-vl').value);
    const dt = document.getElementById('bol-dt').value;
    const cat = document.getElementById('bol-cat').value;
    const comp = document.getElementById('bol-comp').value;
    const conta = document.getElementById('bol-conta').value;
    const obs = document.getElementById('bol-obs').value;
    if (!nm) { toast('Informe o nome do boleto!'); return; }
    if (!vl || vl <= 0) { toast('Informe um valor válido!'); return; }
    if (!dt) { toast('Informe a data de vencimento!'); return; }
    const newId = Math.max(...boletos.map(b => b.id)) + 1;
    boletos.unshift({ id: newId, nm, vl, dt, cat, status: 'pendente', recur: bolRecurSel, comp, conta });
    bolCloseForm();
    renBol();
    // Reset form
    ['bol-nm', 'bol-vl', 'bol-obs'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    toast('Boleto cadastrado com sucesso! ✅', true);
}

