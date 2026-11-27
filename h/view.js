/* 내 홈 보기 페이지 (daterbase.net/h/이름, 04 11-27 '/h/ 공개 링크 OK')
   원본 = daterbase-src src/h/view.js (시험 tools/test/내홈_보기.app.test.cjs) → home 저장소 h/view.js 로 그대로 복사해 올린다.
   앱 코드·앱 주소 없음. GitHub Pages의 404.html이 /h/이름 일 때 이 파일을 부른다.
   - 사이트 글은 제보 서버(hget)가 사용자 드라이브 공개 파일을 대신 읽어 준다.
   - 사이트는 스크립트 없는 격리 틀(iframe sandbox, srcdoc) 안에 그리고, 틀 안 CSP가 바깥 불러오기를 막는다(그림은 드라이브만).
     → 사용자 CSS로 방문자 정보 빼 가기·다른 페이지 흉내 X. 방 오가기는 스크립트 없이 #방 주소(:target)로. 틀(sandbox) 안 '#방' 링크는 about:blank로 새므로 about:srcdoc#방으로 적는다.
   - 잠긴 방은 암호문만 받고, 비밀번호를 넣으면 이 페이지(틀 밖)에서 풀어 다시 그린다(앱 mhLock과 같은 방법). */
(function () {
  var SRV = "https://script.google.com/macros/s/AKfycbyix_9_IxldQUbqKo_J-bVNS-2qG1nCWwSY-WauKJxc_YG1rhlnXw5_dFuHfVpF5s3N/exec";
  var m = /^\/h\/([a-z0-9][a-z0-9-]{1,18}[a-z0-9])\/?$/.exec(location.pathname);
  if (!m) return;
  var NAME = m[1];
  // 그림·글꼴 주소는 아래 mhUrlIn 목록과 같은 집만(글꼴 CSS 안의 글꼴 파일 길까지 다 적을 수 없어 jsdelivr는 집 단위)
  var CSP = "default-src 'none'; img-src https://drive.google.com https://lh3.googleusercontent.com https://lh4.googleusercontent.com https://lh5.googleusercontent.com https://lh6.googleusercontent.com https://i.imgur.com https://i.postimg.cc https://i.ibb.co https://pbs.twimg.com/media/ https://i.pinimg.com data:; style-src 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://fastly.jsdelivr.net; font-src data: https://fonts.gstatic.com https://cdn.jsdelivr.net https://fastly.jsdelivr.net; base-uri 'none'; form-action 'none'";
  var esc = function (v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var num = function (v, lo, hi) {
    var n = Math.round(Number(v) || 0);
    return Math.max(lo, Math.min(hi, n));
  };
  var idOk = function (v) {
    return /^[A-Za-z0-9_-]{10,100}$/.test(String(v || ""));
  };
  var img = function (id, alt) {
    return idOk(id) ? '<img src="https://drive.google.com/thumbnail?id=' + id + '&amp;sz=w1600" alt="' + esc(alt || "") + '" loading="lazy" referrerpolicy="no-referrer">' : "";
  };
  var urlOk = function (v) {
    return /^https?:\/\/[^\s"'<>]+$/i.test(String(v || ""));
  };
  var col = function (c) {
    return /^#[0-9a-f]{6}$/i.test(c || "") ? c : "#888888";
  };
  var rid = function (r) {
    return "r-" + String(r.id || "").replace(/[^A-Za-z0-9_-]/g, "");
  };
  /*@mh-safe 시작: 앱(parts/내홈.js)과 보기 페이지(h/view.js)에 글자 하나 다르지 않게 같이 둔다(시험 내홈_html.test.cjs가 견줌). ES5만.
    사용자 HTML·CSS 거르기(04 11-27 'HTML·글꼴·바깥 그림·움직임도'): 정해 둔 것만 다시 써서 내보낸다(받은 글을 그대로 넘기지 않음).
    스크립트·on…속성·바깥 페이지(iframe·form·meta·link)·id(앱 이름 덮기) X. 바깥 주소는 아래 목록만(https). 보기 페이지는 틀(sandbox, 스크립트 X) + CSP가 한 번 더 막는다. */
  var MH_URL_IMG = ["drive.google.com/", "lh3.googleusercontent.com/", "lh4.googleusercontent.com/", "lh5.googleusercontent.com/", "lh6.googleusercontent.com/", "i.imgur.com/", "i.postimg.cc/", "i.ibb.co/", "pbs.twimg.com/media/", "i.pinimg.com/"];
  /* 글꼴: 구글 폰트 · 눈누(projectnoonnu) · Pretendard · Galmuri */
  var MH_URL_FONT = ["fonts.gstatic.com/", "cdn.jsdelivr.net/gh/projectnoonnu/", "fastly.jsdelivr.net/gh/projectnoonnu/", "cdn.jsdelivr.net/gh/orioncactus/pretendard/", "cdn.jsdelivr.net/gh/orioncactus/pretendard@", "cdn.jsdelivr.net/npm/galmuri/", "cdn.jsdelivr.net/npm/galmuri@"];
  var MH_URL_CSS = ["fonts.googleapis.com/css2?", "fonts.googleapis.com/css?"].concat(MH_URL_FONT.slice(1));
  function mhUrlIn(u, list) {
    u = String(u == null ? "" : u);
    if (u.length > 500 || !/^https:\/\/[A-Za-z0-9._~:\/?#\[\]@!$&*+,;=%-]+$/.test(u) || /\.\.|%2e|%2f|%5c/i.test(u)) return !1;
    for (var i = 0; i < list.length; i++) if (u.indexOf(list[i]) === 8) return !0;
    return !1;
  }
  var mhDataImg = function (u) {
    return /^data:image\/(?:png|jpeg|gif|webp)(?:;[a-z0-9=.-]+)*;base64,[A-Za-z0-9+\/=]+$/i.test(String(u || ""));
  };
  var MH_IMP_RE = /@import\s+(?:url\(\s*(["']?)([^"')\s]*)\1\s*\)|(["'])([^"']*)\3)[^;]*;?/gi;
  /* 사용자 CSS → 글꼴 불러오기 줄(@import, 목록 안 주소만). 맨 앞에 따로 둬야 먹어서 본문(mhCssSafe)과 나눔 */
  function mhFontImports(c) {
    var o = [],
      m;
    c = String(c || "").slice(0, 20000);
    MH_IMP_RE.lastIndex = 0;
    while ((m = MH_IMP_RE.exec(c)) && o.length < 8) {
      var u = m[2] || m[4] || "";
      if (mhUrlIn(u, MH_URL_CSS) && o.indexOf(u) < 0) o.push(u);
    }
    return o
      .map(function (u) {
        return '@import url("' + u + '");';
      })
      .join("\n");
  }
  /* 사용자 CSS 본문: 이스케이프 풀기 → < \ 빼기 → @import 빼기 → url()은 그림·글꼴 목록 안 주소와 data: 그림만 → 괄호 짝 */
  function mhCssSafe(c) {
    c = String(c || "").slice(0, 20000);
    // 거르고 나서 다시 생기는 꼴(<<//style>·u\72l( 이스케이프)까지: 바뀌지 않을 때까지 되풀이
    for (var i = 0, p = null; i < 8 && p !== c; i++) {
      p = c;
      c = c
        .replace(/\\([0-9a-f]{1,6})\s?/gi, function (m, h) {
          var n = parseInt(h, 16);
          return n > 0 && n < 0x110000 ? String.fromCodePoint(n) : "";
        })
        .replace(/\\([^0-9a-f])/gi, "$1")
        .replace(/[<\\]/g, "")
        .replace(MH_IMP_RE, "")
        .replace(/@import[^;]*;?/gi, "")
        .replace(/(?:-webkit-)?image-set\([^;}]*/gi, "none")
        .replace(/url\(\s*(["']?)([^)]*?)\1\s*\)/gi, function (m, q, u) {
          u = u.replace(/\s+/g, "");
          return mhDataImg(u) || mhUrlIn(u, MH_URL_IMG) || mhUrlIn(u, MH_URL_FONT) ? 'url("' + u + '")' : "none";
        })
        .replace(/url\((?!"[^"()\s]*"\))/gi, "none(");
    }
    // 괄호 짝: 남는 } 는 빼고(감싼 @scope 밖으로 못 나가게), 안 닫힌 { 는 닫음.
    //  주석은 지우고, 따옴표 글 안의 { } 는 뺌(브라우저는 그 안 괄호를 안 세서, 세는 법이 다르면 @scope 밖으로 샘 · 검토 11-28)
    //  CSS 따옴표 글은 줄이 바뀌면 끝나므로 줄 끝·글 끝에서 닫아 줌
    var d = 0,
      o = "",
      qq = "";
    for (var k = 0; k < c.length; k++) {
      var ch = c.charAt(k);
      if (qq) {
        if (ch === qq) qq = "";
        else if (ch === "\n" || ch === "\r" || ch === "\f") {
          o += qq;
          qq = "";
        } else if (ch === "{" || ch === "}") continue;
        o += ch;
        continue;
      }
      if (ch === "/" && c.charAt(k + 1) === "*") {
        var ce = c.indexOf("*/", k + 2);
        k = ce < 0 ? c.length : ce + 1;
        o += " ";
        continue;
      }
      if (ch === '"' || ch === "'") qq = ch;
      else if (ch === "}") {
        if (!d) continue;
        d--;
      } else if (ch === "{") d++;
      o += ch;
    }
    return o + qq + "}".repeat(d);
  }
  /* 쓸 수 있는 태그(옛 갠홈 태그 marquee·center·font 포함) · 빈 태그 · 안까지 통째로 버리는 태그 */
  var MH_HT_OK = " a abbr article aside b big blockquote br caption center cite code col colgroup dd del details dfn div dl dt em figcaption figure font footer h1 h2 h3 h4 h5 h6 header hr i img ins kbd li main mark marquee nav ol p pre q rp rt ruby s samp section small span strike strong sub summary sup table tbody td tfoot th thead time tr tt u ul var wbr ";
  var MH_HT_VOID = " br hr img col wbr ";
  var MH_HT_DROP = " script style textarea iframe frame frameset object embed noscript noembed noframes template title xmp plaintext svg math select option head ";
  /* 속성: 모든 태그 공통 + 태그마다. on…·id·name·target·srcset·formaction 같은 건 목록에 없어서 빠짐 */
  var MH_HT_AT = {
    "*": " class style title lang dir align ",
    a: " href ",
    img: " src alt width height ",
    font: " color size face ",
    ol: " start type reversed ",
    li: " value ",
    details: " open ",
    time: " datetime ",
    marquee: " direction behavior scrollamount scrolldelay loop width height bgcolor ",
    table: " border cellpadding cellspacing width bgcolor ",
    td: " colspan rowspan width height valign bgcolor ",
    th: " colspan rowspan width height valign bgcolor ",
    tr: " valign bgcolor ",
    col: " span width ",
    colgroup: " span width ",
  };
  var mhHtEsc = function (v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  /* 속성 값의 문자 참조 풀기(&#106; &#x6A; &quot; …): 푼 다음 확인하고, 내보낼 땐 다시 감쌈 */
  var mhHtUn = function (v) {
    return String(v)
      .replace(/&#x([0-9a-f]{1,6});?/gi, function (m, h) {
        var n = parseInt(h, 16);
        return n > 0 && n < 0x110000 ? String.fromCodePoint(n) : "";
      })
      .replace(/&#([0-9]{1,7});?/g, function (m, h) {
        var n = parseInt(h, 10);
        return n > 0 && n < 0x110000 ? String.fromCodePoint(n) : "";
      })
      .replace(/&(amp|lt|gt|quot|apos|nbsp|tab|newline|colon);?/gi, function (m, n) {
        return { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", tab: "\t", newline: "\n", colon: ":" }[n.toLowerCase()];
      });
  };
  function mhHtAttr(tg, nm, v) {
    v = mhHtUn(v).replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, 2000);
    if (nm === "href") return /^(https?:\/\/[^\s"'<>`]+|mailto:[^\s"'<>`]+)$/i.test(v) ? v : null;
    if (nm === "src") return mhDataImg(v) || mhUrlIn(v, MH_URL_IMG) ? v : null;
    if (nm === "style") return mhCssSafe(v).replace(/[{}]/g, "");
    if (nm === "class") return v.replace(/[^A-Za-z0-9_ -]/g, "").slice(0, 200);
    if (nm === "color" || nm === "bgcolor") return /^#?[0-9a-z]{1,20}$/i.test(v) ? v : null;
    if (nm === "face") return v.replace(/[^A-Za-z0-9가-힣 ,_-]/g, "").slice(0, 100);
    if (nm === "title" || nm === "alt" || nm === "lang" || nm === "datetime") return v.slice(0, 200);
    if (nm === "open" || nm === "reversed") return "";
    if (/^(width|height|size|start|value|colspan|rowspan|span|border|cellpadding|cellspacing|scrollamount|scrolldelay|loop)$/.test(nm)) return /^-?[0-9]{1,5}%?$/.test(v) ? v : null;
    return /^[a-z-]{1,12}$/i.test(v) ? v : null;
  }
  /* 사용자 HTML → 거른 HTML. 태그를 하나씩 읽어 목록 안 것만 다시 쓰고, 열린 태그는 끝에서 닫는다(방 밖으로 못 새게) */
  function mhHtmlSafe(src) {
    src = String(src == null ? "" : src).slice(0, 20000);
    var o = "",
      st = [],
      i = 0,
      n = src.length,
      TAG = /^<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/,
      AT = /([^\s"'>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
    while (i < n) {
      var c = src.charAt(i);
      if (c === "<") {
        if (src.substr(i, 4) === "<!--") {
          var e = src.indexOf("-->", i + 4);
          i = e < 0 ? n : e + 3;
          continue;
        }
        var m = TAG.exec(src.slice(i, i + 4000));
        if (!m) {
          o += "&lt;";
          i++;
          continue;
        }
        i += m[0].length;
        var tg = m[2].toLowerCase();
        if (m[1]) {
          var at = st.lastIndexOf(tg);
          if (at >= 0) while (st.length > at) o += "</" + st.pop() + ">";
          continue;
        }
        if (MH_HT_DROP.indexOf(" " + tg + " ") >= 0) {
          var cl = src.toLowerCase().indexOf("</" + tg, i);
          if (cl < 0) i = n;
          else {
            var gt = src.indexOf(">", cl);
            i = gt < 0 ? n : gt + 1;
          }
          continue;
        }
        if (MH_HT_OK.indexOf(" " + tg + " ") < 0) continue;
        var ok = (MH_HT_AT["*"] + (MH_HT_AT[tg] || "")).split(" "),
          a = "",
          seen = {},
          am;
        AT.lastIndex = 0;
        while ((am = AT.exec(m[3]))) {
          var nm = am[1].toLowerCase();
          if (ok.indexOf(nm) < 0 || seen[nm]) continue;
          seen[nm] = 1;
          var v = mhHtAttr(tg, nm, am[2] != null ? am[2] : am[3] != null ? am[3] : am[4] != null ? am[4] : "");
          if (v != null) a += " " + nm + '="' + mhHtEsc(v) + '"';
        }
        if (tg === "img") {
          if (!seen.src || a.indexOf(' src="') < 0) continue;
          a += ' referrerpolicy="no-referrer" loading="lazy"';
        }
        if (tg === "a") a += ' target="_blank" rel="noopener noreferrer"';
        o += "<" + tg + a + ">";
        if (MH_HT_VOID.indexOf(" " + tg + " ") < 0) st.push(tg);
        if (st.length > 64) o += "</" + st.pop() + ">";
        continue;
      }
      var j = src.indexOf("<", i);
      if (j < 0) j = n;
      o += src
        .slice(i, j)
        .replace(/&(?!(?:#[0-9]{1,7}|#x[0-9a-f]{1,6}|[a-z][a-z0-9]{1,31});)/gi, "&amp;")
        .replace(/>/g, "&gt;");
      i = j;
    }
    while (st.length) o += "</" + st.pop() + ">";
    return o;
  }
  /*@mh-safe 끝*/
  /* 거른 HTML을 브라우저가 한 번 읽은 꼴로(DOMParser는 스크립트·그림을 안 부름): 거르기와 브라우저 읽기가 다른 곳
     (예: 새 <li>가 앞 <li> 안 <div>를 닫음)이 있어도 남는 닫기 태그가 방(<section>) 밖으로 못 나가게(검토 11-28) */
  function htm(x) {
    x = mhHtmlSafe(x);
    try {
      return new DOMParser().parseFromString("<!doctype html><body>" + x, "text/html").body.innerHTML;
    } catch (_) {
      return esc(x);
    }
  }
  function item(i) {
    var k = i.k,
      b;
    if (k === "title") b = '<b class="h-title">' + esc(i.t) + "</b>";
    else if (k === "img") b = '<div class="h-img">' + img(i.img) + "</div>";
    else if (k === "sticker") b = '<span class="h-sticker">' + esc(i.t) + "</span>";
    else if (k === "banner") b = '<span class="h-banner">' + (i.img ? img(i.img, i.t) : esc(i.t)) + "</span>";
    else if (k === "html") b = '<div class="h-html">' + htm(i.t) + "</div>";
    else if (k === "link") b = urlOk(i.url) ? '<a class="h-link" href="' + esc(i.url) + '" target="_blank" rel="noopener noreferrer">' + esc(i.t || i.url) + "</a>" : '<span class="h-link">' + esc(i.t) + "</span>";
    else b = '<p class="h-text">' + esc(i.t) + "</p>";
    var st = "--x:" + (num(i.x, 0, 960) / 9.6).toFixed(3) + "%;--y:" + num(i.y, 0, 20000) + "px;--w:" + (num(i.w, 8, 960) / 9.6).toFixed(3) + "%;--h:" + num(i.h, 8, 4000) + "px;--r:" + num(i.r, -45, 45) + "deg;--z:" + num(i.z, 0, 9999);
    return '<div class="h-item h-item-' + esc(k) + '" style="' + st + '">' + b + "</div>";
  }
  function body(r) {
    var b = r.body || {};
    if (r.lock && !r.body) return '<p class="h-none">잠긴 방이에요. 화면 위 칸에 비밀번호를 넣으면 열려요.</p>';
    if (r.t === "log")
      return (b.posts || []).length
        ? (b.posts || [])
            .map(function (p) {
              return '<article class="h-post">' + (p.img ? '<div class="h-post-img">' + img(p.img) + "</div>" : "") + "<div><span>" + esc(String(p.at || "").replace(/-/g, ".")) + "</span><p>" + esc(p.tx) + "</p></div></article>";
            })
            .join("")
        : '<p class="h-none">아직 글이 없어요.</p>';
    if (r.t === "html") return '<div class="h-html h-hroom">' + htm(b.html) + "</div>";
    if (r.t === "rev")
      return (
        '<div class="h-cards">' +
        (b.cards || [])
          .map(function (c) {
            var n = num(c.st, 0, 5);
            return '<div class="h-card"><div class="h-card-img">' + img(c.img, c.tt) + "</div><span>" + esc(c.cn) + "</span><b>" + esc(c.tt) + "</b>" + (n ? '<i aria-label="별 ' + n + '개">' + "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n) + "</i>" : "") + (c.one ? "<p>" + esc(c.one) + "</p>" : "") + "</div>";
          })
          .join("") +
        "</div>"
      );
    var it = (b.it || []).slice().sort(function (a, c) {
        return a.y - c.y || a.x - c.x;
      }),
      h = it.reduce(function (mx, x) {
        return Math.max(mx, num(x.y, 0, 20000) + num(x.h, 8, 4000));
      }, 0);
    return '<div class="h-cv" style="--ch:' + (h + 48) + 'px">' + it.map(item).join("") + "</div>";
  }
  /* 사이트 한 장(틀 안에 들어갈 글). start = 처음 보일 방 id */
  function page(S, start) {
    var rooms = (S.rooms || []).filter(function (r) {
        return r && r.id;
      }),
      k = ["plain", "note", "win"].indexOf(S.k) >= 0 ? S.k : "plain",
      st = start && rooms.some(function (r) { return r.id === start; }) ? start : rooms[0] && rooms[0].id,
      first = rooms.find(function (r) { return r.id === st; }),
      ent = S.en && !start,
      menu =
        '<nav class="h-menu" aria-label="방">' +
        rooms
          .map(function (r) {
            return '<a class="h-menu-item" href="about:srcdoc#' + rid(r) + '" style="--mc:' + col(r.c) + '">' + (k === "plain" ? "" : '<b aria-hidden="true">' + esc(r.g) + "</b>") + "<span>" + esc(r.nm) + "</span>" + (r.lock && !r.body ? ' <small aria-label="잠김">🔒</small>' : "") + "</a>";
          })
          .join("") +
        "</nav>",
      secs =
        '<main class="h-rooms">' +
        rooms
          .map(function (r) {
            return '<section class="h-room bg-' + esc(String(r.bg || "").replace(/[^a-z]/g, "")) + (r.id === st ? " is-start" : "") + '" id="' + rid(r) + '"><b class="h-room-title">' + esc(r.nm) + "</b>" + body(r) + "</section>";
          })
          .join("") +
        "</main>",
      cur = rooms
        .map(function (r) {
          return ".h-site:has(#" + rid(r) + ":target) a[href='about:srcdoc#" + rid(r) + "']";
        })
        .concat(first ? [".h-site:not(:has(:target)) a[href='about:srcdoc#" + rid(first) + "']"] : [])
        .join(",");
    var wrap = k === "win" ? '<div class="h-frame"><div class="h-bar"><span>' + esc(S.nm) + '</span><i><em></em><em></em><em></em></i></div><div class="h-in">' + menu + secs + "</div></div>" : menu + secs;
    return (
      '<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="' +
      CSP +
      '"><meta name="referrer" content="no-referrer"><style>' +
      BASE +
      (cur ? cur + "{" + CUR + "}" : "") +
      "</style><style>" +
      mhFontImports(S.css) +
      "\n" +
      mhCssSafe(S.css) +
      '</style></head><body><div class="h-site k-' +
      k +
      (ent ? " has-ent" : "") +
      '">' +
      (ent && first ? '<div class="h-ent"><b class="h-title">' + esc(S.nm) + '</b><a class="h-entb" href="about:srcdoc#' + rid(first) + '">들어가기</a></div>' : "") +
      '<div class="h-wrap">' +
      wrap +
      "</div></div></body></html>"
    );
  }
  var CUR = "font-weight:700;text-decoration:underline;text-underline-offset:3px";
  var BASE = [
    "*{box-sizing:border-box}html,body{margin:0}body{font:14px/1.5 Pretendard,system-ui,-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;color:#111;word-break:keep-all}",
    ".h-site{min-height:100vh;background:#fff}",
    ".h-wrap{display:flex;gap:32px;max-width:1120px;margin:0 auto;padding:48px 32px 96px}",
    ".h-menu{flex:none;display:flex;flex-direction:column;gap:4px;min-width:96px;position:sticky;top:48px;align-self:flex-start}",
    ".h-menu-item{display:flex;align-items:center;gap:8px;color:inherit;text-decoration:none;padding:4px 0;white-space:nowrap}",
    ".h-rooms{flex:1;min-width:0}.h-room{display:none}.h-room:target{display:block}.h-rooms:not(:has(:target)) .h-room.is-start{display:block}",
    ".h-room-title{display:block;font-size:24px;font-weight:700;letter-spacing:-1px;margin-bottom:16px}.h-room:has(.h-cv) .h-room-title{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}",
    ".h-ent{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;padding:32px;text-align:center}.h-ent .h-title{font-size:32px}",
    ".h-entb{height:40px;padding:0 24px;border:1px solid currentColor;border-radius:999px;color:inherit;text-decoration:none;display:flex;align-items:center;font-weight:600}",
    ".h-site.has-ent:not(:has(.h-room:target)) .h-wrap{display:none}.h-site:has(.h-room:target) .h-ent{display:none}",
    ".h-cv{position:relative;width:100%;max-width:960px;height:var(--ch)}",
    ".h-item{position:absolute;left:var(--x);top:var(--y);width:var(--w);height:var(--h);transform:rotate(var(--r));z-index:var(--z);display:flex;min-width:0}",
    ".h-title{font-size:32px;font-weight:700;letter-spacing:-1px;line-height:1.2;overflow:hidden}",
    ".h-text{margin:0;white-space:pre-wrap;overflow:hidden}",
    ".h-img,.h-banner{flex:1;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#eee}.h-img img,.h-banner img,.h-post-img img,.h-card-img img{width:100%;height:100%;object-fit:cover;display:block}",
    ".h-sticker{flex:1;display:flex;align-items:center;justify-content:center;font-size:32px;line-height:1}",
    ".h-banner{background:#fff;outline:1px solid #ccc;outline-offset:-1px;font-size:12px}",
    ".h-link{display:flex;align-items:center;color:inherit}",
    ".h-html{flex:1;min-width:0;overflow:auto;contain:layout paint;word-break:keep-all}.h-hroom{overflow:visible;min-height:320px}.h-html img{max-width:100%}.h-room:has(.h-hroom) .h-room-title{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}",
    ".h-post{display:flex;gap:16px;padding:16px;margin-bottom:16px;background:#fff;border:1px solid rgba(0,0,0,.1)}.h-post-img{flex:none;width:96px;height:72px;overflow:hidden;background:#eee}.h-post span{font-size:12px;color:#666}.h-post p{margin:0;white-space:pre-wrap}",
    ".h-cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.h-card{display:flex;flex-direction:column;gap:4px;padding:8px 8px 12px;background:#fff;border:1px solid rgba(0,0,0,.08)}.h-card-img{aspect-ratio:2/3;background:#eee;overflow:hidden}.h-card span{font-size:12px;color:#666}.h-card i{font-style:normal;color:#E2A93B}.h-card p{margin:0;font-size:12px}",
    ".h-none{color:#666}",
    /* 종이 노트 */
    ".k-note{color:#3B2F24;background:#EDE7DA}.k-note .h-wrap{flex-direction:row-reverse;gap:0;max-width:1080px}.k-note .h-rooms{background:#FFFDF7;padding:48px 56px;min-height:640px;box-shadow:inset 24px 0 0 -22px #E8A0A0}",
    ".k-note .h-room.bg-line,.k-note .h-room.bg-{background-image:repeating-linear-gradient(transparent 0 31px,#E3DDCF 31px 32px)}.k-note .h-room.bg-grid{background-image:linear-gradient(#ECE6D8 1px,transparent 1px),linear-gradient(90deg,#ECE6D8 1px,transparent 1px);background-size:16px 16px}",
    ".k-note .h-menu{top:120px;margin-top:32px;gap:8px;min-width:0}.k-note .h-menu-item{height:40px;padding:0 16px 0 12px;background:var(--mc);color:#fff;border-radius:0 8px 8px 0;font-weight:600}",
    /* 옛 창문 */
    ".k-win{background:#8FB3D9;color:#1B1B1B}.k-win:has(.bg-teal:target),.k-win:not(:has(:target)):has(.is-start.bg-teal){background:#3A8C8C}.k-win:has(.bg-rose:target),.k-win:not(:has(:target)):has(.is-start.bg-rose){background:#E7B3C3}",
    ".k-win .h-wrap{display:block;max-width:1040px}.h-frame{background:#D4D0C8;border:2px solid;border-color:#fff #555 #555 #fff;padding:4px}",
    ".h-bar{display:flex;align-items:center;height:28px;padding:0 4px 0 8px;background:#1F3A8A;color:#fff;font-weight:700}.h-bar span{flex:1;overflow:hidden;white-space:nowrap}.h-bar i{display:flex;gap:4px}.h-bar em{width:16px;height:14px;background:#D4D0C8;border:1px solid;border-color:#fff #555 #555 #fff}",
    ".h-in{display:flex;gap:4px;margin-top:4px;min-height:560px}.k-win .h-menu{position:static;background:#fff;border:2px solid;border-color:#555 #fff #fff #555;padding:8px;gap:0;min-width:136px}",
    ".k-win .h-menu-item{padding:4px 8px}.k-win .h-menu-item b{width:16px;height:16px;display:flex;align-items:center;justify-content:center;background:var(--mc);color:#fff;font-size:12px}",
    ".k-win .h-rooms{background:#fff;border:2px solid;border-color:#555 #fff #fff #555;padding:24px}",
    /* 폰: 메뉴는 위 한 줄, 칸은 위에서 아래로 쌓기 */
    "@media (max-width:700px){.h-wrap{flex-direction:column;gap:16px;padding:24px 16px 48px}.h-menu{position:static;flex-direction:row;overflow-x:auto;max-width:100%;gap:8px}.h-menu-item{min-height:44px}",
    ".h-cv{height:auto;display:flex;flex-direction:column;gap:16px}.h-item{position:relative;left:auto;top:auto;width:auto;height:auto;transform:none}.h-item-img .h-img{height:200px}.h-item-banner{width:200px;height:40px}.h-item-sticker{height:56px;justify-content:flex-start}",
    ".h-cards{grid-template-columns:repeat(2,minmax(0,1fr))}.k-note .h-wrap{flex-direction:column}.k-note .h-rooms{padding:24px 16px;min-height:0}.k-note .h-menu{margin-top:0}.k-note .h-menu-item{border-radius:8px 8px 0 0}.h-in{flex-direction:column}.k-win .h-rooms{padding:16px}}",
  ].join("\n");

  /* ── 틀 밖(이 페이지): 불러오기·잠긴 방 풀기 ── */
  var b64 = function (s) {
    return Uint8Array.from(atob(s), function (c) {
      return c.charCodeAt(0);
    });
  };
  function unlock(e, pw) {
    var C = crypto.subtle;
    return C.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return C.deriveKey({ name: "PBKDF2", salt: b64(e.s), iterations: 150000, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
      })
      .then(function (k) {
        return C.decrypt({ name: "AES-GCM", iv: b64(e.i) }, k, b64(e.c));
      })
      .then(function (p) {
        return JSON.parse(new TextDecoder().decode(p));
      });
  }
  var S = null,
    fr = null;
  function draw(start) {
    fr.setAttribute("srcdoc", page(S, start));
    var locked = (S.rooms || []).filter(function (r) {
      return r.lock && !r.body && r.enc;
    });
    var bar = document.getElementById("hv-lock");
    bar.hidden = !locked.length;
    var sel = bar.querySelector("select");
    sel.innerHTML = locked
      .map(function (r) {
        return '<option value="' + esc(r.id) + '">' + esc(r.nm) + "</option>";
      })
      .join("");
  }
  function msg(t) {
    document.body.innerHTML = '<main class="hv-msg"><b>' + esc(t) + '</b><p><a href="/">Daterbase</a></p></main>';
  }
  function boot() {
    document.title = NAME;
    var st = document.createElement("style");
    st.textContent =
      "html,body{margin:0;height:100%}body{background:#fff}.hv-msg{min-height:100vh;display:grid;place-content:center;gap:8px;text-align:center;font:16px/1.5 system-ui,sans-serif;color:#26231f}.hv-msg p{margin:0;color:#716b63}.hv-msg a{color:inherit}" +
      "#hv-fr{position:fixed;inset:0;width:100%;height:100%;border:0}" +
      "#hv-lock{position:fixed;left:50%;top:16px;transform:translateX(-50%);z-index:2;display:flex;align-items:center;gap:8px;padding:8px 8px 8px 16px;max-width:calc(100% - 32px);box-sizing:border-box;background:#fff;color:#26231f;border:1px solid #ddd;border-radius:999px;font:14px/1 system-ui,sans-serif}" +
      "#hv-lock[hidden]{display:none}#hv-lock select,#hv-lock input{height:32px;border:0;border-radius:8px;background:#f2f0ec;padding:0 8px;font:inherit;min-width:0}#hv-lock input{width:120px}#hv-lock button{height:32px;padding:0 16px;border:0;border-radius:999px;background:#26231f;color:#fff;font:inherit;font-weight:600;cursor:pointer}";
    document.head.appendChild(st);
    document.body.innerHTML = '<main class="hv-msg"><b>불러오는 중</b></main>';
    fetch(SRV + "?a=hget&n=" + encodeURIComponent(NAME), { cache: "no-store" })
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        if (!j || !j.ok || !j.site || !Array.isArray(j.site.rooms)) return msg(j && j.error === "cap" ? "잠시 뒤 다시 열어 주세요" : "없는 홈이거나 공개를 끈 홈이에요");
        S = j.site;
        document.title = String(S.nm || NAME).slice(0, 40);
        document.body.innerHTML =
          '<form id="hv-lock" hidden><span aria-hidden="true">🔒</span><select aria-label="잠긴 방"></select><input type="password" aria-label="비밀번호" placeholder="비밀번호" autocomplete="off"><button type="submit">열기</button></form>' +
          '<iframe id="hv-fr" title="' +
          esc(S.nm || NAME) +
          '" sandbox="allow-popups allow-popups-to-escape-sandbox" referrerpolicy="no-referrer"></iframe>';
        fr = document.getElementById("hv-fr");
        var f = document.getElementById("hv-lock");
        f.addEventListener("submit", function (e) {
          e.preventDefault();
          var id = f.querySelector("select").value,
            inp = f.querySelector("input"),
            r = (S.rooms || []).find(function (x) {
              return x.id === id;
            });
          if (!r || !r.enc) return;
          unlock(r.enc, inp.value).then(
            function (b) {
              r.body = b;
              inp.value = "";
              draw(r.id);
            },
            function () {
              inp.value = "";
              inp.placeholder = "비밀번호가 달라요";
              inp.focus();
            },
          );
        });
        draw(null);
      })
      .catch(function () {
        msg("인터넷 연결을 확인해 주세요");
      });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
  window.__hv = { page: page, cssSafe: mhCssSafe, htmlSafe: mhHtmlSafe };
})();
