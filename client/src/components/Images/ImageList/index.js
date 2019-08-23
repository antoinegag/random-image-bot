import React, { Component } from "react";
import PropTypes from "prop-types";

import { ListGroup } from "reactstrap";

import Item from "./Item";

class ImageList extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    showImages: PropTypes.bool
  };

  static defaultProps = {
    showImages: true
  };

  render() {
    const { images, onDelete, showImages } = this.props;

    return (
      <ListGroup>
        {images.map(image => (
          <Item
            key={image.id}
            id={image.id}
            caption={image.caption}
            url={image.url}
            onDelete={onDelete}
            showImage={showImages}
          />
        ))}
      </ListGroup>
    );
  }
}

export default ImageList;
