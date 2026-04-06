// ── STATE ──────────────────────────────────────────────────────
const st = {
    pts: 1240, saldo: 3420, ent: 4600, sai: 2180, tipo: 'e',
    txs: [
        { d: 'Salario marco', c: '&#128188; Salario', v: 4000, t: 'e', dt: '22/03/2025', ct: 'Conta corrente' },
        { d: 'Supermercado BH', c: '&#127828; Alimentacao', v: 280, t: 's', dt: '21/03/2025', ct: 'Cartao de credito' },
        { d: 'Freelance - Logo', c: '&#128187; Freelance', v: 600, t: 'e', dt: '20/03/2025', ct: 'PIX' },
        { d: 'Uber', c: '&#128663; Transporte', v: 45, t: 's', dt: '19/03/2025', ct: 'Cartao de credito' },
        { d: 'Restaurante', c: '&#127828; Alimentacao', v: 120, t: 's', dt: '18/03/2025', ct: 'Dinheiro' },
        { d: 'Netflix+Spotify', c: '&#127918; Lazer', v: 65, t: 's', dt: '17/03/2025', ct: 'Cartao de credito' },
        { d: 'Farmacia', c: '&#128138; Saude', v: 90, t: 's', dt: '15/03/2025', ct: 'Dinheiro' },
        { d: 'Aluguel', c: '&#127968; Moradia', v: 950, t: 's', dt: '05/03/2025', ct: 'Conta corrente' },
    ],
    pe: [
        { d: 'Registrou movimentacao', t: 'e', v: 20, dt: '23/03/2025', i: '&#128221;' },
        { d: 'Sequencia diaria (dia 7)', t: 'e', v: 10, dt: '23/03/2025', i: '&#128293;' },
        { d: 'Bonus de onboarding', t: 'b', v: 200, dt: '22/03/2025', i: '&#127873;' },
        { d: 'Registrou movimentacao', t: 'e', v: 20, dt: '22/03/2025', i: '&#128221;' },
        { d: 'Completou desafio semanal', t: 'e', v: 100, dt: '21/03/2025', i: '&#127941;' },
        { d: 'Resgatou Cashback 5%', t: 'u', v: -500, dt: '20/03/2025', i: '&#128184;' },
        { d: 'Registrou movimentacao', t: 'e', v: 20, dt: '20/03/2025', i: '&#128221;' },
        { d: 'Meta parcial atingida 50%', t: 'e', v: 50, dt: '19/03/2025', i: '&#127919;' },
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
    const s1 = document.getElementById('rs').value;
    const s2 = document.getElementById('rs2').value;
    if (!nm) { toast('Informe seu nome!'); return false }
    if (!em || !em.includes('@')) { toast('Informe um e-mail valido!'); return false }
    if (!ph || ph.replace(/\D/g, '').length < 8) { toast('Informe seu telefone!'); return false }
    if (!s1 || s1.length < 8) { toast('A senha deve ter pelo menos 8 caracteres!'); return false }
    if (s1 !== s2) { toast('As senhas nao coincidem!'); return false }
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
const pgm = { d: 'pd', r: 'pr', e: 'pe', m: 'pm', j: 'pj', p: 'pp', ia: 'pia', cfg: 'pcfg', so: 'pso', co: 'pco' };
const pnm = { d: 'Dashboard', r: 'Nova Movimentacao', e: 'Extrato', m: 'Metas', j: 'HB Junior', p: 'Pointspay', ia: 'IA Financeira', cfg: 'Configuracoes', so: 'Sobre nos', co: 'Contato' };
function goPage(id, btn) {
    document.querySelectorAll('.pg').forEach(p => p.classList.remove('on'));
    document.querySelectorAll('.ni').forEach(b => b.classList.remove('on'));
    const pg = document.getElementById(pgm[id]); if (pg) pg.classList.add('on');
    if (btn && btn.classList.contains('ni')) btn.classList.add('on');
    const t = document.getElementById('tbtl'); if (t) t.textContent = pnm[id] || id;
    if (id === 'e') renExt();
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
    const cat = document.getElementById('fct').value;
    const dt = document.getElementById('fdt').value;
    const ct = document.getElementById('fct2').value;
    if (!desc || !val || val <= 0) { toast('Preencha descricao e valor!'); return }
    const d = dt ? new Date(dt + 'T00:00:00') : new Date();
    const df = String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
    st.txs.unshift({ d: desc, c: cat, v: val, t: st.tipo, dt: df, ct: ct });
    st.pts += 20;
    if (st.tipo === 'e') { st.ent += val; st.saldo += val } else { st.sai += val; st.saldo -= val }
    st.pe.unshift({ d: 'Registrou movimentacao', t: 'e', v: 20, dt: df, i: '&#128221;' });
    updPts(); updBal(); renDTx(); renPE();
    document.getElementById('fdsc').value = ''; document.getElementById('fvl').value = '';
    toast('+20 Pointspay! Movimentacao registrada ✅', true);
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
const imap = { '&#128188; Salario': 'g', '&#128187; Freelance': 'g', '&#127828; Alimentacao': 'r', '&#127968; Moradia': 'a', '&#128663; Transporte': 'b', '&#128138; Saude': 'a', '&#127918; Lazer': 'r', '&#128084; Vestuario': 'b', '&#128218; Educacao': 'b', '&#128230; Outros': 'a' };
function txH(tx) {
    const cl = imap[tx.c] || 'b', sg = tx.t === 'e' ? '+' : '-', vc = tx.t === 'e' ? 'p' : 'm', em = tx.c.split(' ')[0];
    return '<div class="txi"><div class="txl"><div class="txico ' + cl + '">' + em + '</div><div><div class="txn">' + tx.d + '</div><div class="txc">' + tx.c.replace(/^\S+\s/, '') + '&middot;' + tx.ct + '</div></div></div><div class="txr"><div class="txv ' + vc + '">' + sg + ' R$ ' + tx.v.toLocaleString('pt-BR') + '</div><div class="txd">' + tx.dt + '</div></div></div>';
}
function renDTx() { const el = document.getElementById('dtxl'); if (el) el.innerHTML = st.txs.slice(0, 5).map(txH).join('') }
function renExt() {
    const ft = document.getElementById('ftp').value, fc = document.getElementById('fct3').value;
    const ls = st.txs.filter(t => { if (ft && t.t !== ft) return false; if (fc && !t.c.includes(fc.replace(/^\S+\s/, ''))) return false; return true });
    const el = document.getElementById('extl'); if (!el) return;
    if (!ls.length) { el.innerHTML = '<div style="text-align:center;color:var(--mu);padding:2rem;font-size:14px">Nenhuma movimentacao encontrada.</div>'; return }
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
    const rs = ['Otima pergunta! &#127775; Guardar dinheiro e um super poder!', 'Muito bem! Continue assim e bata sua meta! &#127919;', 'Sabia que R$ 1 por dia vira R$ 365 no ano? &#129327;', 'Sua sequencia esta otima! &#128293;', 'Cada centavo guardado e um passo rumo ao Nintendo Switch! &#127918;'];
    setTimeout(() => { ms.innerHTML += '<div class="jmg bot"><div class="jmgs" style="color:var(--jrd)">HB Junior</div>' + rs[Math.floor(Math.random() * rs.length)] + '</div>'; ms.scrollTop = ms.scrollHeight }, 800);
}

// ── LOGOUT / DELETE ──────────────────────────────────────────
function showLogout() { document.getElementById('cm-lo').classList.remove('hi') }
function doLogout() { document.getElementById('cm-lo').classList.add('hi'); goLogin(); toast('Voce saiu com seguranca &#128274;') }
function showDelete() { document.getElementById('cm-del').classList.remove('hi') }
function doDelete() {
    const pass = document.getElementById('dp').value;
    const conf = document.getElementById('dc').value;
    if (!pass) { toast('Confirme sua senha!'); return }
    if (conf.trim().toUpperCase() !== 'EXCLUIR') { toast('Digite EXCLUIR para confirmar!'); return }
    document.getElementById('cm-del').classList.add('hi');
    document.getElementById('cm-done').classList.remove('hi');
}

// ── TOAST ────────────────────────────────────────────────────
function toast(msg, green = false) {
    const t = document.getElementById('tst'); t.innerHTML = msg;
    t.className = 'tst' + (green ? ' gt' : '') + ' on';
    setTimeout(() => t.classList.remove('on'), 3000);
}

// ── INIT ─────────────────────────────────────────────────────
renDTx(); renStreak(); renBar(); renPE(); updPts(); updBal();
const fdt = document.getElementById('fdt'); if (fdt) fdt.value = new Date().toISOString().split('T')[0];