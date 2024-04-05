<template>
  <div class="upload-container">
    <h1>Upload and Process CAD Files</h1>
    <input type="file" @change="handleFileUpload" multiple>
    <input type="text" v-model="parameters" placeholder="Enter Parameters">
    <button @click="processFiles">Process</button>
    <button @click="exportData">Export Data</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFiles: [],
      parameters: ''
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFiles = event.target.files;
    },
    processFiles() {
      // Add logic to process files
      console.log('Processing files:', this.selectedFiles, 'with parameters:', this.parameters);
    },
    exportData() {
      // Add logic to export data
      console.log('Exporting data');
    }
  }
};
</script>

<style>
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
}

.upload-container input[type="file"] {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}

.upload-container input[type="text"] {
  border: 1px solid #ccc;
  padding: 6px 12px;
  width: 200px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
