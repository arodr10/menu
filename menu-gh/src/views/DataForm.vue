<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Item</v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-text-field v-for="(header, indexHeader) in headers.slice(0, -1)" :key="indexHeader" 
                          v-validate="header.validations" :data-vv-name="header.value" :error-messages="errors.collect(header.value)" :data-vv-as="header.text"   
                          v-bind:label="header.text" v-model="editedItem[header.value]"></v-text-field>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {db} from '@/firebase'

  export default {
    name  : 'DataForm',
    props : ['headers', 'model', 'tableName', 'indexName'],

    data  : () => ({
      dialog      : false,
      editedIndex : -1,
      editedItem  : {},
      defaultItem : {},
      tableData   : [],
    }),

    created () {
      this.initialize()
    },

    watch : {
      dialog (val) {
        val || this.close()
      }
    },

    computed : {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
      }
    },

    methods : {
      async initialize () {
        // Asigna los valores por defecto de los objectos de edicion y default
        this.headers.forEach(v => {       
          if (v.value != 'actions') {
            this.editedItem[v.value]  = v.default
            this.defaultItem[v.value] = v.default
          }
        })
      },

      close () {
        this.$validator.reset()
        this.dialog = false
        setTimeout(() => {
          this.editedItem  = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      }, 

      save () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            if (this.editedIndex > -1) {
              db.collection(this.tableName).doc(this.editedItem[this.indexName]).update(this.editedItem).then(function() {})
              this.$emit("onUpdate", this.editedIndex, this.editedItem)
            } else {
              db.collection(this.tableName).doc(this.editedItem[this.indexName]).set(this.editedItem).then(function() {})
              this.$emit("onCreate", this.editedItem)
            }
            this.close()
          }
        })
      },
      
      editAction (item) {
        this.editedIndex = this.model.indexOf(item)
        this.editedItem  = Object.assign({}, item)
        this.dialog      = true
      },

      deleteAction (item) {
        const index = this.model.indexOf(item)

        if (confirm('Are you sure you want to delete this item?'))  {
          db.collection(this.tableName).doc(item[this.indexName]).delete().then(function() {})
          this.$emit("onDelete", index)
        }
      },
    }
  }
</script>