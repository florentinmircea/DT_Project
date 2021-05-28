var app = new Vue({
  el: "#app",
  data: {
    seen: true,
    books: [],
    booksService: null,
    userService: null,
    loggedIn: "",
    logged: false,
    oldUser: true,
    aux: Number(0),
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
        description: description.value,
      };
      title.value = "";
      author.value = "";
      imageLink.value = "";
      description.value = "";
      booksService.save(b).then((response) => {
        toastr.options.timeOut = 2000;
        toastr.success(response.data);
        booksService.get().then((response) => (this.books = response.data));
      });
    },
    remove: function (index) {
      booksService.remove(index).then((response) => {
        toastr.options.timeOut = 2000;
        toastr.info(response.data);
        booksService.get().then((response) => {
          this.books = response.data;
        });
      });
    },
    update: function (index) {
      var title =
        document.getElementsByClassName("book-title")[index].textContent;
      var author =
        document.getElementsByClassName("book-author")[index].textContent;
      var description =
        document.getElementsByClassName("book-description")[index].textContent;
      var b = {
        title: title,
        author: author,
        imageLink: this.books[index].imageLink,
        description: description,
        id: index,
      };
      booksService.update(b).then((response) => {
        toastr.options.timeOut = 2000;
        toastr.success(response.data);
        booksService.get().then((response) => (this.books = response.data));
      });
    },
    login: function () {
      var username = document.getElementById("username-input").value;
      var password = document.getElementById("password-input").value;
      userService = userFunc();
      var u = { username: username, password: password };
      userService.login(u).then((response) => {
        this.loggedIn = response.data;
        this.aux++;
        if (response.data === "SUCCESS") {
          if (this.aux === Number(2)) {
            toastr.success(response.data);
          }
        } else {
          toastr.error(response.data);
        }
      });
    },
    newAccount: function () {
      var username = document.getElementById("newUsername-input").value;
      var password = document.getElementById("newPassword-input").value;
      userService = userFunc();
      var u = { username: username, password: password };
      userService.newAccount(u).then((response) => {
        toastr.options.timeOut = 2000;
        toastr.info(response.data);
      });
    },
    accordion: function () {
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
    },
  },
});
