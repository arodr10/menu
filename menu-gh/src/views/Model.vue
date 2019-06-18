<template>
  <v-layout justify-center>
    <div>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <dataForm :headers="headers" :model="tableData" :tableName="tableName" :indexName="indexName" @onUpdate="updateData" @onCreate="createData" @onDelete="deleteData" ref="form"/>        
      </v-toolbar>

      <v-toolbar flat color="white">
        <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
      </v-toolbar>

      <v-data-table :headers="headers" :items="tableData" :search="search" class="elevation-1">
        <template v-slot:items="props">

          <td v-for="(header, index) in headers.slice(0, -1)" :key="index">
            {{ props.item[header.value] }}
          </td>

          <td class="justify-center layout px-0">
            <v-icon small class="mr-2 my-auto" @click="editItem(props.item)">
              edit
            </v-icon>
            <v-icon small class="my-auto" @click="deleteItem(props.item)">
              delete
            </v-icon>
          </td>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>

      </v-data-table>

    </div>
  </v-layout>
</template>

<script>
  import {db} from '@/firebase'
  import DataForm from '@/views/DataForm.vue'

  export default {
    data: () => ({
      headers      : [],
      tableData    : [],
      currentIndex : {},
      title        : '',
      tableName    : '',
      indexName    : '',
      search       : ''
    }),

    components: {
      DataForm
    },

    created () {
      this.initialize()
    },

    methods: {
      async initialize () {
        let alias = this.$route.params.alias
        // Cargar la definición de los headers de campos de la tabla desde la base de datos
        let tableDefinition = await db.collection('tables_configuration').doc(alias).get()
        //let tableDefinition = await db.collection('tables_configuration').doc('libros').get()
        //let tableDefinition = await db.collection('tables_configuration').doc('clientes').get()
        this.headers        = JSON.parse(tableDefinition.data().headers)
        this.title          = tableDefinition.data().title
        this.tableName      = tableDefinition.data().tableName 
        this.indexName      = tableDefinition.data().indexName

        // Consulta de los datos
        let dataSet = await db.collection(this.tableName).get()

        // Transformar la consulta en un arreglo objeto JSON
        dataSet.forEach(doc => {
          this.tableData.push(doc.data())
        })
      },
      
      createData(item) {
        this.tableData.push(item)
      },

      updateData(index, item) {
        Object.assign(this.tableData[index], item)
      },

      deleteData(index) {
        this.tableData.splice(index, 1)
      },

      editItem (item) {
        this.$refs.form.editAction(item)
      },

      deleteItem (item) {
        this.$refs.form.deleteAction(item)
      }       
    }
  }
</script>