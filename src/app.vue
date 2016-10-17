<template>
  <div>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Project name</a>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <router-link to='/' tag='li' active-class='active' exact><a>Dashboard</a></router-link>
            <router-link to='/tasks' tag='li' active-class='active'><a>Tasks</a></router-link>
            <router-link to='/history' tag='li' active-class='active'><a>History</a></router-link>
            <router-link to='/realtime' tag='li' active-class='active'><a>Realtime</a></router-link>
          </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
