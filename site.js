/* 공통 스크립트: 모바일 메뉴 토글 + 쿠키 동의 배너 */
(function(){
  // 모바일 메뉴
  var tgl = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if(tgl && links){ tgl.addEventListener('click', function(){ links.classList.toggle('open'); }); }

  // 쿠키/광고 동의 배너 (개인화 광고 안내)
  try{
    if(!localStorage.getItem('cookie-consent')){
      var b = document.getElementById('cookie-banner');
      if(b){
        b.classList.add('show');
        var ok = b.querySelector('button');
        if(ok) ok.addEventListener('click', function(){
          try{ localStorage.setItem('cookie-consent','1'); }catch(e){}
          b.classList.remove('show');
        });
      }
    }
  }catch(e){}
})();
