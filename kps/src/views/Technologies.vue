<template>
    <section id="Technologies" class="features section">
      <div class="container section-title" data-aos="fade-up">
        <h2 style="color:#5E5325 ;">Technologies</h2>
        <p>{{ store.intro }}</p>
      </div>
  
      <div class="container">
        <!-- Ajout du wrapper stylé -->
        <div class="nav-wrapper d-flex justify-content-center">
          <ul class="nav nav-pills" data-aos="fade-up" data-aos-delay="100">
            <li class="nav-item" v-for="tab in store.tabs" :key="tab.id">
              <a
                class="nav-link"
                :class="{ active: store.activeTab === tab.id }"
                href="#"
                @click.prevent="store.activeTab = tab.id"
              >
                <h4>{{ tab.title }}</h4>
              </a>
            </li>
          </ul>
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
  /* Wrapper avec forme circulaire */
  .nav-wrapper {
    background: #f8f9fa;
    border-radius: 60px;
    padding: 10px 20px;
    display: inline-block;
  }
  
  /* Style des onglets */
  .nav-pills .nav-link {
    border-radius: 50px;
    padding: 10px 20px;
    color: #4e342e;
    font-weight: bold;
    transition: 0.3s ease;
    background-color: transparent;
  }
  
  .nav-pills .nav-link.active {
    background-color: #C5A070;
    color: white;
  }
  </style>
  