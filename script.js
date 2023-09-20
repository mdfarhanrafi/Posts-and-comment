let post = document.getElementById('post');
let fav = document.getElementById('fav');
let posts = document.querySelector('.posts');
let favourite = document.querySelector('.favourites');
let comment = document.querySelector('.comment');
let override = document.querySelector('.override');
let favourites = [];
const url = 'https://jsonplaceholder.typicode.com/posts';

const getTodosFromLocalStorage = () => {
    return localStorage.getItem("favourite") ? JSON.parse(localStorage.getItem("favourite")) : [];
};
post.addEventListener('click', () => {
    let pro = fetch(url);
    pro.then(res => res.json()).then((value) => {
        render(value);
    });
});

function render(value) {
    value.forEach((pp) => { 
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');
        const fav_btn = document.createElement('button');
        fav_btn.innerHTML = 'Add To Favourites';
        h2.innerHTML = pp.title;
        p.innerHTML = pp.body;
        div.id = pp.id;
        div.append(h2, p, fav_btn);
        posts.appendChild(div); 

        fav_btn.id = div.id;

        fav_btn.addEventListener('click', (e) => {
            let posting = {
                'title': pp.title,
                'body': pp.body
            };
            favourites.push(posting);
            localStorage.setItem('favourite', JSON.stringify(favourites));
        });
        
        const modal = document.getElementById(`${div.id}`).firstChild;
       
        modal.onclick = () => {

            let cmnt = `https://jsonplaceholder.typicode.com/posts/${pp.id}/comments`;

            let prom = fetch(cmnt);
            prom.then(res => res.json()).then((data) => {
                console.log(data);
                render_comment(data);
            });

        }; 
        function render_comment(data) {
            data.forEach((values) => {
                const div = document.createElement('div');
                const h2 = document.createElement('h2');
                const p = document.createElement('p');
                h2.innerHTML = values.name;
                console.log(values.name);
                p.innerHTML = values.body;
                div.append(h2, p);
                comment.appendChild(div);

            });
            comment.style.display = 'block';
            override.style.display = 'block';
            window.addEventListener('click', (event) => {
              
                    comment.style.display = 'none';
                    override.style.display = 'none';
              
            });
             
 
 



        }
 

    });
}







fav.addEventListener('click', () => {
    posts.innerHTML = '';
    let list = getTodosFromLocalStorage(); 
    console.log(list);
    list.forEach((pp) => {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');
        h2.innerHTML = pp.title;
        p.innerHTML = pp.body;
        div.id = pp.id;
        div.append(h2, p);
        favourite.appendChild(div);

    });    
});



    




