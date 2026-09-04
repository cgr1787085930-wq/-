/* ============================================================
   类目筛选 · 交互逻辑 —— 供 category.html 使用
   依赖：elements/data-full-categories.js（window.CGL_FULL_CATEGORIES）
   提供：品类Tab切换、级联维度筛选、关键词搜索、复制路径
   ============================================================ */
(function(){
  if(!window.CGL_FULL_CATEGORIES) return;

  var DATA = window.CGL_FULL_CATEGORIES;
  var KEYS = Object.keys(DATA);
  var curKey = KEYS[0] || '';
  var groupMap = { '标码男装':'男装','大码男装':'大码男装','童装':'童装','家居服':'家居服' };
  var filters = {};   // dimension -> selected value (string)
  var keyword = '';
  var $ = function(id){ return document.getElementById(id); };

  /* ---------- 顶部品类 Tab ---------- */
  function renderCatTabs(){
    var el = $('catTabs');
    var h = '';
    for(var i=0;i<KEYS.length;i++){
      var k = KEYS[i];
      var cnt = DATA[k].rows.length;
      var label = groupMap[k] || k;
      h += '<span class="rtab'+(k===curKey?' on':'')+'" data-key="'+CGL.esc(k)+'">'+
           CGL.esc(label)+'<em class="cnt">'+cnt+'</em></span>';
    }
    el.innerHTML = h;
    var tabs = el.querySelectorAll('.rtab');
    for(var t=0;t<tabs.length;t++){
      tabs[t].addEventListener('click', function(){
        curKey = this.getAttribute('data-key');
        filters = {}; keyword = '';
        $('kw').value='';
        renderAll();
      });
    }
  }

  /* ---------- 维度选择器 ---------- */
  function renderDims(){
    var el = $('dims');
    var dims = DATA[curKey].dims || [];
    var rows = DATA[curKey].rows;
    var h = '';
    /* 收集每个维度的可选值（跨分组不分层级，直接枚举） */
    for(var d=0;d<dims.length;d++){
      var dn = dims[d];
      var vals = {};
      for(var r=0;r<rows.length;r++){
        var v = rows[r].dims[dn];
        if(v){ vals[v]=(vals[v]||0)+1; }
      }
      var keys = Object.keys(vals);
      h += '<div class="fgroup">'+
           '<div class="fg-name">'+CGL.esc(dn)+'</div>'+
           '<div class="fg-vals">';
      // 空选项 = 全部
      h += '<span class="fval'+(filters[dn]? '' : ' on')+'" data-clear="'+CGL.esc(dn)+'">全部</span>';
      for(var k=0;k<keys.length;k++){
        var v=keys[k];
        h += '<span class="fval'+(filters[dn]===v?' on':'')+'" data-dim="'+CGL.esc(dn)+'" data-val="'+CGL.esc(v)+'">'+
             CGL.esc(v)+'<em class="cnt">'+vals[v]+'</em></span>';
      }
      h += '</div></div>';
    }
    el.innerHTML = h;
    var spans = el.querySelectorAll('.fval');
    for(var s=0;s<spans.length;s++){
      spans[s].addEventListener('click', function(){
        var dim = this.getAttribute('data-dim');
        var val = this.getAttribute('data-val');
        if(val){
          filters[dim] = (filters[dim]===val) ? undefined : val;
        } else {
          delete filters[dim];
        }
        renderResults();
        renderDims();
      });
    }
  }

  /* ---------- 筛选结果 ---------- */
  function filterRows(){
    var rows = DATA[curKey].rows;
    var out = [];
    for(var i=0;i<rows.length;i++){
      var r = rows[i];
      var ok = true;
      for(var dn in filters){
        if(filters[dn] && r.dims[dn] !== filters[dn]){ ok=false; break; }
      }
      if(ok && keyword){
        var hay = r.name + ' ' + (r.paths||[]).join(' ');
        if(hay.indexOf(keyword)<0){ ok=false; }
      }
      if(ok) out.push(r);
    }
    return out;
  }

  function renderResults(){
    var el = $('results');
    var rows = filterRows();
    $('resultCount').textContent = '共 ' + rows.length + ' 条类目';
    if(!rows.length){
      el.innerHTML = '<p class="ph">没有匹配的类目，请调整筛选条件。</p>';
      return;
    }
    var h = '<div class="catlist">';
    for(var i=0;i<rows.length;i++){
      var r = rows[i];
      var badgelist = '';
      for(var dn in r.dims){
        if(r.dims[dn]) badgelist += '<span class="bk">'+CGL.esc(dn)+':'+CGL.esc(r.dims[dn])+'</span>';
      }
      h += '<div class="catrow">'+
           '<div class="cr-main"><div class="cr-name">'+CGL.esc(r.name)+'</div>'+
           '<div class="cr-path">'+CGL.esc((r.paths||[])[0]||'')+'</div></div>'+
           '<div class="cr-side"><div class="cr-badges">'+badgelist+'</div>'+
           '<button type="button" class="btn sm ghost" data-copy="'+i+'">复制路径</button></div></div>';
    }
    h += '</div>';
    el.innerHTML = h;
    var btns = el.querySelectorAll('[data-copy]');
    for(var b=0;b<btns.length;b++){
      btns[b].addEventListener('click', function(){
        var r = rows[Number(this.getAttribute('data-copy'))];
        CGL.copyText((r.paths||[])[0]||r.name);
      });
    }
  }

  function renderAll(){
    renderDims();
    renderResults();
  }

  /* ---------- 初始化 ---------- */
  document.addEventListener('DOMContentLoaded', function(){
    if(!KEYS.length){ $('catTabs').innerHTML='<p class="ph">未找到类目数据文件</p>'; return; }
    renderCatTabs();
    renderAll();
    var kw = $('kw');
    if(kw){
      kw.addEventListener('input', function(){ keyword = this.value.trim(); renderResults(); });
    }
    $('resetBtn').addEventListener('click', function(){ filters={}; keyword=''; $('kw').value=''; renderAll(); });
  });
})();