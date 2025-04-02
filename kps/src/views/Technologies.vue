<template>
    <section id="Technologies" class="features section">
      <div class="container section-title" data-aos="fade-up">
        <h2>Technologies</h2>
        <p>{{ store.intro }}</p>
      </div>
  
      <div class="container">
        <div class="d-flex justify-content-center">
          <ul class="nav nav-tabs" data-aos="fade-up" data-aos-delay="100">
            <li class="nav-item" v-for="tab in store.tabs" :key="tab.id">
              <a
                class="nav-link"
                :class="{ active: store.activeTab === tab.id }"
                data-bs-toggle="tab"
                :data-bs-target="`#${tab.id}`"
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
  