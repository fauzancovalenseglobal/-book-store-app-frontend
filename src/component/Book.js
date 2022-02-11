import React, { Component } from "react";
import AddBook from "./BookModal";
import axios from "axios";
import { getBaseUrl } from "./Ntework/urls";

export class Book extends Component {
  constructor() {
    super();

    this.state = {
      book: [],
      loading: false,
      page: 1,
      author_list: [],
    };
  }

  async componentDidMount() {
    let url = `${getBaseUrl}/api/v1/book-list`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ book: parseData.data });
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(`${getBaseUrl}/api/v1/author-list`)
      .then((res) => this.setState({ author_list: res.data }))
      .catch((err) => console.log(err));
  };

  createItem = () => {
    const item = { title: "", description: "", authors: 0 };
    this.setState({ activeItem: item, modal: AddBook });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`${getBaseUrl}/api/v1/book-update/${item.id}`, item)
        .then((res) => this.componentDidMount());
        return;
    }

    axios
      .post(`${getBaseUrl}/api/v1/book-add`, item)
      .then((res) => this.componentDidMount());
  };

  handleDelete = (id) => {
    axios
      .delete(`${getBaseUrl}/api/v1/book-delete/${id}`)
      .then((res) => this.componentDidMount());
  };

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  render() {
    return (
      <div className="container my-4">
        <h1 style={{ textAlign: "center" }}>Book List</h1>
        <button
          type="button"
          data-toggle="modal"
          data-target="#add-new-project-modal"
          className="btn btn-light"
          style={{ float: "right", margin: "5px" }}
          onClick={this.createItem}
        >
          Add Book
        </button>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.book.map((book) => {
              return (
                <tr key={book.id}>
                  <th scope="row">{book.id}</th>
                  <td>{book.title}</td>
                  <td>
                    {book.authors.first_name} {book.authors.last_name}
                  </td>
                  <td style={{width: "30%"}}>{book.description.substring(0, 100)}</td>
                  <td>
                    <span>
                      {" "}
                      <button type="button" className="btn btn-info"
                      onClick={()=>this.editItem(book)}>
                        Edit
                      </button>{" "}
                    </span>
                    <span>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.handleDelete(book.id)}
                      >
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })}
            ;
          </tbody>
        </table>
        {this.state.modal ? (
          <AddBook
            authorList={this.state.author_list}
            activeItem={this.state.activeItem}
            onSave={this.handleSubmit}
          />
        ) : null}
      </div>
    );
  }
}

export default Book;
