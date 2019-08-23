import React, { Component } from "react";
import ImageAPI from "../api/ImageAPI";

import ImageList from "../components/Images/ImageList";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      images: null,
      showImages: false
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    this.fetchImages();
  }

  async fetchImages() {
    const images = await ImageAPI.list();
    this.setState({ images });
  }

  async handleDelete(id) {
    if (!id) return;

    const confirmed = await window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (confirmed) {
      await ImageAPI.delete(id);
      this.fetchImages();
    }
  }

  render() {
    const { images, showImages } = this.state;

    return (
      <div>
        <h1>Images</h1>
        <label>
          <input
            onChange={event =>
              this.setState({ showImages: event.target.checked })
            }
            type="checkbox"
            className="mr-2"
          />
          Show images
        </label>
        {!images ? (
          <p>Loading...</p>
        ) : (
          <ImageList
            onDelete={this.handleDelete}
            showImages={showImages}
            images={images}
          />
        )}
      </div>
    );
  }
}

export default Home;
