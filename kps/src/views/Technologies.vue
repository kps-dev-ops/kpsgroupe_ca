<template>
    <section id="Technologies" class="features section">
      <div class="container section-title" data-aos="fade-up">
        <h2 style="color:#5E5325 ;">Technologies</h2>
        <p>{{ store.intro }}</p>
      </div>
  
      <div class="container">
        <!-- Ajout du wrapper stylé -->
        <div class="d-flex justify-content-center">
  <div class="nav-wrapper">
    <ul class="nav nav-pills">
      <li class="nav-item" v-for="tab in store.tabs" :key="tab.id">
        <a
          class="nav-link"
          :class="{ active: store.activeTab === tab.id }"
          href="#"
          @click.prevent="store.activeTab = tab.id"
        >
          {{ tab.title }}
        </a>
      </li>
    </ul>
  </div>
</div>

  
        <div class="tab-content" data-aos="fade-up" data-aos-delay="200">
          <div
            v-for="tab in store.tabs"
            :key="tab.id"
            class="tab-pane fade"
            :class="{ show: store.activeTab === tab.id, active: store.activeTab === tab.id }"
            :id="tab.id"
          >
            <div class="row">
              <div class="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                <h3>{{ tab.heading }}</h3>
                <p class="fst-italic">{{ tab.description }}</p>
                <ul>
                  <li v-for="(point, idx) in tab.points" :key="idx">
                    <i class="bi bi-check2-all"></i> <span>{{ point }}</span>
                  </li>
                </ul>
              </div>
              <div class="col-lg-6 order-1 order-lg-2 text-center">
                <img :src="tab.image" :alt="tab.title" class="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { useTechnologieStore } from '../stores/useTechnologieStore'
  const store = useTechnologieStore()
  </script>
  
  <style scoped>
  .nav-wrapper {
  background: #f8f9fa;
  border-radius: 60px;
  padding: 6px 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* Onglets */
.nav-pills {
  margin: 0;
  padding: 0;
  display: flex;
  gap: 10px;
}

.nav-pills .nav-item {
  list-style: none;
}

.nav-pills .nav-link {
  border-radius: 50px;
  padding: 8px 18px;
  color: #4e342e;
  font-weight: 500;
  transition: background-color 0.3s ease;
  background-color: transparent;
  white-space: nowrap;
}

.nav-pills .nav-link.active {
  background-color: #45A79E;
  color: white;
}
.nav-pills .nav-link:hover {
  background-color: #71bab3;
}

  </style>
  