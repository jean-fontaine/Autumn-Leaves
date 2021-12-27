
/* ############################################################################################################################################### */
/* ################################################################### Leaves 4 ################################################################## */
/* ############################################################################################################################################### */

'use strict'

/* *********************************************************************************************************************************************** */
/* ********************************************************************* Dom ********************************************************************* */
/* *********************************************************************************************************************************************** */

const bodyArea = document.querySelector( 'body' ),
	  infoArea = document.querySelector( '#info' );
const oldCanvas = document.querySelector('#canvas'),
	  container = document.createElement( 'div' );
bodyArea.insertBefore(container, oldCanvas);

function clearRenderer() {
	while ( container.firstChild ) { container.removeChild( container.firstChild ) }
}

/* *********************************************************************************************************************************************** */
/* ******************************************************************** Tools ******************************************************************** */
/* *********************************************************************************************************************************************** */

// ------------------------------------------------------------------ Constants ------------------------------------------------------------------ //

const PI = Math.PI;
const BACKGROUND = 'gainsboro';
const INFINITY = 1000000;

// ------------------------------------------------------------------- String -------------------------------------------------------------------- //

function string_Last(string, numFromEnd=1) {
	let l = string.length, m = l-numFromEnd;
	if (m >= 0) { return string.substring(m,l);
	} else      { return string;
	}
}
function character(k) { // k = 1: A
	return String.fromCharCode(64 + k)
}
function stringify(n) {
	return n.toString(10)
}

// -------------------------------------------------------------------- List --------------------------------------------------------------------- //

function list_Last(list, numFromEnd=1) {
	let l = list.length, m = l-numFromEnd;
	if (m >= 0) { return list.splice(m,l);
	} else      { return list;
	}
}
function list_Repeat(number, value) {
	let rr = [];
	for (let k = 1; k <= number; k++) { rr.push(value) }
	return rr;
}
function list_Sequence(n1, n2) {
	let ll = [];
	for (let k = n1; k <= n2; k++) { ll.push(k) }
	return ll;
}
function list_Swap(list, i, j) {
	let ll = list.slice(), t = ll[i];
	ll[i] = ll[j]; ll[j] = t;
	return ll
}
function list_Multiply(list, cumul=false) {
	if (cumul) {
		let r = 1, rr = [];
		for (let t of list) { r *= t; rr.push(r); };
		return rr;
	} else {
		let r = 1;
		for (let t of list) { r *= t };
		return r;
	}
}
function list_Add(list, cumul=false, way='up') {
	if (cumul) {
		let r = 0; let rr = [0];
		if (way === 'up') { for (let k = 0; k < list.length   ; k++) { r += list[k]; rr.push(r); }
		} else            { for (let k = list.length-1; k >= 0; k--) { r += list[k]; rr.push(r); }; rr.reverse();
		}
		return rr;
	} else {
		let r = 0; for (let t of list) { r += t };
		return r;
	}
}
function list_SearchAll(list, values, check=true) {
	if (!Array.isArray(values)) { values = [values] }
	let rr = [];
	if (check) {for (let k = 0; k < list.length; k++) { if ( values.includes(list[k])) { rr.push(k) } };
	} else     {for (let k = 0; k < list.length; k++) { if (!values.includes(list[k])) { rr.push(k) } };
	}
	return rr;
}
function list_IsEqual(list1, list2) {
	if (list1.length !== list2.length) { return false }
	let boo = true;
	for (let k = 0; k < list1.length; k++) { boo = boo && (list1[k] === list2[k]) }
	return boo;
}
function list_Difference(listX, listY) {
	let setX = new Set(listX), setY = new Set(listY);
	for (let y of setY) { setX.delete(y) }
	return Array.from(setX);
}
function list_Occurences(list, sel='list') {
	let occ = {};
	if (sel === 'list') {
		for (let k = 0; k < list.length; k++) {
			let v = list[k];
			if (!occ[v]) { occ[v] = [] }
			occ[v].push(k);
		}
	} else {
		for (let k = 0; k < list.length; k++) {
			let v = list[k];
			if (!occ[v]) { occ[v] = 0 }
			occ[v] += 1;
		}
	}
	return occ;
}

// --------------------------------------------------------------------- Set --------------------------------------------------------------------- //

function set_Difference(setX, setY) {
	let diff = new Set(setX);
	for (let y of setY) { diff.delete(y) }
	return diff;
}

// -------------------------------------------------------------------- Object ------------------------------------------------------------------- //

function object_Copy(object) {
	return Object.assign( {}, object )
}
function object_Merge(object1, object2) {
	return Object.assign( {}, object1, object2 )
}
function object_Add(object1, object2) {
	let object1_ = object_Copy(object1),
		object2_ = object_Copy(object2);
	for ( let key of Object.keys(object2_) ) { object1_[key] = object2_[key] }
	return object1_;
}

// -------------------------------------------------------------------  Colors ------------------------------------------------------------------- //

