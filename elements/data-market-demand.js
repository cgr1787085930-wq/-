/* ============================================================
   市场需求（高优）数据 —— 编辑本文件即可更新「市场需求」图片区
   结构：window.CGL_MARKET_DEMAND = { updated:"更新日期", items:[ {...} ] }
   每条 item:
   - no   : 款式编号（商家提报时复制）
   - spu  : 商品 SPU（商家提报时复制）
   - cat  : 类目（男装/童装/大码男装/家居服）
   - style: 款式描述
   - img  : 图片路径（把真实图片放到 images/ 后把文件名填到这里）
   - tag  : 高优/常规 等
   ============================================================ */
window.CGL_MARKET_DEMAND = {
  updated: "2026-09-01",
  items: [
    { no: "CG-D-001", spu: "100200300001", cat: "男装",     style: "工装风格立领夹克",   img: "images/demand-mens-jacket.svg", tag: "高优" },
    { no: "CG-D-002", spu: "100200300002", cat: "男装",     style: "宽松廓形圆领卫衣",   img: "images/demand-mens-hoodie.svg", tag: "高优" },
    { no: "CG-D-003", spu: "100200300003", cat: "男装",     style: "纯棉亨利衫",         img: "images/demand-mens-shirt.svg",  tag: "高优" },
    { no: "CG-D-004", spu: "100200300004", cat: "男装",     style: "格纹翻领衬衫",       img: "images/demand-mens-tee.svg",    tag: "常规" },
    { no: "CG-D-005", spu: "100200300005", cat: "童装",     style: "卡通印花连帽卫衣",   img: "images/demand-kids-hoodie.svg", tag: "高优" },
    { no: "CG-D-006", spu: "100200300006", cat: "童装",     style: "运动两件套",         img: "images/demand-kids-set.svg",    tag: "高优" },
    { no: "CG-D-007", spu: "100200300007", cat: "童装",     style: "A字印花连衣裙",      img: "images/demand-kids-dress.svg",  tag: "常规" },
    { no: "CG-D-008", spu: "100200300008", cat: "大码男装", style: "宽松3XL纯色T恤",      img: "images/demand-big-tee.svg",     tag: "高优" },
    { no: "CG-D-009", spu: "100200300009", cat: "大码男装", style: "XL束脚休闲裤",        img: "images/demand-big-pants.svg",   tag: "常规" },
    { no: "CG-D-010", spu: "100200300010", cat: "家居服",   style: "珊瑚绒连帽浴袍",     img: "images/demand-home-robe.svg",   tag: "高优" },
    { no: "CG-D-011", spu: "100200300011", cat: "家居服",   style: "纯棉格纹睡衣套装",   img: "images/demand-home-set.svg",    tag: "高优" },
    { no: "CG-D-012", spu: "100200300012", cat: "家居服",   style: "儿童卡通睡衣",       img: "images/demand-kids-home.svg",   tag: "常规" }
  ]
};