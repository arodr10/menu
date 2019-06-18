<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar dark app class="primary">
      <v-toolbar-side-icon @click="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Cliente Pruebas ABC</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- <v-content>
      <v-container fluid fill-height> -->
        <v-slide-y-transition mode="out-in">
          <router-view :key="$route.fullPath"></router-view>
        </v-slide-y-transition>
      <!-- </v-container>
    </v-content> -->
    
  </v-app>
</template>
<script>
  import { db } from '@/firebase'

  export default {
    name : 'App',
    data () {
      return {
        sideNav   : false,
        menuItems : []
      }
    },
    created() {
      this.getMenu()   
    },    
    methods : {
      async getMenu() {
        let result = await db.collection('opciones_menu').get()

        result.forEach(doc => {
          this.menuItems.push(doc.data())
        })
      }
    }
  }
</script>