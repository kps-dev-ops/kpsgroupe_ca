 
<template>
  <Slide />
  <div class="customer-list">
    <div class="header">
      <h2>Customers List</h2>
      <p>You have total {{ totalCustomers }} customers.</p>

      <div class="actions">
        <select v-model="bulkAction" class="bulk-action-select">
          <option value="">Bulk Action</option>
          <option value="delete">Delete</option>
          <option value="export">Export</option>
        </select>
        <button @click="applyBulkAction" class="apply-button">Apply</button>
        <button @click="exportCustomers" class="export-button">Export</button>
        <button @click="showAddCustomerModal" class="add-button">Add Customer</button>
      </div>

      <input
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher par nom ou email..."
        class="search-bar"
      />
    </div>

    <table>
      <thead>
        <tr>
          <th><input type="checkbox" @click="selectAll($event)" /></th>
          <th>Customer</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Payment Methods</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in filteredCustomers" :key="customer.id">
          <td><input type="checkbox" v-model="customer.checked" /></td>
          <td>
            <div class="customer-profile">
              <div class="avatar" :style="{ backgroundColor: customer.color }">
                {{ getInitials(customer.name) }}
              </div>
              <span>{{ customer.name }}</span>
            </div>
          </td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone_number }}</td>
          <td>
            <div v-if="customer.paymentMethods.length">
              <div v-for="method in customer.paymentMethods" :key="method.id">
                <img :src="getPaymentIcon(method.mode)" alt="Payment Method" class="payment-icon" />
              </div>
            </div>
            <span v-else>No Payment Methods</span>
          </td>



          <td>
            <button @click="showCustomerDetails(customer)">View Details</button>
            <button @click="showEditCustomerModal(customer)">Edit</button>
            <button @click="deleteCustomer(customer)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <CustumerDetail
    v-if="selectedCustomer"
    :customer="selectedCustomer"
    @close="selectedCustomer = null" />
   
    <div v-if="isAddCustomerModalVisible" class="modal">
      <div class="modal-content">
        <h3>Add Customer</h3>
        <label>Name:
          <input v-model="newCustomer.name" />
        </label>
        <label>Email:
          <input v-model="newCustomer.email" />
        </label>
        <label>Phone:
          <input v-model="newCustomer.phone" />
        </label>
        <label>Payment Method:
          <select v-model="newCustomer.payment">
            <option value="visa">Visa</option>
            <option value="mastercard">MasterCard</option>
          </select>
        </label>
        <label>Color:
          <input type="color" v-model="newCustomer.color" />
        </label>
        <button @click="addCustomer">Add</button>
        <button @click="isAddCustomerModalVisible = false">Cancel</button>
      </div>
    </div>

    
    <div v-if="isEditCustomerModalVisible" class="modal">
      <div class="modal-content">
        <h3>Edit Customer</h3>
        <label>Name:
          <input v-model="editingCustomer.name" />
        </label>
        <label>Email:
          <input v-model="editingCustomer.email" />
        </label>
        <label>Phone:
          <input v-model="editingCustomer.phone" />
        </label>
        <label>Payment Method:
          <select v-model="editingCustomer.payment">
            <option value="visa">Visa</option>
            <option value="mastercard">MasterCard</option>
          </select>
        </label>
        <label>Color:
          <input type="color" v-model="editingCustomer.color" />
        </label>
        <button @click="updateCustomer">Save</button>
        <button @click="isEditCustomerModalVisible = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Slide from './Slide.vue';
import visaIcon from '@/assets/carte.jfif';
import mastercardIcon from '@/assets/fofo.jfif';
import CustumerDetail from './CustumerDetail.vue';

