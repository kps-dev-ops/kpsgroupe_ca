<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content-scrollable">
      <div class="modal-content">
        <button class="close-btn" @click="close">✖</button>
        <form @submit.prevent="handleSubmit">
          <h2 class="form-title">{{ editingId ? "Modifier l'offre" : "Nouvelle offre d'emploi" }}</h2>

          <div class="form-group">
            <label>Titre du poste</label>
            <input v-model="form.title" required placeholder="Ex: Développeur Frontend Senior" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Type de contrat</label>
              <select v-model="form.contrat" required>
                <option disabled value="">Sélectionnez un type de contrat</option>
                <option>CDI</option>
                <option>CDD</option>
                <option>Stage</option>
              </select>
            </div>
            <div class="form-group">
              <label>Mode de travail</label>
              <select v-model="form.type" required>
                <option disabled value="">Sélectionnez un mode de travail</option>
                <option>Remote</option>
                <option>Hybride</option>
                <option>Présentiel</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Lieu</label>
            <input v-model="form.location" required placeholder="📍 Ex: Paris" />
          </div>

          <div class="form-group">
            <label>Date de début</label>
            <input type="date" v-model="form.date" required />
          </div>

          <div class="form-group">
            <label>Description courte</label>
            <input v-model="form.description" maxlength="100" placeholder="Résumez en une phrase l'offre d'emploi" />
          </div>

          <div class="form-group">
            <label>Description complète</label>
            <textarea v-model="form.fullDescription" maxlength="2000" placeholder="Décrivez en détail le poste, les missions et les responsabilités" />
          </div>
          <div class="form-group">
            <label>Slug (généré automatiquement)</label>
            <input v-model="form.slug" readonly />
          </div>

<!-- 
          <div class="form-group">
            <label>Compétences requises</label>
            <input
              v-model="skillInput"
              @keyup.enter.prevent="addSkill"
              placeholder="Ajouter une compétence et appuyez sur Entrée"
            />
            <div class="tag-list">
              <span v-for="(skill, i) in form.skills" :key="i" class="tag">
                {{ skill }} <button @click.prevent="removeSkill(i)">×</button>
              </span>
            </div>
          </div> -->

          <!-- <div class="form-group">
            <label>Prérequis (séparés par virgules)</label>
            <textarea v-model="requirementsInput" placeholder="Ex: Diplôme d'ingénieur, 3 ans d'expérience, etc." />
          </div>

          <div class="form-group">
            <label>Responsabilités (séparées par virgules)</label>
            <textarea v-model="responsibilitiesInput" placeholder="Ex: Développement de nouvelles fonctionnalités, maintenance du code, etc." />
          </div> -->

          <!-- <div class="form-actions">
            <button type="submit" class="submit">📨 {{ editingId ? 'Mettre à jour' : 'Publier l\'offre' }}</button>
            <button v-if="editingId" type="button" class="delete" @click="handleDelete">🗑 Supprimer</button>
          </div> -->
          <div class="form-group">
  <label>Compétences requises</label>
  <div class="skills-input-wrapper">
    <input
      v-model="skillInput"
      @keyup.enter.prevent="addSkill"
      placeholder="Ajouter une compétence et appuyez sur Entrée"
    />
    <button class="add-skill-btn" @click.prevent="addSkill">+</button>
  </div>
  <div class="tag-list">
    <span v-for="(skill, i) in form.skills" :key="i" class="tag">
      {{ skill }}
      <button @click.prevent="removeSkill(i)">×</button>
    </span>
  </div>
</div>

<div class="form-group">
            <label>Prérequis (séparés par virgules)</label>
            <textarea v-model="requirementsInput" placeholder="Ex: Diplôme d'ingénieur, 3 ans d'expérience, etc." />
          </div>

          <div class="form-group">
            <label>Responsabilités (séparées par virgules)</label>
            <textarea v-model="responsibilitiesInput" placeholder="Ex: Développement de nouvelles fonctionnalités, maintenance du code, etc." />
          </div>

<div class="form-actions">
  <button type="submit" class="submit">📨 {{ editingId ? 'Mettre à jour' : 'Publier l\'offre' }}</button>
  <button type="button" class="draft" @click="saveDraft">💾 Enregistrer comme brouillon</button>
  <button v-if="editingId" type="button" class="delete" @click="handleDelete">🗑 Supprimer</button>
</div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
// import { Client, Databases, ID } from 'appwrite'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'
const props = defineProps<{ show: boolean, jobToEdit?: any }>()
const emit = defineEmits(['close', 'refresh'])
const blog = useBlogStore();
const { jobPosts, lastPost, posts } = storeToRefs(blog)
const router = useRouter()

const currentPage = ref(1)
const itemsPerPage = ref(5)

const showJobForm = ref(false)