function rgba_FromList(data) {
	if (data.length === 4) { return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})` }
	else { return `rgba(${data[0]}, ${data[1]}, ${data[2]})` }
}
function rgba_ToHex (rgba) {
	let n = rgba.indexOf( '(' ),
		rgba_ = rgba.substring(n+1);

	rgba_ = rgba_.replace( /[ )]/g , '' );
	rgba_ = rgba_.split(',');
	let r = parseInt(rgba_[0],10), g = parseInt(rgba_[1],10), b = parseInt(rgba_[2],10), a;
	let hex = [r,g,b];
	if (rgba_.length === 4) { a = Math.round( 255 * parseFloat(rgba_[3]) ); hex.push(a); }
	hex = hex.map( v => v.toString(16) ).map( v => v.padStart(2,'0') ).map( v => v.toUpperCase() );

	return ('#' + hex.join(''));
}

// ------------------------------------------------------------------- Numbers ------------------------------------------------------------------- //

function parse(x, opt='int') {
	if (opt === 'int') { return parseInt(x,10)
	} else 			   { return parseFloat(x)
	}
}
function gcd(a, b) {
	let a_ = a, b_ = b, r_;
	while (b_ > 0) { r_ = a_ % b_; a_ = b_; b_ = r_ }
	return a_;
}
function scm(a, b) {
	return a*b / gcd(a,b);
}
function digits(n, base, opt=Infinity) {
	let vv = [], u = n, v,c = 0;
	while (u > 0 && c < opt) {
		v = u % base; vv.push(v);
		u = Math.floor(u / base);
		c += 1;
	}
	if (opt === Infinity) { return vv.reverse() } else { return vv[opt-1] }
}
function mod(x, y) {
	return y*fract(x/y);
}
function dec2hex(x) {
	return x.toString(16).toUpperCase();
}
function hex2dec(x) {
	return parseInt(x.substring(1),16);
}
function clamp(x, a, b ) {
	if (x < a) { return a } else if (x > b) { return b } else { return x }
}
function mix( x, y, t ) {
	return (1-t)*x + t*y;
}
function slot(x, a, b ) {
	if ( (x-a) * (x-b) < 0 ) { return 1 } else { return 0 }
}
function stairs( x, xx, yy ) {
	let n = xx.length, y = 0;
	y += yy[0] * slot( x, -Infinity, xx[0] );
	for ( let k = 1; k < n; k++ ) { y += yy[k] * slot( x, xx[k-1], xx[k] ) }
	y += yy[n] * slot( x, xx[n-1], +Infinity );
	return y;
}

/* Et aussi : fix, floor, round, fract, step, */

// ------------------------------------------------------------------ Vectors xd ----------------------------------------------------------------- //

function fix(M, n=2) {
	if (Array.isArray(M)) { return M.map(v => v.toFixed(n)) }
	else                  { return M.toFixed(n) }
}
function floor(M) {
	if (Array.isArray(M)) { return M.map(v => Math.floor(v)) }
	else 				  { return Math.floor(M) }
}
function round(M) {
	if (Array.isArray(M)) { return M.map(v => Math.round(v)) }
	else 				  { return Math.round(M) }
}
function fract(M) {
	if (Array.isArray(M)) { return M.map(v => v - Math.floor(v) ) }
	else 				  { return M - Math.floor(M) }
}
function step(S, M) {
	function test(v) { return (v < S) ? 0 : 1; }
	if (Array.isArray(M)) { return M.map(test) }
	else 				  { return test(M) }
}

function add(M, N) {
	let R = [];
	for (let k = 0; k < M.length; k++) { R.push( M[k] + N[k] ) }
	return R;
}
function sub(M, N) {
	let R = [];
	for (let k = 0; k < M.length; k++) { R.push( M[k] - N[k] ) }
	return R;
}
function mul(M, N) {
	let R = [];
	for (let k = 0; k < M.length; k++) { R.push( M[k] * N[k] ) }
	return R;
}
function div(M, N) {
	let R = [];
	for (let k = 0; k < M.length; k++) {  R.push( M[k] / N[k] ) }
	return R;
}
function scal(t, M) {
	let R = [];
	for (let k = 0; k < M.length; k++) { R.push( t * M[k] ) }
	return R;
}
function minus(M) {
	let R = []; for (let k = 0; k < M.length; k++) { R.push( - M[k] ) }
	return R;
}
function sign(M) {
	let R = [];
	for (let k = 0; k < M.length; k++) { R.push( Math.sign( M[k] ) ) }
	return R;
}
function abs(M) {
	let R = [];
	for (let k = 0; k < M.length; k++) { R.push( Math.abs( M[k] ) ) }
	return R;
}
function inv(M) {
	let R = [];
	for (let k = 0; k < M.length; k++) { R.push( 1 / M[k] ) }
	return R;
}
function min(M, v) {
	let R = [];
	for (let k = 0; k < M.length; k++) { R.push( Math.min( M[k], v ) ) }
	return R;
}
function max(M, v) {
	let R = [];
	for (let k = 0; k < M.length; k++) { R.push( Math.max( M[k], v ) ) }
	return R;
}
function quo(M, P) {
	let R = [];
	for (let k = 0; k < M.length; k++) { R.push( Math.floor( M[k] / P[k] ) ) }
	return R;
}
function rem(M, P) {
	let R = [];
	for (let k = 0; k < M.length; k++) { R.push( M[k] % P[k] ) }
	return R;
}
function iff(test, yes, not) {
	let R = [];
	for (let k = 0; k < test.length; k++) { R.push( test[k] ? yes[k] : not[k] ) }
	return R;
}
function compare(M, v, inequality, operator='') {
	let R = [], r;
	if (inequality === '<') { for (let k = 0; k < M.length; k++) { R.push( M[k] < v ) } }
	else 			 	    { for (let k = 0; k < M.length; k++) { R.push( M[k] > v ) } }
	if (operator === 'and') {
		r = true;
		for (let k = 0; k < R.length; k++) { r = r && R[k] }
		return r;
	} else if (operator === 'or') {
		r = false;
		for (let k = 0; k < R.length; k++) { r = r || R[k] }
		return r;
	} else { return R }
}
function equal(M, N, operator) {
	let R = [], r;
	for (let k = 0; k < M.length; k++) { R.push( M[k] === N[k] ) }
	if (operator === 'and') {
		r = true;
		for (let k = 0; k < R.length; k++) { r = r && R[k] }
		return r;
	} else if (operator === 'or') {
		r = false;
		for (let k = 0; k < R.length; k++) { r = r || R[k] }
		return r;
	} else { return R }
}

function bar(M, N, t) {
	let R = [];
	for (let k = 0; k < M.length; k++) { R.push( (1-t)*M[k] + t*N[k] ) }
	return R;
}
function mid(M, N) {
	return bar(M,N,1/2)
}
function lin(M, U, t) {
	let R = [];
	for (let k = 0; k < M.length; k++) { R.push( M[k] + t*U[k] ) }
	return R;
}
function norm(U) {
	let r = 0;
	for (let k = 0; k < U.length; k++) { r += U[k]**2 }
	return Math.sqrt(r);
}
function normalize(U) {
	let d = norm(U), n = U.length;
	if ( d!== 0 ) { return scal( 1/d, U ) } else { return list_Repeat(n,0) }
}
function distance(M, N) {
	return norm( sub(M,N) )
}
function dot(U, V) {
	let r = 0;
	for (let k = 0; k < U.length; k++) { r += U[k] * V[k] }
	return r;
}
function cos(U, V) {
	return dot(U,V) / (norm(U) * norm(V));
}
function hom(M, O, lambda) {
	return add(O,scal(lambda,sub(M,O)));
}
function projVect(U, H) {
	let H_ = normalize(H), t = dot(H_,U);
	return scal(t,H_);
}
function projAff(M, H, O=[0,0]) {
	return add(O,projVect(sub(M,O),H));
}
function symVect(U, H) {
	let H_ = normalize(H), t = dot(H_,U);
	return sub(U,scal(2*t,H_));
}
function symAff(M, H, O=[0,0]) {
	return add(O,symVect(sub(M,O),H));
}

// ------------------------------------------------------------------- Vectors 2d ---------------------------------------------------------------- //

function normal2(U) {
	return normalize( [ -U[1] , U[0] ] );
}
function det2(U, V) {
	return U[0]*V[1] - U[1]*V[0];
}
function sin2(U, V) {
	return det2(U,V) / (norm(U)*norm(V));
}
function omega2(t) {
	return [ Math.cos(t) , Math.sin(t) ];
}
function solve2(U, V, W) {
	let delta = det2(U,V);
	return [ det2(W,V)/delta , det2(U,W)/delta ];
}
function rot2(M, O, alpha) {
	return [
		O[0] + (M[0]-O[0])*Math.cos(alpha) - (M[1]-O[1])*Math.sin(alpha),
		O[1] + (M[0]-O[0])*Math.sin(alpha) + (M[1]-O[1])*Math.cos(alpha)
	];
}
function sym2(M, opt='') {
	let N;
	switch(opt) {
		case 'x' : N = [ -M[0] , +M[1] ]; break;
		case 'y' : N = [ +M[0] , -M[1] ]; break;
		case 'o' : N = [ -M[0] , -M[1] ]; break;
		default  : N = [ +M[0] , +M[1] ];
	}
	return N;
}
function circle2(c, r, t) {
	return lin(c,omega2(t),r);
}
function polar2(x, y) {
	let r = Math.sqrt(x**2 + y**2);
	let theta = Math.acos(x/r); if (y < 0) { theta = -theta }
	return [r,theta];
}
function cartesian2(r, theta) {
	let x = r * Math.cos(theta), y = r * Math.sin(theta);
	return [x,y];
}

// ------------------------------------------------------------------- Vectors 3d ---------------------------------------------------------------- //

function cross(U, V) {
	return [U[1]*V[2]-U[2]*V[1], U[2]*V[0]-U[0]*V[2], U[0]*V[1]-U[1]*V[0]];
}
function omega3(t, opt='z') {
	let om;
	switch(opt) {
		case 'z' : om = [ Math.cos(t) , Math.sin(t), 0 ]; break;
		case 'y' : om = [ Math.cos(t) , 0, Math.sin(t) ]; break;
		case 'x' : om = [0,  Math.cos(t) , Math.sin(t) ]; break;
		default: ;
	}
	return om;
}
function spherical(r, theta, phi) {
	return scal( r, [Math.cos(theta) * Math.sin(phi), Math.sin(theta) * Math.sin(phi), Math.cos(phi)] );
}

// --------------------------------------------------------------------- Random ------------------------------------------------------------------ //

function rand_(alpha = 0, beta = 1) { return (beta - alpha) * Math.random() + alpha }
function rand_Int(n) {
	return Math.floor(Math.random() * n);
}
function rand_Range(n1, n2) {
	return n1 + Math.floor(Math.random() * (n2-n1+1));
}
function rand_Sign() {
	return 2*rand_Int(2) - 1;
}
function rand_Float(alpha = 0, beta = 1) { return rand_Sign() * rand_(alpha,beta) }
function rand_Arr(n, m) {
	let ll = list_Sequence(1,n);
	for (let k = 0; k < m; k++) {
		let s = rand_Range(k+1,n); ll = list_Swap(ll,k,s-1);
	}
	ll.splice(m);
	return ll;
}
function rand_Perm(n) {
	return rand_Arr(n,n);
}
function rand_List(list, length=list.length, repeat=false)  {
	let ll = [];
	if (length === 1) {
		ll = list[rand_Int(list.length)];
	} else {
		if (repeat) {
			for (let k = 0; k < length; k++) { ll.push( list[rand_Int(list.length)] ) };
		} else {
			let rr = rand_Arr(list.length,length);
			for (let r of rr) { ll.push( list[r-1] ) };
		}
	}
	return ll;
}

// --------------------------------------------------------------------- Images ------------------------------------------------------------------ //

function getUrl(from, source, size='auto', quality=1) {
	function getUrlFromImg(img, size, quality) {
		let canvas_ = document.createElement( 'canvas' ),
			context_ = canvas_.getContext( '2d' );
		let width, height;
		if (size === 'auto') { width = img.width; height = img.height; } else { width = size.w; height = size.h; }
		canvas_.width = width; canvas_.height = height;
		context_.drawImage(img, 0, 0, width, height);
		let url = canvas_.toDataURL( 'image/jpeg' , quality );
		return url;
	}
	function getUrlFromCan(canvas, quality) {
		let url = canvas.toDataURL( 'image/jpeg', quality );
		return url;
	}

	let url;
	if        (from === 'image')  { url = getUrlFromImg(source,size,quality);
	} else if (from === 'canvas') { url = getUrlFromCan(source,quality);
	}
	console.log(url);
	return url;
}
function saveUrl(from, source, filename, size='auto', quality=1) {
	let url = getUrl(from,source,size,quality);
	localStorage.setItem(filename,url);
}
function drawFromImg(img, to, destination) {
	function drawFromImgToHtml(img, elem=undefined) {
		if (elem === undefined) { body.appendChild(img) } else { elem.src = img.src }
	}
	function drawFromImgToCanvas(img, elem) {
		let context = elem.getContext('2d');
		context.drawImage(img,0,0,img.width,img.height);
	}
	if        (to === 'image' ) { drawFromImgToHtml(img,destination);
	} else if (to === 'canvas') { drawFromImgToCanvas(img,destination);
	}
}

// -------------------------------------------------------------------- Three.js ----------------------------------------------------------------- //

const o3  = new THREE.Vector3(0,0,0);
const ox3 = new THREE.Vector3(1,0,0);
const oy3 = new THREE.Vector3(0,1,0);
const oz3 = new THREE.Vector3(0,0,1);
function three_grav(points, coefficients=list_Repeat(points.length,1/points.length)) {
	let sum = 0; for ( let k = 0; k < coefficients.length; k++ ) { sum += coefficients[k] }

	let grav = new THREE.Vector3(0,0,0);
	for ( let k = 0; k < points.length; k++ ) {
		let point = new THREE.Vector3().copy( points[k] );
		point.multiplyScalar( coefficients[k] );
		grav.add(point);
	}
	grav.multiplyScalar( 1/sum );

	return grav;
}
function three_RgbFromName( name ) { return new THREE.Color( name ).toArray() }

// --------------------------------------------------------------------- Glsl -------------------------------------------------------------------- //

function glsl_color( name ) {
	let rgb = new THREE.Color( name ).toArray();
	rgb = rgb.join();
	return `vec3( ${rgb} )`;
}

// ------------------------------------------------------------- Differential Equations ---------------------------------------------------------- //

function Euler( a, v, xyz, t, dt ) {
	v.add( a( xyz, t - dt ).multiplyScalar(dt) );
	return v.clone().multiplyScalar(dt);
}
function RungeKutta2( a, xyz, t, dt ) {
	let k1 = a( xyz.clone()                              , t        ).multiplyScalar(dt),
		k2 = a( xyz.clone().add( k1.multiplyScalar(1/2) ), t + dt/2 ).multiplyScalar(dt);
	return k2;
}
function RungeKutta4( a, xyz, t, dt ) {
	let k1 = a( xyz.clone()                              , t        ).multiplyScalar(dt),
		k2 = a( xyz.clone().add( k1.multiplyScalar(1/2) ), t + dt/2 ).multiplyScalar(dt),
		k3 = a( xyz.clone().add( k2.multiplyScalar(1/2) ), t + dt/2 ).multiplyScalar(dt),
		k4 = a( xyz.clone().add( k3 )                    , t + dt   ).multiplyScalar(dt);
	let rk4 = k1.add(k4);
		rk4.add( k2.add(k3).multiplyScalar(2) );
		rk4.multiplyScalar(1/6);
	return rk4;
}

/* *********************************************************************************************************************************************** */
/* ********************************************************************* Infos ******************************************************************* */
/* *********************************************************************************************************************************************** */

function info( texte )    { infoArea.innerHTML += '<br>' + texte }
function newInfo( texte ) { infoArea.innerHTML = texte }
function eraseInfo() { infoArea.innerHTML = '' }
function idbInfo( objectStore ) {
	console.log( objectStore.indexNames );
	console.log( objectStore.keyPath );
	console.log( objectStore.name );
	console.log( objectStore.transaction );
	console.log( objectStore.autoIncrement );
}
function listInfo( L, maxloop = Infinity ) {
	if ( !Array.isArray(L) ) { return L }

	let loop = 0, flag = false;
	function last( L, r=0 ) {
		let s = L.length-1-r;
		if ( s >= 0 ) { return L[s] } else { return '' }
	}
	function replace( L, v, r=0 ) {
		let ll = L.slice();
		let s = ll.length - 1 - r; ll[s] = v;
		return ll;
	}

	function depth( L, ind ) {
		let Lind = L.slice();
		for ( let k = 0; k < ind.length; k++ ) {
			if (Lind) { Lind = Lind[ind[k]]} else {return undefined}
		}
		return Lind;
	}
	function up( ll ) {
		let Lll = depth(L, ll);
		return Array.isArray(Lll);
	}
	function down( ll ) {
		let dll = ll.slice(); dll.pop();
		let Ldll = depth(L, dll);
		return ( last(ll) === Ldll.length );
	}
	function stop( ll ) {
		return ( ( (ll.length === 1) && (last(ll) === L.length) ) || (loop > maxloop) );
	}
	function cat( x, y ) {
		if ( y !== null ) { return x + y } else { return x }
	}
	function out( ll, when ) {
		switch(when){
			case 'up'   : return '[' ; break;
			case 'down' : return '],'; break;
			case 'stay' : return depth(L,ll) + ','; break;
			case 'stop' : return ']' ; break;
			default     : return '';
		}
	}

	let nll,when;
	function recursive( ll, what ) {
		loop += 1;
		if        ( stop(ll) ) {                                             when = 'stop'; return cat( what, out(ll ,when) ) }
		if        ( up(ll)   ) { ll.push(0); nll = ll;                       when = 'up'  ; what = cat( what, out(nll,when) );
		} else if ( down(ll) ) { ll.pop();   nll = replace(ll,last(ll) + 1); when = 'down'; what = cat( what, out(nll,when) );
		} else                 {             nll = replace(ll,last(ll) + 1); when = 'stay'; what = cat( what, out(ll ,when) );
		}
		return recursive(nll,what);
	}
	let what = recursive([], '');

	function after( what ) {
		let what_ = what.replaceAll ( ',]' , ']'   );
			what_ = what_.replaceAll( ','  , ' , ' );
			what_ = what_.replaceAll( '[[' , '[ [' ); what_ = what_.replaceAll( '[[' , '[ [' );
			what_ = what_.replaceAll( ']]' , '] ]' ); what_ = what_.replaceAll( ']]' , '] ]' );
		return what_;
	}
	return after( what );
}
function rendererInfo( renderer ) {
	info( 'pixelRatio = ' + renderer.getPixelRatio() );
	let rect = renderer.domElement.getBoundingClientRect(),
		height = rect.bottom - rect.top,
		width = rect.right - rect.left;
	info( 'width = ' + width + ' ; ' + 'height = ' + height)
}

/* *********************************************************************************************************************************************** */
/* ******************************************************************** Texture ****************************************************************** */
/* *********************************************************************************************************************************************** */

{	// nouvelle url
	/*let img = new Image(); img.src = '../images/carre.jpg';
	function onLoad() { saveUrl( 'image', img, 'image' ) }
	img.addEventListener( 'load' , onLoad );*/
}

function getTexture( source, width=3600, height=3600 ) {
	let texture;

	function getTextureFromUrl( url ) {
		let img = new Image(); img.src = url;
		let canvas_  = document.createElement( 'canvas' ),
			context_ = canvas_.getContext( '2d' );
		canvas_.width = width; canvas_.height = height;
		context_.drawImage( img, 0, 0, width, height );
		return new THREE.CanvasTexture( canvas );
	}
	function getTextureFromName( filename ) {
		let loader = new THREE.TextureLoader();
		return loader.load( filename );
	}

	if ( source.substring(0,3) === '../' ) { texture = getTextureFromUrl ( source ) }
	else                   				   { texture = getTextureFromName( source ) }

	return texture;
}
function getTextureFromUrl( url, width=3600, height=3600 ) {
	let img = new Image(); img.src = url;
	let canvas_  = document.createElement( 'canvas' ),
		context_ = canvas_.getContext( '2d' );
	canvas_.width = width; canvas_.height = height;
	context_.drawImage( img, 0, 0, width, height );

	let texture = new THREE.CanvasTexture( canvas_ );
	return texture;
}
function getTextureFromName( filename ) { // fonctionne avec url mais pas orthodoxe
	let loader = new THREE.TextureLoader();

	let texture = loader.load( filename );
	return texture;
}
function setTexture( source ) {
	const loader = new THREE.TextureLoader();
	const texture = loader.load( source );
	texture.minFilter = THREE.NearestFilter;
	texture.magFilter = THREE.NearestFilter;
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;

	return texture;
}

/* *********************************************************************************************************************************************** */
/* ***************************************************************** Environnment **************************************************************** */
/* *********************************************************************************************************************************************** */

// -------------------------------------------------------------------- Display ------------------------------------------------------------------ //

class Display {
	constructor( guisDisplay ) {
		this.disp = guisDisplay;

		this.data = {};
		this.displays = {};
	}

	setData() {
		let {disp} = this;
			// renderer
		let pw, ph;
		if      ( disp.renderer === 'min' ) { pw = Math.min( window.innerWidth, window.innerHeight); ph = pw; }
		else if ( disp.renderer === 'fit' ) { pw = window.innerWidth; ph = window.innerHeight; }

			// camera
		let pos  = Display.Data.camera.pos,
			near = Display.Data.camera.near,
			far  = Display.Data.camera.far,
			fov  = Display.Data.camera.fov,
			a = pw / ph,
			r = norm( pos );

			// colors
		let cols = Display.Data.scene.color;

		this.data = {
			renderer: {
				width : pw,
				height: ph
			},
			scene   : {
				color: cols
			},
			camera  : {
				'2d': { top: 1, bottom: -1, left: -1, right: 1, near: 0, far: 10, pos: pos },
				'3d': { aspect: a, fov: fov, near: near*r, far: far*r, pos: pos },
				'4d': { aspect: a, fov: fov, near: near*r, far: far*r, pos: pos }
			},
			controls: {
				distance: [ near*r, far*r ],
				polar   : [ 0, PI ] },
			lights  : {
				'ambient'    : { pos: [ 0, far*r, 0 ] },
				'directional': { pos: [ [ 0, far*r, far*r ] ] },
				'shadow'     : { pos: [ far*r, far*r, far*r ] }
			},
			fog : {
				color: 'snow',
				near : 5,
				far  : 10
			},
		}
	}
	setRenderer() {
		let {data} = this;
		let renderer = new THREE.WebGLRenderer( {
			  //canvas: oldCanvas,
			  antialias: true,
			  alpha: true,
			  autoClearColor: true,
		} );

		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( data.renderer.width,  data.renderer.height );
		let gl = renderer.getContext();
		    gl.enable(gl.BLEND);
		    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		container.appendChild( renderer.domElement );
		this.displays.renderer = renderer;
	}
	setScene() {
		let {data} = this;
		const color = data.scene.color;
		let scene = new THREE.Scene();
			scene.background = new THREE.Color( color );

		this.displays.scene = scene;
	}
	setCamera() {
		let {disp, data} = this;
		const cameraflag = disp.camera,
			  cameradata = data.camera[cameraflag];
		let camera;

		if ( cameraflag === '2d' ) {
			const top    = cameradata.top,
				  bottom = cameradata.bottom,
				  left   = cameradata.left,
				  right  = cameradata.right,
				  near   = cameradata.near,
				  far    = cameradata.far;
			camera = new THREE.OrthographicCamera( left, right, top, bottom, near, far );
		} else {
			const fov    = cameradata.fov,
				  aspect = cameradata.aspect,
				  near   = cameradata.near,
				  far    = cameradata.far;
			camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
		}
		const pos = cameradata.pos,
		 	  target = [0,0,0];
		camera.position.set( ...pos );
		camera.lookAt( ...target );
		camera.updateProjectionMatrix();

		this.displays.camera = camera;
	}
	setControls() {
		let {data} = this;
		const target = [0,0,0],
			  distance = data.controls.distance,
			  polar = data.controls.polar;

		let controls = new THREE.OrbitControls( this.displays.camera, this.displays.renderer.domElement );
			controls.target.set( ...target );
			controls.minPolarAngle = polar[0];
			controls.maxPolarAngle = polar[1];
			controls.minDistance = distance[0];
			controls.maxDistance = distance[1];
			controls.enableDamping = false;
		controls.update();

		this.displays.controls = controls;
	}
	setLights() {
		let {data} = this;
		const lightflags = Display.Data.lights;
		let lightdata, light;

		if ( lightflags.indexOf('directional') > -1 ) {
			lightdata = data.lights['directional'];
			const color = 'white',
				  intensity = 1,
				  positions = lightdata.pos,
				  target    = [0,0,0];
			for ( let k = 0; k < positions.length; k++ ) {
				const light = new THREE.DirectionalLight( color, intensity );
					light.position.set( ...positions[k] );
					light.target.position.set( ...target );
				this.displays.scene.add(light);
			}
		}
		if ( lightflags.indexOf('ambient') > -1 ) {
			lightdata = data.lights['ambient'];
			const color = 'white',
				  intensity = 1,
				  positions = lightdata.pos,
				  target    = [0,0,0];
			const light = new THREE.AmbientLight(color, intensity);
			this.displays.scene.add(light);
		}
		if ( lightflags.indexOf('shadow') > -1 ) {
			lightdata = data.lights['shadow'];
			const color = 'white',
				  intensity = 1,
				  position = lightdata.pos,
				  target = [0,0,0];
			const resolution = 1024, // résolution de l'ombre
				  near = 0.1,
				  far = 1000,
				  size = 300; // dimension du frustum de la caméra orthographique associée à la lumière
			const light = new THREE.DirectionalLight( color, intensity );
				light.castShadow = true;
				light.position.set( ...position );
				light.target.position.set( ...target );
				light.shadow.mapSize.width  = resolution;
				light.shadow.mapSize.height = resolution;
				light.shadow.camera.left   = -size;
				light.shadow.camera.right  = +size;
				light.shadow.camera.top    = +size;
				light.shadow.camera.bottom = -size;
				light.shadow.camera.near = near;
				light.shadow.camera.far  = far;
			this.displays.scene.add( light );
			this.displays.renderer.shadowMap.enabled = true;
		}

		this.displays.light = light;
	}
	setFog() {
		let {data} = this;
		const flag = Display.Data.fog;
		let fog;

		if ( flag ) {
			const fogdata = data.fog;
			const color = fogdata.color,
				  near  = fogdata.near,
				  far   = fogdata.far;
			this.displays.scene.fog = new THREE.Fog( color, near, far );
		}

		this.displays.fog = fog;
	}
	setStats() {
		let stats = new Stats();
		stats.showPanel(0);
		container.appendChild( stats.dom );

		this.displays.stats = stats;
	}

	set() {
		this.setData();
		this.setRenderer();
		this.setScene();
		this.setCamera();
		this.setControls();
		this.setLights();
		this.setFog();
		this.setStats()
	}
}
Display.Data = {
	camera : { fov: 90, near: 0.1, far: 10, pos: [0,1,1.5] },
	scene  : { color: BACKGROUND },
	lights : ['directional'],
	fog    : false
}

// --------------------------------------------------------------------- Menu -------------------------------------------------------------------- //

function Menu ( guis, flags, uniforms ) {
	this.gui = new dat.GUI( {
		height: 13*32 - 1,
		width : 250
	} );

	{ // Animate Folder
		const animateFolder = this.gui.addFolder( 'Animate' );
		if ( flags.animate ) {
			animateFolder.add( guis.animate, 'fly' )
				.name( 'Flying' )
				.onFinishChange( mainStart );
			animateFolder.add( guis.animate, 'fall' )
				.name( 'Falling' )
				.onFinishChange( mainStart );
			animateFolder.add( guis.animate, 'spin' )
				.name( 'Spinning' )
				.onFinishChange( mainStart );
			animateFolder.add( guis.animate, 'push' )
				.name( 'Pushing' )
				.onFinishChange( mainStart );
		}
		animateFolder.open();
	}
	{ // Time Folder
		const timeFolder = this.gui.addFolder( 'Time' );
		if ( flags.time ) {
			timeFolder.add( guis.time, 'meshSpeed', 0, 5, 0.1 )
				.name( 'Leaf Speed' )
				.onFinishChange( mainStart );
			timeFolder.add( guis.time, 'waterSpeed', 0, 5, 0.1 )
				.name( 'Water Speed' )
				.onFinishChange( mainStart );
			timeFolder.add( guis.time, 'stop' )
				.name( 'Stop' )
				.onFinishChange( mainRender );
		}
		timeFolder.open();
	}
	{ // Mouse Folder
		const mouseFolder = this.gui.addFolder( 'Mouse' );
		if ( flags.mouse ) {
			mouseFolder.add( guis.mouse, 'mesh' )
				.name( 'Mesh Allow' )
				.onFinishChange( mainStart );
		}
		mouseFolder.open();
	}
	{ // Forces Folder
		const forcesFolder = this.gui.addFolder( 'Forces' );
		if ( flags.forces ) {
			forcesFolder.add( guis.forces, 'flydamp', 0.9, 0.999, 0.001 )
				.name( 'Fly Damp' )
				.onFinishChange( mainStart );
			forcesFolder.add( guis.forces, 'flystrength', 10, 100, 5 )
				.name( 'Fly Strength' )
				.onFinishChange( mainStart );
			forcesFolder.add( guis.forces, 'fallspeed', 0.1, 5, 0.1 )
				.name( 'Fall Speed' )
				.onFinishChange( mainStart );
		}
		forcesFolder.open();
	}
	this.gui.close();
}
Menu.Data = {}

// --------------------------------------------------------------------- Mouse ------------------------------------------------------------------- //

function Picking ( displays ) {
	const renderer = displays.renderer,
		  scene    = displays.scene,
		  camera   = displays.camera;
	let pickingTexture = new THREE.WebGLRenderTarget(1,1),
		pixelBuffer = new Uint8Array(4);

	this.pick = function( position ) {
		let pixelRatio = renderer.getPixelRatio();
		gl = renderer.getContext();
		camera.setViewOffset(
			gl.drawingBufferWidth,
			gl.drawingBufferHeight,
			position.x * pixelRatio | 0, position.y * pixelRatio | 0,
			1, 1
		);
		renderer.setRenderTarget( pickingTexture );
		renderer.render( scene, camera );
		renderer.setRenderTarget( null );
		camera.clearViewOffset();
		renderer.readRenderTargetPixels( pickingTexture, 0, 0, 1, 1, pixelBuffer );

		let rgb = pixelBuffer.slice(0,3);
		return rgb;
	}
}
function Mouse ( guis, displays, object3d = undefined ) {
	const mouseOut = guis.mouse.out,
	 	  renderer = displays.renderer;

	this.globalUV = mouseOut;
	this.localUV  = new THREE.Vector2(0,0);
	this.intersection = undefined;
	this.rgb = undefined;
	this.out = true;

	let resolution = renderer.getSize( new THREE.Vector2() );
	const raycaster = new THREE.Raycaster(),
		  picking = new Picking( displays );
	raycaster.params.Points.threshold = 2;

	this.globalPosition = function( css_position ) {
		let mouse = css_position.clone();
			mouse.divide( resolution );
			mouse.x = +2 * mouse.x - 1;
			mouse.y = -2 * mouse.y + 1;
		if ( Mouse.Data.out( mouse ) ) { mouse = mouseOut; this.out = true; } else { this.out = false }
		this.globalUV = mouse;
	}
	this.intersect = function() {
		raycaster.setFromCamera( this.globalUV, displays.camera );
		let new_intersection = raycaster.intersectObject( object3d, true );
		if ( new_intersection.length > 0 ) {
			this.intersection = new_intersection[0];
			if ( guis.hidden.uvs.mouse === 'uv2' ) {
				this.intersection.uv.multiplyScalar(2).sub( new THREE.Vector2(1,1) )
			}
			this.localUV = this.intersection.uv;
		} else {
			this.intersection = undefined;
			this.localUV  = new THREE.Vector2(0,0);
		}
	}
	this.color = function( css_position ) {
		this.rgb = picking.pick( css_position );
	}
	this.handleMouse = function( event ) {
		let rect = renderer.domElement.getBoundingClientRect();
		let css_position = new THREE.Vector2( event.clientX - rect.left, event.clientY - rect.top );

		this.globalPosition( css_position );
		if ( Mouse.Data.picking ) { this.color( css_position ); }
		if ( object3d ) { this.intersect() }
	}
	renderer.domElement.addEventListener( 'mousemove' , this.handleMouse.bind( this ), false );
}
Mouse.Data = {
	picking : false,
	out     : function( mouse ) {
		let margin = 0.2;
		let flag = ( Math.abs( mouse.x ) >= 1 - margin ) || ( Math.abs( mouse.y ) >= 1 - margin );
		return flag;
	}
}

/* *********************************************************************************************************************************************** */
/* ******************************************************************** Material ***************************************************************** */
/* *********************************************************************************************************************************************** */

/* Cas d'un programme intégré.
	Les uniforms ne sont pas admis dans les boucles.
	Il faut définir let Params = { u_l: 20, u_n: 8 }; et remplacer u_l et u_n par `${Params.u_l}` dans fbm et `${Params.u_n}` dans intersect.
*/

// --------------------------------------------------------------------- Shader ------------------------------------------------------------------ //

const MAXPOINTS = 100,
	  MAXDIST = 0.5 * Math.sqrt(2.0);

class Shader {
	constructor( name, guis, uniforms ) {
		this.name = name;
		this.guis = guis;
		this.material = {
			precision : 'mediump',
			defines   : Shader.Defines,
			uniforms  : object_Merge( Shader.Uniforms, uniforms ),
			vertexShader   : '',
			fragmentShader : Shader.Universals.uniforms +
							 Shader.Utilities.constants +
							 Shader.Utilities.tools +
							 Shader.Utilities.geometry2D,
			side : THREE.DoubleSide
		}
	}
	addVertex() {
		let { guis, uniforms, material } = this;
		material.vertexShader += Shader.Vertex[ guis.hidden.display.camera ]
	}
	addFragment( name ) {
		let { guis, uniforms, material } = this;

		switch( name ) {
			case 'shape'  : material.fragmentShader +=
				Shader.ShapeFragment.constants +
				Shader.ShapeFragment.randomize +
				Shader.ShapeFragment.minimize +
				Shader.ShapeFragment.coloring;
				break;
			case 'land'   : material.fragmentShader +=
				Shader.LandFragment.constants +
				Shader.LandFragment.minimize +
				Shader.LandFragment.coloring;
				break;
			default: ;
		}

		material.fragmentShader +=
			Shader.Universals.fragment[guis.hidden.uvs.shader] +
			Shader.Universals.main;
	}
	add() {
		this.addVertex();
		this.addFragment( this.name );
	}
}
Shader.Universals = {
	uniforms : `
		uniform vec2  d_resolution;
		uniform vec3  d_camera;
		uniform float t_delta;
		uniform float t_elapsed;
		uniform vec2  i_mouse;
	`,
	fragment : {
		'uv1_fract' : `
			uniform int u_tiles;
			void fragment( out vec4 fragColor, in vec2 fragCoord ) {
				vec2 uv = fragCoord.xy / d_resolution.xy;
				uv = fract( float(u_tiles) * uv );
				vec4 rgba = coloring( uv );
				fragColor = rgba;
			}`,
		'uv2_fract' : `
			uniform int u_tiles;
			void fragment( out vec4 fragColor, in vec2 fragCoord ) {
				vec2 uv = fragCoord.xy / d_resolution.xy;
				uv = fract( float(u_tiles) * uv );
				uv = 2.0 * uv - 1.0;
				vec4 rgba = coloring( uv );
				fragColor = rgba;
			}`,
		'uv1_full'  : `
			void fragment( out vec4 fragColor, in vec2 fragCoord ) {
				vec2 uv = fragCoord.xy / d_resolution.xy;
				vec4 rgba = coloring( uv );
				fragColor = rgba;
			}`,
		'uv2_full' : `
			void fragment( out vec4 fragColor, in vec2 fragCoord ) {
				vec2 uv = fragCoord.xy / d_resolution.xy;
				uv = 2.0 * uv - 1.0;
				vec4 rgba = coloring( uv );
				fragColor = rgba;
			}`,
		},
	main     : `
		varying vec2 v_uv;

		void main() { fragment( gl_FragColor, v_uv * d_resolution.xy ); }
		//void main() { fragment( gl_FragColor, gl_FragCoord.xy ); }
		`
}
Shader.Utilities =  {
	constants  : `
		const float PI2 = 2.0 * PI;
		const float PI12 = PI / 2.0;
			// colors
		const vec3 red   = vec3( 255.0, 0.0, 0.0 ) / 255.0;
		const vec3 green = vec3( 0.0, 255.0, 0.0 ) / 255.0;
		const vec3 blue  = vec3( 0.0, 0.0, 255.0 ) / 255.0;
		const vec3 cyan    = blue + green;
		const vec3 yellow  = red + green;
		const vec3 magenta = red + blue;
		const vec3 black = vec3( 0.0 );
		const vec3 white = vec3( 1.0 );
		const vec3 background = ${glsl_color(BACKGROUND)};
	` ,
	tools      : `
		// smoothstep
		float smoothPlot( float uvz, float uvf, float curveSlim ) {
			float d = curveSlim / min( d_resolution.x, d_resolution.y );
		    return  smoothstep( uvf - d, uvf, uvz ) - smoothstep( uvf, uvf + d, uvz );
		}

		// numbers
		float parity( float x ) { return floor( mod( x, 2.0 ) ); }
		float max3( vec3 d ) { return  max( d.x, max( d.y, d.z ) ); }
		float min3( vec3 d ) { return  min( d.x, min( d.y, d.z ) ); }
		vec3 sort( vec3 d ) { return step( d.yzx, d.xyz ) * step( d.zxy, d.xyz ); }

		// random
		const float RAND_ff = 43758.5453123;
		const vec2  RAND_vf = vec2( 12.9898, 78.233 );
		const mat2  RAND_vv  = mat2( vec2( 127.1, 311.7 ), vec2( 269.5, 183.3 ) );

		float randSign( float x ) { return 2.0 * parity( x * RAND_ff ) - 1.0; }
		float rand ( float x ) { return fract( sin( x ) * RAND_ff ); }
		float rand ( vec2 uv ) { return fract( sin( dot( uv, RAND_vf ) ) * RAND_ff ); }
		vec2 rand2( vec2 uv ){
		    uv = vec2( dot( uv, RAND_vv[0] ), dot( uv, RAND_vv[1] ) );
		    return fract( sin( uv ) * RAND_ff );
		}
		vec3 rand3( vec2 uv, vec3 offset ) {
			return vec3( rand( uv + offset[0] ), rand( uv + offset[1] ), rand( uv + offset[2] ) );
		}

		// functions
		float power( float x, int n ) {
			const int nmax = 100;

			if ( x == 0.0 && n > 0 ) { return 0.0; }

			float xn = 1.0;
			if ( n > 0 ) {
				for( int k = 0; k < nmax; k++ ) { xn *= x; if ( k >= n  ) { break; } }
			}
			else if ( n < 0) {
				for( int k = 0; k < nmax; k++ ) { xn *= x; if ( k >= -n ) { break; } }
			 	xn = 1.0 / xn;
			}
			return xn;
		}

		// factorial, binomial
		int factorial( int n ) {
			const int nmax = 100; int f;

			if ( n <= 1 ) 	   { f = 1; }
			else if ( n == 2 ) { f = 2; }
			else { f = 1; for( int i = 1; i < nmax; i++ ) { f *= i; if ( i >= n ) { break; } } }

			return f;
		}
		int binomial( int n, int p ) {
			return factorial(n) / ( factorial(p) * factorial(n-p) );
		}

		// bernstein
		float bernstein( int n, int p, float t ) {
			return float( binomial( n, p ) ) * pow( t, float(p) ) * pow( 1.0 - t, float(n-p) );
		}
		float bernsteinDerivative( int n, int p, float t ) {
			return float( binomial( n, p ) ) * ( float(p) - float(n)*t ) * pow( 0.0 + t, float(p-1) ) * pow( 1.0 - t, float(n-p-1) );
		}
	` ,
	colors     : `
		vec3 rgb2hsb( in vec3 c ){
		    vec4 K = vec4( 0.0, -1.0/3.0, 2.0/3.0, -1.0 );
		    vec4 p = mix( vec4( c.bg, K.wz ),
		                  vec4( c.gb, K.xy ),
		                  step( c.b , c.g  ) );
		    vec4 q = mix( vec4( p.xyw, c.r  ),
		                  vec4( c.r  , p.yzx),
		                  step( p.x  , c.r  ) );
		    float d = q.x - min( q.w, q.y );
		    float e = 1.0e-10;
		    return vec3( abs(q.z + (q.w - q.y) / (6.0*d + e) ),
		                d / (q.x + e),
		                q.x );
		}
		vec3 hsb2rgb( in vec3 c ){
		    vec3 rgb = clamp( abs( mod( c.x*6.0 + vec3( 0.0, 4.0, 2.0 ), 6.0 )-3.0 ) - 1.0,
		                     0.0,
		                     1.0 );
		    rgb = rgb * rgb * ( 3.0 - 2.0*rgb );
		    return c.z * mix( vec3( 1.0 ), rgb, c.y);
		}
		vec3 hsv2rgb( vec3 c ) {
			float t = mod( floor( c.x / 60.0 ), 6.0 );
			float f = c.x / 60.0 - t;
			float l = c.z * (1.0 - c.y);
			float m = c.z * (1.0 - f*c.y);
			float n = c.z * (1.0 - (1.0-f)*c.y);

			int r = int( mod(t, 2.0) );
			int i,j,k; vec3 rgb;
			if ( r == 0 ) {
				i = int(mod( t, 3.0 )); j = int(mod( t+1.0, 3.0 )); k = int(mod( t+2.0, 3.0 ));
				rgb = vec3( c.z, n, l );
			} else {
				i = int(mod( t-1.0, 3.0 )); j = int(mod( t, 3.0 )); k = int(mod( t+1.0, 3.0 ));
				rgb = vec3( m, c.z, l);
			}

			return vec3( rgb[i], rgb[j], rgb[k] );
		}
		vec3 bezierColor( int n, float t, vec3 col1, vec3 col2 ) {
				const int nmax = 100; vec3 col = vec3( 0.0 );
				for( int i = 0; i <= nmax; i++ ) {
					float s = float(i) / float(n);
					vec3 coli = mix( col1, col2, s );
					col += bernstein( n, i, t ) * coli;
					if ( i >= n ) { break; }
				}
				return col;
		}
	`,
	geometry2D : `
		const vec2 o2  = vec2( 0.0, 0.0 );
		const vec2 ox2 = vec2( 1.0, 0.0 );
		const vec2 oy2 = vec2( 0.0, 1.0 );

		vec2 polar( float r, float theta ) {
			return r * vec2( cos(theta), sin(theta) );
		}
		vec2 omega2( float t ) {
			return vec2( cos(t), sin(t) );
		}

		mat2 rot( float a ) {
			return mat2( vec2( cos(a), sin(a) ), vec2( -sin(a), cos(a) ) );
		}
		float p_norm( vec2 u, float p ) {
			return pow( pow( abs( u.x ), p ) + pow( abs( u.y ), p ), 1.0 / p );
		}
		float p_dist( vec2 a, vec2 b, float p ) {
			return p_norm( a - b, p );
		}
		float i_norm( vec2 u ) {
			return max( abs( u.x ), abs( u.y ) );
		}
		float i_dist( vec2 a, vec2 b ) {
			return i_norm( a - b );
		}
		float cosFromVect( vec2 u, vec2 v ) {
			return dot( normalize(u), normalize(v) );
		}
		float cosFromPoints( vec2 c, vec2 a, vec2 b ) {
			return cosFromVect( a - c, b - c );
		}

		vec2 projectionP( vec2 n, vec2 w ) {
			return dot( w, n ) * n;
		}
		vec2 projectionQ( vec2 n, vec2 w ) {
			return w - dot( w, n ) * n;
		}
	` ,
	geometry3D : `
		const vec3 o3  = vec3( 0.0, 0.0, 0.0 );
		const vec3 ox3 = vec3( 1.0, 0.0, 0.0 );
		const vec3 oy3 = vec3( 0.0, 1.0, 0.0 );
		const vec3 oz3 = vec3( 0.0, 0.0, 1.0 );

		vec3 cylindrical( float r, float theta, float z ) {
			return r * vec3( cos(theta), sin(theta), 0.0 ) + z * vec3( 0.0, 0.0, 1.0 );
		}
		vec3 spherical( float r, float theta, float phi ) {
			return r * vec3( cos(theta) * sin(phi), sin(theta) * sin(phi), cos(phi) );
		}
		vec3 omega3( float t ) {
			return vec3( cos(t), sin(t), 0.0 );
		}

		mat3 rot_x( float a ) {
			return mat3( vec3( 1.0, 0.0, 0.0 ), vec3( cos(a), sin(a), 0.0 ), vec3( -sin(a), cos(a), 0.0 ) );
		}
		mat3 rot_y( float a ) {
			return mat3( vec3( cos(a), sin(a), 0.0 ), vec3( 0.0, 1.0, 0.0 ) , vec3( -sin(a), cos(a), 0.0 ) );
		}
		mat3 rot_z( float a ) {
			return mat3( vec3( cos(a), sin(a), 0.0 ), vec3( -sin(a), cos(a), 0.0 ), vec3( 0.0, 0.0, 1.0 ) );
		}
		float p_norm( vec3 u, float p ) {
			return pow( pow( abs( u.x ), p ) + pow( abs( u.y ), p ) + pow( abs( u.z ), p ), 1.0 / p );
		}
		float p_dist( vec3 a, vec3 b, float p ) {
			return p_norm( a - b, p );
		}
		float i_norm( vec3 u ) {
			return max( abs( u.x ), max( abs( u.y ), abs( u.z ) ) );
		}
		float i_dist( vec3 a, vec3 b ) {
			return i_norm( a - b );
		}
		float cosFromVect( vec3 u, vec3 v ) {
			return dot( normalize(u), normalize(v) );
		}
		float cosFromPoints( vec3 o, vec3 a, vec3 b ) {
			return cosFromVect( a - o, b - o );
		}

		vec3 projectionP( vec3 n, vec3 w ) {
			return dot( w, n ) * n;
		}
		vec3 projectionQ( vec3 n, vec3 w ) {
			return w - dot( w, n ) * n;
		}
		vec3 projectionC_plane( vec3 o, vec3 a, vec3 n, vec3 m ) {
			float t = dot( n, a - o ) / dot( n, m - o );
			return o + t * (m-o);
		}
		vec3 projectionC_sphere( vec3 o, vec3 sc, float sr, vec3 m ) {
			float t = float(INFINITY);

			float cos = cosFromPoints( o, sc, m ); float sin = sqrt(1.0 - cos*cos);
			vec3  oc = sc - o;
			float r = length( oc ), d = r * sin;
			if( d <= sr ) { t = r*cos - sqrt( sr*sr - r*r*sin*sin ); }

			if ( t > float(INFINITY) - 1.0 ) { return vec3( float(INFINITY) ); }
			else { return o + t * normalize(m-o); }
		}
	` ,
}
Shader.Defines = {
	PI  : PI,
	INFINITY : 10000.0,
}
Shader.Uniforms = {
	d_resolution : { value: [window.innerWidth, window.innerHeight] },
	d_camera     : { value: new THREE.Vector3(0,0,0) },
	d_numpoints  : { value: 30 },
	t_delta  	 : { value: 0 },
	t_elapsed    : { value: 0 },
	i_mouse 	 : { value: [0,0] },
	u_tiles      : { value: 1 },
}
Shader.Vertex = {
	'2d' : `
		varying vec2 v_uv;
		void main() {
		    v_uv = uv;
			gl_Position = vec4( position, 1.0 );
		}
	`,
	'3d' : `
		varying vec2 v_uv;
		void main() {
			v_uv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}
	`,
	'4d' : `
		uniform vec2 uvScale;
		varying vec2 v_uv;
		void main() {
			v_uv = uvScale * uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}
	`
}
Shader.ShapeFragment = {
	constants : `
		const float MAXDIST   = ${MAXDIST};
		const int   MAXPOINTS = ${MAXPOINTS};
		const vec3  SCREENCOL = ${glsl_color(BACKGROUND)};
		//const int d_numpoints = ${ Shader.Uniforms.d_numpoints.value };
	`,
	randomize : `
		uniform int d_numpoints; uniform vec2 u_points[MAXPOINTS + 2];
		vec2 points[MAXPOINTS + 2];
		void randomize() {
			for ( int i = 1; i <= d_numpoints; i++ ) {
				points[i] = u_points[i] + 0.1 * omega2( t_elapsed );
			}
			points[0] = points[1]; points[d_numpoints + 1] = points[d_numpoints];
		}
	`,
	minimize  : `
		float minimize( vec2 uv ) {
			randomize();
			float mind = float(INFINITY);

			for ( int i = 1; i <= d_numpoints; i++ ) {
				vec2 c = points[i-1], a = points[i], b = points[i+1];
				vec2 ac = c - a, ab = b - a, cm = uv - c, am = uv - a;
				float l_ab = length( ab ), d_amab = dot( am, ab ), d_amac = dot( am, ac );

				if ( l_ab > 0.0 ) {
					vec2 pam = projectionP( normalize(ab), am );
					float l_pam = length( pam );
					bool flag1 = ( d_amab >= 0.0 && l_pam <= l_ab );
					bool flag2 = ( d_amab < 0.0 && d_amac < 0.0 );
					if ( flag2 ) { pam = vec2( 0.0 ); }
					if ( flag1 || flag2 ) {
						float d = length( am - pam );
						if ( d < mind ) { mind = d; }
					}
				}
			}

			return mind;
		}`,
	coloring : `
		uniform vec3 u_innercol; uniform vec3 u_outercol; uniform float u_opacity;

		vec4 coloring( vec2 uv ) {
			float d = minimize( uv );
			d = clamp( d / MAXDIST, 0.0, 1.0 );
			vec3 rgb = mix( u_outercol, u_innercol, d );

			return vec4( rgb, 1.0 );
		} `,
}
Shader.LandFragment = {
	constants : `
		const float MAXDIST   = ${MAXDIST};
		const int   MAXPOINTS = ${MAXPOINTS};
		const vec3  SCREENCOL = ${glsl_color(BACKGROUND)};
	`,
	minimize  : `
		float minimize( vec2 uv ) {
			vec2 u0 = vec2( uv.x, 0 ), u1 = vec2( uv.x, 1 );
			vec2 v0 = vec2( 0, uv.y ), v1 = vec2( 1, uv.y );
			float du0 = length( uv - u0 ), du1 = length( uv - u1 ),
				  dv0 = length( uv - v0 ), dv1 = length( uv - v1 );
			float d = min( du0, du1 );
			d = min( d, dv0 ); d = min( d, dv1 );

			return d;
		}`,
	coloring : `
		uniform vec3 u_innercol; uniform vec3 u_outercol; uniform float u_opacity;

		vec4 coloring( vec2 uv ) {
			float d = minimize( uv );
			d = clamp( d / MAXDIST, 0.0, 1.0 );
			vec3 rgb = mix( u_outercol, u_innercol, d );

			return vec4( rgb, u_opacity );
		} `,
}

// --------------------------------------------------------------------- Material ---------------------------------------------------------------- //

function Material( name, guis, uniforms ) {
	let material;
	let shader = new Shader( name, guis, uniforms ); shader.add();
	material = new THREE.ShaderMaterial( shader.material );
	return material;
}

/* *********************************************************************************************************************************************** */
/* ****************************************************************** Lanscape ******************************************************************* */
/* *********************************************************************************************************************************************** */

function Water( guis, material ) {
	const uniforms = Object.freeze( Water.Data.uniforms ),
		  sl = Water.Data.slices,
		  st = Water.Data.stacks;
	function uv( ind ) {
		let n = sl + 1, i = ind % n, j = Math.floor( ind / n );
		return [ i / sl, j / st ];
	}
	function wave( t ) { return Water.Function.wave2( t * guis.time.waterSpeed ) };

	this.sl = sl;
	this.st = st;
	this.mesh     = undefined;
	this.newpositions = [];
	this.oldpositions = [];
	this.newnormals   = [];
	this.oldnormals   = [];

	this.setMesh = function() {
		// positions
		for ( let j = 0; j <= st; j++ ) {
			for ( let i = 0; i <= sl; i++ ) {
				let u = i / sl, v = j / st;
				let position = new THREE.Vector3(); wave(0)( u, v, position );
				this.oldpositions.push( position ); this.newpositions.push( position );
			}
		}

		// mesh
		const geometry = new THREE.ParametricBufferGeometry( wave(0), sl, st );
		const material_ = material.clone(); material_.uniforms = object_Merge( material.uniforms, uniforms );
		this.mesh = new THREE.Mesh( geometry, material_ ); this.mesh.name = 'water';

		// normals
		geometry.computeVertexNormals(); geometry.normalizeNormals();
		this.newnormals = geometry.getAttribute( 'normal' );
		this.oldnormals = geometry.getAttribute( 'normal' );
	}
	this.update = function( t ) {
		// positions
		for ( let ind = 0; ind < this.newpositions.length; ind++ ) {
			this.oldpositions[ind].copy( this.newpositions[ind] );
			let position = new THREE.Vector3(); wave( t )( ...uv(ind), position );
			this.newpositions[ind] = position;
			this.mesh.geometry.attributes.position.setXYZ( ind, ...position.toArray() );
		}
		this.mesh.geometry.attributes.position.needsUpdate = true;
		// normals
		this.mesh.geometry.computeVertexNormals(); this.mesh.geometry.normalizeNormals();
		this.oldnormals = this.newnormals.clone();
		this.newnormals = this.mesh.geometry.getAttribute( 'normal' );
	}
	this.setMesh();
}
Water.Data = {
	radius     : 1,
	bottom     : -0.02,
	top        : 0,
	slices     : 100,
	stacks     : 100,
	pulsation  : 1,
	uniforms   : {
		u_innercol : { value: new THREE.Color( 'blue' ) },
		u_outercol : { value: new THREE.Color( 'darkturquoise' ) },
		u_opacity  : { value: 0.5 }
	}
}
Water.Function = {
	plane : function( t ) {
		return function( u, v, target ) {
			let u_ = 2*u - 1, v_ = 1 - 2*v;
			target.set( u_, 0, v_ );
		}
	},
	wave1 : function( t ) {
		const omega = Water.Data.pulsation,
			  b = Water.Data.bottom,
			  h = Water.Data.top - Water.Data.bottom,
			  r0 = Water.Data.radius;
		return function( u, v, target ) {
					let u_ = ( 2*u - 1 ) * r0, v_ = ( 1 - 2*v ) * r0,
						f = 2*PI * omega * ( 1 + Math.sin( t ) ),
						r = Math.sqrt( u_*u_ + v_*v_ ),
						y = ( r < 1 ) ? h * Math.sin( f * r ): b;
					target.set( u_, y, v_ );
				}
	},
	wave2 : function( t ) {
		const omega = Water.Data.pulsation,
			  b = Water.Data.bottom,
			  h = Water.Data.top - Water.Data.bottom,
			  r0 = Water.Data.radius;
		return function( u, v, target ) {
					let u_ = ( 2*u - 1 ) * r0, v_ = ( 1 - 2*v ) * r0,
						f = 2*PI * omega * ( 1 + Math.sin( t ) ),
						r = Math.sqrt( u_*u_ + v_*v_ ),
						y = ( r < 1 ) ? h * ( Math.sin( f * u_ ) + Math.sin( f * v_ ) ): b;
					target.set( u_, y, v_ );
				}
	}
}

function Border( guis, material, radius ) {
	const uniforms = Object.freeze( Border.Data.uniforms ),
		  radsegs  = Border.Data.radialsegments,
		  tubsegs  = Border.Data.tubularsegments,
		  radrat   = Border.Data.radiusratio;
	this.mesh = undefined;

	this.setMesh = function() {
		const geometry =  new THREE.TorusGeometry( radius * (1 + radrat), radius * radrat, radsegs, tubsegs );
		  	geometry.rotateX( PI/2 );
		  	geometry.translate( 0, 0, 0 );
		const material_ = material.clone();
		material_.uniforms = object_Merge( material.uniforms, uniforms );
		this.mesh = new THREE.Mesh( geometry, material_ ); this.mesh.name = 'border';
	}
	this.setMesh();
}
Border.Data = {
	radialsegments  : 20,
	tubularsegments : 50,
	radiusratio 	: 1/20,
	uniforms        : {
		u_innercol : { value: new THREE.Color( 'lemonchiffon' ) },
		u_outercol : { value: new THREE.Color( 'sienna' ) },
		u_opacity  : { value: 1 }
	}
}

function Bank( guis, material, radius ) {
	const uniforms  = Object.freeze( Bank.Data.uniforms ),
		  phisegs   = Bank.Data.phisegments,
		  thetasegs = Bank.Data.thetasegments,
		  radrat    = Bank.Data.radiusratio;
	this.mesh = undefined;

	this.setMesh = function() {
		const geometry = new THREE.RingGeometry( radius, radrat * radius, thetasegs, phisegs );
		  	geometry.rotateX( PI/2 );
		  	geometry.translate( 0, 0, 0 );
		const material_ = material.clone();
		material_.uniforms = object_Merge( material.uniforms, uniforms );
		this.mesh = new THREE.Mesh( geometry, material_ ); this.mesh.name = 'bank';
	}
	this.setMesh();
}
Bank.Data = {
	phisegments   : 50,
	thetasegments : 50,
	radiusratio   : 3,
	uniforms   : {
		u_innercol : { value: new THREE.Color( 'sienna' ) },
		u_outercol : { value: new THREE.Color( BACKGROUND ) },
		u_opacity  : { value: 1 }
	}
}

function Landscape( guis ) {
	this.water  = undefined;
	this.bank   = undefined;
	this.border = undefined;

	const material = Material( 'land', guis, {} );
	this.create = function() {
		this.water  = new Water ( guis, material );
		this.border = new Border( guis, material, Water.Data.radius );
		this.bank   = new Bank  ( guis, material, Water.Data.radius );

	}
	this.refresh = function( scene ) {
		scene.add( this.water.mesh ); scene.add( this.bank.mesh ); scene.add( this.border.mesh );
	}
	this.clean = function( scene ) {
		if ( this.water ) {
			scene.remove( this.water.mesh );
			this.water.mesh.geometry.dispose() ;
			this.water.mesh.material.dispose();
		}
		if ( this.bank ) {
			scene.remove( this.bank.mesh ) ;
			this.bank.mesh.geometry.dispose();
			this.bank.mesh.material.dispose();
		}
		if (this. border ) {
			scene.remove( this.border.mesh );
			this.border.mesh.geometry.dispose();
			this.border.mesh.material.dispose();
		}
	}

	this.create();
}

/* *********************************************************************************************************************************************** */
/* ********************************************************************* Leaves ****************************************************************** */
/* *********************************************************************************************************************************************** */

function omega( t ) { return new THREE.Vector3( ...omega3( t, 'y' ) ) }
function rho( xyz ) { return Math.sqrt( xyz.x ** 2 + xyz.z ** 2 ) }

// --------------------------------------------------------------------- Shapes -----------------------------------------------****--------------- //

/* Taille :
	Initialement:
	- 'box = geometry.boundingBox' donne le rectangle délimiteur calculé en fonction des coordonnées de 'DATA[id].shapeline', mais recentré : soit
		un rectangle délimité par 'min = (-a,-b,-c)' et 'max= (a,b,c)' : la taille 'size' vaut donc (2a,2b,2c).
	- 'geometry.scale(...)' n'est pas utilisé :le paramètre 'scale' de geometry vaut probablement 'size'.
	- 'mesh.scale' vaut (1,1,1) et les formes sont rendues avec leur taille 'size'.

	Si on normalise le 'scale' de 'geometry' via 'geometry.scale( 1/size.x, 1/size.y, 1/size.z )' les valeurs de box.min et 'box.max' sont désormais
		normalisées à (-0.5, -0.5, 0) et (0.5,0.5,0) et les formes sont rendues avec leur nouvelle taille 'size' égale à (1,1,0).
		Que l'on normalise ou pas le 'mesh.scale' vaut toujours (1,1,1) : il ne sera modifié que si on le modifie par 'mesh.scale = ...'.
	Si au lieu de modifier le 'scale' de 'geometry' on modifie directement 'mesh.scale' par 'mesh.scale.set( 1/size.x, 1/size.y, 1/size.z )' les
		valeurs de box.min et 'box.max' ne sont plus normalisées comme précédemment mais restent à leur valeur initiale. Les formes sont rendues
		avec une taille difficile à interpréter : peut-être la valeur 'mesh.scale' donne-t-elle la taille des formes.
		Si on recalcule alors 'box = geometry.boundingBox' on obtient toujours les valeurs initiales de 'box', donc un 'size' initial.
	Enfin si on modifie les deux on a une redondance des effets.

*/

function Shape( data, guis ) {
	const segments = Shape.Data.segments;

	this.curve    = undefined;
	this.points   = undefined;
	this.uniforms = undefined;
	this.mesh     = undefined;

	this.setCurve = function() {
		const shapeline = data.shapeline, holeline  = data.holeline, shapeproc = data.shapeproc;
		const n = guis.hidden.display.points - 1;

		this.curve = Shape.Functions[shapeproc]( shapeline ) ;
		if ( holeline.length > 0 ) {
			let hole = new THREE.Path();
			hole.absarc( ...holeline[0], norm(sub( holeline[1], holeline[0] )), 0, 2*PI );
			this.curve.holes.push( hole );
		}

		this.points = this.curve.getSpacedPoints( n );
	}
	this.setUniforms = function() {
			let points = this.points.slice(), n = points.length;
			points.unshift( points[0] ); points.push( points[n-1] )

			n = MAXPOINTS - n;
			for (let k = 0; k < n; k++ ) { points.push( new THREE.Vector3(0,0,0) ) }
			this.uniforms = {
				u_innercol : { value: new THREE.Color( data.innercol ) },
				u_outercol : { value: new THREE.Color( data.outercol ) },
				u_points   : { value: points }
			}
	}
	this.setMesh = function() {
		let geometry = new THREE.ShapeGeometry( this.curve, segments );
			geometry.center();
			geometry.computeBoundingBox();
			let box = geometry.boundingBox,
				size = new THREE.Vector3().subVectors( box.max, box.min );
			if ( size.z === 0 ) { size.z = 1 }
			let scale = new THREE.Vector3(1,1,1).divide( size );
			geometry.scale( ...scale.toArray() );
		const material = Material( 'shape', guis, this.uniforms );
		this.mesh = new THREE.Mesh( geometry, material );
		//this.mesh.scale.set( ...scale.toArray() );
	}

	this.setCurve();
	this.setUniforms();
	this.setMesh();
}
Shape.Functions = {
	line      : function( points ) {
		let shape = new THREE.Shape();
		shape.moveTo( ...points[0] );
		for (let k = 1; k < points.length; k++) { shape.lineTo(...points[k]) }
		return shape;
	},
	quadratic : function( points ) {
		let shape = new THREE.Shape();
		shape.moveTo( ...points[0] );
		for (let k = 1; k < points.length-1; k+=2) { shape.quadraticCurveTo(...points[k],...points[k+1]) }
		return shape;
	},
	bezier    : function( points ) {
		let shape = new THREE.Shape();
		shape.moveTo( ...points[0] );
		for (let k = 1; k < points.length-2; k+=3) { shape.bezierCurveTo(...points[k],...points[k+1],...points[k+2]) }
		return shape;
	},
	spline    : function( points ) {
		let shape = new THREE.Shape();
		shape.moveTo( ...points[0] );
		let pp = []; for (let p of points) { pp.push( new THREE.Vector2(...p) ) }
		shape.splineThru(pp);
		return shape;
	},
	arc       : function( points, anglerange ) {
		let shape = new THREE.Shape();
		shape.absarc( ...points[0], norm(sub( points[1], points[0])), ...anglerange );
		return shape;
	},
}
Shape.Data = {
	segments: 12,
}

const DATA  	= {
	'1' : {
		shapeline : [ [ 0.0, 0.0],[ 0.0,-0.4],[-1.8,-0.4],[-2.2,-0.4],[-2.5,-0.9],[-2.7,-1.2],[-3.0,-1.2],
					  [-3.5,-1.2],[-3.5,-0.3],[-3.5,+1.7],[-2.5,+1.7],[-2.0,+1.7],[-1.0,+1.1],[ 0.0,+0.5],[0,0] ],
		holeline  : [ [-2.3,+0.5],[-2.3,+0.8] ],
		innercol  : 'purple',
		outercol  : 'thistle',
		shapeproc : 'quadratic',
		},
	'2' : {
		shapeline : [ [0,0],[-4,-2],[-2,-4],[-2.5,-6],[-1,-4],[-1.5,-2],[0,0] ],
		holeline  : [],
		innercol  : 'goldenrod',
		outercol  : 'lemonchiffon',
		shapeproc : 'bezier',
	},
	'3' : {
		shapeline : [ [0,0],[-2,-1],[-1,-3],[-2.5,-4],[1,-4],[-0.5,-0.5],[0,0] ],
		holeline  : [],
		innercol  : 'darkgreen',
		outercol  : 'olive',
		shapeproc : 'bezier',
	},
	'4' : {
		shapeline : [ [0,0],[0,+0.8],[+1.0,+0.8],[+3.0,+0.8],[+3.0,0],[+3.0,-0.3],
					  [+2.5,-0.6],[+2,-0.8],[+1.6,-1.3],[1.2,-2],[+1.0,-2.0],[0,-2.0],[0,0] ],
		holeline  : [],
		innercol  : 'black',
		outercol  : 'dimgray',
		shapeproc : 'quadratic',
		},
	'5' : {
		shapeline : [ [0,0],[-2,-1],[0,-3],[2,-1],[0,0] ],
		holeline  : [],
		holeline  : [],
		innercol  : 'turquoise',
		outercol  : 'blue',
		shapeproc : 'quadratic',
		},
	'6' : {
		shapeline : [ [0,0],[-1.5,-1],[0,-3],[-0.5,-3.5],[+1,-3],[+1.5,-1],[0,0] ],
		holeline  : [],
		innercol  : 'darkred',
		outercol  : 'indianred',
		shapeproc : 'bezier',
		},
}

// ---------------------------------------------------------------------- Leaf ------------------------------------------------------------------- //

/* Forces
	La structure Leaf.Forces définit les forces en jeu : intensité et direction.
	Les procédures this.flying / this.falling / this.spinning / this.pushing utilisent les forces ci-dessus pour définir les mouvements ad-hoc :
		- par intégration de type Runge Kutta de la force fly pour this.flying.
		- par intégration de type Euler de la force fall pour this.falling.
		- par la force composite spin = lambda * fly + fall appliquée à la normale de la feuille pour this.spinning : l'angle
		  force / normale est multiplié par l'intensité de cette force et par le delta dt.
		- par la force push appliquée directement à la feuille et multipliée par le delta dt.
		Les déplacements dm causé par les forces fly et fall sont affectés d'un coefficient d'amortissement fixe ou variable xxxdamp.
	La procédure this.update intègre toutes les précédentes et gère d'autres ajustements :
		- décalage temporel spécifique pour démarrer le mouvement ( paramètre xxxdata.shift );
		  concerne les procédures this.flying et this.falling.
		- contraintes spatiales locales pour démarrer ou entretenir le mouvement : que la feuille soit détachée de la particulle d'eau
		  à laquelle elle est initialement attachée ( paramètre released ) et qu'elle soit au-dessus de la surface ( condition xyz.y > 0 );
		  concerne la procédure this.spinning.
		- contraintes spatiales globales : chaque feuille doit rester dans le cylindre r < Water.Data.radius et falldata.bottom < y falldata.top :
		  le paramètre falldata.bottom est spécifique;
*/

function Leaf( guis, drops, shape, idn ) {
	const sl 	   = Water.Data.slices,
		  st 	   = Water.Data.stacks,
		  radius   = Water.Data.radius,
		  level    = Water.Data.top,
		  range    = Leaf.Data.range,
		  released = Leaf.Data.released;
	const flydata  = Leaf.Data.fly(),
		  falldata = Leaf.Data.fall(),
  		  spindata = Leaf.Data.spin(),
  		  pushdata = Leaf.Data.push();
	const fly  = ( xyz, t ) => Leaf.Forces.fly ( xyz, t, flydata ),
		  fall = ( xyz, t ) => Leaf.Forces.fall( xyz, t, falldata ),
		  spin = ( xyz, t ) => Leaf.Forces.spin( xyz, t, spindata, {fly: fly, fall: fall } ),
		  push = ( xyz, t, raydata ) => Leaf.Forces.push( xyz, t, pushdata, raydata );
	let flydamp  = 1,
		falldamp = xyz => (xyz.y + falldata.step) / falldata.top,
		spindamp = spindata.damp,
	 	pushdamp = pushdata.damp,
		speed    = new THREE.Vector3( 0, guis.forces.fallspeed * falldata.speed, 0 ),
		timehigh = speed.y / falldata.gravity,
		strength = guis.forces.flystrength;
	let dist = 0,
		mass = undefined;

	this.mesh     = shape.mesh.clone();
	this.scale    = this.mesh.scale.clone();
	this.position = new THREE.Vector3(0,0,0);
	this.normal   = new THREE.Vector3(0,0,1);

	/*  Info :
		integration of the flying acceleration ( = wind ); the theorical horizontal displacement dm is affected by the mass inertia;
		there is a cumulated damp factor if leaf reaches water, which affects the displacement dm.
	*/
	this.flying    = function( xyz, t, dt ) {
		let dm = RungeKutta4( fly, xyz, t, dt ); dm.multiplyScalar( strength /mass );
		if ( xyz.y <= level ) { dm.multiplyScalar( flydamp ); flydamp *= guis.forces.flydamp; }
		xyz.add( dm );
	}
	/* Info :
		integration of the falling acceleration ( = gravity ); the theorical vertical displacement dm is affected by the mass inertia;
		there is a damp factor from the beginning, which affects the speed : thus it is cumulated in
	*/
	this.falling   = function( xyz, t, dt ) {
		let dm = Euler( fall, speed, xyz, t, dt ); dm.multiplyScalar( mass );
		if ( t > timehigh ) { dm.multiplyScalar( falldamp( xyz ) ) }
		xyz.add( dm );
	}
	/*  Info :
		the spin angle depends on the spinning force ( = wind + gravity ); it is the angle between the force and the normal
		of the leaf, which is first multiplied by the force's strength and then by the delta time dt; there is a cumulated damp factor
		from the beginning.
	*/
	this.spinning  = function( xyz, normal, t, dt ) {
		let force = spin( xyz, t );
		//force.multiplyScalar( spindamp );
		let angle = normal.angleTo( force ),
			axis  = new THREE.Vector3().crossVectors( force, normal ).normalize();
		angle *=  force.length() * dt;
		return [ axis, angle ];
	}
	/* Info :
		the pushing force depends on the distance between the leaf and the camera / mouse line; there is a cumulated damp factor
		from the beginning.
	*/
	this.pushing = function( xyz, raydata, t, dt ) {
		let force = push( xyz, t, raydata );
		//force.multiplyScalar( pushdamp );
		let dm = force.clone(); dm.multiplyScalar( dt );
		xyz.add( dm );
	}

	this.init = function() {
		let rx = rand_Sign() * rand_(...range), ry = rand_(...range), randscale = new THREE.Vector3( rx, ry, 1 );
		this.scale.multiply( randscale );
		// mass
		let midarea  = ( range[0] + range[1] )**2 / 4, randarea = Math.abs(rx) * ry;
		mass = randarea / midarea;
		// normal
		let angle = this.normal.angleTo( drops.newnormal ),
			axis = new THREE.Vector3().crossVectors( this.normal, drops.newnormal ).normalize();
		this.normal.applyAxisAngle( axis, angle );
		// position
		this.position = drops.newposition.clone();
		// mesh
		this.mesh.position.set( ...this.position.toArray() );
		this.mesh.scale.set( ...this.scale.toArray() );
		this.mesh.rotateOnAxis( axis, angle );
	}
	this.float = function( drops ) {
		dist = new THREE.Vector3().subVectors( this.position, drops.newposition ).length();
		if ( dist < released ) {
			// rotation
			let axis = new THREE.Vector3().crossVectors( this.normal, drops.newnormal ).normalize(),
				angle = this.normal.angleTo( drops.newnormal );
			this.normal.applyAxisAngle( axis, angle );
			this.mesh.rotateOnWorldAxis( axis, angle );
			// position
			let translation = new THREE.Vector3().subVectors( drops.newposition, drops.oldposition )
			this.position.add( translation );
			this.mesh.position.set( ...this.position.toArray() );
		}
	}

	this.update = function( t, dt, drops, raydata ) {
		// floating leaves at first
		this.float( drops );

		// spinning if wind is blowing
		if ( guis.animate.spin ) {
			if ( dist > released && this.position.y > 0 ) {
				let axis_angle = this.spinning( this.position, this.normal, t, dt );
				this.normal.applyAxisAngle ( ...axis_angle );
				this.mesh.rotateOnWorldAxis( ...axis_angle );
			}
		}

		// flying and rising / falling after a while, specific to each leaf
		if ( guis.animate.fly ) {
			if ( (dist > released) && (t > flydata.shift) ) { this.flying ( this.position, t - flydata.shift , dt ) }
		}
		if ( guis.animate.fall ) {
			if ( t > falldata.shift ) { this.falling( this.position, t - falldata.shift, dt ) }
		}

		// pushing if mouse moves in window
		if ( guis.animate.push ) { this.pushing( this.position, raydata, t, dt )	}

		let r = rho( this.position ), y = this.position.y;
		if ( r > radius ) { this.position.x *= radius / r; this.position.z *= radius / r; };
		this.position.y = clamp( y, falldata.bottom, falldata.top );

		this.mesh.position.set( ...this.position.toArray() );
	}

	this.init();
}
Leaf.Data = {
	range    : [ 0.05, 0.2 ],
	released :
		Math.min(
			0.5 * Water.Data.radius / Water.Data.slices,
			0.5 * Water.Data.radius / Water.Data.stacks,
			0.01 * ( Water.Data.top - Water.Data.bottom ),
		),
	fly  :
		function() {
			let radius = Water.Data.radius;
			return {
				min      : 0.05 *  radius,
				slow     : 0.80 *  radius,
				quiet    : 0.95 *  radius,
				shift    : rand_(0.5,1),
				force    : r => -1 / r**2,
			}
		},
	fall :
		function() {
			let w_bottom = Water.Data.bottom, w_top = Water.Data.top;
			return {
				gravity : 1,
				speed   : rand_(1,3),
				shift   : rand_(0.5,1),
				bottom  : w_bottom + (w_top - w_bottom) * rand_(),
				top     : 2,
				step    : 0.1,
			}
		},
	spin :
		function() {
			return {
				noise : 0,
				damp  : 1,
			}
		},
	push :
		function() {
			return {
				damp : 1,
			}
		},
}
Leaf.Forces = {
	/* Info :
		the flying force is wind moving around the oy axis; it's strength is determined by a normalized radial function f.
	*/
	fly  :
		function( xyz, t, flydata ) {
			let ou = omega( 2*PI * t ), r = rho( xyz );

			const f = flydata.force,
			      strength = flydata.strength,
				  r0 = flydata.min, r1 = flydata.slow, r2 = flydata.quiet;
			const rr = [    0    , r0  , r1     								, r2 ],
				  ff = [ 0, f(r0), f(r), ((f(r)-f(r2)) / (f(r1)-f(r2))) * f(r1), 0   ].map( v => v / Math.abs(f(r0)) );
			let rho_ = stairs( r, rr, ff );

			return ou.multiplyScalar( rho_ );
		},

	/* Info :
		the falling force is the gravity force along the oy axis; it's strength is normalized to value 1.
	*/
	fall :
		function( xyz, t, falldata ) {
			const g = falldata.gravity;
			return new THREE.Vector3( 0, -g, 0 );
		},

	/* Info :
		the spinning force is a linear combination of wind and gravity; the weight of the wind is proportionnal to the position's y-value
		of the leaf; an eventual residual spinning noise depending on a noise factor
	*/
	spin :
		function( xyz, t, spindata, forces ) {
			const noise = spindata.noise;

			let wind    = forces.fly( xyz, t ).normalize(),
				gravity = forces.fall( xyz, t ).normalize();
			wind.multiplyScalar( xyz.y + noise );
			let force = new THREE.Vector3().addVectors( gravity, wind );

			return force;
		},

	/* Info :
		the pushing force is determined by the position of the mouse in the window : the leaves are moving away from the line camera / mouse;
		the strength is a decreasing function of the distance from leaf to line; it's set to zero if the mouse is out the window.
	*/
	push :
		function( xyz, t, pushdata, raydata ) {
			let ray = raydata.ray, out = raydata.out;
			if ( out ) { return new THREE.Vector3() }

			let normal = new THREE.Vector3().subVectors( ray[1], ray[0] ).normalize(),
				force  = new THREE.Vector3().subVectors( xyz, ray[0] );
			force.projectOnPlane( normal );
			let d = force.length(); d = Math.exp( -d );
			force.setLength( d );

			return force;
		},
}

// ----------------------------------------------------------------------- Pond ------------------------------------------------------------------ //

function Pond( guis, water, shapes ) {
	const frames   = guis.hidden.display.frames,
		  sl       = Water.Data.slices,
		  st       = Water.Data.stacks,
		  keys     = Object.keys( shapes ),
		  rand     = Pond.Data.rand;
	function index( i, j ) { return i + j * (sl+1) }
	let inds = {};

	this.leaves   = {};
	this.patterns = new THREE.Object3D();

	this.drop    = function( ind ) {
		return {
			newposition: water.newpositions[ind],
			oldposition: water.oldpositions[ind],
			newnormal  : new THREE.Vector3().fromBufferAttribute( water.newnormals, ind ),
			oldnormal  : new THREE.Vector3().fromBufferAttribute( water.oldnormals, ind )
		}
	}
	this.create  = function() {
		for ( let id of keys ) {
			for ( let n = 1; n <= frames; n++ ) {
				let r = rand(), theta = rand_( 0, 2*PI ),
					i = r * Math.cos(theta), j = r * Math.sin(theta);
				i = Math.floor(sl/2 + i); j = Math.floor(st/2 + j);
				let ind = index(i,j); inds[id+n] = ind;

				let leaf = new Leaf( guis, this.drop(ind), shapes[id], id+n );
				this.leaves[id+n] = leaf; leaf.mesh.name = 'leaf' + id+n;
				this.patterns.add( leaf.mesh );
			}
		}
	}
	this.update  = function( t, dt, ray ) {
		for ( let id of keys ) {
			for ( let n = 1; n <= frames; n++ ) {
				this.leaves[id+n].update( t, dt, this.drop( inds[id+n] ), ray );
			}
		}
	}
	this.refresh = function( scene ) { scene.add( this.patterns ) }
	this.clean   = function( scene ) {
		scene.remove( this.patterns );
		let mesh;
		for ( let id of keys ) {
			for ( let n = 1; n <= frames; n++ ) {
				mesh = this.patterns.getObjectByName( 'leaf' + id+n );
				mesh.geometry.dispose(); mesh.material.dispose();
				this.patterns.remove( mesh );
			}
		}
	}

	this.create();
}
Pond.Data = {
	rand :
		function() {
			const irad   = Math.min( Water.Data.slices, Water.Data.stacks ) / 2,
  		  		  radius = Water.Data.radius,
  		  		  dist   = Leaf.Data.range[1] * 0.5,
				  r      = irad * (1 - dist / radius),
				  cumul  = r * (r+1) / 2;
			let n = rand_( 0, cumul );
			return Math.floor( (-1 + Math.sqrt(1 + 8*n) / 2 ) );
		}
}

/* *********************************************************************************************************************************************** */
/* ********************************************************************* Helper ****************************************************************** */
/* *********************************************************************************************************************************************** */

function Helper( displays ) {
	const scene = displays.scene,
		  color = Helper.Data.color,
		  size  = Helper.Data.size;
	this.mesh = new THREE.Object3D();

	this.drawRay    = function( ray ) {
		let geometry = new THREE.BufferGeometry().setFromPoints( ray ),
			material = new THREE.LineBasicMaterial( { color: color } );
		this.mesh = new THREE.Line( geometry, material );
		this.mesh.name = 'helper';
		scene.add( this.mesh );
	}
	this.drawPoints = function( ray ) {
		let geometry = new THREE.BufferGeometry().setFromPoints( ray ),
			material = new THREE.PointsMaterial( { size: size, color: color } );
		//geometry.computeBoundingSphere();
		this.mesh = new THREE.Points( geometry, material );
		this.mesh.name = 'helper';
		scene.add( this.mesh );
	}
	this.drawMouse  = function( mouse ) {
		let geometry = new THREE.SphereGeometry( size, 32, 32 ),
			material = new THREE.MeshPhongMaterial( { color: color } );
		this.mesh = new THREE.Mesh( geometry, material );
		this.mesh.position.set( ...mouse.toArray() );
		this.mesh.name = 'helper';
		scene.add( this.mesh );
	}

	this.refresh = function( scene ) {
		scene.add( this.mesh );
	}
	this.clean = function( scene ) {
		if ( this.mesh ) {
			scene.remove( this.mesh );
			this.mesh.geometry.dispose() ;
			this.mesh.material.dispose();
		}
	}
	this.update = function( mouse ) {
		this.mesh.position.set( ...mouse.toArray() );
	}
}
Helper.Data = {
	color : 'sienna',
	size  : 0.01,
}

/* *********************************************************************************************************************************************** */
/* ********************************************************************** Run ******************************************************************** */
/* *********************************************************************************************************************************************** */

// ---------------------------------------------------------------------Parameters  -------------------------------------------------------------- //

const GUIS = {
	hidden : {
		display : {
			renderer : 'min',
			camera   : '3d',
			shader   : true,
			points   : 30,
			frames   : 50,
			key      : false,
		},
		uvs     : {
			mouse  : 'uv1',
			shader : 'uv1_full',
		},
	},
	animate : {
		fly  : true,
		fall : true,
		spin : true,
		push : true,
	},
	time    : {
		meshSpeed   : 0.1,
		waterSpeed  : 0.2,
		shaderSpeed : 0,
		stop       : false,
	},
	mouse   : {
		mesh   : true,
		shader : false,
		out    : new THREE.Vector2(0,0),
	},
	forces  : {
		flydamp     : 0.95,
		flystrength : 40,
		fallspeed   : 1,
	}

}
const MENU = {
	animate : true,
	time    : true,
	mouse   : true,
	forces  : true,
}

// ---------------------------------------------------------------------- Main ------------------------------------------------------------------- //

function main() {
	let renderYetRequested = false;
	let display, uniforms, menu, mouse, clock,
		displays, renderer, scene, camera, controls, stats,
		meshDelta, meshElapsed, shaderElapsed, shaderDelta, localMouse, globalMouse, worldMouse, delta, elapsed;
	let pond = undefined, water = undefined, bank = undefined, border = undefined, landscape = undefined, helper = undefined;

		// initialization
	function init() {
		display = new Display( GUIS.hidden.display ); display.set();
			displays = display.displays,
			renderer = displays.renderer,
			scene    = displays.scene,
			camera   = displays.camera,
			controls = displays.controls,
			stats    = displays.stats;
		uniforms = Shader.Uniforms;
		menu = new Menu( GUIS, MENU, uniforms );
		clock = new THREE.Clock();

		start();
	}
	function start() {
		meshDelta = 0, meshElapsed = 0, shaderElapsed = 0, shaderDelta = 0; localMouse = [0,0];
		clock.start();

		// shader uniforms
		uniforms.d_resolution.value = renderer.getSize( new THREE.Vector2() );
		uniforms.d_camera.value     = camera.position;
		uniforms.d_numpoints.value  = GUIS.hidden.display.points;

		clean();

		// meshes
		let shapes = {};
			for ( let id of Object.keys( DATA ) ) { shapes[id] = new Shape( DATA[id], GUIS ) }
		landscape = new Landscape( GUIS ); water = landscape.water;
		pond = new Pond( GUIS, water, shapes );

		// mouse
		mouse = null; mouse = new Mouse( GUIS, displays );
		updateMouse();
		helper = new Helper( displays ); helper.drawMouse( worldMouse );

		refresh();

		render();
	}

	init();

		// routines
	function refresh() {
		landscape.refresh( scene );
		pond.refresh( scene );
		helper.refresh( scene );
	}
	function clean() {
		if ( pond ) { pond.clean( scene ) }
		if ( landscape ) { landscape.clean( scene ) }
		if ( helper ) { helper.clean( scene ) }
	}
	function updateTime() {
		delta = clock.getDelta(); elapsed = clock.getElapsedTime();
		meshDelta     = delta   * GUIS.time.meshSpeed;
		meshElapsed   = elapsed * GUIS.time.meshSpeed;
		shaderDelta   = delta   * GUIS.time.shaderSpeed;
		shaderElapsed = elapsed * GUIS.time.shaderSpeed;
	}
	function updateMouse() {
		globalMouse = mouse.globalUV.multiplyScalar( Number( GUIS.mouse.mesh ) ).toArray();
		localMouse  = mouse.localUV.multiplyScalar( Number( GUIS.mouse.shader ) ).toArray();
		worldMouse  = new THREE.Vector3( ...globalMouse, 0 ).unproject( camera );
	}

		// animation
	function render() {
		renderYetRequested = undefined;
		stats.update();
		updateTime();
		updateMouse();

		if ( resizeRendererToDisplaySize( renderer ) ) {
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}
		renderer.render( scene, camera );
		if ( autoRender() ) {
			animate();
			requestAnimationFrame( render );
		}
	}
	function animate() {
		uniforms.d_camera.value  = camera.position;
		uniforms.t_elapsed.value = shaderElapsed;
		uniforms.t_delta.value   = shaderDelta;
		uniforms.i_mouse.value   = localMouse;

		water.update( elapsed );
		let start = camera.position, end = worldMouse, rayData = { ray: [start,end],  out: mouse.out };
		pond.update( meshElapsed, meshDelta, rayData );
		helper.update( end );
	}

		// events
	function autoRender() {
		let shaderflag = ( GUIS.time.shaderDelta > 0 ) || ( GUIS.time.shaderElapsed > 0 ),
			meshflag   = ( GUIS.time.meshDelta > 0   ) || ( GUIS.time.meshSpeed > 0   ),
			keyflag    = GUIS.hidden.key;
		return ( shaderflag || meshflag || keyflag ) && !GUIS.time.stop;
	}
	function onChange() {
		if ( !autoRender() && !renderYetRequested ) {
			renderYetRequested = true;
			requestAnimationFrame( render );
		}
	}
	function onKey( event ) {
		GUIS.hidden.key = true; render(); GUIS.hidden.key = false
	}

	controls.addEventListener( 'change', onChange );
	renderer.domElement.addEventListener( 'mousemove', onChange, { passive: true } );
	//window.addEventListener( 'keydown', onKey );

	return { start: start, render: render };
}

let running = main();

/* *********************************************************************************************************************************************** */
/* ********************************************************************** Events ***************************************************************** */
/* *********************************************************************************************************************************************** */

function mainStart() { running.start() }
function mainRender() { running.render() }
function resizeRendererToDisplaySize( renderer ) {
	const canvas = renderer.domElement,
		  pixelRatio = window.devicePixelRatio,
		  width  = canvas.clientWidth  * pixelRatio | 0,
		  height = canvas.clientHeight * pixelRatio | 0,
		  needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) { renderer.setSize(width, height, false) }

	return needResize;
}
