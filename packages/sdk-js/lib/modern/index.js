!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).lol=e()}(this,(function(){"use strict";function t(t,e){for(const n in e)t.searchParams.set(n,String(e[n]));return t.toString()}return{init:function(e,n){const o=n?.fields||{},s=t(new URL(`${n?.apiUrl||"http://localhost:4000"}/flags/sdk/${e}`),o),i=new URL(n?.websocketUrl||"ws://localhost:4001");return i.searchParams.set("client_key",e),function(t,e){let n,o={};async function s(){const e=await fetch(t),n=await e.json();return o={...o,...n},n}function i(t){n=new WebSocket(e),n.onmessage=e=>{const n=JSON.parse(e.data||{}),{data:s}=n;o={...o,...s},t(o)}}function a(){n?.close()}return{loadFlags:s,disconnect:a,onFlagUpdate:i}}(s,t(i,o))}}}));
