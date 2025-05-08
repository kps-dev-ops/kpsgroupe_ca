<template>
  <section id="contact" class="contact section light-background">
    <div class="container section-title" data-aos="fade-up">
      <h2 style="color:#5E5325;" >{{ contactStore.sectionTitle }}</h2>
      <p>{{ contactStore.sectionDescription }}</p>
    </div>

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row g-4 g-lg-5">
        <div class="col-lg-5">
          <div class="info-box" data-aos="fade-up" data-aos-delay="200">
            <h3 >Contact Info</h3>
            <p>Nous sommes disponibles pour vous accompagner dans tous vos projets.</p>
            <div v-for="(info, index) in contactStore.contactInfos" :key="index" class="info-item" data-aos="fade-up" :data-aos-delay="info.delay">
              <div class="icon-box">
                <i :class="info.icon"></i>
              </div>
              <div class="content">
                <h4>{{ info.title }}</h4>
                <p v-if="Array.isArray(info.value)">
                  <span v-for="(item, i) in info.value" :key="i">
                      <template v-if="i === 0">
                        <a
                          :href="`https://wa.me/${item.replace(/[^0-9]/g, '')}`"
                          target="_blank"
                          style="text-decoration: none; color: inherit"
                        >
                          {{ item }}
                        </a>
                      </template>
                      <template v-else>
                        {{ item }}
                      </template>
                      <br />
                    </span>
                </p>
                <p v-else>
                  <a v-if="info.link" :href="info.link"  style="text-decoration: none;"target="_blank">{{ info.value }}</a>
                  <span v-else>{{ info.value }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-7">
          <div class="contact-form" data-aos="fade-up" data-aos-delay="300">
            <h3 style="color:#5E5325;">Prendre contact</h3>
            <p>Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais.</p>

            <form @submit.prevent="handleSubmit" class="php-email-form" data-aos="fade-up" data-aos-delay="200">
              <div class="row gy-4">
                <div class="col-md-6">
                  <input type="text" v-model="form.name" class="form-control" placeholder="Votre Nom" required />
                </div>
                <div class="col-md-6">
                  <input type="email" v-model="form.email" class="form-control" placeholder="Votre Email" required />
                </div>
                <div class="col-12">
                  <input type="text" v-model="form.subject" class="form-control" placeholder="Sujet" required />
                </div>
                <div class="col-12">
                  <textarea v-model="form.message" class="form-control" rows="6" placeholder="Message" required></textarea>
                </div>
                <div class="col-12 text-center">
                  <button type="submit" class="btn">Envoyer</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useContactStore } from '../stores/contactStore';

const contactStore = useContactStore();

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const handleSubmit = async () => {
  try {
    const response = await fetch('http://localhost:8000/forms/contact.php', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur serveur : ${response.status}`);
    }

    const result = await response.json();

    if (result.status === 'success') {
      alert('Message envoyé avec succès !');
      form.value = { name: '', email: '', subject: '', message: '' };
    } else {
      alert(`Échec de l'envoi : ${result.message}`);
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    alert('Échec de l\'envoi du message. Vérifiez votre connexion et réessayez.');
  }
};

</script>
