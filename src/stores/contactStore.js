import { defineStore } from 'pinia';
import logo from '@/assets/img/logo2.png'

export const useContactStore = defineStore('contact', {
  state: () => ({
    sectionTitle: 'Contactez-nous',
    sectionDescription: 'Besoin d’informations ? Notre équipe est à votre disposition pour répondre à toutes vos questions.',
    contactInfos: [
      {
        title: 'Adresse',
        value: '25 Rue de Ponthieu, 75008 Paris',
        icon: 'bi bi-geo-alt',
        delay: 300
      },
      {
        title: 'Numéros de téléphone',
        value: ['+33 6 51 953 090', '+33 6 61 600 900', '+33 6 52 521 414'],
        icon: 'bi bi-telephone',
        delay: 400
      },
      {
        title: 'Email',
        value: 'contact@kps-analytics.com',
        link: 'mailto:contact@kps-analytics.com',
        icon: 'bi bi-envelope',
        delay: 500
      },
      {
        title: 'Site Web',
        value: 'https://kpsgroupe.ma/',
        link: 'https://kpsgroupe.ma/',
        icon: 'bi bi-globe',
        delay: 600
      },
      {
        title: 'LinkedIn',
        value: 'Suivez-nous sur LinkedIn',
        link: 'https://www.linkedin.com/company/kps-analytics/',
        icon: 'bi bi-linkedin',
        delay: 700
      },
        {
        title: 'Facebook',
        value: 'Suivez-nous sur Facebook',
        link: 'https://www.facebook.com/kpsgroupe/',
        icon: 'bi bi-facebook',
        delay: 800
      }
    ]
  })
});
