import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
  Collapse
} from "reactstrap";

class Item extends React.Component {
  constructor() {
    super();

    this.state = {
      showImage: false
    };

    this.toggleImage = this.toggleImage.bind(this);
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    caption: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    showImage: PropTypes.bool
  };

  static defaultProps = {
    showImage: true
  };

  toggleImage() {
    this.setState(prevState => {
      return { showImage: !prevState.showImage };
    });
  }

  render() {
    const { id, caption, url, onDelete, showImage } = this.props;
    const { showImage: showImageOverride } = this.state;

    return (
      <ListGroupItem>
        <ListGroupItemHeading>
          {caption}
          <span className="text-muted"> #{id}</span>
          <div className="float-right">
            <Link to={`/edit/${id}`}>
              <Button className="mr-1" color="success">
                Edit
              </Button>
            </Link>
            {onDelete && (
              <Button onClick={() => onDelete(id)} color="danger">
                <i className="fa fa-trash" />
              </Button>
            )}
          </div>
        </ListGroupItemHeading>
        <ListGroupItemText>
          <Button className="mr-2" color="primary" onClick={this.toggleImage}>
            <i className="fa fa-image" />
          </Button>
          <a rel="noopener noreferrer" target="_blank" href={url}>
            {url}
          </a>
        </ListGroupItemText>
        <Collapse isOpen={showImageOverride || showImage} className="mt-2">
          <img alt={caption} src={url} />
        </Collapse>
      </ListGroupItem>
    );
  }
}

export default Item;
