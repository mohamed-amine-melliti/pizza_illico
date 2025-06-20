// Order.js
export class Order {
    constructor({
      id = null,
      customer_name = '',
      phone = '',
      address = '',
      items = [],
      total_price = 0,
      status = 'pending',
      created_at = null,
      updated_at = null,
    }) {
      this.id = id;
      this.customer_name = customer_name;
      this.phone = phone;
      this.address = address;
      this.items = items;
      this.total_price = total_price;
      this.status = status;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  
    // Method to calculate total price based on items
    calculateTotal() {
      this.total_price = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  
    // Example method to add an item to the order
    addItem(item) {
      this.items.push(item);
      this.calculateTotal();
    }
  
    // Example method to update order status
    updateStatus(newStatus) {
      this.status = newStatus;
    }
  
    // Example method to update the address
    updateAddress(newAddress) {
      this.address = newAddress;
    }
  
    // Method to format the order to be sent to the backend API or database
    toJSON() {
      return {
        customer_name: this.customer_name,
        phone: this.phone,
        address: this.address,
        items: this.items,
        total_price: this.total_price,
        status: this.status,
        created_at: this.created_at,
        updated_at: this.updated_at,
      };
    }
  
    // Static method to convert data from API response to an Order instance
    static fromJSON(data) {
      return new Order({
        id: data.id,
        customer_name: data.customer_name,
        phone: data.phone,
        address: data.address,
        items: data.items,
        total_price: data.total_price,
        status: data.status,
        created_at: data.created_at,
        updated_at: data.updated_at,
      });
    }
  }
  