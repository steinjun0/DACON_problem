<template>
  <v-app>
    <nav>
      <v-toolbar>
        <v-toolbar-title>
          <nuxt-link to="/" style="text-decoration: none; color: black"
            >D-P</nuxt-link
          >
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text nuxt to="/">
            <div>Home</div>
          </v-btn>
          <v-btn text nuxt to="/signup">
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <nuxt></nuxt>
  </v-app>
</template>

<script></script>

<style></style>
