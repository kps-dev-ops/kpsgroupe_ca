
<script setup>
import { ref, onMounted } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useBlogStore } from '../stores/blog'
import Footer from '../components/Footer.vue'

AOS.init()

const showForm = ref(false)
const editingId = ref(null)
const defaultImage = 'https://appwrite.ubbfy.com/v1/storage/buckets/67f3ad7b0017d490c545/files/new_cover/view?project=67f3ad4f00234f8ab06c&project=67f3ad4f00234f8ab06c&mode=admin'

const blog = useBlogStore()

const form = ref({
  title: '',
  subtitle: '',
  slug: '',
  description: '',
  content: '',
  image: '',
  published: true,
  featured: false
})


const categoryList = [
  'Data',
  'Développement',
  'Design',
  'Marketing',
  'Cybersécurité',
  'Cloud',
  'IA',
  'DevOps'
]

const generateSlug = () => {
  form.value.slug = form.value.title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

onMounted(() => {
  blog.fetchArticles()
})
const editPost = (post) => {
  editingId.value = post.$id
  form.value = {
    title: post.title,
    subtitle: post.subtitle || '',
    slug: post.slug,
    description: post.description || '',
    content: post.content || '',
    image: post.image || defaultImage,
    published: post.published !== false,
    featured: post.featured || false
  }
  showForm.value = true
}

const resetForm = () => {
  editingId.value = null
  form.value = {
    title: '',
    subtitle: '',
    slug: '',
    description: '',
    content: '',
    published: true,
    image: '',
    featured: false
  }
}
const loading = ref(false)

const validateForm = () => {
  if (!form.value.title || !form.value.content) {
    alert('Le titre et le contenu sont obligatoires')
    return false
  }
  return true
}


const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true

  const payload = {
    ...form.value,
    subtitle: form.value.subtitle || '',
  }

  try {
    if (editingId.value) {
      await blog.updateArticle(editingId.value, payload)
    } else {
      await blog.createArticle(payload)
    }
  } catch (err) {
    console.error('Erreur de soumission du formulaire :', err)
  } finally {
    loading.value = false
    showForm.value = false
    resetForm()
  }
}



const uploadImage = async (e) => {
  const file = e.target.files[0];
  
  if (!file || !file.type.startsWith('image/')) {
    alert("Veuillez télécharger une image valide.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    form.value.image_url = reader.result;
  };
  reader.readAsDataURL(file);

  try {
    const imageUrl = await blog.uploadImage(file);
    form.value.image = imageUrl;
  } catch (err) {
    console.error("Erreur lors de l'upload de l'image :", err);
  }
};



const toggleForm = () => {
  showForm.value = !showForm.value
  if (showForm.value && !editingId.value) resetForm()
}
</script>


<style scoped>

.featured-badge {
  background-color: #facc15;
  color: #92400e;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  display: inline-block;
  margin-top: 0.5rem;
}


.status-badge {
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.25rem 0.8rem;
  border-radius: 999px;
  display: inline-block;
  margin-top: 0.5rem;
  width: fit-content;
  text-align: center;
}

.status-badge.published {
  background-color: #d1fae5; 
  color: #065f46;
}

.status-badge.draft {
  background-color: #fee2e2; /* rouge clair */
  color: #991b1b; /* rouge foncé */
}



.input-group.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-group.checkbox input[type='checkbox'] {
  transform: scale(1.2);
}

.post-page {
  padding: 2rem;
  background-color: #f3f6fa;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1.5rem;
  margin-top: 2%;
  position: relative;
  display: inline-block;
}

.title::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  bottom: -6px;
  left: 0;
  background-color: #C5A070;
  transform: scaleX(1);
  transform-origin: left;
  transition: transform 0.3s ease-in-out;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.toggle-btn {
  padding: 0.6rem 1.2rem;
  background: linear-gradient(90deg,  var(--accent-color),  var(--accent-color));
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.posts-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.post-card {
  background: linear-gradient(to bottom right, #ffffff, #f8fafc);
  border-left: 5px solid var(--accent-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 250px;
  max-height: 350px;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.post-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-bottom: 1px solid #e5e7eb;
}

.card-content {
  padding: 1rem 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px;
  line-height: 1.2;
}

.card-content p {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.icon-btn {
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.6rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon-btn.edit {
  background-color: #e0e7ff;
  color: var(--accent-color);
}

.icon-btn.edit:hover {
  background-color: #c7d2fe;
}

.icon-btn.delete {
  background-color: #fee2e2;
  color: #b91c1c;
}

.icon-btn.delete:hover {
  background-color: #fecaca;
}


.avatar-preview {
  margin-top: 0.75rem;
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #C5A070;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.avatar-preview:hover {
  transform: scale(1.05);
}


/* .post-card {
  background: white;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0,0,0,0.05);
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-5px);
}

.post-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
}

.card-content h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
}

.card-content p {
  color: #6b7280;
  font-size: 0.95rem;
  margin-top: 0.25rem;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.icon-btn {
  background: #f3f4f6;
  border: none;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.icon-btn.edit:hover {
  background-color: #dbeafe;
  color: #2563eb;
}

.icon-btn.delete:hover {
  background-color: #fee2e2;
  color: #dc2626;
} */
.form-box {
  margin-top: 2rem;
  background: linear-gradient(to bottom right, #ffffff, #f3f4f6);
  padding: 2rem;
  border-radius: 18px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  animation: fadeInSlide 0.6s ease;
}

@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* 
.input-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
} */

.input-group select {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #fff;
  color: #333;
}


.input-group input,
.input-group textarea,
.input-group select {
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background-color: #f9fafb;
  transition: all 0.3s ease;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04);
}

.input-group input:focus,
.input-group textarea:focus,
.input-group select:focus {
  outline: none;
  border-color: #C5A070;
  background-color: white;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
}

.form-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.form-footer button {
  padding: 0.6rem 1.4rem;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  background-color: #C5A070;
  color: white;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-footer button:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
}

.form-footer button:hover:not(:disabled) {
  background-color: #C5A070;
}



.post-page {
  padding: 2rem;
  max-width: 860px;
  margin: auto;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.input-group {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
}

.input-group input[type="text"],
.input-group input[type="file"] {
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
}

.quill-editor {
  background-color: white;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  padding: 1rem;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.cover-preview {
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin-top: 1rem;
  border: 1px solid #cbd5e0;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn.cancel {
  background-color: #e5e7eb;
  color: #1f2937;
}

.btn.submit {
  background-color: #C5A070;
  color: white;
}

.btn.submit:hover {
  background-color: #C5A070;
}
</style >