<template>
  <section id="services" class="services section light-background">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>{{ servicesStore.sectionTitle }}</h2>
      <p>{{ servicesStore.sectionDescription }}</p>
    </div>
    
    <!-- Services List -->
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row g-4">
        <div
          v-for="service in servicesStore.services"
          :key="service.id"
          class="col-lg-6"
          :data-aos="'fade-up'"
          :data-aos-delay="service.delay"
        >
          <div class="service-card d-flex">
            <div class="icon flex-shrink-0">
              <i :class="service.icon"></i>
            </div>
            <div>
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useServicesStore } from '../stores/expertiseStore'

export default {
  name: 'Services',
  setup() {
    const servicesStore = useServicesStore()
    return { servicesStore }
  }
}
</script>
