<template>
  <div>
    <Headers />
    
    <!-- Section Hero -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6" data-aos="fade-right">
            <div class="hero-content">
              <div class="company-badge mb-3">
                Nos Formations Professionnelles
              </div>
              <h1 class="hero-title mb-4">
                Développez vos Compétences avec nos Formations
              </h1>
              <p class="hero-description mb-4">
                Découvrez notre catalogue de formations professionnelles conçues pour vous accompagner dans votre montée en compétences et votre évolution de carrière.
              </p>
            </div>
          </div>
          <div class="col-lg-6 text-center" data-aos="zoom-in">
            <div class="hero-image">
              <img :src="heroImageSrc" alt="Formations Professionnelles" class="img-fluid rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section des formations -->
    <section id="courses-section" class="courses-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center mb-5">
            <h2 class="section-title">Nos Formations</h2>
            <p class="section-subtitle">Explorez notre catalogue de formations pour développer vos compétences</p>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Chargement...</span>
          </div>
          <p class="mt-3">Chargement des formations...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="alert alert-danger text-center" role="alert">
          <i class="bi bi-exclamation-triangle me-2"></i>
          {{ error }}
          <button @click="fetchCourses" class="btn btn-outline-danger ms-3">
            Réessayer
          </button>
        </div>

        <!-- Formations Grid -->
        <div v-else-if="courses.length" class="row">
          <div
            v-for="course in paginatedCourses"
            :key="course.id"
            class="col-lg-4 col-md-6 mb-4"
            data-aos="fade-up"
          >
            <div class="course-card h-100">
              <div class="course-image">
                <img
                  :src="course.image || '/src/assets/images/default-course.jpg'"
                  :alt="course.name"
                  class="img-fluid"
                  @error="handleImageError"
                />
                <div v-if="course.on_sale" class="sale-badge">
                  Promo
                </div>
              </div>
              
              <div class="course-content">
                <div class="course-meta mb-2">
                  <span v-if="course.categories && course.categories.length" class="category-badge">
                    {{ course.categories[0].name }}
                  </span>
                  <span class="duration">
                    <i class="bi bi-clock me-1"></i>
                    {{ course.duration || 'Durée variable' }}
                  </span>
                </div>
                
                <h5 class="course-title">{{ course.name }}</h5>
                
                <div class="instructor-info mb-3">
                  <img
                    :src="course.instructor?.avatar || '/src/assets/images/default-avatar.jpg'"
                    :alt="course.instructor?.name || 'Formateur'"
                    class="instructor-avatar"
                    @error="handleAvatarError"
                  />
                  <div class="instructor-details">
                    <span class="instructor-name">{{ course.instructor?.name || 'Formateur Expert' }}</span>
                  </div>
                </div>
                
                <div class="course-rating mb-3">
                  <div class="stars">
                    <i
                      v-for="n in 5"
                      :key="n"
                      :class="['bi', n <= (course.rating || 0) ? 'bi-star-fill' : 'bi-star']"
                    ></i>
                  </div>
                  <span class="rating-text">({{ course.rating || 0 }})</span>
                </div>
                
                <div class="course-price mb-3">
                  <span v-if="course.on_sale" class="original-price">
                    {{ formatPrice(course.origin_price || course.price) }}
                  </span>
                  <span class="current-price">
                    {{ formatPrice(course.sale_price || course.price) }}
                  </span>
                </div>
                
                <div class="course-actions">
                  <button
                    @click="openCourseDetails(course)"
                    class="btn btn-outline-primary me-2"
                  >
                    <i class="bi bi-eye me-1"></i>
                    Détails
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-5">
          <i class="bi bi-book display-1 text-muted"></i>
          <h4 class="mt-3">Aucune formation disponible</h4>
          <p class="text-muted">Les formations seront bientôt disponibles.</p>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="row mt-5">
          <div class="col-12">
            <nav aria-label="Navigation des formations">
              <ul class="pagination justify-content-center">
                <li :class="['page-item', { disabled: currentPage === 1 }]">
                  <button
                    class="page-link"
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1"
                  >
                    Précédent
                  </button>
                </li>
                
                <li
                  v-for="page in totalPages"
                  :key="page"
                  :class="['page-item', { active: page === currentPage }]"
                >
                  <button class="page-link" @click="changePage(page)">
                    {{ page }}
                  </button>
                </li>
                
                <li :class="['page-item', { disabled: currentPage === totalPages }]">
                  <button
                    class="page-link"
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                  >
                    Suivant
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal des détails -->
<div v-if="showModal" 
     class="pers" 
     style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;justify-content:center;align-items:center;z-index:9999;"
     @click="closeModal">
      <div class="content-pers" @click.stop>
        <div class="modal-header">
          <h4 class="modal-title">
            {{ selectedCourse?.name || 'Détails de la formation' }}
          </h4>
          <button class="modal-close" @click="closeModal">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <!-- Loading des détails -->
          <div v-if="isLoadingDetails" class="text-center py-4">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="mt-2">Chargement des détails...</p>
          </div>
          
          <!-- Erreur des détails -->
          <div v-else-if="detailsError" class="alert alert-danger">
            {{ detailsError }}
          </div>
          
          <!-- Contenu des détails -->
          <div v-else-if="selectedCourse">
            <div class="course-detail-image mb-4">
              <img
                :src="selectedCourse.image || '/src/assets/images/default-course.jpg'"
                :alt="selectedCourse.name"
                class="img-fluid rounded"
              />
            </div>
            
            <div class="course-detail-info">
              <div class="row mb-4">
                <div class="col-md-6">
                  <h6><i class="bi bi-person me-2"></i>Formateur</h6>
                  <p>{{ selectedCourse.meta_data?._lp_course_author?.name || 'Expert' }}</p>
                </div>
                <div class="col-md-6">
                  <h6><i class="bi bi-clock me-2"></i>Durée</h6>
                  <p>{{ selectedCourse.meta_data?._lp_duration || 'Durée variable' }}</p>
                </div>
              </div>
              
              <div class="row mb-4">
                <div class="col-md-6">
                  <h6><i class="bi bi-people me-2"></i>Étudiants</h6>
                  <p>{{ selectedCourse.meta_data?._lp_students || 0 }} inscrits</p>
                </div>
                <div class="col-md-6">
                  <h6><i class="bi bi-award me-2"></i>Niveau</h6>
                  <p>{{ selectedCourse.meta_data?._lp_level || 'Tous niveaux' }}</p>
                </div>
              </div>
              
              <div class="mb-4">
                <h6>Description</h6>
                <div v-html="selectedCourse.short_description || selectedCourse.description || 'Description non disponible'"></div>
              </div>
              
              <div v-if="selectedCourse.curriculum?.sections?.length" class="mb-4">
                <h6>Contenu du cours</h6>
                <div class="curriculum">
                  <div
                    v-for="section in selectedCourse.curriculum.sections"
                    :key="section.id"
                    class="curriculum-section mb-3"
                  >
                    <h6 class="section-title">{{ section.title }}</h6>
                    <ul class="list-unstyled">
                      <li
                        v-for="item in section.items"
                        :key="item.id"
                        class="curriculum-item"
                      >
                        <i :class="getItemIcon(item.type)" class="me-2"></i>
                        {{ item.title }}
                        <span v-if="item.duration" class="text-muted ms-2">
                          ({{ formatDurationFromString(item.duration) }})
                        </span>
                        <span v-if="item.preview" class="badge bg-secondary ms-2">Aperçu</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn btn-secondary me-2" @click="closeModal">
            Fermer
          </button>
          <button
            v-if="selectedCourse"
            @click="goToCourse(selectedCourse.slug || selectedCourse.id)"
            class="btn btn-primary"
          >
            <i class="bi bi-external-link me-1"></i>
            Aller à la formation
          </button>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import Headers from '../components/Headers.vue'
