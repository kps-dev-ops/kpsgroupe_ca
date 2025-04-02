

<template>
  <div>
    <Slide />
    <link rel="stylesheet" href="https://unpkg.com/@fullcalendar/core@6.1.7/main.min.css">
    <link rel="stylesheet" href="https://unpkg.com/@fullcalendar/daygrid@6.1.7/main.min.css">
    <link rel="stylesheet" href="https://unpkg.com/@fullcalendar/timegrid@6.1.7/main.min.css">
    <link rel="stylesheet" href="https://unpkg.com/@fullcalendar/list@6.1.7/main.min.css">

    <h1>Events</h1>

    <div ref="calendar"></div>

    <div v-if="showEventModal" class="modal">
      <h3>{{ isEditing ? 'Edit Event' : 'Add New Event' }}</h3>
      <form @submit.prevent="submitEventForm">
        <label>Event ID: <input v-model="eventData.id" type="number" required /></label><br />
        <label>Name: <input v-model="eventData.name" type="text" required /></label><br />
        <label>Date: <input v-model="eventData.date" type="date" required /></label><br />
        <label>Duration (minutes): <input v-model="eventData.duration" type="number" required /></label><br />
        <label>Max Participants: <input v-model="eventData.max_participants" type="number" required /></label><br />
        <label>Location X: <input v-model="eventData.location_x" type="text" required /></label><br />
        <label>Location Y: <input v-model="eventData.location_y" type="text" required /></label><br />
        <label>Type: <input v-model="eventData.type" type="text" required /></label><br />
        <label>Location Name: <input v-model="eventData.location_name" type="text" required /></label><br />
        <label>Employee ID: <input v-model="eventData.employee_id" type="number" required /></label><br />
        <label>Customer: 
          <button type="button" @click="showCustomerList">Choose Customer</button>
          <span v-if="selectedCustomer">{{ selectedCustomer.name }}</span>
        </label><br />
        <button type="submit">{{ isEditing ? 'Update Event' : 'Create Event' }}</button>
      </form>
    </div>

    <div v-if="showClientModal" class="modal">
      <h3>Select Client</h3>
      <ul>
        <li v-for="client in clients" :key="client.id" @click="selectClient(client.id)">
          {{ client.name }}
        </li>
      </ul>
      <button @click="showClientModal = false">Close</button>
    </div>


    <div class="deux">
      <div id="map"></div>
      <table>
        <thead>
          <tr> 
            <th>Date</th>
            <th>Detail</th>
            <th>Location</th>
            <th>Max Participant</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in coordinates" :key="event.id">
            <td>{{ event.date }}</td>
            <td>{{ event.type }}</td>
            <td>{{ event.location_name }}</td>
            <td>{{ event.max_participants }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import Slide from './Slide.vue';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

export default {
  components: {
    Slide
  },
  data() {
    return {
      coordinates: [],
      calendar: null,
      showEventModal: false,
      showClientModal: false,
      isEditing: false,
      eventData: {
        id: null,
        name: '',
        date: '',
        duration: 0,
        max_participants: 0,
        location_x: '',
        location_y: '',
        type: '',
        location_name: '',
        employee_id: null
      },
      clients: [],
      selectedCustomer: null
    };
  },
  methods: {
  async fetchEvents() {
    try {
      const response = await axios.get('http://localhost:3000/events');
      this.coordinates = response.data;
      this.calendar.removeAllEvents();
      response.data.forEach(event => {
        this.calendar.addEvent({
          id: event.id,
          title: event.type,
          start: event.date,
          extendedProps: {
            location_name: event.location_name,
            max_population: event.max_participants,
            duration: event.duration,
            location_x: event.location_x,
            location_y: event.location_y,
            employee_id: event.employee_id
          }
        });
      });
      this.updateMap();
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  },

  async fetchClients() {
    try {
      const response = await axios.get('http://localhost:3000/customers');
      this.clients = response.data;
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  },

  showCustomerList() {
    this.fetchClients();
    this.showClientModal = true;
  },

  async addEvent(eventData) {
    try {
      await axios.post(`http://localhost:3000/events`, eventData);
      this.fetchEvents();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  },

  async updateEvent(eventId, updatedData) {
    try {
      await axios.put(`http://localhost:3000/events/${eventId}`, updatedData);
      this.fetchEvents();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  },

  async deleteEvent(eventId) {
    try {
      await axios.delete(`http://localhost:3000/events/${eventId}`);
      this.fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  },

  handleDateClick(info) {
    this.resetEventData();
    this.eventData.date = info.dateStr;
    this.showEventModal = true;
    this.isEditing = false;
  },

  handleEventClick(info) {
    const eventObj = info.event;
    this.eventData = {
      id: eventObj.id,
      name: eventObj.title,
      date: eventObj.startStr,
      duration: eventObj.extendedProps.duration || 0,
      max_participants: eventObj.extendedProps.max_population || 0,
      location_x: eventObj.extendedProps.location_x || '',
      location_y: eventObj.extendedProps.location_y || '',
      type: eventObj.title,
      location_name: eventObj.extendedProps.location_name || '',
      employee_id: eventObj.extendedProps.employee_id || null
    };
    this.showEventModal = true;
    this.isEditing = true;
  },

  resetEventData() {
    this.eventData = {
      id: null,
      name: '',
      date: '',
      duration: 0,
      max_participants: 0,
      location_x: '',
      location_y: '',
      type: '',
      location_name: '',
      employee_id: null
      
    };
  },
  async submitEventForm() {
  try {
    console.log('Submitting event data:', this.eventData);
    if (this.isEditing) {
      await this.updateEvent(this.eventData.id, this.eventData);
    } else {
      await this.addEvent(this.eventData);
    }
    console.log('Event submitted successfully');
    this.showEventModal = false;
  } catch (error) {
    console.error('Error submitting event form:', error);
  }
},



selectClient(clientId) {
  this.selectedCustomer = this.clients.find(client => client.id === clientId); 
  this.eventData.employee_id = clientId;
  this.showClientModal = false;
},


  updateMap() {
    if (this.coordinates.length > 0) {
      const lat = parseFloat(this.coordinates[0].location_x);
      const lng = parseFloat(this.coordinates[0].location_y);
      const map = L.map('map').setView([lat, lng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      this.coordinates.forEach((coord) => {
        const lat = parseFloat(coord.location_x);
        const lng = parseFloat(coord.location_y);
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`<b>${coord.location_name}</b><br>${coord.type}<br>${coord.date}`);
      });
    }
  }
},

  async mounted() {
    this.calendar = new Calendar(this.$refs.calendar, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialView: 'dayGridMonth',
      editable: true,
      selectable: true,
      dateClick: this.handleDateClick,
      eventClick: this.handleEventClick,
      events: [] 
    });
    this.calendar.render();
    await this.fetchEvents();
  }
};
</script>

<style scoped>
.fc .fc-daygrid-day {
  height: 50px; 
  width: 50px;
}

.fc .fc-daygrid-day-number {
  font-size: 12px;
}

.fc .fc-toolbar-title {
  font-size: 16px; 
}

#calendar {
  max-width: 600px;
  margin: 0 auto;
}

#map {
  width: 100%;
  height: 500px;
  z-index: 1;
}

.banne {
  top: 0;
  z-index: 10;
  background-color: #f2f2f2;
  width: 100%;
  margin-top: -100;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.deux {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

#map {
  flex: 1;
  height: 500px;
}

table {
  border-collapse: collapse;
  width: 50%;
  height: 100px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #62b8f1;
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

.modal h3 {
  margin-bottom: 20px;
}

.modal form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal ul {
  list-style: none;
  padding: 0;
}

.modal ul li {
  padding: 10px;
  cursor: pointer;
}

.modal ul li:hover {
  background: #f0f0f0;
}
</style>
