<template>
    <section id="clients" class="clients section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          :modules="[Autoplay, Pagination]"
          :loop="true"
          :watchSlidesProgress="true"
          :speed="600"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          :breakpoints="breakpoints"
          class="clients-swiper"
        >
          <SwiperSlide v-for="(logo, index) in store.logos" :key="index">
            <img :src="logo" class="img-fluid" alt="Client logo" />
          </SwiperSlide>
        </Swiper>
        <div class="swiper-pagination mt-4"></div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { useClientsStore } from '../stores/useClientsStore'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Autoplay, Pagination } from 'swiper/modules'
  
  import 'swiper/css'
  import 'swiper/css/pagination'
  
  const store = useClientsStore()
  
  const breakpoints = {
    320: { slidesPerView: 2, spaceBetween: 40 },
    480: { slidesPerView: 3, spaceBetween: 60 },
    640: { slidesPerView: 4, spaceBetween: 80 },
    992: { slidesPerView: 6, spaceBetween: 120 }
  }
  </script>
  