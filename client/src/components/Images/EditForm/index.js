import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import Form from "../Form";

class EditForm extends React.Component {
  static propTypes = {
    image: PropTypes.shape({
      id: PropTypes.number.isRequired,
      caption: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onDelete: PropTypes.func
  };

  render() {
    const { id, caption, url } = this.props.image;
    const { onSubmit, onDelete } = this.props;

    return (
      <Formik initialValues={{ id, caption, url }} onSubmit={onSubmit}>
        {formik => <Form onDelete={onDelete} formik={formik} />}
      </Formik>
    );
  }
}

export default EditForm;
