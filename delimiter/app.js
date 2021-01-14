document.addEventListener('DOMContentLoaded', () => {

const multiline  = document.querySelector(".multiline");
const singleline = document.querySelector(".singleline");
const m2s        = document.querySelector(".m2s");
const s2m        = document.querySelector(".s2m");


m2s.addEventListener('click', m2s_func);

function m2s_func(){
	let m_v   = multiline.value;
	let arr   = m_v.split("\n");
	let delim = document.querySelector(".delim").value;

	//remove empty entries, so that ",,," does not appear
	while(arr[arr.length-1] == ""){
		arr.pop();
	}

	//double quote wrapped
	let checkbox = document.querySelector(".doublequote");
	if(checkbox.checked){
		arr = arr.map(add_double_quote);
		checkbox.checked = false;
	}

	//join string!
	let joined_str = arr.join(delim);
	singleline.value = joined_str;

}


s2m.addEventListener('click', s2m_func);

function s2m_func(){
	let s_v = singleline.value;
	let delim = document.querySelector(".delim").value;
	let arr = s_v.split(delim);

	//double quote wrapped
	let checkbox = document.querySelector(".doublequote");
	if(checkbox.checked){
		arr = arr.map(add_double_quote);
		checkbox.checked = false;
	}
	//return new line separated text
	let m_v = arr.join("\n");
	multiline.value = m_v;
}


function add_double_quote(aString){
	return '"' + aString + '"';
}

})