import Footer from '../components/Footer.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: 'FormationsPage',
  components: {
    Headers,
    Footer
  },
  setup() {
    // Image hero
    const heroImageSrc = '/src/assets/img/formation-qualifiante-certifiante.jpg'

    // État des formations
    const courses = ref([])
    const isLoading = ref(true)
    const error = ref(null)

    // Pagination
    const currentPage = ref(1)
    const itemsPerPage = 6
    const totalPages = computed(() => Math.ceil(courses.value.length / itemsPerPage))

    // Formations paginées
    const paginatedCourses = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return courses.value.slice(start, end)
    })

    // Modal pour détails de formation
    const selectedCourse = ref(null)
    const showModal = ref(false)
    const isLoadingDetails = ref(false)
    const detailsError = ref(null)

    // Fonction pour récupérer les formations
    const fetchCourses = async () => {
      isLoading.value = true
      error.value = null

      try {
        const response = await fetch('https://gotolearn.com/wp-json/learnpress/v1/courses')

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`)
        }

        const data = await response.json()
        courses.value = Array.isArray(data) ? data : []

      } catch (err) {
        console.error('Erreur lors du chargement des formations:', err)
        error.value = 'Impossible de charger les formations. Veuillez réessayer plus tard.'
      } finally {
        isLoading.value = false
      }
    }

    // Fonction pour récupérer les détails d'une formation
    const fetchCourseDetails = async (courseKey) => {
      isLoadingDetails.value = true
      detailsError.value = null

      try {
        const response = await fetch(`https://gotolearn.com/wp-json/learnpress/v1/courses/${courseKey}`)

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`)
        }

        const data = await response.json()
        selectedCourse.value = data

      } catch (err) {
        console.error('Erreur lors du chargement des détails:', err)
        detailsError.value = 'Impossible de charger les détails de la formation.'
      } finally {
        isLoadingDetails.value = false
      }
    }

    // Fonction pour changer de page
    const changePage = (page) => {
      currentPage.value = page
      document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })
    }

    // Fonction pour ouvrir le modal avec chargement des détails
    const openCourseDetails = async (course) => {
      showModal.value = true
      selectedCourse.value = null
      document.body.style.overflow = 'hidden'

      // Charger les détails complets
      await fetchCourseDetails(course.id)
    }

    // Fonction pour fermer le modal
    const closeModal = () => {
      showModal.value = false
      selectedCourse.value = null
      detailsError.value = null
      document.body.style.overflow = 'auto'
    }

    // Fonction pour rediriger vers GoToLearn
    const goToCourse = (courseSlug) => {
      window.open(`https://gotolearn.com/courses/${courseSlug}/`, '_blank')
    }

    // Fonction pour gérer les erreurs d'image
    const handleImageError = (e) => {
      if (e.target) {
        e.target.src = '/src/assets/images/default-course.jpg'
      }
    }

    // Fonction pour gérer les erreurs d'avatar
    const handleAvatarError = (e) => {
      if (e.target) {
        e.target.src = '/src/assets/images/default-avatar.jpg'
      }
    }

    // Formater le prix
    const formatPrice = (price) => {
      if (!price || price === '0') return 'Gratuit'
      return typeof price === 'string' ? `€${price}` : `€${price.toFixed(2)}`
    }

    // Formater la durée depuis une chaîne
    const formatDurationFromString = (duration) => {
      if (!duration) return 'Durée variable'
      return duration
    }

    // Obtenir l'icône pour un type d'élément
    const getItemIcon = (type) => {
      switch (type) {
        case 'lp_lesson':
          return 'bi bi-play-circle text-primary'
        case 'lp_quiz':
          return 'bi bi-question-circle text-warning'
        default:
          return 'bi bi-file-text text-secondary'
      }
    }

    // Initialiser AOS et récupérer les formations au chargement
    onMounted(() => {
      AOS.init({
        once: true,
        offset: 120,
        duration: 800,
        easing: 'ease-in-out'
      })
      fetchCourses()
    })

    return {
      heroImageSrc,
      courses,
      isLoading,
      error,
      currentPage,
      totalPages,
      paginatedCourses,
      selectedCourse,
      showModal,
      isLoadingDetails,
      detailsError,
      fetchCourses,
      changePage,
      openCourseDetails,
      closeModal,
      goToCourse,
      handleImageError,
      handleAvatarError,
      formatPrice,
      formatDurationFromString,
      getItemIcon
    }
  }
}
</script>

