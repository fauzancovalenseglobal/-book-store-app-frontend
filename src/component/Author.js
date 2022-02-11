import React, { Component } from "react";
import AddAuthor from "./AutohorModal";
import axios from "axios";
import { getBaseUrl } from "./Ntework/urls";

export class Author extends Component {
  constructor() {
    super();

    this.state = {
      author: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `${getBaseUrl}/api/v1/author-list`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ author: parseData.data });
  }

  createItem = () => {
    const item = { first_name: "", last_name: "", email: "" };
    this.setState({ activeItem: item, modal: AddAuthor });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`${getBaseUrl}/api/v1/author-update/${item.id}`, item)
        .then((res) => this.componentDidMount());
        return;
    }
    axios
      .post(`${getBaseUrl}/api/v1/author-add`, item)
      .then((res) => this.componentDidMount());
  };

  handleDelete = (id) => {
    axios
      .delete(`${getBaseUrl}/api/v1/author-delete/${id}`)
      .then((res) => this.componentDidMount());
  };

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  render() {
    return (
      <div className="container my-4">
        <h1 style={{ textAlign: "center" }}>Author List</h1>
        <button
          type="button"
          data-toggle="modal"
          data-target="#add-new-project-modal"
          className="btn btn-light"
          style={{ float: "right", margin:"5px" }}
          onClick={this.createItem}

        >
          Add Author
        </button>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th>Author</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.author.map((author) => {
              return (
                <tr key={author.id}>
                  <th scope="row">{author.id}</th>
                  <td>
                    {author.first_name} {author.last_name}
                  </td>
                  <td>
                  {author.email} 
                </td>
                  <td>
                    <span>{" "}
                      <button type="button" className="btn btn-info"
                      onClick={() => this.editItem(author)}
                      >
                        Edit
                      </button>{" "}
                    </span>
                    <span>
                    <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(author.id)}
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
          <AddAuthor
            activeItem={this.state.activeItem}
            onSave={this.handleSubmit}
          />
        ) : null}
      </div>
    );
  }
}

export default Author;
