<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
* {
  padding: 0;
  margin: 0;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
html,
body,
#app,
.home {
  width: 100%;
  height: 100%;
}
.home {
  display: flex;
  flex-direction: column;
}
.header {
  width: 100%;
  height: 40px;
  background: #f5f5f5;
  border-bottom: solid 1px #ccc;
  text-align: center;
  line-height: 40px;
  position: relative;
}
.main {
  width: 100%;
  flex: 1;
  overflow: auto;
}
</style>
