var app = new Vue({
  el: "#app",
  data: {
    seen: true,
    books: [],
    booksService: null,
  },
  mounted: function () {
    this.loadBooks();
  },
  methods: {
    loadBooks: function () {
      booksService = books();
      booksService.get().then((res) => (this.books = res.data));
    },
    save: function (title, author,imageLink,description) {
      var b = { title: title, author: author,imageLink:imageLink,description:description };
      booksService.save(b).then(response => {
				booksService.get().then(response => (this.books=response.data));
			});
      location.reload();
    },
    remove: function(index){
      booksService.remove(index).then(response => {
        booksService.get().then(response =>(this.books=response.data));
      });
      location.reload();
    },
    update: function(index,title, author,imageLink,description){
      var b = {title: title, author: author,imageLink:imageLink,description:description,id:index };
      booksService.update(b).then(response => {
        booksService.get().then(response =>(this.books=response.data));
      });
      location.reload();
    },
  },
});
