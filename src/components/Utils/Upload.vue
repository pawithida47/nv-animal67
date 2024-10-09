<template>
  <div>
<<<<<<< HEAD
      <!-- <back-header /> -->
      <h1>Upload Material:</h1>
      <form enctype="multipart/form-data" novalidate>
          <div class="dropbox">
              <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name,
                  $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
              <!-- <p v-if="isInitial || isSuccess"> -->
              <p v-if="isInitial">
                  Drag your file(s) here to begin<br> or click to browse
              </p>
              <p v-if="isSaving">
                  Uploading {{ fileCount }} files...
              </p>
              <p v-if="isSuccess">
                  Upload Successful.
              </p>
          </div>
      </form>
  </div>
</template>
=======
  <!-- <back-header /> -->
  <h1>Upload Material:</h1>
  <form enctype="multipart/form-data" novalidate>
  <div class="dropbox">
  <input type="file" multiple :name="uploadFieldName"
 :disabled="isSaving" @change="filesChange($event.target.name,
 $event.target.files); fileCount = $event.target.files.length"
  accept="image/*" class="input-file">
 245
  <!-- <p v-if="isInitial || isSuccess"> -->
  <p v-if="isInitial">
  Drag your file(s) here to begin<br> or click to browse
  </p>
  <p v-if="isSaving">
  Uploading {{ fileCount }} files...
  </p>
  <p v-if="isSuccess">
  Upload Successful.
  </p>
  </div>
  </form>
  </div>
 </template>
>>>>>>> 08ab55fd7f86d8084deddbad6a7c7433e3dbd464
