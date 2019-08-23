import React, { Component } from "react";
import ImageAPI from "../api/ImageAPI";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  UncontrolledCollapse,
  CardBody,
  Card
} from "reactstrap";
import EditForm from "../components/Images/EditForm";

class Edit extends Component {
  constructor() {
    super();

    this.state = {
      image: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    this.fetchImage();
  }

  async fetchImage() {
    const { id } = this.props.match.params;
    const image = await ImageAPI.get(id);
    this.setState({ image });
  }

  async handleSubmit(values, { setSubmitting }) {
    const confirmed = await window.confirm("Save changes?");

    if (confirmed) {
      alert(JSON.stringify(values));
    }
    setSubmitting(false);
  }

  async handleDelete() {
    const { id } = this.props.match.params;
    if (!id) return;

    const confirmed = await window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (confirmed) {
      await ImageAPI.delete(id);
      this.props.history.push("/");
    }
  }

  render() {
    const { image } = this.state;

    return (
      <div>
        <h1>Edit</h1>
        {!image ? (
          <p>Loading...</p>
        ) : (
          <>
            <EditForm
              onDelete={this.handleDelete}
              onSubmit={this.handleSubmit}
              image={image}
            />
          </>
        )}
      </div>
    );
  }
}

export default Edit;
