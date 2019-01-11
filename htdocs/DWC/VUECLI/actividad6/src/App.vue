<template>
  <div>
    <nav>
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <router-link to="/"><button class="btn btn-lg btn-primary btn-block">Home</button></router-link>
          </div>
          <div class="col-md-3">
            <router-link to="/products"><button class="btn btn-lg btn-primary btn-block">Productos</button></router-link>
          </div>
          <div class="col-md-3">
            <router-link to="/new"><button class="btn btn-lg btn-primary btn-block">Nuevo Producto</button></router-link>
          </div>
          <div class="col-md-3">
            <router-link to="/about"><button class="btn btn-lg btn-primary btn-block">About</button></router-link>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style>
nav {
  margin: 50px 0px;
}
</style>
