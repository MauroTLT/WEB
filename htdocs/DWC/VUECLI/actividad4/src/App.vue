<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-md-4">
        <add-prod-form></add-prod-form>
      </div>
    </div>
    <br><br>
    <div class="row">
      <div class="col-sm-6 col-md-6 col-lg-12">
        <tabla-prod></tabla-prod>
      </div>
    </div>
  </div>
</template>

<script>
  import TablaProd from './components/TablaProd';
  import AddProdForm from './components/AddProdForm';

  export default {
    name: 'app',
    components: {
      TablaProd,
      AddProdForm
    }
  };
</script>

<style>

</style>
