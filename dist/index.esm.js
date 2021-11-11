/**
 * cypress-keycloak v1.7.1
 *
 * Copyright (c) 2019 babangsund
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import{sha256 as e}from"js-sha256";import{fromByteArray as r}from"base64-js";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var t=function(){return(t=Object.assign||function(e){for(var r,t=1,o=arguments.length;t<o;t++)for(var n in r=arguments[t])Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e}).apply(this,arguments)};function o(){for(var e=[],r=0;r<36;r++)e[r]="0123456789abcdef".substr(Math.floor(16*Math.random()),1);return e[14]="4",e[19]="0123456789abcdef".substr(3&parseInt(e[19])|8,1),e[8]=e[13]=e[18]=e[23]="-",e.join("")}function n(e){return function(e,r){for(var t=function(e){var r=null,t=window.crypto;if(t&&t.getRandomValues&&window.Uint8Array)return r=new Uint8Array(e),t.getRandomValues(r),r;r=new Array(e);for(var o=0;o<r.length;o++)r[o]=Math.floor(256*Math.random());return r}(e),o=new Array(e),n=0;n<e;n++)o[n]=r.charCodeAt(t[n]%r.length);return String.fromCharCode.apply(null,o)}(e,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")}Cypress.Commands.add("login",(function(a){var c=a.root,i=a.realm,l=a.username,d=a.password,s=a.client_id,u=a.redirect_uri,m=a.code_challenge_method,p=a.path_prefix,f=void 0===p?"auth":p,h={};if(m&&"S256"===m){h.code_challenge_method=m;var y=n(96),g=new Uint8Array(e.arrayBuffer(y)),_=r(g).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"");h.code_challenge=_,console.log(h)}return cy.request({url:c+(f?"/"+f:"")+"/realms/"+i+"/protocol/openid-connect/auth",qs:t({client_id:s,redirect_uri:u,scope:"openid",state:o(),nonce:o(),response_type:"code",response_mode:"fragment"},h)}).then((function(e){var r=document.createElement("html");r.innerHTML=e.body;var t=r.getElementsByTagName("form");if(!!t.length)return cy.request({form:!0,method:"POST",url:t[0].action,followRedirect:!1,body:{username:l,password:d}})}))})),Cypress.Commands.add("loginOTP",(function(e){var r=e.root,t=e.realm,n=e.username,a=e.password,c=e.client_id,i=e.redirect_uri,l=e.path_prefix,d=void 0===l?"auth":l,s=e.otp_secret,u=e.otp_credential_id,m=void 0===u?null:u;return cy.request({url:r+"/"+d+"/realms/"+t+"/protocol/openid-connect/auth",qs:{client_id:c,redirect_uri:i,scope:"openid",state:o(),nonce:o(),response_type:"code",response_mode:"fragment"}}).then((function(e){var r=document.createElement("html");r.innerHTML=e.body;var t=r.getElementsByTagName("form");if(!!t.length)return cy.request({form:!0,method:"POST",url:t[0].action,followRedirect:!1,body:{username:n,password:a}}).then((function(e){var r=document.createElement("html");r.innerHTML=e.body;var t=r.getElementsByTagName("form");cy.task("generateOTP",s,{log:!1}).then((function(e){var r={otp:e};m&&(r.selectedCredentialId=m),cy.request({form:!0,method:"POST",url:t[0].action,followRedirect:!1,body:r})}))}))}))})),Cypress.Commands.add("logout",(function(e){var r=e.root,t=e.realm,o=e.redirect_uri,n=e.path_prefix,a=void 0===n?"auth":n;return cy.request({qs:{redirect_uri:o},url:r+(a?"/"+a:"")+"/realms/"+t+"/protocol/openid-connect/logout"})}));
