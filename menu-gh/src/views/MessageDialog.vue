<template>
  <div class="notification">
    <v-dialog v-model="ocupado.visible" max-width="400" persistent>
      <v-card>
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>
            {{ ocupado.titulo }}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="subheading">
          {{ ocupado.mensaje }}
        </v-card-text>
        <v-card-text>
          <v-progress-linear :indeterminate="true" color="primary"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="notificacion.visible" :color="notificacion.color" multi-line top :timeout="6000" dark>
      {{notificacion.mensaje }}
      <v-btn color="white" flat @click="ocultarNotificacion">
        Cerrar
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name : 'App',
    data () {
      return {
        // 
      }
    },
    computed: {
      ...mapState('notifications', ['ocupado', 'notificacion'])
    },
    methods: {
      ...mapMutations('notifications', ['ocultarNotificacion'])
    }
  }
</script>