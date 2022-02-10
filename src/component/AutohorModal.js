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

export default class AddAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      isOpen: true,
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

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Add New Author
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="first_name">First Name::</Label>
              <Input
                className="form-control"
                type="text"
                name="first_name"
                value={this.state.activeItem.first_name}
                onChange={this.handleChange}
                placeholder="Enter First Name"
              />
            </FormGroup>

            <FormGroup>
              <Label for="last_name">Last Name::</Label>
              <Input
                className="form-control"
                type="text"
                name="last_name"
                value={this.state.activeItem.last_name}
                onChange={this.handleChange}
                placeholder="Enter Last Name"
              />
            </FormGroup>
            
            <FormGroup>
            <Label for="email">Email::</Label>
            <Input
              className="form-control"
              type="email"
              name="email"
              value={this.state.activeItem.email}
              onChange={this.handleChange}
              placeholder="Enter email"
            />
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
