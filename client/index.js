var app = new Vue({
    el: "#app",
    data: {
        seen: true,
        books: [],
        booksService: null,
        userService: null,
        newUser: false,
        oldUser: true,
    },
    mounted: function () {
        this.loadBooks();
    },
    methods: {
        loadBooks: function () {
            booksService = books();
            booksService.get().then((res) => (this.books = res.data));
        },
        save: function () {
            var title = document.getElementById("title");
            var author = document.getElementById("author");
            var imageLink = document.getElementById("imageLink");
            var description = document.getElementById("description");
            var b = {
                title: title.value,
                author: author.value,
                imageLink: imageLink.value,
                description: description.value
            };
            booksService.save(b).then(response => {

                // am vrut sa vad daca stiu sa fac mesaje de-alea catre utilizator da ne trebuie toastr ala pentru varianta asta
                // eventual putem incerca alta varianta daca nu

                // toastr.options.positionClass = 'toast-bottom-center';
                // toastr.options.timeOut = 2000;
                // toastr.success(response.data);

                booksService.get().then(response => (this.books = response.data));
            });
            location.reload();
        },
        remove: function (index) {
            booksService.remove(index).then(response => {
                booksService.get().then(response => (this.books = response.data));
            });
            location.reload();
        },
        update: function (index) {
            var title = document.getElementsByClassName("book-title")[index].textContent;
            var author = document.getElementsByClassName("book-author")[index].textContent;
            // fara modificare imageLink, eventual putem adauga cumva
            var description = document.getElementsByClassName("book-description")[index].textContent;
            var b = {title: title, author: author, imageLink: imageLink, description: description, id: index};
            booksService.update(b).then(response => {
                booksService.get().then(response => (this.books = response.data));
            });
            location.reload();
        },
        login: function () {
            var username = document.getElementById("username-input").value;
            var password = document.getElementById("password-input").value;
            userService = userFunc();
            var u = {username: username, password: password};
            userService.login(u).then(response => {
                console.log(response.data);
            })
        },
        newAccount: function (username, password) {
            userService = userFunc();
            var u = {username: username, password: password};
            userService.newAccount(u).then(response => {
                console.log(response.data);
            })
        }
    }
});

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

// acc[0].click();
/* asa apare direct deschisa sectiunea de View books, da nu apar cartile numai daca mai dai un click pe sectiune
si apare eroare la login ca nu stie cine e acc inca:))) */