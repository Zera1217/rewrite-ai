const input=document.getElementById('input'),output=document.getElementById('output');
const inCount=document.getElementById('inCount'),outCount=document.getElementById('outCount'),message=document.getElementById('message');
let selected='natural';

function countWords(t){return t.trim()?t.trim().split(/\s+/).length:0}
function update(){inCount.textContent=countWords(input.value)+' words'}
input.addEventListener('input',update);

document.querySelectorAll('.style').forEach(btn=>btn.onclick=()=>{
 document.querySelectorAll('.style').forEach(x=>x.classList.remove('active'));
 btn.classList.add('active');selected=btn.dataset.style;
});

function rewriteText(text,style){
 let s=text.trim();
 // Lightweight local rewrite for GitHub Pages demo; preserves meaning and does not claim detector evasion.
 const replacements=[
  [/\butilize\b/gi,'use'],[/\bin order to\b/gi,'to'],[/\ba significant number of\b/gi,'many'],
  [/\bdue to the fact that\b/gi,'because'],[/\bat this point in time\b/gi,'now'],
  [/\bhas the ability to\b/gi,'can'],[/\bfor the purpose of\b/gi,'to'],
  [/\bin addition\b/gi,'also'],[/\bfurthermore\b/gi,'also']
 ];
 replacements.forEach(([a,b])=>s=s.replace(a,b));
 if(style==='simple'){
  s=s.replace(/; /g,'. ').replace(/, which /g,'. This ');
 }else if(style==='casual'){
  s=s.replace(/It is important to note that/gi,'It is worth noting that')
     .replace(/Therefore,/gi,'So,').replace(/However,/gi,'But,');
 }else if(style==='professional'){
  s=s.replace(/a lot of/gi,'a substantial amount of')
     .replace(/get /gi,'obtain ');
 }
 s=s.replace(/\s{2,}/g,' ').replace(/\s+([,.!?])/g,'$1');
 return s;
}

document.getElementById('rewrite').onclick=()=>{
 const text=input.value.trim();
 if(countWords(text)<10){message.textContent='Please enter at least 10 words.';return}
 message.textContent='';
 output.classList.remove('placeholder');
 output.textContent='Rewriting…';
 setTimeout(()=>{
   const rewritten=rewriteText(text,selected);
   output.textContent=rewritten;
   outCount.textContent=countWords(rewritten)+' words';
   document.getElementById('copy').disabled=false;
 },450);
};

document.getElementById('clear').onclick=()=>{
 input.value='';output.textContent='Your rewritten text will appear here.';
 output.classList.add('placeholder');outCount.textContent='0 words';message.textContent='';
 document.getElementById('copy').disabled=true;update();
};
document.getElementById('copy').onclick=async()=>{
 try{await navigator.clipboard.writeText(output.textContent);message.style.color='#9cf0c0';message.textContent='Copied to clipboard.';setTimeout(()=>{message.textContent='';message.style.color=''},1500)}
 catch{message.textContent='Could not copy automatically.'}
};
