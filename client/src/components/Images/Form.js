import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledCollapse
} from "reactstrap";

function ImageForm(props) {
  const { handleSubmit, values, handleChange } = props.formik;
  const { onDelete } = props;

  return (
    <>
      <h3>Image #{values.id}</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="caption">Caption</Label>
          <Input
            onChange={handleChange}
            value={values.caption}
            name="caption"
            id="caption"
          />
        </FormGroup>
        <FormGroup>
          <Label for="url">URL</Label>
          <div className="d-flex">
            <Input
              onChange={handleChange}
              value={values.url}
              name="url"
              id="url"
            />
            <Button color="primary" id="toggler">
              Preview
            </Button>
          </div>
          <UncontrolledCollapse toggler="#toggler">
            <img alt={values.caption} src={values.url} />
          </UncontrolledCollapse>
        </FormGroup>

        <Button type="submit" color="success">
          Save
        </Button>
      </Form>
      {onDelete && (
        <Button className="float-right" color="danger" onClick={onDelete}>
          <i className="fa fa-trash" /> Delete
        </Button>
      )}
    </>
  );
}

export default ImageForm;
