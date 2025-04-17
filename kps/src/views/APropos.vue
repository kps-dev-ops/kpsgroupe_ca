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

<style scoped>

.about {
  padding: 4rem 1rem;
  background: white;

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .about-meta {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: #45A79E;
    margin-bottom: 1rem;
  }

  .about-description {
    font-size: 1.1rem;
    color: #555;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .feature-list-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    p {
      flex: 1 1 100%;
      background-color: #fff;
      border-left: 4px solid;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }
  }

  .image-wrapper {
    position: relative;
    display: flex;
    justify-content: center;

    .images {
      position: relative;

      .main-image {
        width: 100%;
        border-radius: 1rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }

      /* .small-image {
        position: absolute;
        bottom: -20px;
        right: -20px;
        width: 150px;
        border: 4px solid #fff;
        border-radius: 1rem;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      } */
    }

    /* .experience-badge {
      position: flex;
      top: -30px;
      left: -30px;
      background: linear-gradient(135deg, #45A79E, #40a096);
      color: #fff;
      padding: 1rem 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
      max-width: 250px;
      h3 {
        font-size: 2rem;
        margin: 0;
        span {
          font-size: 1rem;
          font-weight: 400;
        }
      }
      p {
        font-size: 0.9rem;
        margin: 0.5rem 0 0 0;
      }
    } */
  }

  @media (max-width: 768px) {
    .images .small-image {
      display: none;
    }

    .experience-badge {
      position: static;
      margin-top: 1rem;
    }
  }
}


</style>