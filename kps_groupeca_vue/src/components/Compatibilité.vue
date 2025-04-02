<template>
  <Slide/>
  <div class="customer-details">
    <div class="profile-card">
      <img :src="customer.image" alt="Profile Picture" class="profile-photo">
      <h2 class="namee">{{ customer.name }}</h2>
      <p>{{ customer.email }}</p>
      <p>User ID: {{ customer.id }}</p>
      <p>Last Activity: {{ customer.lastActivity }}</p>
    </div>

    <div class="details-toggle">
      <button @click="toggleTable('meetings')" :class="{ active: showMeetingsTable }">Recent Meetings</button>
      <button @click="toggleTable('payments')" :class="{ active: showPaymentsTable }">Payment History</button>
    </div>

    <div class="recent-meetings" v-if="showMeetingsTable">
      <h3>Recent Meetings</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Rating</th>
            <th>Report</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="meeting in meetings" :key="meeting.id">
            <td>{{ meeting.date }}</td>
            <td>{{ meeting.rating }}</td>
            <td>{{ meeting.comment }}</td>
            <td>{{ meeting.source }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="payment-history" v-if="showPaymentsTable">
      <h3>Payment History</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Payment Method</th>
            <th>Amount</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in payments" :key="payment.id">
            <td>{{ payment.date }}</td>
            <td>{{ payment.mode }}</td>
            <td>{{ payment.montant }}</td>
            <td>{{ payment.comment }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <button @click="$router.push('/custumers')" class="close-button">Close</button>
  </div>
</template>

<script>
import axios from "axios";
import Slide from './Slide.vue';
export default {
  components: {
    Slide,
  
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      customer: {
        id: this.id,
        name: this.name,
        email: this.email,
        image:  `data:image/png;base64,${this.image}`,
        lastActivity: '15 Feb, 2024'
      },
      meetings: [],
      payments: [],
      showMeetingsTable: true,
      showPaymentsTable: false
    };
  },
  async created() {
    await this.showMeetings();
    await this.showPayments();
  },
  methods: {
    async showMeetings() {
      try {
        
        const response = await axios.get(`http://localhost:3000/encounters/${this.customer.id}`);

        // const response = {
        //   data: [
        //     { id: 1, date: '23-10-2024', rating: '★★★★☆', report: 'Very good', source: 'Dating app' },
        //     { id: 2, date: '24-10-2024', rating: '★★★☆☆', report: 'Average', source: 'Social Media' }
        //   ]
        // };
        this.meetings = response.data;
      } catch (error) {
        console.error('Error fetching meetings:', error);
      }
    },
    async showPayments() {
      try {
        // Replace with actual API call
        const response = await axios.get(`http://localhost:3000/customerPayments/${this.customer.id}`);

        // const response = {
        //   data: [
        //     { id: 1, date: '20-10-2024', method: 'VISA', amount: '$49.00', comment: 'Monthly Subscription' },
        //     { id: 2, date: '20-09-2024', method: 'PayPal', amount: '$29.00', comment: 'One-time Purchase' }
        //   ]
        // };
        this.payments = response.data;
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    },
    toggleTable(table) {
      if (table === 'meetings') {
        this.showMeetingsTable = true;
        this.showPaymentsTable = false;
      } else if (table === 'payments') {
        this.showMeetingsTable = false;
        this.showPaymentsTable = true;
      }
    }
  }
};
</script>

<style scoped>

.namee {
  margin-left: 10px;
}
.customer-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
}

.profile-photo {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.details-toggle {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.details-toggle button {
  padding: 0.5rem 1rem;
  border: 1px solid #5670b2;
  background-color: #fff;
  color: #5670b2;
  border-radius: 4px;
  cursor: pointer;
}

.details-toggle button.active {
  background-color: #5670b2;
  color: #fff;
}

.recent-meetings, .payment-history {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid #ddd;
  padding: 0.5rem;
}

th {
  background-color: #f8f8f8;
}

.close-button {
  padding: 0.5rem 1rem;
  background-color: #5670b2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: center;
}

.close-button:hover {
  background-color: #5670b2;
}
</style>