// const paginatedPosts = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage.value
//   return posts.value.slice(start, start + itemsPerPage.value)
// })

// const totalPages = computed(() => {
//   return Math.ceil(posts.value.length / itemsPerPage.value)
// })

// const client = new Client().setEndpoint('https://TON_ENDPOINT').setProject('TON_PROJECT_ID')
// const databases = new Databases(client)
// const databaseId = 'TON_DATABASE_ID'
// const collectionId = 'TON_COLLECTION_ID'

const editingId = ref<string | null>(null)
const form = ref({
  title: '',
  contrat: '',
  type: '',
  location: '',
  date: '',
  description: '',
  slug: '',
  fullDescription: '',
  skills: [] as string[],
  responsibilities: [] as string[],
  requirements: [] as string[]
})


const skillInput = ref('')
const requirementsInput = ref('')
const responsibilitiesInput = ref('')

watch(() => props.jobToEdit, (job) => {
  if (job) {
    editingId.value = job.$id
    form.value = {
      ...job,
      skills: job.skills || [],
      responsibilities: job.responsibilities || [],
      requirements: job.requirements || []
    }
    requirementsInput.value = job.requirements?.join(', ') || ''
    responsibilitiesInput.value = job.responsibilities?.join(', ') || ''
  }
}, { immediate: true })


watch(() => form.value.title, (newTitle) => {
  form.value.slug = newTitle
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')     
    .replace(/\s+/g, '-')   
    .replace(/-+/g, '-')
})

const addSkill = () => {
  const skill = skillInput.value.trim()
  if (skill && !form.value.skills.includes(skill)) {
    form.value.skills.push(skill)
    skillInput.value = ''
  }
}

const saveDraft = async () => {
  form.value.requirements = requirementsInput.value.split(',').map(v => v.trim())
  form.value.responsibilities = responsibilitiesInput.value.split(',').map(v => v.trim())

  try {
    const draftData = { ...form.value, statut: 'brouillon' }
    if (editingId.value) {
      console.log('Mise à jour du post', draftData)
      await blog.updateJobPost(editingId.value, draftData);
      alert('Brouillon mis à jour 📝')
    } else {
      console.log('Création du post', draftData)
      await blog.createJobPost(draftData);
      alert('Brouillon enregistré 📝')
    }
    emit('refresh')
    close()
  } catch (err) {
    console.error(err)
    alert("Erreur lors de l'enregistrement du brouillon.")
  }
}


const removeSkill = (i: number) => form.value.skills.splice(i, 1)

const close = () => {
  editingId.value = null
  emit('close')
}

const handleSubmit = async () => {
  form.value.requirements = requirementsInput.value.split(',').map(v => v.trim())
  form.value.responsibilities = responsibilitiesInput.value.split(',').map(v => v.trim())
  try {
    if (editingId.value) {
      await blog.updateJobPost(editingId.value, form.value)
      alert('Offre mise à jour ✅')
    } else {
      await blog.createJobPost(form.value)
      alert('Offre publiée ✅')
    }
    emit('refresh')
    close()
  } catch (err) {
    console.error(err)
    alert('Erreur lors de l’envoi.')
  }
}

const handleDelete = async () => {
  if (!editingId.value) return
  if (confirm('Supprimer cette offre ?')) {
    try {
      await blog.deleteJobPost(editingId.value)
      alert('Offre supprimée ❌')
      emit('refresh')
      close()
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la suppression.')
    }
  }
}
</script>

<style scoped>
:root {
  --primary-color: #a855f7;
  --tag-bg: #f3e8ff;
  --tag-text: #7e22ce;
  --input-bg: #f9f9f9;
  --input-border: #e5e7eb;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 999;
  padding: 2rem 1rem;
  overflow-y: auto;
}

.modal-content-scrollable {
  width: 100%;
  max-width: 720px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  max-height: 90vh;
}

.modal-content {
  padding: 2rem;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: none;
  border: none;
  font-size: 1.4rem;
  color: #bbb;
  cursor: pointer;
}

.form-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: #444;
}

.form-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

input,
select,
textarea {
  padding: 0.9rem 1.2rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 14px;
  background-color: var(--input-bg);
  transition: 0.2s ease;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
}

input:focus,
select:focus,
textarea:focus {
  border: 1px solid #d1d5db;
  outline: none;
  background: #fff;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.tag-list {
  margin-top: 0.6rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: var(--tag-bg);
  color: var(--tag-text);
  padding: 0.5rem 0.8rem;
  border-radius: 999px;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
}

.tag button {
  background: none;
  border: none;
  color: var(--tag-text);
  margin-left: 0.4rem;
  font-weight: bold;
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.submit {
  background: var(--primary-color);
  color: #fff;
  border: none;
  padding: 0.75rem 1.8rem;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 6px rgba(168, 85, 247, 0.4);
}

.delete {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
}
</style>
