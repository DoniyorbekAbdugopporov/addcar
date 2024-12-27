import { Component } from "react";

export default class Car extends Component {
  constructor() {
    super();
    this.state = {
      image: "",
      name: "",
      price: "",
      desc: "",
      data: JSON.parse(localStorage.getItem("data")) || [],
      isEditing: false,
      editId: null,
    };
  }

  componentDidUpdate(_, prevState) {
    if (prevState.data !== this.state.data) {
      localStorage.setItem("data", JSON.stringify(this.state.data));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, price, desc, image, isEditing, editId, data } = this.state;

    if (!name || !price || !desc || !image) {
      alert("All fields are required!");
      return;
    }

    if (isEditing) {
      const updatedData = data.map((item) =>
        item.id === editId ? { ...item, name, price, desc, image } : item
      );
      this.setState({
        data: updatedData,
        isEditing: false,
        editId: null,
        name: "",
        price: "",
        desc: "",
        image: "",
      });
    } else {
      const newCar = {
        id: Date.now(),
        name,
        price,
        desc,
        image,
      };
      this.setState({
        data: [...data, newCar],
        name: "",
        price: "",
        desc: "",
        image: "",
      });
    }
  };

  handleDelete = (id) => {
    const updatedData = this.state.data.filter((item) => item.id !== id);
    this.setState({ data: updatedData });
  };

  handleEdit = (id) => {
    const carToEdit = this.state.data.find((item) => item.id === id);
    this.setState({
      name: carToEdit.name,
      price: carToEdit.price,
      desc: carToEdit.desc,
      image: carToEdit.image,
      isEditing: true,
      editId: id,
    });
  };

  render() {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-80 h-screen bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {this.state.isEditing ? "Edit Car" : "Add New Car"}
          </h2>
          <form onSubmit={this.handleSubmit} className="space-y-4">
            <input
              autoFocus
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              className="w-full h-12 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Car Name"
              type="text"
            />
            <input
              value={this.state.image}
              onChange={(e) => this.setState({ image: e.target.value })}
              className="w-full h-12 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Image URL"
              type="text"
            />
            <input
              value={this.state.price}
              onChange={(e) => this.setState({ price: e.target.value })}
              className="w-full h-12 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Price"
              type="number"
            />
            <textarea
              value={this.state.desc}
              onChange={(e) => this.setState({ desc: e.target.value })}
              className="w-full h-24 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Description"
            />
            <button
              type="submit"
              className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              {this.state.isEditing ? "Update Car" : "Add Car"}
            </button>
          </form>
        </div>

        <div className="flex-1 items-start p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {this.state.data.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="h-48 bg-gray-200">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 truncate">
                  {car.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {car.desc}
                </p>
                <p className="text-blue-500 font-semibold mt-3">
                  {`${car.price} so'm`}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => this.handleEdit(car.id)}
                    className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => this.handleDelete(car.id)}
                    className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
