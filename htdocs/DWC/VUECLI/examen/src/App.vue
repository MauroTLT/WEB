<template>
  <div id="navegacion">
    <nav>
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <router-link to="/"><button class="btn btn-lg btn-primary btn-block">Home</button></router-link>
          </div>
          <div class="col-md-2">
            <router-link to="/grupos"><button class="btn btn-lg btn-primary btn-block">Grupos</button></router-link>
          </div>
          <div class="col-md-2">
            <router-link to="/alumnos"><button class="btn btn-lg btn-primary btn-block">Alumnos</button></router-link>
          </div>
          <div class="col-md-2">
            <router-link to="/profesores"><button class="btn btn-lg btn-primary btn-block">Profesores</button></router-link>
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
  padding: 50px 0px;
  background: #ddd;
  border-bottom: 2px black solid;
  border-bottom-right-radius: 36px;
  border-bottom-left-radius: 36px;
  margin-bottom: 50px;
}
</style>