export default {
  components: {
    Slide,
    CustumerDetail
  },
  data() {
    return {
      searchQuery: '',
      bulkAction: '',
      customers: [],
      payment: [],
      isAddCustomerModalVisible: false,
      isEditCustomerModalVisible: false,
      newCustomer: {
        name: '',
        email: '',
        phone: '',
        payment: 'visa',
        color: '#ffffff'
      },
      editingCustomer: {},
      selectedCustomer: null
    };
  },
  computed: {
    filteredCustomers() {
      return this.customers.filter(customer =>
        customer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    totalCustomers() {
      return this.customers.length;
    }
  },
  async created() {
    await this.fetchCustomers();
    console.log(this.payment);
  },
  methods: {
    getInitials(name) {
      if (!name) return ''; 
      return name.split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase();
    },

    getPaymentIcon(paymentMethod) {
      console.log(paymentMethod);
      switch(paymentMethod) {
        
        case 'Bank Transfer':
          return visaIcon;
        case 'Credit Card':
          return mastercardIcon;
        default:
          return visaIcon;
      }
    },
    async fetchCustomers() {
  try {
    const response = await axios.get('http://localhost:3000/customers');
    const customers = response.data;

    this.customers = [];

    const paymentRequests = customers.map(customer =>
      axios.get(`http://localhost:3000/customerPayments/${customer.id}`)
    );

    const paymentsResponses = await Promise.all(paymentRequests);

    customers.forEach((customer, index) => {
      
      customer.paymentMethods = paymentsResponses[index].data;

     
      if (customer.paymentMethods.length > 0) {
        customer.paymentMethods = [customer.paymentMethods[0]];
      } else {
        customer.paymentMethods = [];
      }
    });

    this.customers = [...customers];
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
},



    async showCustomerDetails(customer) {
      if (customer.id && customer.name && customer.email) {
        this.$router.push({
          name: 'CustomerDetail',
          params: {
            id: customer.id,
            name: customer.name,
            email: customer.email
          }
        });
      } else {
        console.error('Customer details are missing or invalid');
      }
    },
    async deleteCustomer(customer) {
      try {
        //await axios.delete(`http://localhost:3000/customers/${customer.id}`);
        this.customers = this.customers.filter(c => c.id !== customer.id);
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    },
    async addCustomer() {
      try {
        console.error('Error adding customer:', error);
        // const response = await axios.post('http://localhost:3000/customers', this.newCustomer);
     
        // this.customers.push(response.data);
        // this.isAddCustomerModalVisible = false;
      } catch (error) {
        console.error('Error adding customer:', error);
      }
    },
    async updateCustomer() {
      try {
        console.error('Error adding customer:', error);
        // await axios.put(`http://localhost:3000/customers/${this.editingCustomer.id}`, this.editingCustomer); 
        // const index = this.customers.findIndex(c => c.id === this.editingCustomer.id);
        // if (index !== -1) {
        //   this.customers.splice(index, 1, { ...this.editingCustomer });
        // }
        // this.isEditCustomerModalVisible = false;
      } catch (error) {
        console.error('Error updating customer:', error);
      }
    },
    exportCustomers() {
      const csvContent = [
        ['Name', 'Email', 'Phone', 'Payment Method'],
        ...this.customers.map((customer) => [
          customer.name,
          customer.email,
          customer.phone,
          customer.payment,
        ]),
      ]
        .map((e) => e.join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'customers.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    selectAll(event) {
      this.filteredCustomers.forEach(customer => customer.checked = event.target.checked);
    },
    applyBulkAction() {
      if (this.bulkAction === 'delete') {
        this.filteredCustomers.filter(customer => customer.checked).forEach(customer => this.deleteCustomer(customer));
      } else if (this.bulkAction === 'export') {
        this.exportCustomers();
      }
    },
    showEditCustomerModal(customer) {
      this.editingCustomer = { ...customer };
      this.isEditCustomerModalVisible = true;
    },
    showAddCustomerModal() {
      this.newCustomer = {
        name: '',
        email: '',
        phone: '',
        payment: 'visa',
        color: '#ffffff'
      };
      this.isAddCustomerModalVisible = true;
    }
  }
};
</script>



<style scoped>

.customer-list {
  padding: 20px;
  background-color: #f9f9f9; 
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}


.header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.header h2 {
  margin: 0;
  color: #333;
}

.header .actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bulk-action-select,
.apply-button,
.export-button,
.add-button,
.search-bar {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.bulk-action-select {
  min-width: 150px;
}

.apply-button {
  background-color: #5670b2;
  color: #fff;
  border: none;
}

.export-button,
.add-button {
  background-color: #28a745;
  color: #fff;
  border: none;
}

.search-bar {
  width: 250px;
  border: 1px solid #ddd;
}

.search-bar:focus {
  border-color: #5670b2;
  outline: none;
}

.apply-button:hover,
.export-button:hover,
.add-button:hover {
  background-color: #5670b2;
}

/* Tableau */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f3f3f3;
  font-weight: bold;
}

.customer-profile {
  display: flex;
  align-items: center;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #dcdcdc; 
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
}


.payment-icon {
  width: 20px;
  height: 20px;
}


.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.modal-content h3 {
  margin: 0 0 15px 0;
  color: #333;
}

.modal-content label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #555;
}

.modal-content input,
.modal-content select {
  width: calc(100% - 20px);
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  transition: border-color 0.3s ease;
}

.modal-content input:focus,
.modal-content select:focus {
  border-color: #5670b2; 
  outline: none;
}

.modal-content button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease;
}

.modal-content button:first-of-type {
  background-color: #5670b2;
  color: #fff;
}

.modal-content button:last-of-type {
  background-color: #dc3545;
  color: #fff;
}

.modal-content button:hover {
  background-color: #5670b2; 
}

.modal-content button:last-of-type:hover {
  background-color: #c82333; 
}
</style>
