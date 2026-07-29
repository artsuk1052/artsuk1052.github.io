/* ================================================================
   Google AdSense 설정 (한 곳만 고치면 모든 페이지에 적용됩니다)
   ----------------------------------------------------------------
   ▸ 애드센스에 가입해 '게시자 ID(ca-pub-...)'를 받으면
     아래 ADSENSE_PUB_ID 의 "" 안에 그 ID를 붙여넣으세요.
     예)  var ADSENSE_PUB_ID = "ca-pub-1234567890123456";
   ▸ 비워두면(기본값) 광고 스크립트를 로드하지 않아, 심사 전에는
     깔끔한 상태로 유지됩니다.
   ▸ 파일 하나(adsense.js)만 고치면 전체 사이트에 반영됩니다.
   ================================================================ */
var ADSENSE_PUB_ID = "";

(function(){
  if(!ADSENSE_PUB_ID) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + ADSENSE_PUB_ID;
  s.crossOrigin = "anonymous";
  document.head.appendChild(s);
})();
