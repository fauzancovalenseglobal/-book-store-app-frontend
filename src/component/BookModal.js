import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      isOpen: true,
      options: this.props.authorList.data,
    };
  }

  toggleModel = (status) => {
    if (status) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true });
    }
  };
  handleChange = (event) => {
    let { name, value } = event.target;

    this.setState({ value: event.target.value });
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };


  render() {
    const { toggle, onSave } = this.props;
    const { options, value } = this.state;
    console.log(options);

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Add New Book </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title of book:</Label>
              <Input
                className="form-control"
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Title"
              />
            </FormGroup>

            <FormGroup>
              <Label for="title">Authors:</Label>
              <select
                className="form-control"
                onChange={this.handleChange}
                value={this.state.activeItem.authors.id}
                name="authors"
              >
              <option>---------</option>

                {options.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.first_name}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <textarea
                className="form-control"
                placeholder="Enter Description"
                rows={4}
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                name="description"

              ></textarea>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-primary-outline btn-cancel min-width-110 mr-10">
            Cancel
          </Button>
          <Button
            className="btn btn-primary btn-save min-width-130"
            color="primary"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
