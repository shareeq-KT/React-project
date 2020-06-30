import React from "react";
import './header.css'

export default class Header extends React.Component {
 
  counter = 0;
  state = {
    user: "",
    filename: [null],
    imageFile: [null],
  };
  
  componentDidMount() {
    const user = localStorage.getItem("user");
    this.setState({ user });
  }

  handleChange = (event) => {
    const input = event.target;
    const value = input.value;
    this.setState({ [input.name]: value });
  };

  handleFormSubmit = () => {
		var item = {
      user: "",
      filename: "",
			imageFile: ""
		}
		for (let index = 0; index < this.state.imageFile.length; index++) {
      this.counter = localStorage.getItem("counter");
      item.user = this.state.user;
      item.filename = this.state.filename[index];
      item.imageFile= this.state.imageFile[index];
      localStorage.setItem("counter", ++this.counter);
      localStorage.setItem("image"+this.counter, JSON.stringify(item));				
		}
  };

 	imageUpload = async (e) => {
    const names = [];
    const photos = [];
		await Promise.all([...e.target.files].map(async (file) => {
			return await getBase64(file).then(base64 => {
        names.push(file.name);
				photos.push(base64);
			});
    }));
    this.state.filename = names;
		this.state.imageFile = photos;
	};

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>User: </label>
        <input name="user" value={this.state.user} onChange={this.handleChange} required/>
        <label>Image: </label>
				<input type="file" id="imageFile" name='imageFile' multiple onChange={(e) => { this.imageUpload(e);}} />
				<button type="submit">Submit</button>
      </form>
    );
  }
}

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

