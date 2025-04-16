<template>
  <section id="about" class="about section">
    <div class="container" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
      <div class="row gy-4 align-items-center justify-content-between">
        <div class="col-xl-5" data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-in-out">
          <span class="about-meta" style="font-size: 32px;">{{ aProposStore.title }}</span>
          <h2 class="about-title"></h2>
          <p class="about-description">{{ aProposStore.description }}</p>

          <div class="row feature-list-wrapper">
            <p class="about-description">{{ aProposStore.additionalInfo }}</p>
          </div>
        </div>

        <div class="col-xl-6" data-aos="zoom-in-left" data-aos-delay="300" data-aos-duration="1000" data-aos-easing="ease-in-out">
          <div class="image-wrapper">
            <div class="images position-relative">
              <img :src="aProposStore.imageUrl" alt="Business Meeting" class="img-fluid main-image rounded-4">
              <img :src="aProposStore.smallImageUrl" alt="Team Discussion" class="img-fluid small-image rounded-4">
            </div>
            <div class="experience-badge floating" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
              <h3>{{ aProposStore.experienceYears }}+ <span>Années</span></h3>
              <p>Expérience dans le domaine des services aux entreprises</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useAProposStore } from '../stores/aProposStore'

export default {
  name: 'APropos',
  setup() {
    // Utilisation du store
    const aProposStore = useAProposStore()
    return { aProposStore }
  }
}
</script>
