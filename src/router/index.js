import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Pembayaran Token Listrik',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/detail-pembayaran/:id',
    name: 'Detail Pembayaran',
    component: () => import('../views/DetailPembayaran.vue')
  },
  {
    path: '/tambah-pembayaran',
    name: 'Tambah Pembayaran',
    component: () => import('../views/TambahPembayaran.vue')
  },
  {
    path: '/profile-user',
    name: 'Profile User',
    component: () => import('../views/ProfileUser.vue')
  },
  {
    path: '/edit-profile',
    name: 'Edit Profile',
    component: () => import('../views/EditProfile.vue')                                                
  },
  {
    path: '/history-pembayaran',
    name: 'History Pembayaran',
    component: () => import('../views/HistoryPembayaran.vue')
  },
  {
    path: '/tambah-anggota',
    name: 'Tambah Anggota',
    component: () => import('../views/TambahAnggota.vue')
  },
  {
    path: '/list-anggota',
    name: 'List Anggota',
    component: () => import('../views/ListAnggota.vue')
  },
  {
    path: '/edit-anggota/:id',
    name: 'Edit Anggota',
    component: () => import('../views/EditAnggota.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  let idUser = localStorage.getItem('id') ? localStorage.getItem('id') : null;

  if(from.name != 'Login' && to.name != 'Login' && idUser == null){
    next({name: 'Login'});
  }else if(from.name != 'Login' && to.name != 'Login' && idUser != null){
    next();
  }else if(from.name != 'Login' && to.name == 'Login' && idUser != null){
    next({name: 'Pembayaran Token Listrik'});
  }else{
    next();
  }
  
})

export default router
