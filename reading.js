(() => {
  const search=document.getElementById('reading-search'), group=document.getElementById('reading-group');
  const cards=[...document.querySelectorAll('.new-paper')];
  function filter(){let count=0;const query=search.value.trim().toLocaleLowerCase();for(const card of cards){const visible=(!group.value||card.closest('.reading-group').dataset.group===group.value)&&(!query||(card.id+' '+card.textContent).toLocaleLowerCase().includes(query));card.hidden=!visible;if(visible)count++;}for(const section of document.querySelectorAll('.reading-group'))section.hidden=![...section.querySelectorAll('.new-paper')].some(c=>!c.hidden);document.getElementById('reading-count').textContent=`显示${count} / 20篇`+(count===0?'，可尝试金属英文符号或点击重置。':'');}
  search.addEventListener('input',filter);group.addEventListener('change',filter);
  document.getElementById('reading-reset').addEventListener('click',()=>{search.value='';group.value='';filter();});
  function reveal(){const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(!target)return;if(target.matches('.new-paper')){search.value='';group.value='';filter();}let parent=target;while(parent){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement;}requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));}
  window.addEventListener('hashchange',reveal);if(location.hash)reveal();
})();