<style scoped>
:root {
  --color-light-blue: #d6e7fd;
  --color-teal: #45A79E;
  --color-dark-brown: #45A79E;
  --color-cream: #fdf7ef;
}

.hero-section {
  background: var(--color-light-blue);
  padding: 150px 0 100px;
}

.hero-title {
  font-size: 2.3rem !important;
  color: var(--color-teal);
  font-weight: bold;
}

.hero-description {
  font-size: 1.1rem;
  color: #555;
}

.company-badge {
  font-weight: 600;
  color: var(--color-dark-brown);
  letter-spacing: 1px;
  font-size: 0.9rem;
}

.courses-section {
  background: white;
  margin-bottom: 100px;
}

.section-title {
  color: var(--color-teal);
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.section-subtitle {
  color: #666;
  font-size: 1.1rem;
}

.course-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.course-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sale-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4757;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.course-content {
  padding: 1.5rem;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-badge {
  background: var(--color-cream);
  color: var(--color-teal);
  padding: 4px 8px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.duration {
  color: #666;
  font-size: 0.9rem;
}

.course-title {
  color: var(--color-teal);
  font-weight: 600;
  margin: 1rem 0;
  font-size: 1.1rem;
  line-height: 1.4;
}

.instructor-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.instructor-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.instructor-name {
  font-weight: 500;
  color: #333;
}

.course-rating {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stars i {
  color: #ffa500;
  font-size: 0.9rem;
}

.rating-text {
  color: #666;
  font-size: 0.9rem;
}

.course-price {
  display: flex;
  align-items: center;
  gap: 10px;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.9rem;
}

.current-price {
  color: var(--color-teal);
  font-weight: bold;
  font-size: 1.1rem;
}

.course-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background-color: var(--color-teal);
  color: white;
}

.btn-primary:hover {
  background-color: #3a9087;
}

.btn-outline-primary {
  border: 2px solid var(--color-teal);
  color: var(--color-teal);
  background: transparent;
}

.btn-outline-primary:hover {
  background-color: var(--color-teal);
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

/* Modal Styles */
/* Remplacez cette partie dans votre CSS : */
/* Dans votre fichier, trouvez la section "Modal Styles" et remplacez EXACTEMENT ces règles : */

/* Modal Styles */
.pers {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7) !important; /* Fond sombre avec !important */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.content-pers {
  background: white !important; /* Fond blanc avec !important */
  border-radius: 12px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

/* IMPORTANT: Supprimez ou commentez toute autre règle .modal-overlay dans votre CSS */

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-title {
  color: var(--color-teal);
  font-weight: bold;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
}

.modal-close:hover {
  color: #333;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 1.5rem;
  border-top: 1px solid #eee;
}

.course-detail-image img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
}

.curriculum-section {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
}

.section-title {
  color: var(--color-teal);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.curriculum-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f5f5f5;
}

.curriculum-item:last-child {
  border-bottom: none;
}

/* Pagination */
.pagination {
  margin: 0;
}

.page-link {
  color: var(--color-teal);
  border-color: #dee2e6;
  padding: 0.5rem 0.75rem;
}

.page-link:hover {
  color: white;
  background-color: var(--color-teal);
  border-color: var(--color-teal);
}

.page-item.active .page-link {
  background-color: var(--color-teal);
  border-color: var(--color-teal);
}

.page-item.disabled .page-link {
  color: #6c757d;
  background-color: white;
  border-color: #dee2e6;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem !important;
  }
  
  .course-actions {
    flex-direction: column;
  }
  
  .content-pers {
    width: 95%;
    margin: 10px;
  }
  
  .modal-footer {
    flex-direction: column;
  }
}
</style>