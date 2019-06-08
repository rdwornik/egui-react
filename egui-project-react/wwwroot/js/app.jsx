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
              onChange={this.props.onCheckedToggle}
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
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
    //this.handleChange = this.handleChange.bind(this);
    //this.onChange = this.onChange.bind(this);
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
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    defaultValue={this.state.author}
                    onInput={this.onChangeAuthor}
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
                    defaultValue={this.state.title}
                    onInput={this.onChangeTitle}
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
                    defaultValue={this.state.year}
                    onInput={this.onChangeYear}
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

  onChangeAuthor(event) {
    this.setState({ author: event.target.value });
  }
  onChangeTitle(event) {
    this.setState({ title: event.target.value });
  }
  onChangeYear(event) {
    this.setState({ year: event.target.value });
  }

  onCheckBoxChange(event) {
    console.log("hej");
    this.setState({ checked: event.target.value });
  }

  addBookOnClick(event) {
    //const list = this.props.book.filter(book => book.checked);
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
        this.setState({
          books: [...this.state.books, response.data]
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
    axios({
      method: "post",
      url: "/Home/Delete",
      data: {
        Author: "autho to delete",
        Title: "title to delete",
        Year: "124 to delete"
      }
    })
      .then(response => {
        console.log("success deleted!");
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
                checkbox={this.state.checked}
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
React.render(<App title="Library" />, document.getElementById("container"));
