let title_box = document.getElementById("inp_box1");
let post_box = document.getElementById("inp_box2");
let post_button = document.getElementById("post_but");
let count = 0; // counter to keep track of the post.
let post_array = [];

title_box.addEventListener("keyup",but_disable);
post_box.addEventListener("keyup",but_disable);


// button disable function
function but_disable(){
    if(title_box.value == "" || post_box.value =="")
    {
        post_button.disabled = true;
    }
    else{
        post_button.disabled = false;

    }
    
}

post_button.addEventListener("click",display);
// fetching the data from json placeholder site and posting the post
async function display(){
    
    const result = await fetch("https://jsonplaceholder.typicode.com/posts",{
        method: "POST",
        body: JSON.stringify({             // taking the data into strings as the body cosist of string elements.
            title: title_box.value,
            body: post_box.value,
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8',
        },
    })
     let display_post = await result.json();    // assigns the fetched result to display_post in parsed manner.
    display_current_post(display_post); 
    
    title_box.value ="";   // after posting clearing the input boxes 
    post_box.value = "";
    but_disable();


}


// for creating and manipulating the dom elements
function display_current_post(passed_result){

    let display_div = document.createElement("div");  // div that will dynamically get added in post section.
    let post_section = document.getElementById("post-section");   // the Post-Section div that is already rendered in html page
    let recent_post_section = document.getElementById("recent-post");
    
    // For Post Section Div
    display_div.className = "display-div";
    post_array.push(passed_result);
    
    let header = document.createElement("h3");
    let head_text = document.createTextNode(`Post ${count+1}: ${post_array[count].title}`); 
    header.appendChild(head_text);

    let post_paragraph = document.createElement("p");
    let post_text = document.createTextNode(`${post_array[count].body}`);
    post_paragraph.appendChild(post_text);
 
    // Creating the Post Section dynamically
    display_div.appendChild(header);
    display_div.appendChild(post_paragraph);
    post_section.appendChild(display_div);

    recent_post_section.innerHTML = `Post ${count+1}: ${post_array[count].title} </br>${post_array[count].body}`;
    count=count+1;
    

}


// windows.addEventListener("load",()=>{
//     const loader = document.getElementById("load_id");
//     loader.classList.add("loader-hidden");
//     loader.addEventListener("transitionend",()=>{
//         document.body.removeChild("loader");

//     })
// })