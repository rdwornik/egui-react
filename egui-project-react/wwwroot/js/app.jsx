class Book extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tr>
        <th scope="row">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={true}
              checked={this.props.checked}
              id="defaultCheck1"
              onChange={() => {
                this.props.onCheckedToggle(this.props.id);
              }}
            />
            <label className="form-check-label" htmlFor="defaultCheck1" />
          </div>
        </th>
        <td>{this.props.author}</td>
        <td>{this.props.title}</td>
        <td>{this.props.year}</td>
      </tr>
    );
  }
}

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.doClear = this.doClear.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

    this.state = {
      books: props.books,
      id: "",
      title: "",
      author: "",
      year: "",
      checked: false,
      titleSelected: "",
      authorSelected: "",
      yearSelected: "",
      filterTitle: "",
      filterAuthor: "",
      filterYear: ""
    };
  }

  doClear() {
    this.setState({
      title: "",
      author: "",
      year: ""
    });
  }

  onChangeHandle(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({
          [name]: value
        });

    if (name.includes("filterAuthor")) {
      const filteredBook = this.props.books.filter(book => {
        return (
          book.author.includes(value) &&
          book.title.includes(this.state.filterTitle) &&
          book.year.includes(this.state.filterYear)
        );
      });
      this.setState({
        books: filteredBook
      });
    }

    if (name.includes("filterTitle")) {
      const filteredBook = this.props.books.filter(book => {
        return (
          book.author.includes(this.state.filterAuthor) &&
          book.title.includes(value) &&
          book.year.includes(this.state.filterYear)
        );
      });
      this.setState({
        books: filteredBook
      });
    }

    if (name.includes("filterYear")) {
      const filteredBook = this.props.books.filter(book => {
        return (
          book.author.includes(this.state.filterAuthor) &&
          book.title.includes(this.state.filterTitle) &&
          book.year.includes(value)
        );
      });
      this.setState({
        books: filteredBook
      });
    }
  }

  onChangeEditHandle(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({
          [name]: value
        });
  }

  addBookModal() {
    return (
      //button trigerr model than modal
      <div>
        <button
          type="button"
          className="btn btn-primary m-3"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Add Book
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Book
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Author
                    </span>
                  </div>
                  <input
                    type="text"
                    name="author"
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={this.state.author}
                    onInput={this.onChangeHandle}
                  />
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Title
                    </span>
                  </div>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={this.state.title}
                    onInput={this.onChangeHandle}
                  />
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Year
                    </span>
                  </div>
                  <input
                    type="number"
                    name="year"
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={this.state.year}
                    onInput={this.onChangeHandle}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.doClear}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => {
                    this.props.addBookOnClick(
                      this.state.author,
                      this.state.title,
                      this.state.year
                    );
                    this.doClear();
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  editBookModal() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-3"
          data-toggle="modal"
          data-target={
            this.state.books.filter(item => item.checked).length !== 1
              ? null
              : "#exampleModalEdit"
          }
          onClick={() => {
            const val = this.state.books.filter(item => item.checked);
            if (val.length > 1) {
              alert("Can't edit more than one item");
            } else if (val.length < 1) {
              alert("select one item to edit");
            }
          }}
        >
          Edit Book
        </button>
        <div
          className="modal fade"
          id="exampleModalEdit"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Book
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Author
                    </span>
                  </div>
                  <input
                    type="text"
                    name="authorSelected"
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder={this.state.books
                      .filter(item => item.checked)
                      .map(item => item.author)}
                    value={this.state.authorSelected}
                    onInput={this.onChangeHandle}
                  />
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Title
                    </span>
                  </div>
                  <input
                    type="text"
                    name="titleSelected"
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder={this.state.books
                      .filter(item => item.checked)
                      .map(item => item.title)}
                    value={this.state.titleSelected}
                    onInput={this.onChangeHandle}
                  />
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Year
                    </span>
                  </div>
                  <input
                    type="number"
                    name="yearSelected"
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={this.state.yearSelected}
                    onInput={this.onChangeHandle}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.doClear}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => {
                    const editBook = this.state.books.filter(
                      item => item.checked
                    );
                    console.log("int parsed " + editBook[0].id);
                    this.props.editBookOnClick(
                      editBook[0].id,
                      this.state.authorSelected,
                      this.state.titleSelected,
                      this.state.yearSelected
                    );
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  deleteBookModal() {
    return (
      <button
        type="button"
        className="btn btn-primary m-3"
        onClick={() => {
          const toDelete = this.state.books
            .filter(item => item.checked)
            .map(item => item.id);

          this.props.deleteBookOnClick(toDelete);
        }}
      >
        Del Book
      </button>
    );
  }

  onCheckBoxChange(id) {
    this.setState(prevState => {
      const updateState = prevState.books.map(item => {
        if (item.id === id) {
          item.checked = !item.checked;
        }
        return item;
      });

      const checkedBook =
        prevState.books.filter(item => item.checked).length > 0
          ? prevState.books.filter(item => item.checked)
          : [{ author: "", title: "", year: "" }];

      return {
        books: updateState,
        authorSelected: checkedBook[0].author,
        titleSelected: checkedBook[0].title,
        yearSelected: checkedBook[0].year
      };
    });
  }

  filterCard() {
    return (
      <div className="card m-3 p-3">
        <span className="filters">Filters:</span>
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Author</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Example input"
                name="filterAuthor"
                value={this.state.filterAuthor}
                onChange={this.onChangeHandle}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Title</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Another input"
                name="filterTitle"
                value={this.state.filterTitle}
                onChange={this.onChangeHandle}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Year</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Another input"
                name="filterYear"
                value={this.state.Year}
                onChange={this.onChangeHandle}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.books !== nextProps.books) {
      console.log("show nex props books");
      console.log(nextProps.books);
      console.log("show nex props books after filer");
      const filterBooks = nextProps.books.filter(book => {
        return (
          book.author.includes(this.state.filterAuthor) &&
          book.title.includes(this.state.filterTitle) &&
          book.year.includes(this.state.filterYear)
        );
      });
      console.log(filterBooks);
      this.setState({
        books: filterBooks
      });
    }
  }
  bookListCard() {
    return (
      <div className="card m-3 p-3 tableStyle">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Selected</th>
              <th scope="col">Author</th>
              <th scope="col">Title</th>
              <th scope="col">Year</th>
            </tr>
          </thead>
          <tbody>
            {this.state.books.map((book, index) => (
              <Book
                onCheckedToggle={this.onCheckBoxChange}
                key={index}
                id={book.id}
                author={book.author}
                title={book.title}
                year={book.year}
                checked={book.checked}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  render() {
    return (
      <div className="container">
        <div className="card my-5">
          {this.filterCard()}
          {this.bookListCard()}
          <div className="card m-3 p-3">
            <div className="row">
              <div className="col-4 ">{this.addBookModal()}</div>
              <div className="col-4">{this.editBookModal()}</div>
              <div className="col-4">{this.deleteBookModal()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      filterTitle: "",
      filterAuthor: "",
      filterYear: ""
    };
    this.addBookOnClick = this.addBookOnClick.bind(this);
    this.editBookOnClick = this.editBookOnClick.bind(this);
    this.deleteBookOnClick = this.deleteBookOnClick.bind(this);
  }
  componentDidMount() {
    axios.get("/Home/List").then(response =>
      this.setState({
        books: response.data.books.map(book => ({
          author: book.author,
          title: book.title,
          year: book.year,
          id: book.id,
          checked: false
        }))
      })
    );
  }

  addBookOnClick(author, title, year) {
    axios({
      method: "post",
      url: "/Home/Create",
      data: {
        Author: author,
        Title: title,
        Year: year
      }
    })
      .then(response => {
        const book = {
          ...response.data,
          checked: false
        };
        this.setState({
          books: [...this.state.books, book]
        });
      })
      .catch(error => console.log("error"));
  }
  editBookOnClick(id, authorSelected, titleSelected, yearSelected) {
    axios({
      method: "post",
      url: "/Home/Edit",
      data: {
        Id: id,
        Author: authorSelected,
        Title: titleSelected,
        Year: yearSelected
      }
    })
      .then(response => {
        console.log("data respnse");
        console.log(response.data);
        const newBooks = response.data.map(item => {
          return {
            ...item,
            checked: false
          };
        });
        console.log("new books");
        console.log(newBooks);
        this.setState({
          books: newBooks
        });
      })
      .catch(error => console.log("error"));
  }

  deleteBookOnClick(toDelete) {
    axios({
      method: "post",
      url: "/Home/Delete",
      data: toDelete
    })
      .then(response => {
        const newBooks = response.data.map(item => {
          return {
            ...item,
            checked: false
          };
        });
        this.setState({
          books: newBooks
        });
      })
      .catch(error => console.log("error"));
  }

  render() {
    return (
      <BookList
        books={this.state.books}
        addBookOnClick={this.addBookOnClick}
        editBookOnClick={this.editBookOnClick}
        deleteBookOnClick={this.deleteBookOnClick}
      />
    );
  }
}

ReactDOM.render(<App title="Library" />, document.getElementById("container"));
