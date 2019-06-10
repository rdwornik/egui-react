class Book extends React.Component {
  constructor(props, onCheckedToggle) {
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
              value={this.props.checked}
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
class App extends React.Component {
  constructor(props) {
    super(props);
    this.addBookOnClick = this.addBookOnClick.bind(this);
    this.editBookOnClick = this.editBookOnClick.bind(this);
    this.deleteBookOnClick = this.deleteBookOnClick.bind(this);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);

    this.state = {
      books: [],
      filters: {
        title: "",
        author: "",
        year: ""
      },
      id: "",
      title: "",
      author: "",
      year: "",
      checked: false
    };
  }
  // this.props.book.filter(book => book.checked) zwróci array t

  componentDidMount() {
    console.log("I just mounted");
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

  doClear() {
    this.setState({
      filters: {
        title: "",
        author: "",
        year: ""
      }
    });
  }

  onChangeHandle(event) {
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
                    defaultValue={this.state.author}
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
                    defaultValue={this.state.title}
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
                    type="text"
                    name="year"
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    defaultValue={this.state.year}
                    onInput={this.onChangeHandle}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.addBookOnClick}
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
          data-target="#exampleModalEdit"
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
                  Edit book
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
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
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
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
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
                    type="text"
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.editBookOnClick}
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
        onClick={this.deleteBookOnClick}
      >
        Del Book
      </button>
    );
  }

  onCheckBoxChange(id) {
    console.log("hej" + id);
    this.setState(prevState => {
      const updateState = prevState.books.map(item => {
        if (item.id === id) {
          item.checked = !item.checked;
        }
        return item;
      });
      return {
        books: updateState
      };
    });
  }

  addBookOnClick(event) {
    axios({
      method: "post",
      url: "/Home/Create",
      data: {
        Author: this.state.author,
        Title: this.state.title,
        Year: this.state.year
      }
    })
      .then(response => {
        const book = {
          ...response.data,
          checked: false
        };
        console.log(book);
        this.setState({
          books: [...this.state.books, book]
        });
      })
      .catch(error => console.log("error"));
  }

  editBookOnClick() {
    axios({
      method: "post",
      url: "/Home/Edit",
      data: {
        Author: "autho to edit",
        Title: "title to edit",
        Year: "124 to edit"
      }
    })
      .then(response => {
        console.log("success edited!");
      })
      .catch(error => console.log("error"));
  }
  deleteBookOnClick() {
    const toDelete = this.state.books
      .filter(item => item.checked)
      .map(item => item.id);

    console.log(toDelete);
    axios({
      method: "post",
      url: "/Home/Delete",
      data: toDelete
    })
      .then(response => {
        const newBooks = response.data.map(item => {
          if (item.checked === true) {
            item.checked = !item.checked;
          }
          return item;
        });
        console.log(newBooks);
        this.setState({
          books: newBooks
        });
      })
      .catch(error => console.log("error"));
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
                name=" filters.author"
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
                name=" filters.title"
                onChange={this.onChangeHandle}
              />
            </div>
          </div>
          <div className="col-2">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Year</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Another input"
                name=" filters.year"
                onChange={this.onChangeHandle}
              />
            </div>
          </div>
          <div className="col-2">
            <label htmlFor="buttonClear">&nbsp;</label>
            <button
              className="form-control"
              id="buttonClear"
              onClick={this.doClear}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
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
                checkbox={false}
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
ReactDOM.render(<App title="Library" />, document.getElementById("container"));
