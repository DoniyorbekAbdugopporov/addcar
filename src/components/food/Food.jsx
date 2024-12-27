import { Component } from "react";

export default class Food extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      desc: "",
      data: JSON.parse(localStorage.getItem("data")) || [],
      isEditing: false, // Edit holati
      editId: null, // Tahrirlanayotgan elementning ID-si
    };
  }

  componentDidUpdate() {
    console.log(this.state.data);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, price, desc, isEditing, editId, data } = this.state;

    if (isEditing) {
      // Agar tahrirlash holati bo'lsa
      const updatedData = data.map((item) =>
        item.id === editId
          ? { ...item, name, price, desc } // Tahrirlanayotgan elementni yangilash
          : item
      );
      this.setState({
        data: updatedData,
        isEditing: false,
        editId: null,
        name: "",
        price: "",
        desc: "",
      });
      localStorage.setItem("data", JSON.stringify(updatedData));
    } else {
      // Yangi element qo'shish
      let newFood = {
        id: Date.now(),
        name,
        price,
        desc,
      };
      const store = [...data, newFood];
      this.setState({
        data: store,
        name: "",
        price: "",
        desc: "",
      });
      localStorage.setItem("data", JSON.stringify(store));
    }
  };

  handleDelete = (id) => {
    const store = this.state.data.filter((item) => item.id !== id);
    this.setState({ data: store });
    localStorage.setItem("data", JSON.stringify(store));
  };

  handleEdit = (id) => {
    const foodToEdit = this.state.data.find((item) => item.id === id);
    this.setState({
      name: foodToEdit.name,
      price: foodToEdit.price,
      desc: foodToEdit.desc,
      isEditing: true,
      editId: id,
    });
  };

  render() {
    return (
      <div className="flex">
        <div className="w-80 h-screen bg-slate-200 p-5">
          <form onSubmit={this.handleSubmit}>
            <input
              autoFocus
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              className="w-full h-10 mb-3 indent-3"
              placeholder="Name"
              type="text"
            />
            <input
              value={this.state.price}
              onChange={(e) => this.setState({ price: e.target.value })}
              className="w-full h-10 mb-3 indent-3"
              placeholder="Price"
              type="number"
            />
            <input
              value={this.state.desc}
              onChange={(e) => this.setState({ desc: e.target.value })}
              className="w-full h-10 mb-3 indent-3"
              placeholder="Desc"
              type="text"
            />
            <button type="submit" className="w-full h-10 mb-3 bg-slate-400">
              {this.state.isEditing ? "Edit" : "Create"}
            </button>
          </form>
        </div>
        <div className="p-5 flex flex-wrap gap-3 flex-1 items-start">
          {this.state.data?.map((food) => (
            <div key={food.id} className="w-72 shadow-md">
              <div className="w-full h-52 bg-slate-100">
                <img
                  src={`https://t4.ftcdn.net/jpg/09/55/39/61/360_F_955396144_D7LpYFGPmFDpHFfgZTbg34D3c4K8S7Su.jpg`}
                  alt=""
                />
              </div>
              <div className="p-4">
                <h3>{food.name}</h3>
                <p className="line-clamp-1">{food.desc}</p>
                <p className="font-medium">{`${food.price} so'm`}</p>
                <div className="mt-3">
                  <button
                    onClick={() => this.handleDelete(food.id)}
                    className="px-4 py-2 text-white bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => this.handleEdit(food.id)}
                    className="px-4 py-2 text-white bg-green-600 ml-2"
                  >
                    Edit
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
